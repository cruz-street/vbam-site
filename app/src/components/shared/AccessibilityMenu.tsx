'use client';

import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'vbam-a11y';

type Settings = {
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
};

const DEFAULTS: Settings = { largeText: false, highContrast: false, reduceMotion: false };

function readStored(): Settings {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return {
      largeText: !!parsed.largeText,
      highContrast: !!parsed.highContrast,
      reduceMotion: !!parsed.reduceMotion,
    };
  } catch {
    return DEFAULTS;
  }
}

function applyToRoot(s: Settings) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('a11y-large-text', s.largeText);
  root.classList.toggle('a11y-high-contrast', s.highContrast);
  root.classList.toggle('a11y-reduce-motion', s.reduceMotion);
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between gap-3 py-2.5 px-1 text-left"
    >
      <span className="font-inter font-[400] text-vbam-atlantic" style={{ fontSize: 14 }}>
        {label}
      </span>
      <span
        aria-hidden="true"
        className="relative inline-flex flex-shrink-0 rounded-full transition-colors"
        style={{
          width: 36,
          height: 20,
          background: checked ? 'var(--color-vbam-coral)' : 'rgba(10,61,74,0.18)',
        }}
      >
        <span
          className="absolute top-[2px] bg-white rounded-full transition-transform"
          style={{
            width: 16,
            height: 16,
            transform: checked ? 'translateX(18px)' : 'translateX(2px)',
          }}
        />
      </span>
    </button>
  );
}

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = readStored();
    setSettings(stored);
    applyToRoot(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    applyToRoot(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore (private mode / storage full)
    }
  };

  const reset = () => {
    setSettings(DEFAULTS);
    applyToRoot(DEFAULTS);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const anyOn = settings.largeText || settings.highContrast || settings.reduceMotion;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-label="Accessibility settings"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-center rounded-full text-vbam-atlantic hover:bg-vbam-atlantic/[.06] transition-colors"
        style={{ width: 36, height: 36 }}
        title="Accessibility settings"
      >
        {/* Universal accessibility icon — person with arms out */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4" r="1.6" fill="currentColor" stroke="none" />
          <path d="M5 9h14" />
          <path d="M12 9v5" />
          <path d="M9 21l3-7 3 7" />
        </svg>
        {hydrated && anyOn && (
          <span
            aria-hidden="true"
            className="absolute top-[7px] right-[7px] rounded-full bg-vbam-coral"
            style={{ width: 6, height: 6 }}
          />
        )}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Accessibility settings"
          className="absolute right-0 top-full mt-2 bg-white border border-vbam-atlantic/[.12] rounded-lg z-50"
          style={{ width: 240, padding: '10px 14px 8px', boxShadow: '0 4px 16px rgba(10,61,74,.08)' }}
        >
          <p
            className="font-archivo font-[700] text-vbam-atlantic/55"
            style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}
          >
            Accessibility
          </p>
          <Toggle label="Larger text" checked={settings.largeText} onChange={v => update({ largeText: v })} />
          <Toggle label="High contrast" checked={settings.highContrast} onChange={v => update({ highContrast: v })} />
          <Toggle label="Reduce motion" checked={settings.reduceMotion} onChange={v => update({ reduceMotion: v })} />
          {anyOn && (
            <button
              type="button"
              onClick={reset}
              className="block w-full text-left font-inter text-vbam-coral hover:text-vbam-inlet transition-colors"
              style={{ fontSize: 12, padding: '8px 1px 4px', borderTop: '1px solid rgba(10,61,74,.08)', marginTop: 6 }}
            >
              Reset to defaults
            </button>
          )}
        </div>
      )}
    </div>
  );
}
