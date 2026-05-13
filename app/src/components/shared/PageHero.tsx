import ScrollReveal from '@/components/shared/ScrollReveal';

interface Props {
  eyebrow?: string;
  heading: string;
  headingItalic?: string;
  subhead?: string;
  bg?: 'sand' | 'foam';
}

export default function PageHero({ eyebrow, heading, headingItalic, subhead, bg = 'sand' }: Props) {
  return (
    <section
      className={bg === 'sand' ? 'bg-vbam-sand' : 'bg-vbam-foam'}
      style={{ paddingTop: 'clamp(110px, 12vw, 160px)', paddingBottom: 'clamp(40px, 6vw, 80px)', textAlign: 'center' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {eyebrow && (
          <ScrollReveal>
            <p
              className="font-archivo font-[700] text-vbam-coral"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 22 }}
            >
              {eyebrow}
            </p>
          </ScrollReveal>
        )}
        <ScrollReveal delay={eyebrow ? 60 : 0}>
          <h1
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
            style={{ fontSize: 'clamp(38px, 6vw, 72px)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 760 }}
          >
            {heading}
            {headingItalic && (
              <em className="font-cormorant italic text-grad-sunrise"> {headingItalic}</em>
            )}
          </h1>
        </ScrollReveal>
        {subhead && (
          <ScrollReveal delay={120}>
            <p
              className="font-inter font-[300] text-vbam-atlantic/70 mx-auto"
              style={{ fontSize: 18, lineHeight: 1.65, maxWidth: 580, marginTop: 20 }}
            >
              {subhead}
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
