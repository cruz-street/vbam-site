import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { CTA_STRIP } from '@/content/home';

export default function CtaStrip() {
  return (
    <section
      id="schedule"
      className="text-center"
      style={{ background: 'var(--grad-sunrise)', padding: 'clamp(40px, 6vw, 86px) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        {CTA_STRIP.proof && (
          <ScrollReveal>
            <p
              className="font-archivo font-[600] text-vbam-atlantic/70 mx-auto"
              style={{ fontSize: 12, letterSpacing: '0.08em', marginBottom: 18, maxWidth: 540 }}
            >
              {CTA_STRIP.proof}
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.06, letterSpacing: '-0.018em', maxWidth: 740 }}
          >
            {CTA_STRIP.headingLine1}{' '}
            <em
              className="font-cormorant italic text-vbam-atlantic"
              style={{
                textDecoration: 'underline',
                textDecorationColor: 'rgba(10,61,74,.35)',
                textUnderlineOffset: 5,
                textDecorationThickness: '1.5px',
              }}
            >
              {CTA_STRIP.headingItalic}
            </em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/75 mx-auto"
            style={{ fontSize: 16, maxWidth: 520, margin: '16px auto 32px' }}
          >
            {CTA_STRIP.subhead}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/contact/"
              className="btn-primary font-archivo font-[600] transition-colors inline-flex items-center gap-2 rounded-full"
              style={{ fontSize: 14, padding: '14px 28px' }}
            >
              {CTA_STRIP.cta1}
            </Link>
            <Link
              href="/contact/"
              className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full"
              style={{ fontSize: 14, padding: '14px 28px', background: 'rgba(245,241,232,.45)', backdropFilter: 'blur(6px)' }}
            >
              {CTA_STRIP.cta2}
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
