import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive adult primary care in Vero Beach — annual physicals, chronic condition management, same-day sick visits, women\'s and men\'s health, and more.',
  alternates: { canonical: 'https://vbadultmedicine.com/services/' },
};

const SERVICES = [
  {
    title: 'Annual Physicals & Wellness',
    body: 'Comprehensive yearly exams that go beyond a checklist — bloodwork, screenings, and a real conversation about what matters most to you.',
    detail: 'Includes age-appropriate cancer screenings, cardiovascular risk assessment, immunizations, and a personalized wellness plan.',
  },
  {
    title: 'Chronic Condition Management',
    body: 'Hypertension, diabetes, thyroid, cholesterol — managed proactively with a doctor who knows your history.',
    detail: 'Coordinated care plans, regular monitoring, and direct access to your physician when things change.',
  },
  {
    title: 'Same-Day Sick Visits',
    body: 'Direct line to the practice. Same-day appointments when you need them. No waiting-room marathon.',
    detail: 'Call or portal message in the morning. We\'ll fit you in. Because that\'s what primary care should mean.',
  },
  {
    title: "Women's & Men's Health",
    body: 'Annual exams, hormone health, perimenopause care, men\'s wellness — handled with care, not a checklist.',
    detail: 'From preventive screenings to complex hormonal questions, we approach gender-specific care with depth and respect.',
  },
  {
    title: 'Preventive Screenings & Labs',
    body: 'Onsite labs, in-house bloodwork, and modern screening protocols built around your stage of life.',
    detail: 'We coordinate colonoscopies, mammograms, DEXA scans, and other referrals — so you don\'t have to manage it all yourself.',
  },
  {
    title: 'Travel & Lifestyle Medicine',
    body: 'Pre-travel consults, vaccines, sleep, performance, and longevity — care that fits how you actually live.',
    detail: 'International travel prep, sleep optimization, executive wellness, and concierge-adjacent access — for patients who expect more.',
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="04 · Services"
        heading="Modern primary care,"
        headingItalic="on the coast."
        subhead="A complete practice for adults — preventive, proactive, and personal. Everything your health needs, under one roof."
      />

      {/* ── Service cards ─── */}
      <section className="bg-vbam-foam" style={{ padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="grid grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.title} animation="scale" delay={i * 70}>
                <div
                  className="relative overflow-hidden rounded-lg border border-vbam-atlantic/[.08] group transition-all duration-[250ms] hover:-translate-y-0.5 h-full"
                  style={{ background: '#FAF7EC', padding: '32px 26px' }}
                >
                  <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms]" style={{ background: 'var(--grad-sunrise)' }} />
                  <div aria-hidden="true" className="rounded-full" style={{ width: 32, height: 32, background: 'var(--grad-sunrise)', marginBottom: 16, opacity: 0.85 }} />
                  <h3 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 20, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.005em' }}>
                    {svc.title}
                  </h3>
                  <p className="font-inter font-[300] text-vbam-atlantic/75" style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 14 }}>
                    {svc.body}
                  </p>
                  <p className="font-inter font-[300] text-vbam-atlantic/50" style={{ fontSize: 13, lineHeight: 1.6 }}>
                    {svc.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Approach section ─── */}
      <section className="bg-vbam-sand text-center" style={{ padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12" style={{ maxWidth: 760 }}>
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 28 }}>
              What to expect at your{' '}
              <em className="font-cormorant italic text-grad-sunrise">first visit.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/[.82] mx-auto" style={{ fontSize: 17, lineHeight: 1.75, maxWidth: 640, marginBottom: 20 }}>
              Your first appointment is longer than you might expect. We want to understand your history, your goals, and what matters most to you — not just your vitals.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="font-cormorant italic text-vbam-coral mx-auto" style={{ fontSize: 22, lineHeight: 1.45, maxWidth: 560 }}>
              <span className="font-archivo not-italic text-vbam-coral/40 mr-3">—</span>
              Same-day callbacks. Same-week visits. A panel small enough that your doctor remembers your last conversation.
              <span className="font-archivo not-italic text-vbam-coral/40 ml-3">—</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ─── */}
      <section className="text-center" style={{ background: 'var(--grad-sunrise)', padding: '80px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.018em', marginBottom: 14 }}>
              Not sure where to start?{' '}
              <em className="font-cormorant italic">Let's talk.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/75 mx-auto" style={{ fontSize: 16, maxWidth: 480, marginBottom: 28 }}>
              Book an appointment and we'll figure out the right starting point for you together.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/contact/" className="font-archivo font-[600] bg-vbam-atlantic text-vbam-foam hover:bg-vbam-inlet transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
                Book an Appointment →
              </Link>
              <Link href="/for-patients/" className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full" style={{ fontSize: 14, padding: '14px 28px', background: 'rgba(245,241,232,.45)', backdropFilter: 'blur(6px)' }}>
                New Patient Info
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
