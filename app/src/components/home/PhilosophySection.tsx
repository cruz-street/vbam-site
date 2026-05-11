import ScrollReveal from '@/components/shared/ScrollReveal';

const PRINCIPLES = [
  {
    glyph: 'i.',
    heading: ['Quiet, capable, ', 'unhurried.'],
    body: 'Same-day callbacks. Same-week visits. A panel small enough that your doctor remembers your last conversation, not just your chart.',
  },
  {
    glyph: 'ii.',
    heading: ['Warm, ', 'not clinical.'],
    body: 'Light-filled rooms. Coastal art. A practice that reads like a hospitality brand — because that\'s how primary care should feel in 2026.',
  },
  {
    glyph: 'iii.',
    heading: ['Local, ', 'never generic.'],
    body: 'Real relationships with the specialists, hospitals, and labs Vero patients already trust. Care that fits your life on this coast.',
  },
];

export default function PhilosophySection() {
  return (
    <section className="text-center" style={{ padding: '112px 0' }}>
      <div className="max-w-[1200px] mx-auto px-12">

        <ScrollReveal animation="left" as="div">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            03 · Care Philosophy
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 56 }}
          >
            Three quiet{' '}
            <em className="font-cormorant italic text-grad-sunrise">promises.</em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-12">
          {PRINCIPLES.map((p, i) => (
            <ScrollReveal key={p.glyph} animation="scale" delay={i * 120}>
              <div className="text-center">
                <div
                  className="mx-auto flex items-center justify-center"
                  style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'var(--grad-sunrise)',
                    marginBottom: 20,
                    color: '#0A3D4A',
                    fontFamily: 'var(--font-fraunces)',
                    fontSize: 26, fontWeight: 400, fontStyle: 'italic',
                  }}
                >
                  {p.glyph}
                </div>
                <h3
                  className="font-fraunces font-[400] text-vbam-atlantic"
                  style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.01em' }}
                >
                  {p.heading[0]}
                  <em className="font-cormorant italic text-vbam-coral">{p.heading[1]}</em>
                </h3>
                <p
                  className="font-inter font-[300] text-vbam-atlantic/[.78] mx-auto"
                  style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 270 }}
                >
                  {p.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
