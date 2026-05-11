import ScrollReveal from '@/components/shared/ScrollReveal';

export default function VbpSection() {
  return (
    <section className="text-center bg-vbam-sand" id="vbp" style={{ padding: '112px 0' }}>
      <div className="max-w-[1200px] mx-auto px-12">

        <ScrollReveal animation="left" as="div">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            05 · The VBP Connection
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 620, marginBottom: 20 }}
          >
            Same family.{' '}
            <em className="font-cormorant italic text-grad-sunrise">Same coastline.</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 640, marginBottom: 56 }}
          >
            Vero Beach Pediatrics raised a generation of Vero kids. Vero Beach Adult Medicine is the next chapter — built with the same family resemblance and the same belief that great primary care belongs here, for every stage of life.
          </p>
        </ScrollReveal>

        {/* Lineage cards */}
        <div className="flex items-center justify-center gap-9 flex-wrap">

          <ScrollReveal animation="scale" delay={0}>
            <div
              className="text-center rounded-lg"
              style={{ padding: '28px 32px', background: '#E8DCC8', minWidth: 220 }}
            >
              <p
                className="font-archivo font-[700] text-vbam-atlantic/50 mb-3"
                style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Sibling Practice · Est. 1987
              </p>
              <p
                className="font-fraunces font-[500] text-vbam-inlet"
                style={{ fontSize: 22, lineHeight: 1.2 }}
              >
                Vero Beach<br />
                <em className="font-cormorant italic text-vbam-sea-glass">Pediatrics</em>
              </p>
            </div>
          </ScrollReveal>

          {/* Bridge arrow */}
          <ScrollReveal animation="scale" delay={120}>
            <div
              aria-hidden="true"
              className="relative"
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
              className="text-center rounded-lg border border-vbam-atlantic/[.08]"
              style={{ padding: '28px 32px', background: '#F5F1E8', minWidth: 220 }}
            >
              <p
                className="font-archivo font-[700] text-vbam-atlantic/50 mb-3"
                style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Sibling Practice · Est. 2026
              </p>
              <p
                className="font-fraunces font-[500] text-vbam-atlantic"
                style={{ fontSize: 22, lineHeight: 1.2 }}
              >
                Vero Beach<br />
                <em className="font-cormorant italic text-grad-sunrise">Adult Medicine</em>
              </p>
            </div>
          </ScrollReveal>

        </div>

        <ScrollReveal delay={320}>
          <p
            className="font-cormorant italic text-vbam-inlet"
            style={{ fontSize: 18, marginTop: 26 }}
          >
            Different practice. Same DNA.
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
