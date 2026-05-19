import ScrollReveal from '@/components/shared/ScrollReveal';
import { PRIVIA_SECTION } from '@/content/home';

export default function PriviaSection() {
  return (
    <section className="text-center bg-vbam-foam" id="privia" style={{ padding: 'clamp(48px, 8vw, 112px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            {PRIVIA_SECTION.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 20 }}
          >
            {PRIVIA_SECTION.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{PRIVIA_SECTION.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 680, marginBottom: 56 }}
          >
            {PRIVIA_SECTION.body}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="scale" delay={120}>
          <a
            href={PRIVIA_SECTION.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Privia Medical Group — opens in new tab"
            className="inline-block group"
          >
            <div
              className="rounded-lg border border-vbam-atlantic/[.10] mx-auto transition-shadow hover:shadow-md"
              style={{ padding: '28px 40px', background: '#FFFFFF', maxWidth: 360 }}
            >
              <p
                className="font-archivo font-[700] text-vbam-atlantic/50 mb-3"
                style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                A Proud Member
              </p>
              <p
                className="font-fraunces font-[500] text-vbam-inlet"
                style={{ fontSize: 22, lineHeight: 1.2 }}
              >
                {PRIVIA_SECTION.wordmarkLine1}<br />
                <em className="font-cormorant italic text-vbam-sea-glass">{PRIVIA_SECTION.wordmarkLine2}</em>
              </p>
            </div>
          </a>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <a
            href={PRIVIA_SECTION.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-archivo font-[600] text-vbam-atlantic hover:text-vbam-inlet transition-colors inline-block"
            style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 26 }}
          >
            {PRIVIA_SECTION.linkLabel}
          </a>
        </ScrollReveal>

        <ScrollReveal delay={280}>
          <p
            className="font-cormorant italic text-vbam-inlet"
            style={{ fontSize: 18, marginTop: 18 }}
          >
            {PRIVIA_SECTION.footer}
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
