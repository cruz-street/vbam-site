import ScrollReveal from '@/components/shared/ScrollReveal';
import { POSITIONING } from '@/content/home';

export default function PositioningSection() {
  return (
    <section style={{ padding: 'clamp(48px, 8vw, 112px) 0' }} id="about">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            {POSITIONING.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic text-center mx-auto"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 760, marginBottom: 34 }}
          >
            {POSITIONING.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{POSITIONING.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <div className="text-center">
          <ScrollReveal delay={80}>
            <p
              className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto"
              style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 640, marginBottom: 20 }}
            >
              {POSITIONING.body1}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="font-cormorant italic text-vbam-coral mx-auto"
              style={{ fontSize: 'clamp(18px, 3vw, 25px)', lineHeight: 1.4, maxWidth: 640, margin: '36px auto' }}
            >
              <span className="font-archivo not-italic text-vbam-coral/40 mr-3">—</span>
              {POSITIONING.pullQuote}
              <span className="font-archivo not-italic text-vbam-coral/40 ml-3">—</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <p
              className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto"
              style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 640 }}
            >
              {POSITIONING.body2}
            </p>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
