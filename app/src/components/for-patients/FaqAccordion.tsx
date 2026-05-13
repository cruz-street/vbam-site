'use client';
import { useState } from 'react';
import { FAQS } from '@/content/for-patients';

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-[720px] mx-auto">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="border-b border-vbam-atlantic/[.12]"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left flex items-center justify-between gap-4 py-5 group"
            aria-expanded={open === i}
          >
            <span className="font-fraunces font-[400] text-vbam-atlantic group-hover:text-vbam-inlet transition-colors" style={{ fontSize: 18, lineHeight: 1.3 }}>
              {faq.q}
            </span>
            <span
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
              style={{
                background: 'var(--grad-sunrise)',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="6" y1="1" x2="6" y2="11" stroke="#0A3D4A" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="1" y1="6" x2="11" y2="6" stroke="#0A3D4A" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          {open === i && (
            <p
              className="font-inter font-[300] text-vbam-atlantic/75 pb-5"
              style={{ fontSize: 15, lineHeight: 1.7 }}
            >
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
