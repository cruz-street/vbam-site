// Ad-click attribution capture. Google Ads (and Bing/other) clicks land on
// this site with a click ID / campaign param on the URL, but the new-patient
// registration form lives on a different page and an iframe does not inherit
// its parent's query string. This module bridges the gap: capture on the
// landing page, persist in localStorage, read back wherever the form is.
//
// None of this is PHI — a click ID identifies an ad click, not a patient.
//
// Note: utm_source=verobeachpediatrics arrives intentionally on VBP crosslink
// traffic and must be captured like any other value, not filtered out — it is
// how a VBP-family-turned-adult-patient gets identified later.

const STORAGE_PREFIX = 'cs_attr_';

/** 90 days — long enough to span a considered decision, then it expires. */
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

export const CLICK_PARAMS = [
  'gclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

/**
 * Not a URL param — captured from document.referrer instead. Covers organic
 * traffic that was never going to carry a UTM tag (a bare link in an
 * Instagram/Facebook caption reads badly with a query string appended), by
 * recording which external site sent the click. Stores the origin only
 * (e.g. "https://m.facebook.com"), matching how GA4 already classifies this
 * traffic as "facebook.com / referral" — not the full referrer URL, which
 * can carry long platform-internal tracking paths we don't need.
 */
const REFERRER_PARAM = 'landing_referrer';

interface StoredParam {
  v: string;
  t: number;
}

function storageKey(param: string): string {
  return `${STORAGE_PREFIX}${param}`;
}

/**
 * Reads click/campaign params off the current URL and stores each present,
 * non-empty value in localStorage. Only overwrites a param when the URL
 * actually carries a new value for it — a later visit with no gclid must not
 * wipe out an earlier captured one.
 */
export function captureClickParams(): void {
  if (typeof window === 'undefined') return;

  let search: URLSearchParams;
  try {
    search = new URLSearchParams(window.location.search);
  } catch {
    return;
  }

  for (const param of CLICK_PARAMS) {
    const value = search.get(param);
    if (!value) continue;

    const record: StoredParam = { v: value, t: Date.now() };
    try {
      window.localStorage.setItem(storageKey(param), JSON.stringify(record));
    } catch {
      // Storage unavailable (private window, blocked site data, quota) — skip.
    }
  }
}

/**
 * Captures the referring site's origin from document.referrer, if the visit
 * arrived from an external domain. Only stored once per TTL window — a later
 * internal navigation between pages on this site would otherwise overwrite
 * the real entry referrer with our own domain, since document.referrer is
 * set on every page load, not just the first one.
 */
export function captureLandingReferrer(): void {
  if (typeof window === 'undefined') return;

  const referrer = document.referrer;
  if (!referrer) return;

  let referrerOrigin: string;
  try {
    const referrerUrl = new URL(referrer);
    if (referrerUrl.hostname === window.location.hostname) return;
    referrerOrigin = referrerUrl.origin;
  } catch {
    return;
  }

  const key = storageKey(REFERRER_PARAM);
  try {
    if (window.localStorage.getItem(key)) return;
    const record: StoredParam = { v: referrerOrigin, t: Date.now() };
    window.localStorage.setItem(key, JSON.stringify(record));
  } catch {
    // Storage unavailable (private window, blocked site data, quota) — skip.
  }
}

/**
 * Returns all stored, non-expired click/campaign params keyed by their plain
 * name (e.g. `{ gclid: '...' }`), plus `landing_referrer` if one was
 * captured. Expired entries (older than the TTL) are removed as they're
 * encountered.
 */
export function getClickParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const result: Record<string, string> = {};

  for (const param of [...CLICK_PARAMS, REFERRER_PARAM]) {
    const key = storageKey(param);
    let raw: string | null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      continue;
    }
    if (!raw) continue;

    let record: StoredParam;
    try {
      record = JSON.parse(raw) as StoredParam;
    } catch {
      removeItem(key);
      continue;
    }

    if (typeof record.v !== 'string' || typeof record.t !== 'number') {
      removeItem(key);
      continue;
    }

    if (Date.now() - record.t > TTL_MS) {
      removeItem(key);
      continue;
    }

    result[param] = record.v;
  }

  return result;
}

function removeItem(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage unavailable — nothing to clean up.
  }
}

// Device/browser context for the Jotform submission. Unlike the click params
// above, this isn't captured on the landing page and persisted — it's read
// fresh from navigator.userAgent right when the form src is resolved, so it
// always reflects the device actually submitting, not whatever device first
// landed on the site. Kept as simple string matching (no UA-parsing
// dependency) — good enough to tell "was this a mobile Safari submission,"
// not a precise device/browser database.
export type DeviceCategory = 'mobile' | 'tablet' | 'desktop';
export type BrowserFamily =
  | 'Safari'
  | 'Chrome'
  | 'Firefox'
  | 'Edge'
  | 'Samsung'
  | 'other';

export function getDeviceAndBrowser(): {
  device_category: DeviceCategory;
  browser_family: BrowserFamily;
} {
  if (typeof navigator === 'undefined') {
    return { device_category: 'desktop', browser_family: 'other' };
  }
  const ua = navigator.userAgent;

  let device_category: DeviceCategory = 'desktop';
  if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) {
    device_category = 'tablet';
  } else if (/Mobi|iPhone|Android/i.test(ua)) {
    device_category = 'mobile';
  }

  // Order matters: Edge, Samsung Internet, and Chrome-on-iOS (CriOS) all also
  // carry "Chrome" and/or "Safari" tokens in their UA strings, so the more
  // specific browsers must be checked first.
  let browser_family: BrowserFamily = 'other';
  if (/SamsungBrowser/i.test(ua)) {
    browser_family = 'Samsung';
  } else if (/Edg\//i.test(ua)) {
    browser_family = 'Edge';
  } else if (/Firefox\//i.test(ua)) {
    browser_family = 'Firefox';
  } else if (/CriOS|Chrome\//i.test(ua)) {
    browser_family = 'Chrome';
  } else if (/Safari\//i.test(ua)) {
    browser_family = 'Safari';
  }

  return { device_category, browser_family };
}
