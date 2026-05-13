'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { DOCTORS } from '@/content/doctors';

const AUTO_INTERVAL = 7000;

export default function DoctorsSection() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const multiSlide = DOCTORS.length > 1;

  const goTo = useCallback((idx: number) => {
    if (!multiSlide || isAnimating || idx === active) return;
    setIsAnimating(true);
    setActive(idx);
    setTimeout(() => setIsAnimating(false), 420);
  }, [active, isAnimating, multiSlide]);

  const next = useCallback(() => goTo((active + 1) % DOCTORS.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + DOCTORS.length) % DOCTORS.length), [active, goTo]);

  useEffect(() => {
    if (!multiSlide) return;
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (progressRef.current) {
            progressRef.current.style.transition = `width ${AUTO_INTERVAL}ms linear`;
            progressRef.current.style.width = '100%';
          }
        });
      });
    }
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active, next, multiSlide]);

  return (
    <section
      id="doctors"
      className="relative overflow-hidden bg-vbam-sand"
      style={{ height: '100vh', minHeight: 600 }}
    >
      <div className="relative w-full h-full">
        {DOCTORS.map((doc, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: i === active ? 1 : 0,
              pointerEvents: i === active ? 'all' : 'none',
              transition: 'opacity 0.4s ease',
            }}
          >
            <div className="text-center" style={{ maxWidth: 720, width: '100%', padding: 'clamp(32px, 5vw, 80px) clamp(16px, 4vw, 48px)' }}>

              {/* Photo placeholder */}
              <div className="flex justify-center" style={{ marginBottom: 32 }}>
                <div
                  aria-hidden="true"
                  className="rounded-full relative overflow-hidden"
                  style={{
                    width: 'clamp(160px, 30vw, 260px)', height: 'clamp(160px, 30vw, 260px)',
                    background: 'var(--foam)',
                    boxShadow: '0 24px 64px -28px rgba(10,61,74,.3)',
                    border: '1px solid rgba(10,61,74,.07)',
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 30%, #FBCF9A 0%, #F7D8B4 30%, rgba(245,241,232,.5) 65%, #E8DCC8 100%)',
                      opacity: 0.55,
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      bottom: '55%', left: '50%', transform: 'translateX(-50%)',
                      width: '30%', aspectRatio: '1', borderRadius: '50%',
                      background: 'rgba(10,61,74,.18)',
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      bottom: 0, left: '50%', transform: 'translateX(-50%)',
                      width: '60%', height: '58%',
                      background: 'rgba(10,61,74,.18)',
                      borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
                    }}
                  />
                </div>
              </div>

              <p
                className="font-archivo font-[700] text-vbam-coral"
                style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}
              >
                {doc.eyebrow}
              </p>

              <h3
                className="font-fraunces font-[400] text-vbam-atlantic"
                style={{ fontSize: 'clamp(30px, 4vw, 46px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 20 }}
              >
                {doc.namePrefix}
                <em className="font-cormorant italic text-grad-sunrise">{doc.nameItalic}</em>
              </h3>

              <div className="flex flex-wrap gap-[7px] justify-center" style={{ marginBottom: 22 }}>
                {doc.credentials.map((c) => (
                  <span
                    key={c}
                    className="font-archivo font-[700] bg-vbam-foam text-vbam-inlet border border-vbam-atlantic/10"
                    style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 13px', borderRadius: 999 }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p
                className="font-inter font-[300] text-vbam-atlantic/[.82] mx-auto"
                style={{ fontSize: 16, lineHeight: 1.72, maxWidth: 560, marginBottom: 20 }}
              >
                {doc.bio}
              </p>

              {doc.link && (
                <Link
                  href={doc.link}
                  className="font-archivo font-[700] text-vbam-coral inline-flex items-center gap-[6px] transition-[gap] hover:gap-[10px]"
                  style={{
                    fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                    borderBottom: '1.5px solid rgba(238,119,82,.3)', paddingBottom: 2,
                  }}
                >
                  {doc.linkLabel} →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Prev/next arrows — only when multiple doctors */}
      {multiSlide && (
        <>
          <button
            onClick={prev}
            aria-label="Previous doctor"
            className="hidden sm:flex absolute top-1/2 z-10 -translate-y-1/2 items-center justify-center transition-transform hover:scale-[1.08]"
            style={{
              left: 12, width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(245,241,232,.75)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(10,61,74,.12)', color: '#0A3D4A', cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next doctor"
            className="hidden sm:flex absolute top-1/2 z-10 -translate-y-1/2 items-center justify-center transition-transform hover:scale-[1.08]"
            style={{
              right: 12, width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(245,241,232,.75)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(10,61,74,.12)', color: '#0A3D4A', cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators — only when multiple doctors */}
      {multiSlide && (
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex gap-[10px] z-10">
          {DOCTORS.map((doc, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to ${doc.namePrefix}${doc.nameItalic}`}
              className="p-0 border-none cursor-pointer transition-transform"
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i === active ? '#EE7752' : 'rgba(10,61,74,.25)',
                transform: i === active ? 'scale(1.35)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Progress bar — only when multiple doctors */}
      {multiSlide && (
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 h-[2px]"
          style={{ background: 'var(--grad-sunrise)', width: '0%' }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}
