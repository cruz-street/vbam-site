import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { NEW_PATIENT_REGISTRATION } from '@/content/for-patients';
import { ADULT_PRIMARY_CARE_HERO, ADULT_PRIMARY_CARE_CTA } from '@/content/adult-primary-care';

export const metadata: Metadata = {
  title: 'Adult Primary Care',
  description: 'Vero Beach Adult Medicine and Vero Beach Pediatrics are one practice. Adult patients start here — book an appointment or register as a new patient.',
  alternates: { canonical: 'https://verobeachadultmedicine.com/adult-primary-care/' },
};

export default function AdultPrimaryCarePage() {
  return (
    <main>
      <PageHero
        heading={ADULT_PRIMARY_CARE_HERO.heading}
        headingItalic={ADULT_PRIMARY_CARE_HERO.headingItalic}
        subhead={ADULT_PRIMARY_CARE_HERO.subhead}
      />

      <section className="bg-vbam-foam text-center" style={{ padding: 'clamp(20px, 4vw, 56px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <div className="flex gap-3 justify-center flex-wrap" style={{ marginBottom: 28 }}>
              <Link
                href="/contact/"
                className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full"
                style={{ fontSize: 14, padding: '14px 28px' }}
              >
                {ADULT_PRIMARY_CARE_CTA.bookLabel} →
              </Link>
              <Link
                href="/for-patients/new-patient-registration/"
                className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full"
                style={{ fontSize: 14, padding: '14px 28px', background: 'rgba(245,241,232,.45)', backdropFilter: 'blur(6px)' }}
              >
                {NEW_PATIENT_REGISTRATION.buttonLabel}
              </Link>
              <a
                href="tel:7725693212"
                className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full"
                style={{ fontSize: 14, padding: '14px 28px', background: 'rgba(245,241,232,.45)', backdropFilter: 'blur(6px)' }}
              >
                (772) 569-3212
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <Link
              href={ADULT_PRIMARY_CARE_CTA.insuranceLinkHref}
              className="font-archivo font-[600] text-vbam-coral hover:text-vbam-inlet transition-colors"
              style={{ fontSize: 13, letterSpacing: '0.02em' }}
            >
              {ADULT_PRIMARY_CARE_CTA.insuranceLinkLabel}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
