'use client';

import { useEffect } from 'react';
import { captureClickParams } from '@/lib/click-attribution';

/**
 * Mounted once in the root layout so it runs on every landing page. Captures
 * gclid, utm_source, and other click params off the URL into localStorage on
 * mount so a later visit to the new-patient registration form (a different
 * page) can still see them. Renders nothing.
 */
export default function ClickAttribution() {
  useEffect(() => {
    captureClickParams();
  }, []);

  return null;
}
