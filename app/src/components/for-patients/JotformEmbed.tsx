'use client';

import { useSyncExternalStore } from 'react';
import Script from 'next/script';

interface Props {
  formUrl: string;
  formId: string;
  title?: string;
}

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, origin: string) => void;
  }
}

/**
 * Campaign params we forward from the page URL into the Jotform iframe.
 *
 * An iframe does not inherit its parent page's query string, so a visitor who
 * lands on /for-patients/new-patient-registration/?utm_campaign=labor-day-2026
 * submits a form that has no idea where they came from. Forwarding these onto
 * the iframe src prefills matching hidden fields inside the form, so the
 * attribution lands in the submission record itself rather than only in GA4.
 *
 * This is an allowlist on purpose: passing the whole query string through would
 * let anyone craft a link that prefills arbitrary fields on a HIPAA form.
 * Jotform ignores any param that does not match a field's unique name, so
 * adding a hidden field named after one of these is all it takes to capture it.
 */
const FORWARDED_PARAMS = [
  'source',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
] as const;

/** Guards against a stray long value making the iframe URL unreasonable. */
const MAX_PARAM_LENGTH = 100;

function withCampaignParams(formUrl: string, search: string): string {
  const incoming = new URLSearchParams(search);
  const carried = FORWARDED_PARAMS.flatMap((key) => {
    const value = incoming.get(key);
    return value && value.length <= MAX_PARAM_LENGTH ? [[key, value] as const] : [];
  });

  if (carried.length === 0) return formUrl;

  // Preserve any params already on the configured form URL (Decap-editable, so
  // it may legitimately carry its own).
  const url = new URL(formUrl);
  for (const [key, value] of carried) url.searchParams.set(key, value);
  return url.toString();
}

/** The URL is fixed for the life of the page — nothing to subscribe to. */
const subscribeNever = () => () => {};

export default function JotformEmbed({ formUrl, formId, title = 'New Patient Registration' }: Props) {
  const iframeId = `JotFormIFrame-${formId}`;

  // The query string is a browser-only value, so it is read through
  // useSyncExternalStore: the server/hydration snapshot is the bare form URL
  // (identical to the prerendered HTML, so no hydration mismatch), and the
  // client snapshot carries the campaign params. Never changes after load,
  // hence the no-op subscribe. Visitors arriving with no campaign params get
  // the same string from both snapshots and never incur a second iframe load.
  const src = useSyncExternalStore(
    subscribeNever,
    () => withCampaignParams(formUrl, window.location.search),
    () => formUrl,
  );

  return (
    <>
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
          height: 600,
          border: 'none',
          display: 'block',
        }}
      />
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
