import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function CtaStrip() {
  return (
    <section
      id="schedule"
      className="text-center"
      style={{ background: 'var(--grad-sunrise)', padding: '86px 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-12">

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.06, letterSpacing: '-0.018em', maxWidth: 740 }}
          >
            Now welcoming{' '}
            <em
              className="font-cormorant italic text-vbam-atlantic"
              style={{
                textDecoration: 'underline',
                textDecorationColor: 'rgba(10,61,74,.35)',
                textUnderlineOffset: 5,
                textDecorationThickness: '1.5px',
              }}
            >
              new patients.
            </em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/75 mx-auto"
            style={{ fontSize: 16, maxWidth: 520, margin: '16px auto 32px' }}
          >
            Schedule your first visit in minutes. Same coastline, same family — a practice built for the way you actually live.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/contact/"
              className="font-archivo font-[600] bg-vbam-atlantic text-vbam-foam hover:bg-vbam-inlet transition-colors inline-flex items-center gap-2 rounded-full"
              style={{ fontSize: 14, padding: '14px 28px' }}
            >
              Book an Appointment →
            </Link>
            <Link
              href="/contact/"
              className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full"
              style={{ fontSize: 14, padding: '14px 28px', background: 'rgba(245,241,232,.45)', backdropFilter: 'blur(6px)' }}
            >
              Contact Us
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
