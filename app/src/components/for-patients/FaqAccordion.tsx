'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'Are you accepting new patients?',
    a: 'Yes — we are actively welcoming new patients. Book an appointment online or call us at (772) 569-3212 to get started.',
  },
  {
    q: 'Do you accept my insurance?',
    a: 'We accept most major insurance plans including Medicare, Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, and others. Call our office to verify your specific plan before your first visit.',
  },
  {
    q: 'How do I transfer from Vero Beach Pediatrics?',
    a: 'Transferring is simple — we already have a relationship with the VBP team. Call our office and let us know you\'re a VBP family. We\'ll coordinate your records and make the transition as seamless as possible.',
  },
  {
    q: 'What is the same-day sick visit policy?',
    a: 'Call or message us through the patient portal in the morning. We reserve same-day slots for acute illness and will do our best to see you the same day you call.',
  },
  {
    q: 'What should I bring to my first appointment?',
    a: 'Please bring a valid photo ID, your insurance card, a list of current medications and dosages, any relevant medical records or lab results, and a list of questions or concerns you\'d like to discuss.',
  },
  {
    q: 'Do you offer telehealth visits?',
    a: 'Yes, telehealth visits are available for appropriate follow-ups and consultations. Contact our office to determine if your visit qualifies for a virtual appointment.',
  },
];

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
