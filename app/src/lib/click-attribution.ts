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
 * Returns all stored, non-expired click/campaign params keyed by their plain
 * name (e.g. `{ gclid: '...' }`). Expired entries (older than the TTL) are
 * removed as they're encountered.
 */
export function getClickParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const result: Record<string, string> = {};

  for (const param of CLICK_PARAMS) {
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
