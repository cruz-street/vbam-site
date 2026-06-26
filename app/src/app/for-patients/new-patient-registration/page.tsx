import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import JotformEmbed from '@/components/for-patients/JotformEmbed';
import { NEW_PATIENT_REGISTRATION } from '@/content/for-patients';

export const metadata: Metadata = {
  title: 'New Patient Registration',
  description: 'Register as a new patient at Vero Beach Adult Medicine. Secure, HIPAA-compliant online intake — finish before your first visit.',
  alternates: { canonical: 'https://verobeachadultmedicine.com/for-patients/new-patient-registration/' },
};

export default function NewPatientRegistrationPage() {
  const { hero, reassurance, formUrl, formId, fallback, pdfFallback, priviaForms } = NEW_PATIENT_REGISTRATION;
  const formReady = formUrl && formId;
  const pdfMailto = pdfFallback
    ? `mailto:${pdfFallback.emailTo}?subject=${encodeURIComponent(pdfFallback.emailSubject)}`
    : '';

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        headingItalic={hero.headingItalic}
        subhead={hero.subhead}
      />

      <section className="bg-vbam-foam" style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">

          <ScrollReveal>
            <div
              className="flex items-start gap-3 border-l-2 border-vbam-coral"
              style={{ background: 'rgba(238,119,82,0.06)', padding: '14px 18px', borderRadius: '0 8px 8px 0', marginBottom: 36 }}
            >
              <svg
                aria-hidden="true"
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
                className="text-vbam-coral flex-shrink-0 mt-0.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 14, lineHeight: 1.6 }}>
                {reassurance}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div
              className="bg-white"
              style={{ borderRadius: 12, padding: 4, border: '1px solid rgba(10,61,74,.08)', boxShadow: '0 1px 2px rgba(10,61,74,.04)' }}
            >
              {formReady ? (
                <JotformEmbed formUrl={formUrl} formId={formId} title="VBAM New Patient Registration" />
              ) : (
                <div className="text-center" style={{ padding: 'clamp(36px, 6vw, 64px) 24px' }}>
                  <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 26, lineHeight: 1.2, marginBottom: 14 }}>
                    {fallback.heading}
                  </h2>
                  <p className="font-inter font-[300] text-vbam-atlantic/[.78] mx-auto" style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 520, marginBottom: 22 }}>
                    {fallback.body}
                  </p>
                  <a
                    href={fallback.phoneHref}
                    className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full"
                    style={{ fontSize: 14, padding: '12px 24px' }}
                  >
                    Call {fallback.phone}
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>

          {pdfFallback && (
            <ScrollReveal delay={140}>
              <div
                className="bg-vbam-sand/60 border border-vbam-atlantic/[.08]"
                style={{ borderRadius: 12, padding: 'clamp(24px, 4vw, 36px)', marginTop: 48 }}
              >
                <p
                  className="font-archivo font-[700] text-vbam-coral"
                  style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}
                >
                  {pdfFallback.eyebrow}
                </p>
                <h3
                  className="font-fraunces font-[400] text-vbam-atlantic"
                  style={{ fontSize: 'clamp(22px, 2.8vw, 28px)', lineHeight: 1.2, letterSpacing: '-0.012em', marginBottom: 14 }}
                >
                  {pdfFallback.heading}
                </h3>
                <p
                  className="font-inter font-[300] text-vbam-atlantic/[.82]"
                  style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 22, maxWidth: 640 }}
                >
                  {pdfFallback.intro}
                </p>

                <p
                  className="font-archivo font-[700] text-vbam-atlantic/65"
                  style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}
                >
                  {pdfFallback.requirementsLabel}
                </p>
                <ul className="space-y-2" style={{ marginBottom: pdfFallback.insuranceListLink ? 14 : 26 }}>
                  {pdfFallback.requirements.map((req: string) => (
                    <li key={req} className="flex items-start gap-3">
                      <svg
                        aria-hidden="true"
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                        className="text-vbam-coral flex-shrink-0 mt-[3px]"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-inter font-[400] text-vbam-atlantic/[.86]" style={{ fontSize: 15, lineHeight: 1.55 }}>
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>

                {pdfFallback.insuranceListLink && (
                  <div style={{ marginLeft: 27, marginBottom: 26 }}>
                    <Link
                      href={pdfFallback.insuranceListLink.href}
                      className="font-archivo font-[600] text-vbam-coral hover:text-vbam-inlet transition-colors"
                      style={{ fontSize: 13, letterSpacing: '0.02em' }}
                    >
                      {pdfFallback.insuranceListLink.label}
                    </Link>
                  </div>
                )}

                <div className="flex gap-3 flex-wrap" style={{ marginBottom: 22 }}>
                  {pdfFallback.pdfs.map((pdf: { label: string; href: string }) => (
                    <a
                      key={pdf.href}
                      href={pdf.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full inline-flex items-center gap-2"
                      style={{ fontSize: 13, padding: '11px 20px', background: 'rgba(255,255,255,0.6)' }}
                    >
                      <svg
                        aria-hidden="true"
                        width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {pdf.label}
                    </a>
                  ))}
                </div>

                <p
                  className="font-inter font-[300] text-vbam-atlantic/75"
                  style={{ fontSize: 14, lineHeight: 1.6 }}
                >
                  {pdfFallback.emailLine}{' '}
                  <a
                    href={pdfMailto}
                    className="font-archivo font-[700] text-vbam-coral hover:text-vbam-inlet transition-colors"
                    style={{ letterSpacing: '0.01em' }}
                  >
                    {pdfFallback.emailTo}
                  </a>
                  .
                </p>
              </div>
            </ScrollReveal>
          )}

          {priviaForms && (
            <ScrollReveal delay={160}>
              <div style={{ marginTop: 56 }}>
                <p
                  className="font-archivo font-[700] text-vbam-coral"
                  style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}
                >
                  {priviaForms.eyebrow}
                </p>
                <h3
                  className="font-fraunces font-[400] text-vbam-atlantic"
                  style={{ fontSize: 'clamp(22px, 2.8vw, 28px)', lineHeight: 1.2, letterSpacing: '-0.012em', marginBottom: 14 }}
                >
                  {priviaForms.heading}
                </h3>
                <p
                  className="font-inter font-[300] text-vbam-atlantic/[.82]"
                  style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 28, maxWidth: 640 }}
                >
                  {priviaForms.intro}
                </p>

                <ul className="border-t border-vbam-atlantic/[.10]">
                  {(priviaForms.items as Array<{ title: string; description: string; spanish?: string; href: string; linkLabel: string }>).map(item => (
                    <li
                      key={item.title}
                      className="border-b border-vbam-atlantic/[.10] flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6"
                      style={{ padding: '18px 0' }}
                    >
                      <div style={{ maxWidth: 540 }}>
                        <p className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 16, lineHeight: 1.3 }}>
                          {item.title}
                          {item.spanish && (
                            <em className="font-cormorant italic text-vbam-inlet/75 font-[400]" style={{ fontSize: 15 }}>
                              {' · '}{item.spanish}
                            </em>
                          )}
                        </p>
                        <p className="font-inter font-[300] text-vbam-atlantic/65" style={{ fontSize: 13.5, lineHeight: 1.6, marginTop: 4 }}>
                          {item.description}
                        </p>
                      </div>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-archivo font-[600] text-vbam-coral hover:text-vbam-inlet transition-colors flex-shrink-0 whitespace-nowrap self-start sm:mt-1"
                        style={{ fontSize: 12, letterSpacing: '0.04em' }}
                      >
                        {item.linkLabel} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}

        </div>
      </section>
    </main>
  );
}
