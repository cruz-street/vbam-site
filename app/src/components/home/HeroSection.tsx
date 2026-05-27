'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HERO } from '@/content/home';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const markRef   = useRef<HTMLImageElement>(null);
  const veroRef   = useRef<HTMLSpanElement>(null);
  const adultRef  = useRef<HTMLSpanElement>(null);
  const tagRef    = useRef<HTMLParagraphElement>(null);
  const ledeRef   = useRef<HTMLParagraphElement>(null);
  const ctasRef   = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const washRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        if (!el) return;
        const offset = Math.max(0, window.scrollY) * 0.18;
        el.style.setProperty('--hero-parallax', `${offset}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    import('animejs').then(({ animate, stagger, createTimeline, svg }) => {
      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── Hero entrance timeline ──────────────────────────────────
      const tl = createTimeline({ defaults: { ease: 'outExpo' } });

      tl.add(markRef.current!,  { scale: [0.5, 1], opacity: [0, 1], duration: 900 }, 0)
        .add(veroRef.current!,  { translateY: ['-48px', '0px'], opacity: [0, 1], duration: 850 }, 300)
        .add(adultRef.current!, { translateY: ['36px', '0px'],  opacity: [0, 1], duration: 850 }, 480)
        .add(tagRef.current!,   { translateY: ['16px', '0px'],  opacity: [0, 1], duration: 700 }, 800)
        .add(ledeRef.current!,  { translateY: ['14px', '0px'],  opacity: [0, 1], duration: 650 }, 1000)
        .add(`#hero-ctas .hero-btn`, { translateY: ['12px', '0px'], opacity: [0, 1], delay: stagger(120), duration: 600 }, 1180);

      // ── Wave underline draws in after "Adult Medicine" ────────
      animate(svg.createDrawable('#hero-underline'), {
        draw: ['0 0', '0 1'],
        ease: 'inOutQuad',
        duration: 900,
        delay: 1380,
      });

      // ── Sunrise wash — wave-on-beach: rush in, hold, recede ──
      // Asymmetric timing is what sells "tide" vs generic pulse.
      if (!reducedMotion) {
        const washTl = createTimeline({ loop: true });
        washTl
          .add(washRef.current!, { scaleY: [1, 1.22], opacity: [0.80, 1.0], duration: 1600, ease: 'outSine'  }, 0)
          .add(washRef.current!, { scaleY: 1.22,      opacity: 1.0,          duration: 300,  ease: 'linear'   }, 1600)
          .add(washRef.current!, { scaleY: [1.22, 1], opacity: [1.0, 0.80],  duration: 2000, ease: 'inSine'   }, 1900);
      }

      // ── Glow orb entrance ─────────────────────────────────────
      animate(glowRef.current!, { scale: [0.85, 1], opacity: [0, 0.84], duration: 2200, ease: 'outExpo' });

      // ── Halo wave — out of phase from wash, "foam settling" ───
      setTimeout(() => {
        if (!reducedMotion) {
          animate(glowRef.current!, {
            scale:      [1, 1.16],
            translateY: ['0px', '32px'],
            opacity:    [0.78, 1.0],
            duration:   1800,
            ease:       'inOutSine',
            loop:       true,
            alternate:  true,
            delay:      400,
          });
        }
      }, 2400);

      // ── Logo float ────────────────────────────────────────────
      if (!reducedMotion) {
        animate(markRef.current!, { translateY: ['-7px', '7px'], duration: 3200, ease: 'inOutSine', loop: true, alternate: true, delay: 1600 });
      }

    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative text-center overflow-hidden"
      style={{ paddingTop: 'clamp(110px, 12vw, 160px)', paddingBottom: 'clamp(60px, 8vw, 110px)' }}
    >
      {/* Sunrise wash — parallax wrapper translates on scroll; inner element keeps anime.js scaleY */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-4/5 pointer-events-none"
        style={{ transform: 'translate3d(0, var(--hero-parallax, 0px), 0)', willChange: 'transform' }}
      >
        <div
          ref={washRef}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 85% 105% at 50% 0%, #F9C784 0%, #FBCF9A 20%, #F7D8B4 40%, rgba(245,241,232,.88) 70%, #F5F1E8 100%)',
            transformOrigin: 'top center',
            opacity: 0.89,
          }}
        />
      </div>
      {/* Separator line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 pointer-events-none h-px"
        style={{ top: '63%', background: 'linear-gradient(90deg, transparent, rgba(10,61,74,.13) 25%, rgba(10,61,74,.13) 75%, transparent)' }}
      />

      {/* Halo disc — breathes out of phase from wash */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          opacity: 0,
          top: -80, left: '50%', marginLeft: -400,
          width: 800, height: 640,
          background: 'radial-gradient(ellipse at 50% 42%, rgba(249,199,132,.58) 0%, rgba(249,199,132,.22) 42%, rgba(238,119,82,.08) 62%, transparent 72%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        {/* Sun & Sea mark — official logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={markRef}
          src="/images/vbam-mark.svg"
          alt=""
          aria-hidden="true"
          style={{ width: 'clamp(180px, 26vw, 300px)', height: 'auto', display: 'block', margin: '0 auto 30px', opacity: 0 }}
        />

        {/* Wordmark */}
        <h1
          className="font-fraunces font-[400] text-vbam-atlantic"
          style={{ fontSize: 'clamp(54px, 9vw, 118px)', lineHeight: 0.96, letterSpacing: '-0.022em' }}
        >
          <span ref={veroRef} style={{ display: 'block', opacity: 0 }}>Vero Beach</span>
          <span
            ref={adultRef}
            className="font-cormorant italic text-grad-sunrise"
            style={{ display: 'block', marginTop: -4, opacity: 0 }}
          >
            Adult Medicine
          </span>
        </h1>

        {/* Wave underline — 3 arcs echoing the logo waves, draws in via createDrawable */}
        <div className="flex justify-center" style={{ marginTop: 10 }}>
          <svg
            viewBox="0 0 400 14"
            preserveAspectRatio="none"
            style={{ width: 'clamp(180px, 35vw, 440px)', height: 14, overflow: 'visible' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ul-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F9C784" />
                <stop offset="100%" stopColor="#EE7752" />
              </linearGradient>
            </defs>
            <path
              id="hero-underline"
              d="M 0,7 Q 66,1 133,7 Q 200,13 267,7 Q 334,1 400,7"
              fill="none"
              stroke="url(#ul-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Tagline */}
        <p
          ref={tagRef}
          className="font-cormorant italic text-vbam-inlet mx-auto"
          style={{ fontSize: 'clamp(19px, 2.4vw, 26px)', marginTop: 22, maxWidth: 620, lineHeight: 1.4, opacity: 0 }}
        >
          {HERO.tagline}
        </p>

        {/* Lede */}
        <p
          ref={ledeRef}
          className="font-inter font-[300] text-vbam-atlantic/75 mx-auto w-full"
          style={{ fontSize: 17, marginTop: 18, maxWidth: 540, lineHeight: 1.65, opacity: 0 }}
        >
          {HERO.lede}
        </p>

        {/* CTAs */}
        <div id="hero-ctas" ref={ctasRef} className="flex gap-3 justify-center flex-wrap" style={{ marginTop: 36 }}>
          <Link
            href="/contact/"
            className="hero-btn btn-primary font-archivo text-[14px] font-[600] px-6 py-3.5 rounded-full transition-colors inline-flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            {HERO.cta1} →
          </Link>
          <Link
            href="/about/"
            className="hero-btn font-archivo text-[14px] font-[600] text-vbam-atlantic px-6 py-3.5 rounded-full border border-vbam-atlantic/20 hover:border-vbam-atlantic/50 transition-colors"
            style={{ opacity: 0, backdropFilter: 'blur(6px)', background: 'rgba(245,241,232,.6)' }}
          >
            {HERO.cta2}
          </Link>
        </div>

      </div>
    </section>
  );
}
