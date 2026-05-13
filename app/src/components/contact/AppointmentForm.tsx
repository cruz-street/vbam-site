'use client';
import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputCls = [
  'w-full font-inter font-[300] text-vbam-atlantic bg-vbam-foam',
  'border border-vbam-atlantic/[.15] rounded-lg px-4 py-3',
  'placeholder:text-vbam-atlantic/40',
  'focus:outline-none focus:border-vbam-inlet focus:ring-1 focus:ring-vbam-inlet/30',
  'transition-colors',
].join(' ');

export default function AppointmentForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center" style={{ padding: '48px 0' }}>
        <div
          aria-hidden="true"
          className="mx-auto flex items-center justify-center rounded-full"
          style={{ width: 56, height: 56, background: 'var(--grad-sunrise)', marginBottom: 20 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A3D4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 24, marginBottom: 10 }}>
          Request received.
        </h3>
        <p className="font-inter font-[300] text-vbam-atlantic/70" style={{ fontSize: 15, lineHeight: 1.65 }}>
          We'll be in touch within one business day to confirm your appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Web3Forms access key */}
      <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''} />
      <input type="hidden" name="subject" value="New Appointment Request — VBAM" />
      <input type="hidden" name="from_name" value="Vero Beach Adult Medicine Website" />
      {/* Honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-archivo font-[700] text-vbam-atlantic/60 block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            First Name <span className="text-vbam-coral">*</span>
          </label>
          <input required name="first_name" type="text" placeholder="Jane" className={inputCls} style={{ fontSize: 15 }} />
        </div>
        <div>
          <label className="font-archivo font-[700] text-vbam-atlantic/60 block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Last Name <span className="text-vbam-coral">*</span>
          </label>
          <input required name="last_name" type="text" placeholder="Smith" className={inputCls} style={{ fontSize: 15 }} />
        </div>
      </div>

      <div>
        <label className="font-archivo font-[700] text-vbam-atlantic/60 block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Email Address <span className="text-vbam-coral">*</span>
        </label>
        <input required name="email" type="email" placeholder="jane@example.com" className={inputCls} style={{ fontSize: 15 }} />
      </div>

      <div>
        <label className="font-archivo font-[700] text-vbam-atlantic/60 block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Phone Number
        </label>
        <input name="phone" type="tel" placeholder="(772) 555-0100" className={inputCls} style={{ fontSize: 15 }} />
      </div>

      <div>
        <label className="font-archivo font-[700] text-vbam-atlantic/60 block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Reason for Visit
        </label>
        <select name="reason" className={inputCls} style={{ fontSize: 15 }} defaultValue="">
          <option value="" disabled>Select one…</option>
          <option>Annual Physical / Wellness Exam</option>
          <option>Establish Care (New Patient)</option>
          <option>Chronic Condition Follow-Up</option>
          <option>Same-Day / Urgent Visit</option>
          <option>Women's Health</option>
          <option>Men's Health</option>
          <option>Preventive Screening / Labs</option>
          <option>Travel Medicine</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="font-archivo font-[700] text-vbam-atlantic/60 block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Message <span className="font-[400] normal-case" style={{ letterSpacing: 0 }}>(optional)</span>
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Anything else you'd like us to know…"
          className={inputCls}
          style={{ fontSize: 15, resize: 'vertical' }}
        />
      </div>

      {status === 'error' && (
        <p className="font-inter text-vbam-coral" style={{ fontSize: 14 }}>
          Something went wrong. Please try again or call us at (772) 569-3212.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full font-archivo font-[600] disabled:opacity-60 transition-colors rounded-full"
        style={{ fontSize: 14, padding: '14px 28px' }}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Request →'}
      </button>

      <p className="font-inter text-vbam-atlantic/40 text-center" style={{ fontSize: 12, lineHeight: 1.5 }}>
        Not for medical emergencies. Call 911 or go to your nearest emergency room.
      </p>
    </form>
  );
}
