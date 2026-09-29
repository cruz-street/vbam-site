import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import JsonLd from '@/components/shared/JsonLd';
import FaqAccordion from '@/components/for-patients/FaqAccordion';
import {
  NEW_PATIENTS_HERO,
  NEW_PATIENTS_ACCEPTING,
  NEW_PATIENTS_WHO,
  NEW_PATIENTS_INSURANCE,
  NEW_PATIENTS_FIRST_VISIT,
  NEW_PATIENTS_FAQS,
  NEW_PATIENTS_CTA,
} from '@/content/new-patients';
import {
  NEW_PATIENT_CHECKLIST,
  NEW_PATIENT,
  VISIT_FLOW,
  INSURANCE,
  NEW_PATIENT_REGISTRATION,
} from '@/content/for-patients';
import { PRACTICE_INFO } from '@/content/contact';

export const metadata: Metadata = {
  title: { absolute: 'Accepting New Patients | Primary Care in Vero Beach, FL' },
  description:
    "Need a Vero Beach primary care doctor who has time for you? We're accepting new adult patients. See the insurance we accept, what to expect, and how to book.",
  alternates: { canonical: 'https://verobeachadultmedicine.com/new-patients/' },
};

const SITE = 'https://verobeachadultmedicine.com';

// FAQPage schema: mirrors NEW_PATIENTS_FAQS exactly (FaqAccordion renders every
// answer with `hidden`, not unmounted, so the built HTML contains all of it).
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: NEW_PATIENTS_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// MedicalClinic + Physician: every field is drawn from text visible on this page
// or already published on the home and About pages. The clinic node reuses the
// home page's #localbusiness @id so both pages describe ONE entity (no duplicate
// business). Deliberately omitted: isAcceptingNewPatients, insurance and hours
// (availability/insurance rot fast; add only once the availability TODO is
// answered and a review date is set).
const CLINIC_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'MedicalClinic'],
  '@id': `${SITE}/#localbusiness`,
  name: 'Vero Beach Adult Medicine',
  url: SITE,
  telephone: '+1-772-569-3212',
  medicalSpecialty: 'Internal Medicine',
  address: {
    '@type': 'PostalAddress',
    streetAddress: PRACTICE_INFO.address.street,
    addressLocality: 'Vero Beach',
    addressRegion: 'FL',
    postalCode: '32960',
    addressCountry: 'US',
  },
};

const PHYSICIAN_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Patricia Stewart',
  medicalSpecialty: 'Internal Medicine',
  description: NEW_PATIENTS_WHO.physician.lead,
  image: `${SITE}/images/dr-stewart-cutout.webp`,
  url: `${SITE}/about/`,
  worksFor: { '@id': `${SITE}/#localbusiness` },
};

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

export default function NewPatientsPage() {
  const visitSteps = VISIT_FLOW.steps.slice(0, 2);

  return (
    <main>
      <JsonLd data={FAQ_JSON_LD} />
      <JsonLd data={CLINIC_JSON_LD} />
      <JsonLd data={PHYSICIAN_JSON_LD} />

      <PageHero
        eyebrow={NEW_PATIENTS_HERO.eyebrow}
        heading={NEW_PATIENTS_HERO.heading}
        headingItalic={NEW_PATIENTS_HERO.headingItalic}
        subhead={NEW_PATIENTS_HERO.subhead}
      >
        <ScrollReveal delay={180}>
          <div className="flex gap-3 justify-center flex-wrap" style={{ marginTop: 32 }}>
            <Link href={NEW_PATIENTS_CTA.bookHref} className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
              {NEW_PATIENTS_CTA.bookLabel}
            </Link>
            <a href={`tel:${PRACTICE_INFO.phoneTel}`} className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
              {PRACTICE_INFO.phone}
            </a>
          </div>
        </ScrollReveal>
      </PageHero>

      {/* Taking new patients */}
      <section className="bg-vbam-foam" style={section}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <div style={{ maxWidth: 720 }}>
              <p className="font-archivo font-[700] text-vbam-coral" style={eyebrow}>{NEW_PATIENTS_ACCEPTING.eyebrow}</p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={h2}>
                {NEW_PATIENTS_ACCEPTING.heading} <em className="font-cormorant italic text-grad-sunrise">{NEW_PATIENTS_ACCEPTING.headingItalic}</em>
              </h2>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ ...bodyText, marginBottom: 16 }}>
                {NEW_PATIENTS_ACCEPTING.body1}
              </p>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ ...bodyText, marginBottom: 24 }}>
                {NEW_PATIENTS_ACCEPTING.body2}
              </p>
              {/* Visible hard-stop placeholder: availability / panel openings / wait times
                  are unverified. Jesse must answer it (or remove the line) before merge. */}
              <p className="font-inter text-vbam-atlantic/75" style={{ fontSize: 15, lineHeight: 1.6 }}>
                {NEW_PATIENTS_ACCEPTING.availabilityLabel}{' '}
                <strong className="font-[700]" style={{ background: 'rgba(238,119,82,0.15)', padding: '2px 8px', borderRadius: 6 }}>
                  {NEW_PATIENTS_ACCEPTING.availabilityPlaceholder}
                </strong>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Who we see */}
      <section className="bg-vbam-sand" style={section}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <ScrollReveal animation="left">
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={eyebrow}>{NEW_PATIENTS_WHO.eyebrow}</p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={h2}>
                {NEW_PATIENTS_WHO.heading} <em className="font-cormorant italic text-grad-sunrise">{NEW_PATIENTS_WHO.headingItalic}</em>
              </h2>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ ...bodyText, marginBottom: 24 }}>
                {NEW_PATIENTS_WHO.intro}
              </p>
              <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 20, lineHeight: 1.3, marginBottom: 8 }}>
                {NEW_PATIENTS_WHO.physician.name}
              </h3>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 10 }}>
                {NEW_PATIENTS_WHO.physician.lead}
              </p>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                {NEW_PATIENTS_WHO.physician.body}
              </p>
              <Link href={NEW_PATIENTS_WHO.physician.linkHref} className="font-archivo font-[700] text-vbam-coral hover:underline" style={{ fontSize: 14 }}>
                {NEW_PATIENTS_WHO.physician.linkLabel}
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="left" delay={100}>
            <div>
              <p className="font-archivo font-[700] text-vbam-atlantic/55" style={smallLabel}>
                {NEW_PATIENTS_WHO.listLabel}
              </p>
              <Bullets items={NEW_PATIENTS_WHO.items} />
              <p style={{ marginTop: 20 }}>
                <Link href="/services/" className="font-archivo font-[700] text-vbam-coral hover:underline" style={{ fontSize: 14 }}>
                  {NEW_PATIENTS_WHO.servicesLinkLabel}
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Insurance. The plan list is read from the For Patients content so the two
          pages cannot drift; the "coming soon" line is intentionally not shown. */}
      <section className="bg-vbam-foam" style={section}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <div id="insurance" style={{ scrollMarginTop: 96, maxWidth: 820 }}>
              <p className="font-archivo font-[700] text-vbam-coral" style={eyebrow}>{NEW_PATIENTS_INSURANCE.eyebrow}</p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={h2}>
                {NEW_PATIENTS_INSURANCE.heading} <em className="font-cormorant italic text-grad-sunrise">{NEW_PATIENTS_INSURANCE.headingItalic}</em>
              </h2>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ ...bodyText, marginBottom: 24 }}>
                {NEW_PATIENTS_INSURANCE.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7" style={{ marginBottom: 24 }}>
                {INSURANCE.groups.map((group) => (
                  <div key={group.label}>
                    <p className="font-archivo font-[700] text-vbam-atlantic/55" style={smallLabel}>
                      {group.label}
                    </p>
                    <Bullets items={group.plans} />
                  </div>
                ))}
              </div>
              {INSURANCE.selfPay && (
                <div className="border-t border-vbam-atlantic/[.10] pt-5" style={{ marginBottom: 18 }}>
                  <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {INSURANCE.selfPay.label}
                  </p>
                  <p className="font-inter font-[300] text-vbam-atlantic/75" style={{ fontSize: 14, lineHeight: 1.6 }}>
                    {INSURANCE.selfPay.note}
                  </p>
                </div>
              )}
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 12 }}>
                {INSURANCE.note}
              </p>
              <Link href="/for-patients/#insurance" className="font-archivo font-[700] text-vbam-coral hover:underline" style={{ fontSize: 14 }}>
                {NEW_PATIENTS_INSURANCE.linkLabel}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* First visit */}
      <section className="bg-vbam-sand" style={section}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <ScrollReveal animation="left">
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={eyebrow}>{NEW_PATIENTS_FIRST_VISIT.eyebrow}</p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={h2}>
                {NEW_PATIENTS_FIRST_VISIT.heading} <em className="font-cormorant italic text-grad-sunrise">{NEW_PATIENTS_FIRST_VISIT.headingItalic}</em>
              </h2>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ ...bodyText, marginBottom: 24 }}>
                {NEW_PATIENT.note}
              </p>
              <div className="space-y-6">
                {visitSteps.map((step) => (
                  <div key={step.title}>
                    <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 6 }}>
                      {step.title}
                    </h3>
                    <p className="font-inter font-[300] text-vbam-atlantic/[.78]" style={{ fontSize: 14, lineHeight: 1.65 }}>
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="left" delay={100}>
            <div>
              <p className="font-archivo font-[700] text-vbam-atlantic/55" style={smallLabel}>
                {NEW_PATIENTS_FIRST_VISIT.bringLabel}
              </p>
              <Bullets items={NEW_PATIENT_CHECKLIST} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-vbam-foam" style={section}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic text-center" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 56 }}>
              Common <em className="font-cormorant italic text-grad-sunrise">questions.</em>
            </h2>
          </ScrollReveal>
          <FaqAccordion faqs={NEW_PATIENTS_FAQS} />
        </div>
      </section>

      {/* How to book */}
      <section className="text-center" style={{ background: 'var(--grad-sunrise)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <p className="font-archivo font-[700] text-vbam-atlantic/70" style={{ ...eyebrow, marginBottom: 14 }}>{NEW_PATIENTS_CTA.eyebrow}</p>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.018em', marginBottom: 14 }}>
              {NEW_PATIENTS_CTA.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/75 mx-auto" style={{ fontSize: 16, maxWidth: 480, marginBottom: 28 }}>
              {NEW_PATIENTS_CTA.subhead}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/for-patients/new-patient-registration/" className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
                {NEW_PATIENT_REGISTRATION.buttonLabel} →
              </Link>
              <Link href={NEW_PATIENTS_CTA.bookHref} className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full" style={ghostBtn}>
                {NEW_PATIENTS_CTA.bookLabel}
              </Link>
              <a href={`tel:${PRACTICE_INFO.phoneTel}`} className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full" style={ghostBtn}>
                {PRACTICE_INFO.phone}
              </a>
            </div>
            <p className="font-inter font-[300] text-vbam-atlantic/75" style={{ fontSize: 14, marginTop: 20 }}>
              {NEW_PATIENTS_CTA.textLine}{' '}
              <a href={PRACTICE_INFO.smsHref} className="font-[700] hover:underline">{PRACTICE_INFO.sms}</a>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
