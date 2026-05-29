import ScrollReveal from '@/components/shared/ScrollReveal';
import { FACEBOOK_UPDATES } from '@/content/home';

export default function FacebookUpdates() {
  const { pageUrl, eyebrow, heading, headingItalic, body } = FACEBOOK_UPDATES;
  if (!pageUrl) return null;

  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=500&height=520&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false`;

  return (
    <section className="bg-vbam-foam border-b border-vbam-atlantic/[.06]" style={{ padding: 'clamp(32px, 5vw, 64px) 0' }}>
      <div className="max-w-[1040px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">

          <ScrollReveal animation="left" as="div" className="md:col-span-2">
            <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
              {eyebrow}
            </p>
            <h3 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.18, letterSpacing: '-0.012em', marginBottom: 14 }}>
              {heading} <em className="font-cormorant italic text-grad-sunrise">{headingItalic}</em>
            </h3>
            <p className="font-inter font-[300] text-vbam-atlantic/[.78]" style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>
              {body}
            </p>
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-archivo font-[600] text-vbam-coral hover:text-vbam-inlet transition-colors inline-flex items-center gap-1"
              style={{ fontSize: 12, letterSpacing: '0.04em' }}
            >
              View our Facebook →
            </a>
          </ScrollReveal>

          <ScrollReveal delay={80} as="div" className="md:col-span-3 w-full">
            <div className="bg-white rounded-lg overflow-hidden border border-vbam-atlantic/[.10]" style={{ minHeight: 200 }}>
              <iframe
                src={src}
                title="Vero Beach Adult Medicine — Latest from Facebook"
                width="500"
                height="520"
                style={{ border: 'none', overflow: 'hidden', display: 'block', maxWidth: '100%', width: '100%' }}
                scrolling="no"
                allow="encrypted-media"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
