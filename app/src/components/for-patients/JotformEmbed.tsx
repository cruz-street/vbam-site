'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getClickParams } from '@/lib/click-attribution';

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

/** Matches the height the iframe renders at, so the placeholder holds the
 * page's layout steady while the src is resolved. */
const IFRAME_HEIGHT = 600;

export default function JotformEmbed({ formUrl, formId, title = 'New Patient Registration' }: Props) {
  const iframeId = `JotFormIFrame-${formId}`;

  // Resolved once on mount from stored click params, then held in state.
  // The iframe only ever renders with its final src — never the bare
  // formUrl first — so it never reloads and double-counts a submission.
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(formUrl);
    const clickParams = getClickParams();
    for (const [param, value] of Object.entries(clickParams)) {
      url.searchParams.set(param, value);
    }
    // Deliberately effectful: getClickParams() reads localStorage, a browser
    // API unavailable at render time under SSR/static export. The iframe must
    // not render until this resolves (see the placeholder below) — rendering
    // the bare formUrl first and swapping src afterward would reload the
    // iframe and double-count the submission.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrc(url.toString());
  }, [formUrl]);

  useEffect(() => {
    // Covers the case where the embed handler script finished loading before
    // the iframe above existed (src was still resolving) — its onLoad below
    // would have found nothing to attach to.
    if (src && typeof window !== 'undefined' && window.jotformEmbedHandler) {
      window.jotformEmbedHandler(`iframe[id='${iframeId}']`, 'https://form.jotform.com');
    }
  }, [src, iframeId]);

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
