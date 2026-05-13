import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { SERVICES_HERO, SERVICES, SERVICES_APPROACH, SERVICES_CTA } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description: "Comprehensive adult primary care in Vero Beach — annual physicals, chronic condition management, same-day sick visits, women's and men's health, and more.",
  alternates: { canonical: 'https://vbadultmedicine.com/services/' },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow={SERVICES_HERO.eyebrow}
        heading={SERVICES_HERO.heading}
        headingItalic={SERVICES_HERO.headingItalic}
        subhead={SERVICES_HERO.subhead}
      />

      {/* ── Service cards ─── */}
      <section className="bg-vbam-foam" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      <section className="bg-vbam-sand text-center" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 28 }}>
              {SERVICES_APPROACH.heading}{' '}
              <em className="font-cormorant italic text-grad-sunrise">{SERVICES_APPROACH.headingItalic}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/[.82] mx-auto" style={{ fontSize: 17, lineHeight: 1.75, maxWidth: 640, marginBottom: 20 }}>
              {SERVICES_APPROACH.body}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="font-cormorant italic text-vbam-coral mx-auto" style={{ fontSize: 22, lineHeight: 1.45, maxWidth: 560 }}>
              <span className="font-archivo not-italic text-vbam-coral/40 mr-3">—</span>
              {SERVICES_APPROACH.pullQuote}
              <span className="font-archivo not-italic text-vbam-coral/40 ml-3">—</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ─── */}
      <section className="text-center" style={{ background: 'var(--grad-sunrise)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.018em', marginBottom: 14 }}>
              {SERVICES_CTA.heading}{' '}
              <em className="font-cormorant italic">{SERVICES_CTA.headingItalic}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/75 mx-auto" style={{ fontSize: 16, maxWidth: 480, marginBottom: 28 }}>
              {SERVICES_CTA.subhead}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/contact/" className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
                {SERVICES_CTA.cta1}
              </Link>
              <Link href="/for-patients/" className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full" style={{ fontSize: 14, padding: '14px 28px', background: 'rgba(245,241,232,.45)', backdropFilter: 'blur(6px)' }}>
                {SERVICES_CTA.cta2}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
