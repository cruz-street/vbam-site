'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { getClickParams, getDeviceAndBrowser } from '@/lib/click-attribution';

interface Props {
  formUrl: string;
  formId: string;
  title?: string;
  // Extra query params (e.g. position/source prefills) merged into the src
  // alongside click/device attribution. Omit for existing callers — behavior
  // is unchanged.
  extraParams?: Record<string, string>;
  // GA dataLayer event name fired on submission-completed. Defaults to the
  // existing "registration_submit" so current callers see no change.
  gaEventName?: string;
}

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, origin: string) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/** Matches the height the iframe renders at, so the placeholder holds the
 * page's layout steady while the src is resolved. */
const IFRAME_HEIGHT = 600;

// Origin Jotform's embed handler posts submission messages from — same
// origin passed to jotformEmbedHandler() below.
const JOTFORM_ORIGINS = [
  'https://form.jotform.com',
  'https://hipaa.jotform.com',
  // Jotform posts submission-completed from this origin for HIPAA forms
  // (seen on the VBAM registration form, 10/19).
  'https://hipaa-submit.jotform.com',
];

export default function JotformEmbed({
  formUrl,
  formId,
  title = 'New Patient Registration',
  extraParams,
  gaEventName = 'registration_submit',
}: Props) {
  const iframeId = `JotFormIFrame-${formId}`;
  // registration_submit -> registration_start; careers' own submit event name
  // gets its own matching start name instead of a mislabeled one.
  const startEventName = gaEventName.replace(/_submit$/, '_start');

  // Resolved once on mount from stored click params, then held in state.
  // The iframe only ever renders with its final src — never the bare
  // formUrl first — so it never reloads and double-counts a submission.
  const [src, setSrc] = useState<string | null>(null);
  // Guards against double-firing registration_submit — Jotform's embed
  // handler can post the submission-completed message more than once for a
  // single submit, and this component could theoretically remount.
  const submittedRef = useRef(false);
  // Guards registration_start so it fires once per page view.
  const startedRef = useRef(false);

  useEffect(() => {
    const url = new URL(formUrl);
    const clickParams = getClickParams();
    const deviceParams = getDeviceAndBrowser();
    for (const [param, value] of Object.entries({ ...clickParams, ...deviceParams, ...extraParams })) {
      url.searchParams.set(param, value);
    }
    // Deliberately effectful: getClickParams() reads localStorage, a browser
    // API unavailable at render time under SSR/static export. The iframe must
    // not render until this resolves (see the placeholder below) — rendering
    // the bare formUrl first and swapping src afterward would reload the
    // iframe and double-count the submission.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrc(url.toString());
    // extraParams is an object literal from the caller; compare by value so a
    // changed position/source (e.g. a careers page "Apply" click) re-resolves
    // the src, not just a changed formUrl.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formUrl, JSON.stringify(extraParams)]);

  useEffect(() => {
    // Covers the case where the embed handler script finished loading before
    // the iframe above existed (src was still resolving) — its onLoad below
    // would have found nothing to attach to.
    if (src && typeof window !== 'undefined' && window.jotformEmbedHandler) {
      window.jotformEmbedHandler(`iframe[id='${iframeId}']`, 'https://form.jotform.com');
    }
  }, [src, iframeId]);

  // Jotform's embed handler posts a message to the parent window when the
  // form is submitted (message shape is undocumented/internal to Jotform, so
  // we guard defensively: verify the origin, require the exact
  // "submission-completed" action, match this form's ID, and fire once).
  // Other messages (resize, page-change on multi-page forms, etc.) are
  // ignored.
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!JOTFORM_ORIGINS.includes(event.origin)) return;
      let data: unknown = event.data;
      if (typeof data === 'string' && data.startsWith('{')) {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data || typeof data !== 'object') return;
      const msg = data as { action?: string; formID?: string | number };
      if (msg.action !== 'submission-completed') return;
      if (String(msg.formID) !== formId) return;
      if (submittedRef.current) return;
      submittedRef.current = true;

      // No form values, only the practice and form id (no PHI).
      window.dataLayer?.push({
        event: gaEventName,
        practice: 'vbam',
        form_id: formId,
      });
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [formId, gaEventName]);

  // registration_start: Jotform does not post focus/start messages to the
  // parent, so use the browser's own signal. When the user first clicks or
  // tabs into the cross-origin iframe, the parent window blurs and
  // document.activeElement becomes that iframe. Fires once, no form data.
  useEffect(() => {
    function handleBlur() {
      if (startedRef.current) return;
      const active = document.activeElement;
      if (!active || active.id !== iframeId) return;
      startedRef.current = true;
      window.dataLayer?.push({
        event: startEventName,
        practice: 'vbam',
        form_id: formId,
      });
    }
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [iframeId, formId, startEventName]);

  return (
    <>
      {src ? (
        <iframe
          id={iframeId}
          title={title}
          src={src}
          allow="geolocation; microphone; camera; fullscreen"
          allowFullScreen
          scrolling="no"
          style={{
            minWidth: '100%',
            maxWidth: '100%',
            height: IFRAME_HEIGHT,
            border: 'none',
            display: 'block',
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            minWidth: '100%',
            maxWidth: '100%',
            height: IFRAME_HEIGHT,
          }}
        />
      )}
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.jotformEmbedHandler) {
            window.jotformEmbedHandler(`iframe[id='${iframeId}']`, 'https://form.jotform.com');
          }
        }}
      />
    </>
  );
}
