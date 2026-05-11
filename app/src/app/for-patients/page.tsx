import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FaqAccordion from '@/components/for-patients/FaqAccordion';

export const metadata: Metadata = {
  title: 'For Patients',
  description: 'New patient information, accepted insurance, FAQs, and how to book your first appointment at Vero Beach Adult Medicine.',
  alternates: { canonical: 'https://vbadultmedicine.com/for-patients/' },
};

const INSURANCE = [
  'Medicare', 'Blue Cross Blue Shield', 'Aetna', 'Cigna',
  'United Healthcare', 'Humana', 'Tricare', 'Most major PPO plans',
];

export default function ForPatientsPage() {
  return (
    <main>
      <PageHero
        eyebrow="For Patients"
        heading="Your first visit,"
        headingItalic="simplified."
        subhead="Everything you need to know before you arrive. We made this part easy on purpose."
      />

      {/* ── New Patients + Insurance ─── */}
      <section className="bg-vbam-foam" style={{ padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12 grid grid-cols-2 gap-16">

          {/* New Patients */}
          <ScrollReveal animation="left">
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                New Patients
              </p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 20 }}>
                What to bring on <em className="font-cormorant italic text-grad-sunrise">day one.</em>
              </h2>
              <ul className="space-y-3" style={{ marginBottom: 28 }}>
                {[
                  'Valid photo ID',
                  'Insurance card',
                  'List of current medications & dosages',
                  'Relevant medical records or lab results',
                  'List of questions or concerns',
                  'Completed new patient forms (sent before your visit)',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1.5 w-[5px] h-[5px] rounded-full bg-vbam-coral flex-shrink-0" />
                    <span className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.6 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-inter font-[300] text-vbam-atlantic/60" style={{ fontSize: 14, lineHeight: 1.65 }}>
                Your first appointment is longer than you might expect — we want to understand your full health picture, not just check a box.
              </p>
            </div>
          </ScrollReveal>

          {/* Insurance */}
          <ScrollReveal animation="left" delay={100}>
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                Insurance
              </p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 20 }}>
                Most plans <em className="font-cormorant italic text-grad-sunrise">accepted.</em>
              </h2>
              <div className="flex flex-wrap gap-2" style={{ marginBottom: 24 }}>
                {INSURANCE.map(plan => (
                  <span key={plan} className="font-archivo font-[700] text-vbam-inlet bg-vbam-sand border border-vbam-atlantic/[.08]" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '7px 13px', borderRadius: 999 }}>
                    {plan}
                  </span>
                ))}
              </div>
              <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                We also offer self-pay options. Call our office to verify your specific plan before your first visit — we're happy to help.
              </p>
              <a href="tel:7725693212" className="font-archivo font-[700] text-vbam-coral hover:text-vbam-inlet transition-colors" style={{ fontSize: 14, letterSpacing: '0.04em' }}>
                (772) 569-3212
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ── FAQ ─── */}
      <section className="bg-vbam-sand" style={{ padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic text-center" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 56 }}>
              Common <em className="font-cormorant italic text-grad-sunrise">questions.</em>
            </h2>
          </ScrollReveal>
          <FaqAccordion />
        </div>
      </section>

      {/* ── CTA ─── */}
      <section className="text-center" style={{ background: 'var(--grad-sunrise)', padding: '80px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.018em', marginBottom: 14 }}>
              Ready when you are.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/75 mx-auto" style={{ fontSize: 16, maxWidth: 480, marginBottom: 28 }}>
              New patients are always welcome. Book your first visit online or give us a call.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/contact/" className="font-archivo font-[600] bg-vbam-atlantic text-vbam-foam hover:bg-vbam-inlet transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
                Book an Appointment →
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
