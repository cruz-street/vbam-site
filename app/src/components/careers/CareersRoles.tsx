'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import JotformEmbed from '@/components/for-patients/JotformEmbed';
import {
  CAREERS_ROLES,
  CAREERS_FORM_URL,
  CAREERS_FORM_ID,
  CAREERS_SOURCE,
  CAREERS_OTHER_ROLE_NOTE,
  CAREERS_EEO_LINE,
} from '@/content/careers';

export default function CareersRoles() {
  const [position, setPosition] = useState<string | null>(null);

  function handleApply(option: string) {
    setPosition(option);
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <section className="bg-vbam-foam" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAREERS_ROLES.map((role, i) => (
              <ScrollReveal key={role.key} animation="scale" delay={i * 70}>
                <div
                  className="relative overflow-hidden rounded-lg border border-vbam-atlantic/[.08] flex flex-col h-full"
                  style={{ background: '#FAF7EC', padding: '32px 26px' }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0"
                    style={{ height: 3, background: 'var(--grad-sunrise)' }}
                  />
                  <h2
                    className="font-fraunces font-[400] text-vbam-atlantic"
                    style={{ fontSize: 20, lineHeight: 1.2, marginBottom: 6, letterSpacing: '-0.005em' }}
                  >
                    {role.title}
                  </h2>
                  {role.subtitle && (
                    <p className="font-archivo font-[600] text-vbam-coral" style={{ fontSize: 12, marginBottom: 10 }}>
                      {role.subtitle}
                    </p>
                  )}
                  <p
                    className="font-inter font-[300] text-vbam-atlantic/75"
                    style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 14 }}
                  >
                    {role.summary}
                  </p>
                  <ul className="flex-1" style={{ marginBottom: 20 }}>
                    {role.bullets.map((b) => (
                      <li
                        key={b}
                        className="font-inter font-[300] text-vbam-atlantic/60 flex items-start gap-2"
                        style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 6 }}
                      >
                        <span aria-hidden style={{ marginTop: 2 }}>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleApply(role.option)}
                    className="btn-primary font-archivo font-[600] rounded-full transition-colors self-start"
                    style={{ fontSize: 13, padding: '11px 22px' }}
                  >
                    Apply
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vbam-sand" style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <p
              className="font-inter font-[300] text-vbam-atlantic/70 text-center"
              style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}
            >
              {CAREERS_OTHER_ROLE_NOTE}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div
              id="apply"
              className="bg-white"
              style={{ borderRadius: 12, padding: 4, border: '1px solid rgba(10,61,74,.08)', boxShadow: '0 1px 2px rgba(10,61,74,.04)', scrollMarginTop: 96 }}
            >
              <JotformEmbed
                formUrl={CAREERS_FORM_URL}
                formId={CAREERS_FORM_ID}
                title="Vero Beach Adult Medicine — Careers"
                extraParams={position ? { position, source: CAREERS_SOURCE } : { source: CAREERS_SOURCE }}
                gaEventName="careers_application_submit"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p
              className="font-inter font-[300] text-vbam-atlantic/50 text-center"
              style={{ fontSize: 13, lineHeight: 1.6, marginTop: 28 }}
            >
              {CAREERS_EEO_LINE}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
