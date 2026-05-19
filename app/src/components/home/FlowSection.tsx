import ScrollReveal from '@/components/shared/ScrollReveal';
import { FLOW_SECTION } from '@/content/home';

export default function FlowSection() {
  return (
    <section className="bg-vbam-sand" id="flow" style={{ padding: 'clamp(48px, 8vw, 112px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div" className="text-center">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            {FLOW_SECTION.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto text-center"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 20 }}
          >
            {FLOW_SECTION.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{FLOW_SECTION.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto text-center"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 680, marginBottom: 64 }}
          >
            {FLOW_SECTION.body}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {FLOW_SECTION.stages.map((s, i) => (
            <ScrollReveal key={s.number} animation="scale" delay={i * 100}>
              <div
                className="rounded-lg border border-vbam-atlantic/[.08] bg-vbam-foam h-full"
                style={{ padding: '28px 24px' }}
              >
                <div className="flex items-center gap-3" style={{ marginBottom: 18 }}>
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 36, height: 36,
                      background: 'var(--grad-sunrise)',
                      color: '#0A3D4A',
                      fontFamily: 'var(--font-fraunces)',
                      fontSize: 14, fontWeight: 500,
                    }}
                  >
                    {s.number}
                  </div>
                  <p
                    className="font-archivo font-[700] text-vbam-atlantic/55"
                    style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}
                  >
                    {s.label}
                  </p>
                </div>

                <h3
                  className="font-fraunces font-[400] text-vbam-atlantic"
                  style={{ fontSize: 20, lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.01em' }}
                >
                  {s.headingLine1}{' '}
                  <em className="font-cormorant italic text-vbam-coral">{s.headingItalic}</em>
                </h3>

                <p
                  className="font-inter font-[300] text-vbam-atlantic/[.78]"
                  style={{ fontSize: 14, lineHeight: 1.65 }}
                >
                  {s.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={480}>
          <p
            className="font-cormorant italic text-vbam-inlet text-center"
            style={{ fontSize: 18, marginTop: 56 }}
          >
            {FLOW_SECTION.footer}
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
