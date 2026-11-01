import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import JsonLd from '@/components/shared/JsonLd';
import FaqAccordion from '@/components/for-patients/FaqAccordion';
import {
  PRIMARY_CARE_HERO,
  PRIMARY_CARE_ROLE,
  PRIMARY_CARE_HELP,
  PRIMARY_CARE_NEAR_YOU,
  PRIMARY_CARE_INSURANCE,
  PRIMARY_CARE_FAQS,
  PRIMARY_CARE_CTA,
} from '@/content/primary-care';
import { NEW_PATIENTS_WHO } from '@/content/new-patients';
import { NEW_PATIENT_REGISTRATION } from '@/content/for-patients';
import { PRACTICE_INFO } from '@/content/contact';
import { buildBreadcrumbJsonLd } from '@/lib/breadcrumb-schema';

const SITE = 'https://verobeachadultmedicine.com';
const PAGE_URL = `${SITE}/primary-care-doctors-vero-beach/`;

// Intent split (see PR): this page owns "primary care doctor / physician / PCP /
// near me" queries. /new-patients/ keeps "accepting new patients". Keep the two
// titles distinct so they do not compete for the same query.
export const metadata: Metadata = {
  title: { absolute: 'Primary Care Doctor in Vero Beach, FL | Vero Beach Adult Medicine' },
  description:
    'Looking for a primary care doctor in Vero Beach? Meet Dr. Patricia Stewart, a board-certified internal medicine physician accepting new adult patients. No membership fee.',
  alternates: { canonical: PAGE_URL },
};

// FAQPage mirrors PRIMARY_CARE_FAQS exactly (answers are rendered in the HTML, hidden).
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PRIMARY_CARE_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Same practice entity (@id) as home, /services/ and /new-patients/: one business, not a duplicate.
const CLINIC_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'MedicalClinic'],
  '@id': `${SITE}/#localbusiness`,
  name: 'Vero Beach Adult Medicine',
  url: SITE,
  telephone: '+1-772-569-3212',
  medicalSpecialty: 'Internal Medicine',
  isAcceptingNewPatients: true,
  address: {
    '@type': 'PostalAddress',
    streetAddress: PRACTICE_INFO.address.street,
    addressLocality: 'Vero Beach',
    addressRegion: 'FL',
    postalCode: '32960',
    addressCountry: 'US',
  },
};

const BREADCRUMB_JSON_LD = buildBreadcrumbJsonLd([
  { name: 'Home', url: `${SITE}/` },
  { name: 'Primary Care Doctors in Vero Beach', url: PAGE_URL },
]);

const eyebrow = { fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 18 };
const h2 = { fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 20 };
const section = { padding: 'clamp(40px, 7vw, 96px) 0' };
const smallLabel = { fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' as const, marginBottom: 14 };
const bodyText = { fontSize: 16, lineHeight: 1.7 };
const ghostBtn = { fontSize: 14, padding: '14px 28px', background: 'rgba(245,241,232,.45)', backdropFilter: 'blur(6px)' };

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-2 w-[5px] h-[5px] rounded-full bg-vbam-coral flex-shrink-0" />
          <span className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.6 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function PrimaryCarePage() {
  return (
    <main>
      <JsonLd data={FAQ_JSON_LD} />
      <JsonLd data={CLINIC_JSON_LD} />
      <JsonLd data={BREADCRUMB_JSON_LD} />

      <PageHero
        eyebrow={PRIMARY_CARE_HERO.eyebrow}
        heading={PRIMARY_CARE_HERO.heading}
        headingItalic={PRIMARY_CARE_HERO.headingItalic}
        subhead={PRIMARY_CARE_HERO.subhead}
      >
        <ScrollReveal delay={180}>
          <div className="flex gap-3 justify-center flex-wrap" style={{ marginTop: 32 }}>
            <Link href="/for-patients/new-patient-registration/" className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
              {NEW_PATIENT_REGISTRATION.buttonLabel} →
            </Link>
            <a href={`tel:${PRACTICE_INFO.phoneTel}`} className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
              {PRACTICE_INFO.phone}
            </a>
          </div>
        </ScrollReveal>
      </PageHero>

      {/* The role + the doctor */}
      <section className="bg-vbam-foam" style={section}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <ScrollReveal animation="left">
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={eyebrow}>{PRIMARY_CARE_ROLE.eyebrow}</p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={h2}>
                {PRIMARY_CARE_ROLE.heading} <em className="font-cormorant italic text-grad-sunrise">{PRIMARY_CARE_ROLE.headingItalic}</em>
              </h2>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ ...bodyText, marginBottom: 16 }}>{PRIMARY_CARE_ROLE.body1}</p>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={bodyText}>{PRIMARY_CARE_ROLE.body2}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="left" delay={100}>
            <div>
              <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 20, lineHeight: 1.3, marginBottom: 8 }}>
                {NEW_PATIENTS_WHO.physician.name}
              </h3>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                {NEW_PATIENTS_WHO.physician.lead}
              </p>
              <Link href="/about/" className="font-archivo font-[700] text-vbam-coral hover:underline" style={{ fontSize: 14 }}>
                {NEW_PATIENTS_WHO.physician.linkLabel}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What primary care covers (list is read from /new-patients/ content so the two cannot drift) */}
      <section className="bg-vbam-sand" style={section}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <ScrollReveal animation="left">
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={eyebrow}>{PRIMARY_CARE_HELP.eyebrow}</p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={h2}>
                {PRIMARY_CARE_HELP.heading} <em className="font-cormorant italic text-grad-sunrise">{PRIMARY_CARE_HELP.headingItalic}</em>
              </h2>
              <p style={{ marginTop: 20 }}>
                <Link href="/services/" className="font-archivo font-[700] text-vbam-coral hover:underline" style={{ fontSize: 14 }}>
                  {NEW_PATIENTS_WHO.servicesLinkLabel}
                </Link>
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="left" delay={100}>
            <div>
              <p className="font-archivo font-[700] text-vbam-atlantic/55" style={smallLabel}>{NEW_PATIENTS_WHO.listLabel}</p>
              <Bullets items={NEW_PATIENTS_WHO.items} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Near you + insurance */}
      <section className="bg-vbam-foam" style={section}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <ScrollReveal animation="left">
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={eyebrow}>{PRIMARY_CARE_NEAR_YOU.eyebrow}</p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={h2}>
                {PRIMARY_CARE_NEAR_YOU.heading} <em className="font-cormorant italic text-grad-sunrise">{PRIMARY_CARE_NEAR_YOU.headingItalic}</em>
              </h2>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={bodyText}>{PRIMARY_CARE_NEAR_YOU.body}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="left" delay={100}>
            <div id="insurance" style={{ scrollMarginTop: 96 }}>
              <p className="font-archivo font-[700] text-vbam-coral" style={eyebrow}>{PRIMARY_CARE_INSURANCE.eyebrow}</p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={h2}>
                {PRIMARY_CARE_INSURANCE.heading} <em className="font-cormorant italic text-grad-sunrise">{PRIMARY_CARE_INSURANCE.headingItalic}</em>
              </h2>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ ...bodyText, marginBottom: 12 }}>{PRIMARY_CARE_INSURANCE.body}</p>
              <Link href="/for-patients/#insurance" className="font-archivo font-[700] text-vbam-coral hover:underline" style={{ fontSize: 14 }}>
                {PRIMARY_CARE_INSURANCE.linkLabel}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-vbam-sand" style={section}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic text-center" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 56 }}>
              Common <em className="font-cormorant italic text-grad-sunrise">questions.</em>
            </h2>
          </ScrollReveal>
          <FaqAccordion faqs={PRIMARY_CARE_FAQS} />
          <p className="text-center font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, marginTop: 32 }}>
            New here?{' '}
            <Link href="/new-patients/" className="font-archivo font-[700] text-vbam-coral hover:underline">
              See what to expect as a new patient →
            </Link>
          </p>
        </div>
      </section>

      {/* How to book */}
      <section className="text-center" style={{ background: 'var(--grad-sunrise)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <p className="font-archivo font-[700] text-vbam-atlantic/70" style={{ ...eyebrow, marginBottom: 14 }}>{PRIMARY_CARE_CTA.eyebrow}</p>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.018em', marginBottom: 14 }}>
              {PRIMARY_CARE_CTA.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/75 mx-auto" style={{ fontSize: 16, maxWidth: 480, marginBottom: 28 }}>{PRIMARY_CARE_CTA.subhead}</p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/for-patients/new-patient-registration/" className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
                {NEW_PATIENT_REGISTRATION.buttonLabel} →
              </Link>
              <Link href={PRIMARY_CARE_CTA.bookHref} className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full" style={ghostBtn}>
                {PRIMARY_CARE_CTA.bookLabel}
              </Link>
              <a href={`tel:${PRACTICE_INFO.phoneTel}`} className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full" style={ghostBtn}>
                {PRACTICE_INFO.phone}
              </a>
            </div>
            <p className="font-inter font-[300] text-vbam-atlantic/75" style={{ fontSize: 14, marginTop: 20 }}>
              {PRIMARY_CARE_CTA.textLine}{' '}
              <a href={PRACTICE_INFO.smsHref} className="font-[700] hover:underline">{PRACTICE_INFO.sms}</a>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
