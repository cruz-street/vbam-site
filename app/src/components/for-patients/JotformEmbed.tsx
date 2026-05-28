'use client';

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

export default function JotformEmbed({ formUrl, formId, title = 'New Patient Registration' }: Props) {
  const iframeId = `JotFormIFrame-${formId}`;
  return (
    <>
      <iframe
        id={iframeId}
        title={title}
        src={formUrl}
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
