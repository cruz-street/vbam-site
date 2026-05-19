'use client';
import { useState } from 'react';
import Link from 'next/link';
import SunSeaMark from '@/components/shared/SunSeaMark';

const NAV_LINKS = [
  { href: '/about/',        label: 'About'        },
  { href: '/services/',     label: 'Services'     },
  { href: '/for-patients/', label: 'For Patients' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between gap-10">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <SunSeaMark gradId="nav" className="w-9 h-[22px]" />
          <span className="font-fraunces text-[17px] font-[500] text-vbam-atlantic leading-none">
            Vero Beach{' '}
            <em className="font-cormorant not-italic italic text-grad-sunrise ml-0.5">
              Adult Medicine
            </em>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-archivo text-[13px] font-[500] text-vbam-atlantic opacity-80 hover:opacity-100 transition-opacity"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact/"
            className="btn-primary font-archivo text-[13px] font-[600] px-5 py-2.5 rounded-full transition-colors"
          >
            Book an Appointment
          </Link>
        </nav>

        {/* Hamburger — mobile only, animates to × */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] shrink-0"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 bg-vbam-atlantic rounded-full"
            style={{
              height: '1.5px',
              transition: 'transform 220ms cubic-bezier(0.4,0,0.2,1)',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-5 bg-vbam-atlantic rounded-full"
            style={{
              height: '1.5px',
              transition: 'opacity 180ms ease',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 bg-vbam-atlantic rounded-full"
            style={{
              height: '1.5px',
              transition: 'transform 220ms cubic-bezier(0.4,0,0.2,1)',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown — always in DOM, slide + fade via max-height + opacity */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: menuOpen ? 420 : 0,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'max-height 320ms cubic-bezier(0.4,0,0.2,1), opacity 220ms ease, transform 220ms ease',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Sunrise rule at top */}
        <div aria-hidden="true" style={{ height: 2, background: 'var(--grad-sunrise)' }} />

        <div className="bg-vbam-sand">
          <nav className="flex flex-col px-5 sm:px-8 pt-1 pb-1">
            {NAV_LINKS.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between py-[18px] font-fraunces font-[400] text-vbam-atlantic hover:text-vbam-inlet transition-colors"
                style={{
                  fontSize: 22,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(10,61,74,.09)' : 'none',
                }}
              >
                <span>{label}</span>
                <span
                  className="text-vbam-coral transition-[transform,opacity] group-hover:translate-x-1"
                  style={{ fontSize: 16, opacity: 0.55 }}
                >
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="px-5 sm:px-8 py-5">
            <Link
              href="/contact/"
              onClick={() => setMenuOpen(false)}
              className="font-archivo font-[600] text-center block rounded-full"
              style={{
                fontSize: 13,
                padding: '14px 28px',
                background: 'var(--grad-sunrise)',
                color: 'var(--color-vbam-atlantic)',
                letterSpacing: '0.01em',
              }}
            >
              Book an Appointment →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
