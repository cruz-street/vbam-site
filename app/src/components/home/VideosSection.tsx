'use client';
import { useEffect } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { VIDEOS_SECTION } from '@/content/home';
import { VIDEOS } from '@/content/videos';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { videoid?: string; playlabel?: string },
        HTMLElement
      >;
    }
  }
}

export default function VideosSection() {
  useEffect(() => {
    void import('lite-youtube-embed');
    void import('lite-youtube-embed/src/lite-yt-embed.css');
  }, []);

  if (VIDEOS.length === 0) return null;

  return (
    <section className="bg-vbam-sand" id="videos" style={{ padding: 'clamp(48px, 8vw, 112px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div" className="text-center">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            {VIDEOS_SECTION.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto text-center"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 20 }}
          >
            {VIDEOS_SECTION.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{VIDEOS_SECTION.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto text-center"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 680, marginBottom: 56 }}
          >
            {VIDEOS_SECTION.body}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEOS.map((v, i) => (
            <ScrollReveal key={v.id} animation="scale" delay={i * 100}>
              <figure
                className="rounded-lg overflow-hidden bg-vbam-foam border border-vbam-atlantic/[.08]"
              >
                <lite-youtube videoid={v.id} playlabel={`Play: ${v.title}`} />
                <figcaption style={{ padding: '18px 22px' }}>
                  <h3 className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 18, lineHeight: 1.25, marginBottom: v.description ? 6 : 0 }}>
                    {v.title}
                  </h3>
                  {v.description && (
                    <p className="font-inter font-[300] text-vbam-atlantic/[.7]" style={{ fontSize: 14, lineHeight: 1.55 }}>
                      {v.description}
                    </p>
                  )}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
