'use client';

import { useEffect } from 'react';
import { CONTACT_CARD } from '@/lib/contact';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * One sitewide listener for the "Save us to your contacts" link. Pushes a
 * dataLayer event; GTM forwards it to GA4. Counts taps on the link, not
 * confirmed saves (the phone never tells the site whether the card was added).
 * Sends nothing about the person. Renders nothing.
 */
export default function ContactCardTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href]');
      if (!a || a.getAttribute('href') !== CONTACT_CARD.href) return;
      window.dataLayer?.push({
        event: 'save_contact_card',
        link_location: a.closest('dialog') ? 'contact_popup' : 'page_body',
        page_path: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
