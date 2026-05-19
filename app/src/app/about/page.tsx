import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { ABOUT_HERO, ABOUT_PRACTICE, DR_STEWART, ABOUT_CTA } from '@/content/about';

export const metadata: Metadata = {
  title: 'About the Practice',
  description: "Vero Beach Adult Medicine — a new adult primary care practice on the Treasure Coast, led by our inaugural physician Dr. Patricia Stewart and built to grow.",
  alternates: { canonical: 'https://vbadultmedicine.com/about/' },
};

function DoctorPhoto({ size = 280 }: { size?: number }) {
  return (
    <div
      aria-hidden="true"
      className="rounded-full relative overflow-hidden mx-auto"
      style={{
        width: size, height: size,
        background: '#F5F1E8',
        boxShadow: '0 24px 64px -28px rgba(10,61,74,.28)',
        border: '1px solid rgba(10,61,74,.07)',
        flexShrink: 0,
      }}
    >
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, #FBCF9A 0%, #F7D8B4 30%, rgba(245,241,232,.5) 65%, #E8DCC8 100%)', opacity: 0.55 }} />
      <div className="absolute" style={{ bottom: '55%', left: '50%', transform: 'translateX(-50%)', width: '30%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(10,61,74,.18)' }} />
      <div className="absolute" style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '58%', background: 'rgba(10,61,74,.18)', borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow={ABOUT_HERO.eyebrow}
        heading={ABOUT_HERO.heading}
        headingItalic={ABOUT_HERO.headingItalic}
        subhead={ABOUT_HERO.subhead}
      />

      {/* ── Practice identity ─── */}
      <section className="bg-vbam-sand border-y border-vbam-atlantic/[.06]" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="max-w-[820px] mx-auto text-center">
            <ScrollReveal animation="left" as="div">
              <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
                {ABOUT_PRACTICE.eyebrow}
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.018em', marginBottom: 26 }}>
                {ABOUT_PRACTICE.heading} <em className="font-cormorant italic text-grad-sunrise">{ABOUT_PRACTICE.headingItalic}</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="font-inter font-[300] text-vbam-atlantic/[.84]" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 18 }}>
                {ABOUT_PRACTICE.body1}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="font-inter font-[300] text-vbam-atlantic/[.84]" style={{ fontSize: 17, lineHeight: 1.75 }}>
                {ABOUT_PRACTICE.body2}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Dr. Patricia Stewart ─── */}
      <section className="bg-vbam-foam" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <ScrollReveal animation="scale">
              <DoctorPhoto />
            </ScrollReveal>
            <div>
              <ScrollReveal animation="left">
                <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                  {DR_STEWART.eyebrow}
                </p>
              </ScrollReveal>
              <ScrollReveal animation="left" delay={60}>
                <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 18 }}>
                  {DR_STEWART.heading} <em className="font-cormorant italic text-grad-sunrise">{DR_STEWART.headingItalic}</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="left" delay={100}>
                <div className="flex flex-wrap gap-2" style={{ marginBottom: 22 }}>
                  {DR_STEWART.credentials.map(c => (
                    <span key={c} className="font-archivo font-[700] bg-vbam-sand text-vbam-inlet" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 13px', borderRadius: 999, border: '1px solid rgba(10,61,74,.08)' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal animation="left" delay={140}>
                <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 20 }}>
                  {DR_STEWART.bio1}
                </p>
                <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 28 }}>
                  {DR_STEWART.bio2}
                </p>
              </ScrollReveal>
              <ScrollReveal animation="left" delay={180}>
                <Link href="/contact/" className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 13, padding: '12px 24px' }}>
                  {DR_STEWART.cta}
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─── */}
      <section className="text-center" style={{ background: 'var(--grad-sunrise)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.018em', marginBottom: 14 }}>
              {ABOUT_CTA.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/75 mx-auto" style={{ fontSize: 16, maxWidth: 480, marginBottom: 28 }}>
              {ABOUT_CTA.subhead}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <Link href="/contact/" className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
              {ABOUT_CTA.cta}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
