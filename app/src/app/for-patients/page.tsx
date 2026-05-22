import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FaqAccordion from '@/components/for-patients/FaqAccordion';
import { FOR_PATIENTS_HERO, NEW_PATIENT, NEW_PATIENT_CHECKLIST, VISIT_FLOW, INSURANCE, FOR_PATIENTS_CTA } from '@/content/for-patients';

export const metadata: Metadata = {
  title: 'For Patients',
  description: 'New patient information, accepted insurance, FAQs, and how to book your first appointment at Vero Beach Adult Medicine.',
  alternates: { canonical: 'https://vbadultmedicine.com/for-patients/' },
};

export default function ForPatientsPage() {
  return (
    <main>
      <PageHero
        eyebrow={FOR_PATIENTS_HERO.eyebrow}
        heading={FOR_PATIENTS_HERO.heading}
        headingItalic={FOR_PATIENTS_HERO.headingItalic}
        subhead={FOR_PATIENTS_HERO.subhead}
      />

      {/* ── New Patients + Insurance ─── */}
      <section className="bg-vbam-foam" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

          {/* New Patients */}
          <ScrollReveal animation="left">
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                {NEW_PATIENT.eyebrow}
              </p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 20 }}>
                {NEW_PATIENT.heading} <em className="font-cormorant italic text-grad-sunrise">{NEW_PATIENT.headingItalic}</em>
              </h2>
              <ul className="space-y-3" style={{ marginBottom: 28 }}>
                {NEW_PATIENT_CHECKLIST.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1.5 w-[5px] h-[5px] rounded-full bg-vbam-coral flex-shrink-0" />
                    <span className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.6 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-inter font-[300] text-vbam-atlantic/60" style={{ fontSize: 14, lineHeight: 1.65 }}>
                {NEW_PATIENT.note}
              </p>
            </div>
          </ScrollReveal>

          {/* Insurance */}
          <ScrollReveal animation="left" delay={100}>
            <div id="insurance" style={{ scrollMarginTop: 96 }}>
              <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                {INSURANCE.eyebrow}
              </p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 20 }}>
                {INSURANCE.heading} <em className="font-cormorant italic text-grad-sunrise">{INSURANCE.headingItalic}</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7" style={{ marginBottom: 24 }}>
                {INSURANCE.groups.map(group => (
                  <div key={group.label}>
                    <p
                      className="font-archivo font-[700] text-vbam-atlantic/55"
                      style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}
                    >
                      {group.label}
                    </p>
                    <ul className="space-y-2">
                      {group.plans.map(plan => (
                        <li key={plan} className="flex items-start gap-2.5">
                          <span aria-hidden="true" className="mt-2 w-[5px] h-[5px] rounded-full bg-vbam-coral flex-shrink-0" />
                          <span className="font-inter font-[400] text-vbam-atlantic/[.86]" style={{ fontSize: 14, lineHeight: 1.55 }}>
                            {plan}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {INSURANCE.selfPay && (
                <div className="border-t border-vbam-atlantic/[.10] pt-5" style={{ marginBottom: 18 }}>
                  <p
                    className="font-archivo font-[700] text-vbam-coral"
                    style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}
                  >
                    {INSURANCE.selfPay.label}
                  </p>
                  <p
                    className="font-inter font-[300] text-vbam-atlantic/75"
                    style={{ fontSize: 14, lineHeight: 1.6 }}
                  >
                    {INSURANCE.selfPay.note}
                  </p>
                </div>
              )}

              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                {INSURANCE.note}
              </p>
              <a href="tel:7725693212" className="font-archivo font-[700] text-vbam-coral hover:text-vbam-inlet transition-colors" style={{ fontSize: 14, letterSpacing: '0.04em' }}>
                (772) 569-3212
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ── How a Visit Works ─── */}
      <section className="bg-vbam-foam border-t border-vbam-atlantic/[.06]" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
              {VISIT_FLOW.eyebrow}
            </p>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 20, maxWidth: 720 }}>
              {VISIT_FLOW.heading} <em className="font-cormorant italic text-grad-sunrise">{VISIT_FLOW.headingItalic}</em>
            </h2>
            <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 720, marginBottom: 36 }}>
              {VISIT_FLOW.intro}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {VISIT_FLOW.steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 80}>
                <div className="flex gap-4">
                  <span aria-hidden="true" className="font-fraunces italic text-vbam-coral flex-shrink-0" style={{ fontSize: 22, lineHeight: 1, paddingTop: 2 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 6 }}>
                      {step.title}
                    </h3>
                    <p className="font-inter font-[300] text-vbam-atlantic/[.78]" style={{ fontSize: 14, lineHeight: 1.65 }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─── */}
      <section className="bg-vbam-sand" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic text-center" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 56 }}>
              Common <em className="font-cormorant italic text-grad-sunrise">questions.</em>
            </h2>
          </ScrollReveal>
          <FaqAccordion />
        </div>
      </section>

      {/* ── CTA ─── */}
      <section className="text-center" style={{ background: 'var(--grad-sunrise)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.018em', marginBottom: 14 }}>
              {FOR_PATIENTS_CTA.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/75 mx-auto" style={{ fontSize: 16, maxWidth: 480, marginBottom: 28 }}>
              {FOR_PATIENTS_CTA.subhead}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/contact/" className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
                {FOR_PATIENTS_CTA.cta1}
              </Link>
              <a href="tel:7725693212" className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full" style={{ fontSize: 14, padding: '14px 28px', background: 'rgba(245,241,232,.45)', backdropFilter: 'blur(6px)' }}>
                (772) 569-3212
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
