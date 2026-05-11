import ScrollReveal from '@/components/shared/ScrollReveal';

export default function PositioningSection() {
  return (
    <section style={{ padding: '112px 0' }} id="about">
      <div className="max-w-[1200px] mx-auto px-12">

        <ScrollReveal animation="left" as="div">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            01 · Positioning
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic text-center mx-auto"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 760, marginBottom: 34 }}
          >
            A grown-up sibling,{' '}
            <em className="font-cormorant italic text-grad-sunrise">on purpose.</em>
          </h2>
        </ScrollReveal>

        <div className="text-center">
          <ScrollReveal delay={80}>
            <p
              className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto"
              style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 640, marginBottom: 20 }}
            >
              Vero Beach Pediatrics raised this town's children. Vero Beach Adult Medicine is the practice for the adults they grew into — and for the parents and professionals who chose Vero because the natural beauty quietly runs everything here.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="font-cormorant italic text-vbam-coral mx-auto"
              style={{
                fontSize: 25, lineHeight: 1.4, maxWidth: 640,
                margin: '36px auto',
              }}
            >
              <span className="font-archivo not-italic text-vbam-coral/40 mr-3">—</span>
              Same family. New chapter.
              <span className="font-archivo not-italic text-vbam-coral/40 ml-3">—</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <p
              className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto"
              style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 640 }}
            >
              Not a clinic at the end of a hospital hallway. A practice. With doors that open onto the same light Vero locals already love, and a panel small enough that your doctor remembers your last conversation, not just your chart.
            </p>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
