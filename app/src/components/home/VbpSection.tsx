import ScrollReveal from '@/components/shared/ScrollReveal';
import { VBP_SECTION } from '@/content/home';

export default function VbpSection() {
  return (
    <section className="text-center bg-vbam-sand" id="vbp" style={{ padding: 'clamp(48px, 8vw, 112px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            {VBP_SECTION.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 620, marginBottom: 20 }}
          >
            {VBP_SECTION.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{VBP_SECTION.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 640, marginBottom: 56 }}
          >
            {VBP_SECTION.body}
          </p>
        </ScrollReveal>

        {/* Lineage cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-9">

          <ScrollReveal animation="scale" delay={0}>
            <div
              className="text-center rounded-lg w-full sm:w-auto"
              style={{ padding: '28px 32px', background: '#E8DCC8' }}
            >
              <p
                className="font-archivo font-[700] text-vbam-atlantic/50 mb-3"
                style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                {VBP_SECTION.vbpCard.label}
              </p>
              <p
                className="font-fraunces font-[500] text-vbam-inlet"
                style={{ fontSize: 22, lineHeight: 1.2 }}
              >
                {VBP_SECTION.vbpCard.name}<br />
                <em className="font-cormorant italic text-vbam-sea-glass">{VBP_SECTION.vbpCard.italic}</em>
              </p>
            </div>
          </ScrollReveal>

          {/* Bridge arrow */}
          <ScrollReveal animation="scale" delay={120}>
            <div
              aria-hidden="true"
              className="hidden sm:block relative"
              style={{ width: 100, height: 3, background: 'var(--grad-sunrise)', borderRadius: 3 }}
            >
              <div
                className="absolute"
                style={{
                  top: '50%', right: -2,
                  transform: 'translateY(-50%) rotate(45deg)',
                  width: 9, height: 9,
                  borderRight: '2.5px solid #EE7752',
                  borderTop: '2.5px solid #EE7752',
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="scale" delay={240}>
            <div
              className="text-center rounded-lg border border-vbam-atlantic/[.08] w-full sm:w-auto"
              style={{ padding: '28px 32px', background: '#F5F1E8' }}
            >
              <p
                className="font-archivo font-[700] text-vbam-atlantic/50 mb-3"
                style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                {VBP_SECTION.vbamCard.label}
              </p>
              <p
                className="font-fraunces font-[500] text-vbam-atlantic"
                style={{ fontSize: 22, lineHeight: 1.2 }}
              >
                {VBP_SECTION.vbamCard.name}<br />
                <em className="font-cormorant italic text-grad-sunrise">{VBP_SECTION.vbamCard.italic}</em>
              </p>
            </div>
          </ScrollReveal>

        </div>

        <ScrollReveal delay={320}>
          <p
            className="font-cormorant italic text-vbam-inlet"
            style={{ fontSize: 18, marginTop: 26 }}
          >
            {VBP_SECTION.footer}
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
