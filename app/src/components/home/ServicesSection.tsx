import ScrollReveal from '@/components/shared/ScrollReveal';

const SERVICES = [
  {
    title: 'Annual Physicals & Wellness',
    body: 'Comprehensive yearly exams that go beyond a checklist — bloodwork, screenings, and a real conversation.',
  },
  {
    title: 'Chronic Condition Management',
    body: 'Hypertension, diabetes, thyroid, cholesterol — managed proactively with a doctor who knows your history.',
  },
  {
    title: 'Same-Day Sick Visits',
    body: 'Direct line to the practice. Same-day appointments when you need them. No waiting-room marathon.',
  },
  {
    title: "Women's & Men's Health",
    body: 'Annual exams, hormone health, perimenopause care, men\'s wellness — handled with care, not a checklist.',
  },
  {
    title: 'Preventive Screenings & Labs',
    body: 'Onsite labs, in-house bloodwork, and modern screening protocols built around your stage of life.',
  },
  {
    title: 'Travel & Lifestyle Medicine',
    body: 'Pre-travel consults, vaccines, sleep, performance, and longevity — care that fits how you actually live.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-vbam-foam text-center" id="services" style={{ padding: '112px 0' }}>
      <div className="max-w-[1200px] mx-auto px-12">

        <div style={{ marginBottom: 52 }}>
          <ScrollReveal animation="left" as="div">
            <p
              className="font-archivo font-[700] text-vbam-coral"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
            >
              04 · Services
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <h2
              className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
              style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 14 }}
            >
              Modern primary care,{' '}
              <em className="font-cormorant italic text-grad-sunrise">on the coast.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p
              className="font-cormorant italic text-vbam-inlet mx-auto"
              style={{ fontSize: 19, maxWidth: 500, lineHeight: 1.45 }}
            >
              A complete practice for adults — preventive, proactive, and personal.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-3 gap-4 text-left">
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.title} animation="scale" delay={i * 80}>
              <div
                className="relative overflow-hidden rounded-lg border border-vbam-atlantic/[.08] group transition-all duration-[250ms] hover:-translate-y-0.5"
                style={{
                  background: '#FAF7EC',
                  padding: '32px 24px',
                  boxShadow: 'none',
                }}
              >
                {/* Top accent bar */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms]"
                  style={{ background: 'var(--grad-sunrise)' }}
                />
                <div
                  aria-hidden="true"
                  className="rounded-full"
                  style={{
                    width: 32, height: 32,
                    background: 'var(--grad-sunrise)',
                    marginBottom: 14, opacity: 0.85,
                  }}
                />
                <h3
                  className="font-fraunces font-[400] text-vbam-atlantic"
                  style={{ fontSize: 20, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.005em' }}
                >
                  {svc.title}
                </h3>
                <p
                  className="font-inter font-[300] text-vbam-atlantic/75"
                  style={{ fontSize: 14, lineHeight: 1.6 }}
                >
                  {svc.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
