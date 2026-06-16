import type { Metadata } from 'next';
import ScrollReveal from '@/components/shared/ScrollReveal';
import {
  VIRTUAL_CARE_HERO,
  VIRTUAL_CARE_ACCESS,
  VIRTUAL_CARE_TUESDAY,
  VIRTUAL_CARE_SETUP,
  VIRTUAL_CARE_TIPS,
  VIRTUAL_CARE_HELP_CTA,
} from '@/content/virtual-care';

export const metadata: Metadata = {
  title: 'Virtual Care',
  description:
    'When our office is closed for doctor visits — after hours, on weekends, and on Tuesdays — an on-call Vero Beach Adult Medicine physician is still within reach by phone or video through Privia Virtual Clinic.',
  alternates: { canonical: 'https://verobeachadultmedicine.com/virtual-care/' },
};

// ── SVG icons ────────────────────────────────────────────────────────────────

function IconPhone() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M10.5 17.5h3" />
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconCard() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function IconBattery() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <path d="M22 11v2" strokeWidth="2.4" />
      <rect x="4" y="9" width="8" height="6" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconWindow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 9h20" />
      <circle cx="5.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const TIP_ICONS = [
  <IconCard key="card" />,
  <IconBattery key="battery" />,
  <IconWifi key="wifi" />,
  <IconSun key="sun" />,
  <IconClock key="clock" />,
  <IconWindow key="window" />,
];

// ── Permission prompt illustrations ──────────────────────────────────────────

function MobilePermissionMockup({ note }: { note: string }) {
  return (
    <div>
      <div
        role="img"
        aria-label="Example of a phone permission dialog asking to allow camera access"
        className="mx-auto rounded-2xl border border-vbam-atlantic/[.10] overflow-hidden"
        style={{ maxWidth: 260, background: 'rgba(255,255,255,0.92)', boxShadow: '0 4px 24px -8px rgba(10,61,74,.12)' }}
      >
        {/* Camera permission dialog */}
        <div className="p-5 text-center border-b border-vbam-atlantic/[.08]">
          <div
            aria-hidden="true"
            className="rounded-xl mx-auto mb-3 flex items-center justify-center"
            style={{ width: 44, height: 44, background: 'var(--grad-sunrise)', opacity: 0.85 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
          </div>
          <p className="font-inter font-[600] text-vbam-atlantic" style={{ fontSize: 14, lineHeight: 1.4, marginBottom: 4 }}>
            &ldquo;Privia Health&rdquo; Would Like to Access Your Camera
          </p>
          <p className="font-inter font-[300] text-vbam-atlantic/50" style={{ fontSize: 12, lineHeight: 1.5 }}>
            Required for your virtual visit
          </p>
        </div>
        <div className="grid grid-cols-2 divide-x divide-vbam-atlantic/[.08]">
          <div className="py-3 text-center font-inter text-vbam-atlantic/50" style={{ fontSize: 14 }}>
            Don&rsquo;t Allow
          </div>
          <div className="py-3 text-center font-inter font-[600] text-vbam-inlet" style={{ fontSize: 14 }}>
            OK ←
          </div>
        </div>
      </div>
      <p className="font-inter font-[300] text-vbam-atlantic/50 text-center mt-3" style={{ fontSize: 12, lineHeight: 1.5 }}>
        {note}
      </p>
    </div>
  );
}

function DesktopPermissionMockup({ note }: { note: string }) {
  return (
    <div>
      <div
        role="img"
        aria-label="Example of a browser permission popup asking to allow camera and microphone access"
        className="mx-auto rounded-lg border border-vbam-atlantic/[.10] overflow-hidden"
        style={{ maxWidth: 320, background: '#F9F9F9', boxShadow: '0 4px 24px -8px rgba(10,61,74,.12)' }}
      >
        {/* Browser address bar */}
        <div
          className="flex items-center gap-2 px-3 border-b border-vbam-atlantic/[.08]"
          style={{ height: 36, background: '#EFEFEF' }}
        >
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5FB3C0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-inter text-vbam-atlantic/50 flex-1 truncate" style={{ fontSize: 11 }}>
            care.myprivia.com
          </span>
          <div aria-hidden="true" className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="rounded-full bg-vbam-atlantic/[.12]" style={{ width: 10, height: 10 }} />
            ))}
          </div>
        </div>
        {/* Permission popup */}
        <div className="p-4">
          <div className="flex gap-3 mb-4">
            <div aria-hidden="true" className="flex gap-1.5 shrink-0 mt-0.5">
              <div className="rounded-full bg-vbam-atlantic/[.12] flex items-center justify-center" style={{ width: 28, height: 28 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A3D4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              </div>
              <div className="rounded-full bg-vbam-atlantic/[.12] flex items-center justify-center" style={{ width: 28, height: 28 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A3D4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>
            </div>
            <div>
              <p className="font-inter font-[500] text-vbam-atlantic" style={{ fontSize: 12, lineHeight: 1.45, marginBottom: 2 }}>
                care.myprivia.com wants to use your camera and microphone
              </p>
              <p className="font-inter font-[300] text-vbam-atlantic/45" style={{ fontSize: 11 }}>
                Required for your virtual visit
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <span
              className="font-inter font-[500] text-vbam-atlantic/55 border border-vbam-atlantic/[.15] rounded"
              style={{ fontSize: 11, padding: '5px 12px' }}
            >
              Block
            </span>
            <span
              className="font-inter font-[600] rounded"
              style={{ fontSize: 11, padding: '5px 12px', background: 'var(--color-vbam-atlantic)', color: 'var(--color-vbam-foam)' }}
            >
              Allow ←
            </span>
          </div>
        </div>
      </div>
      <p className="font-inter font-[300] text-vbam-atlantic/50 text-center mt-3" style={{ fontSize: 12, lineHeight: 1.5 }}>
        {note}
      </p>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VirtualCarePage() {
  return (
    <main>

      {/* ── Hero ─── */}
      <section
        className="bg-vbam-sand text-center"
        style={{ paddingTop: 'clamp(110px, 12vw, 160px)', paddingBottom: 'clamp(40px, 6vw, 72px)' }}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 22 }}>
              {VIRTUAL_CARE_HERO.eyebrow}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h1
              className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
              style={{ fontSize: 'clamp(38px, 6vw, 72px)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 760 }}
            >
              {VIRTUAL_CARE_HERO.heading}
              <br />
              <em className="font-cormorant italic text-grad-sunrise">{VIRTUAL_CARE_HERO.headingItalic}</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="font-inter font-[300] text-vbam-atlantic/70 mx-auto" style={{ fontSize: 18, lineHeight: 1.65, maxWidth: 560, marginTop: 20, marginBottom: 28 }}>
              {VIRTUAL_CARE_HERO.subhead}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={170}>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={VIRTUAL_CARE_ACCESS.callHref}
                className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full"
                style={{ fontSize: 16, padding: '16px 36px' }}
              >
                {VIRTUAL_CARE_ACCESS.callLabel}
              </a>
              <a
                href={VIRTUAL_CARE_ACCESS.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${VIRTUAL_CARE_ACCESS.ctaLabel} — opens in new tab`}
                className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors inline-flex items-center gap-2 rounded-full"
                style={{ fontSize: 16, padding: '16px 36px', background: 'rgba(245,241,232,.5)' }}
              >
                {VIRTUAL_CARE_ACCESS.ctaLabel}
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={210}>
            <p className="font-inter font-[300] text-vbam-atlantic/45 mx-auto" style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 440, marginTop: 16 }}>
              {VIRTUAL_CARE_HERO.note}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How Virtual Care Works (the warm path) ─── */}
      <section className="bg-vbam-foam" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="text-center max-w-[760px] mx-auto">
            <ScrollReveal>
              <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 22 }}>
                {VIRTUAL_CARE_ACCESS.eyebrow}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic mx-auto" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.018em', marginBottom: 24 }}>
                {VIRTUAL_CARE_ACCESS.heading}{' '}
                <em className="font-cormorant italic text-grad-sunrise">{VIRTUAL_CARE_ACCESS.headingItalic}</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82] mx-auto" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 16 }}>
                {VIRTUAL_CARE_ACCESS.body1}
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={130}>
            <p className="font-cormorant italic text-vbam-inlet text-center" style={{ fontSize: 24, lineHeight: 1.5, marginBottom: 48 }}>
              {VIRTUAL_CARE_ACCESS.body2}
            </p>
          </ScrollReveal>

          {/* Three-step path */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {VIRTUAL_CARE_ACCESS.steps.map((step, i) => (
              <ScrollReveal key={step.label} animation="left" delay={i * 90}>
                <div
                  className="rounded-xl border border-vbam-atlantic/[.08] h-full relative"
                  style={{ background: '#FAF7EC', padding: 'clamp(26px, 3.5vw, 36px)' }}
                >
                  <span
                    aria-hidden="true"
                    className="font-archivo font-[700] text-vbam-coral block"
                    style={{ fontSize: 12, letterSpacing: '0.12em', marginBottom: 14 }}
                  >
                    STEP {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 21, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.01em' }}>
                    {step.label}
                  </h3>
                  <p className="font-inter font-[300] text-vbam-atlantic/[.78]" style={{ fontSize: 15, lineHeight: 1.65 }}>
                    {step.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Cost note + CTAs */}
          <div className="text-center max-w-[760px] mx-auto">
            <ScrollReveal delay={120}>
              <div
                className="mx-auto rounded-lg border border-vbam-atlantic/[.10] flex items-start gap-3"
                style={{ marginTop: 48, padding: '14px 18px', background: 'rgba(232,220,200,.35)', maxWidth: 560 }}
              >
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-vbam-atlantic/40 shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="font-inter font-[300] text-vbam-atlantic/60 text-left" style={{ fontSize: 13, lineHeight: 1.6 }}>
                  {VIRTUAL_CARE_ACCESS.costNote}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="flex gap-3 justify-center flex-wrap" style={{ marginTop: 28 }}>
                <a
                  href={VIRTUAL_CARE_ACCESS.callHref}
                  className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full"
                  style={{ fontSize: 14, padding: '13px 26px' }}
                >
                  {VIRTUAL_CARE_ACCESS.callLabel}
                </a>
                <a
                  href={VIRTUAL_CARE_ACCESS.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${VIRTUAL_CARE_ACCESS.ctaLabel} — opens in new tab`}
                  className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors inline-flex items-center gap-2 rounded-full"
                  style={{ fontSize: 14, padding: '13px 26px', background: 'rgba(245,241,232,.6)' }}
                >
                  {VIRTUAL_CARE_ACCESS.ctaLabel}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Tuesdays (decision frame) ─── */}
      <section className="bg-vbam-sand border-t border-vbam-atlantic/[.06]" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <div>
            <ScrollReveal>
              <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                {VIRTUAL_CARE_TUESDAY.eyebrow}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 14 }}>
                {VIRTUAL_CARE_TUESDAY.heading}{' '}
                <em className="font-cormorant italic text-grad-sunrise">{VIRTUAL_CARE_TUESDAY.headingItalic}</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={90}>
              <p className="font-inter font-[300] text-vbam-atlantic/[.78]" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 600, marginBottom: 44 }}>
                {VIRTUAL_CARE_TUESDAY.intro}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y divide-vbam-atlantic/[.12] md:divide-y-0 md:divide-x">
            {VIRTUAL_CARE_TUESDAY.options.map((opt, i) => {
              const colPad = i === 0 ? 'py-8 md:py-0 md:pr-14' : i === 2 ? 'pt-8 md:pt-0 md:pl-14' : 'py-8 md:py-0 md:px-14';
              return (
                <ScrollReveal key={opt.label} delay={i * 80}>
                  <div className={`flex flex-col gap-4 ${colPad}`}>
                    <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 19, lineHeight: 1.25, letterSpacing: '-0.005em' }}>
                      {opt.label}
                    </h3>
                    <p className="font-inter font-[300] text-vbam-atlantic/[.78]" style={{ fontSize: 15, lineHeight: 1.65 }}>
                      {opt.body}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={120}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6" style={{ marginTop: 40 }}>
              <a
                href={VIRTUAL_CARE_TUESDAY.callHref}
                className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors inline-flex items-center gap-2 rounded-full shrink-0"
                style={{ fontSize: 14, padding: '13px 26px', background: 'rgba(245,241,232,.6)' }}
              >
                {VIRTUAL_CARE_TUESDAY.callLabel} →
              </a>
              <p className="font-cormorant italic text-vbam-atlantic/75 text-center sm:text-left" style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 560 }}>
                {VIRTUAL_CARE_TUESDAY.note}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Before Your Visit ─── */}
      <section className="bg-vbam-foam border-t border-vbam-atlantic/[.06]" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

          {/* Section header */}
          <ScrollReveal>
            <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
              {VIRTUAL_CARE_SETUP.eyebrow}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 14, maxWidth: 680 }}>
              {VIRTUAL_CARE_SETUP.heading}{' '}
              <em className="font-cormorant italic text-grad-sunrise">{VIRTUAL_CARE_SETUP.headingItalic}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <p className="font-inter font-[300] text-vbam-atlantic/[.75]" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 640, marginBottom: 48 }}>
              {VIRTUAL_CARE_SETUP.intro}
            </p>
          </ScrollReveal>

          {/* Two-column: Mobile | Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* Mobile card */}
            <ScrollReveal animation="left">
              <div
                className="rounded-xl border border-vbam-atlantic/[.08] h-full"
                style={{ background: '#FAF7EC', padding: 'clamp(28px, 4vw, 40px)' }}
              >
                {/* Platform header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center text-vbam-coral"
                    style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(238,119,82,0.08)', border: '1px solid rgba(238,119,82,0.20)', flexShrink: 0 }}
                  >
                    <IconPhone />
                  </div>
                  <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 20, lineHeight: 1.2 }}>
                    {VIRTUAL_CARE_SETUP.mobile.label}
                  </h3>
                </div>

                {/* Steps */}
                <ol className="space-y-4" style={{ marginBottom: 36 }}>
                  {VIRTUAL_CARE_SETUP.mobile.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="font-archivo font-[700] text-vbam-coral shrink-0"
                        style={{ fontSize: 11, minWidth: 20, marginTop: 2 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <span className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.6 }}>
                          {step}
                        </span>
                        {i === 0 && (
                          <div className="flex gap-2 flex-wrap mt-2">
                            <a
                              href={VIRTUAL_CARE_SETUP.mobile.appStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${VIRTUAL_CARE_SETUP.mobile.appStoreLabel} — opens in new tab`}
                              className="font-archivo font-[600] text-vbam-inlet border border-vbam-inlet/30 hover:border-vbam-inlet/60 hover:bg-vbam-inlet/[.04] transition-colors rounded-md inline-flex items-center gap-1.5"
                              style={{ fontSize: 11, letterSpacing: '0.04em', padding: '6px 13px' }}
                            >
                              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                              </svg>
                              {VIRTUAL_CARE_SETUP.mobile.appStoreLabel}
                            </a>
                            <a
                              href={VIRTUAL_CARE_SETUP.mobile.googlePlayUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${VIRTUAL_CARE_SETUP.mobile.googlePlayLabel} — opens in new tab`}
                              className="font-archivo font-[600] text-vbam-inlet border border-vbam-inlet/30 hover:border-vbam-inlet/60 hover:bg-vbam-inlet/[.04] transition-colors rounded-md inline-flex items-center gap-1.5"
                              style={{ fontSize: 11, letterSpacing: '0.04em', padding: '6px 13px' }}
                            >
                              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3.18 23.76c.3.17.64.22.99.14l12.45-7.19-2.71-2.71-10.73 9.76zM.54 1.18C.2 1.54 0 2.1 0 2.82v18.36c0 .72.2 1.28.54 1.64l.09.08 10.28-10.28v-.24L.63 2.1l-.09.08zM20.12 10.5l-2.94-1.7-3.03 3.03 3.03 3.03 2.96-1.71c.84-.49.84-1.17-.02-1.65zM3.18.24L15.63 7.43l-2.71 2.71L2.19.38c.3-.17.64-.22.99-.14z"/>
                              </svg>
                              {VIRTUAL_CARE_SETUP.mobile.googlePlayLabel}
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Permission prompt illustration */}
                <div className="border-t border-vbam-atlantic/[.08] pt-6">
                  <MobilePermissionMockup note={VIRTUAL_CARE_SETUP.mobile.permissionNote} />
                </div>
              </div>
            </ScrollReveal>

            {/* Desktop card */}
            <ScrollReveal animation="left" delay={100}>
              <div
                className="rounded-xl border border-vbam-atlantic/[.08] h-full"
                style={{ background: '#FAF7EC', padding: 'clamp(28px, 4vw, 40px)' }}
              >
                {/* Platform header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center text-vbam-coral"
                    style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(238,119,82,0.08)', border: '1px solid rgba(238,119,82,0.20)', flexShrink: 0 }}
                  >
                    <IconMonitor />
                  </div>
                  <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 20, lineHeight: 1.2 }}>
                    {VIRTUAL_CARE_SETUP.desktop.label}
                  </h3>
                </div>

                {/* Steps */}
                <ol className="space-y-4" style={{ marginBottom: 36 }}>
                  {VIRTUAL_CARE_SETUP.desktop.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="font-archivo font-[700] text-vbam-coral shrink-0"
                        style={{ fontSize: 11, minWidth: 20, marginTop: 2 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.6 }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                {/* Permission prompt illustration */}
                <div className="border-t border-vbam-atlantic/[.08] pt-6">
                  <DesktopPermissionMockup note={VIRTUAL_CARE_SETUP.desktop.permissionNote} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Helpful Tips ─── */}
      <section className="bg-vbam-sand border-t border-vbam-atlantic/[.06]" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
              {VIRTUAL_CARE_TIPS.eyebrow}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 40, maxWidth: 560 }}>
              {VIRTUAL_CARE_TIPS.heading}{' '}
              <em className="font-cormorant italic text-vbam-coral">{VIRTUAL_CARE_TIPS.headingItalic}</em>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIRTUAL_CARE_TIPS.items.map((tip, i) => (
              <ScrollReveal key={tip.label} animation="scale" delay={i * 70}>
                <div
                  className="relative overflow-hidden rounded-lg border border-vbam-atlantic/[.08] group transition-all duration-[250ms] hover:-translate-y-0.5 h-full"
                  style={{ background: '#FAF7EC', padding: '28px 24px' }}
                >
                  <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms]" style={{ background: 'var(--grad-sunrise)' }} />
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center text-vbam-coral"
                    style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(238,119,82,0.08)', border: '1px solid rgba(238,119,82,0.18)', marginBottom: 14 }}
                  >
                    {TIP_ICONS[i]}
                  </div>
                  <h3 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 18, lineHeight: 1.2, marginBottom: 8, letterSpacing: '-0.005em' }}>
                    {tip.label}
                  </h3>
                  <p className="font-inter font-[300] text-vbam-atlantic/75" style={{ fontSize: 14, lineHeight: 1.65 }}>
                    {tip.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Need Help / CTA ─── */}
      <section className="text-center" style={{ background: 'var(--grad-sunrise)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <p className="font-archivo font-[700] text-vbam-atlantic/55" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
              {VIRTUAL_CARE_HELP_CTA.eyebrow}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.018em', marginBottom: 14 }}>
              {VIRTUAL_CARE_HELP_CTA.heading}{' '}
              <em className="font-cormorant italic">{VIRTUAL_CARE_HELP_CTA.headingItalic}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="font-inter font-[300] text-vbam-atlantic/75 mx-auto" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}>
              {VIRTUAL_CARE_HELP_CTA.body}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={VIRTUAL_CARE_HELP_CTA.phoneHref}
                className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full"
                style={{ fontSize: 15, padding: '15px 32px' }}
              >
                {VIRTUAL_CARE_HELP_CTA.phoneLabel} →
              </a>
              <span
                className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 rounded-full inline-flex items-center"
                style={{ fontSize: 15, padding: '15px 32px', background: 'rgba(245,241,232,.45)', backdropFilter: 'blur(6px)' }}
              >
                {VIRTUAL_CARE_HELP_CTA.phone}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
