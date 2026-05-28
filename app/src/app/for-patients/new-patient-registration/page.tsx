import type { Metadata } from 'next';
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
  const { hero, reassurance, formUrl, formId, fallback } = NEW_PATIENT_REGISTRATION;
  const formReady = formUrl && formId;

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

        </div>
      </section>
    </main>
  );
}
