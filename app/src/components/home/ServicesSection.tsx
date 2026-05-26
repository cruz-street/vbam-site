import ScrollReveal from '@/components/shared/ScrollReveal';
import { HOME_SERVICES, SERVICES_SECTION } from '@/content/home';

export default function ServicesSection() {
  return (
    <section className="bg-vbam-foam text-center" id="services" style={{ padding: 'clamp(32px, 5vw, 64px) 0 clamp(48px, 8vw, 112px)' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <div style={{ marginBottom: 52 }}>
          <ScrollReveal animation="left" as="div">
            <p
              className="font-archivo font-[700] text-vbam-coral"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
            >
              {SERVICES_SECTION.eyebrow}
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <h2
              className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
              style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 14 }}
            >
              {SERVICES_SECTION.headingLine1}{' '}
              <em className="font-cormorant italic text-grad-sunrise">{SERVICES_SECTION.headingItalic}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p
              className="font-cormorant italic text-vbam-inlet mx-auto"
              style={{ fontSize: 19, maxWidth: 500, lineHeight: 1.45 }}
            >
              {SERVICES_SECTION.subhead}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {HOME_SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.title} animation="scale" delay={i * 80}>
              <div
                className="relative overflow-hidden rounded-lg border border-vbam-atlantic/[.08] group transition-all duration-[250ms] hover:-translate-y-0.5"
                style={{ background: '#FAF7EC', padding: '32px 24px' }}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms]"
                  style={{ background: 'var(--grad-sunrise)' }}
                />
                <div
                  aria-hidden="true"
                  className="rounded-full"
                  style={{ width: 32, height: 32, background: 'var(--grad-sunrise)', marginBottom: 14, opacity: 0.85 }}
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
