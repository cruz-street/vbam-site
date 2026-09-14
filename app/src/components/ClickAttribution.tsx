'use client';

import { useEffect } from 'react';
import { captureClickParams, captureLandingReferrer } from '@/lib/click-attribution';

/**
 * Mounted once in the root layout so it runs on every landing page. Captures
 * gclid, utm_source, and other click params off the URL, plus the referring
 * site's origin (document.referrer) for traffic with no UTM tag at all — a
 * bare link in an Instagram/Facebook caption, for example. All into
 * localStorage on mount so a later visit to the new-patient registration
 * form (a different page) can still see them. Renders nothing.
 */
export default function ClickAttribution() {
  useEffect(() => {
    captureClickParams();
    captureLandingReferrer();
  }, []);

  return null;
}
