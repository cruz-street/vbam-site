import Link from 'next/link';
import SunSeaMark from '@/components/shared/SunSeaMark';
import PriviaLogo from '@/components/shared/PriviaLogo';

type FooterLink = { href: string; label: string; external?: boolean };

const LINKS: Record<string, FooterLink[]> = {
  Practice: [
    { href: '/about/',        label: 'About'          },
    { href: '/services/',     label: 'Services'       },
    { href: '/for-patients/', label: 'For Patients'   },
  ],
  Patients: [
    { href: '/contact/',      label: 'Book an Appointment' },
    { href: '/for-patients/new-patient-registration/', label: 'New Patient Registration' },
    { href: '/for-patients/#insurance', label: 'Insurance'           },
    { href: 'https://www.myprivia.com/account-access/', label: 'Patient Portal', external: true },
    { href: 'https://payment.patient.athenahealth.com/statement/', label: 'Bill Pay', external: true },
  ],
};

type Social = { label: string; href: string; icon: 'facebook' | 'instagram' };

const SOCIAL: Social[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/verobeachadultmedicine', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/verobeachadultmedicine/', icon: 'instagram' },
];

function SocialIcon({ icon }: { icon: Social['icon'] }) {
  if (icon === 'facebook') {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9.5c0-.28.22-.5.5-.5z" />
      </svg>
    );
  }
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--grad-atlantic)' }} className="text-vbam-foam/85 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        {/* Brand */}
        <div className="text-center mb-14">
          <Link href="/" className="inline-flex items-center gap-3 justify-center">
            <SunSeaMark onDark className="w-12 h-auto" />
            <span className="font-fraunces text-[22px] font-[400] text-vbam-foam">
              Vero Beach{' '}
              <em className="font-cormorant italic text-grad-sunrise ml-0.5">Adult Medicine</em>
            </span>
          </Link>
          <p className="font-cormorant italic text-[20px] text-vbam-sunrise mt-3">
            Sunrise to shoreline care.
          </p>
          {SOCIAL.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-5">
              {SOCIAL.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Vero Beach Adult Medicine on ${label}`}
                  className="flex items-center justify-center rounded-full border border-vbam-foam/20 text-vbam-foam/80 hover:text-vbam-sunrise hover:border-vbam-sunrise/50 transition-colors"
                  style={{ width: 38, height: 38 }}
                >
                  <SocialIcon icon={icon} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div>
            <h4 className="font-archivo text-[9px] font-[700] tracking-[.2em] uppercase text-vbam-foam/40 mb-3">
              Visit
            </h4>
            <ul className="space-y-1.5 font-inter text-[13px] text-vbam-foam/75 leading-relaxed">
              <li>Citrus Medical Plaza</li>
              <li>955 37th Place</li>
              <li>Vero Beach, FL 32960</li>
              <li>
                <a href="tel:7725693212" className="hover:text-vbam-sunrise transition-colors">
                  (772) 569-3212
                </a>
              </li>
            </ul>
          </div>

          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-archivo text-[9px] font-[700] tracking-[.2em] uppercase text-vbam-foam/40 mb-3">
                {section}
              </h4>
              <ul className="space-y-1.5">
                {items.map(({ href, label, external }) =>
                  external ? (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-inter text-[13px] text-vbam-foam/75 hover:text-vbam-sunrise transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ) : (
                    <li key={label}>
                      <Link
                        href={href}
                        className="font-inter text-[13px] text-vbam-foam/75 hover:text-vbam-sunrise transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-archivo text-[9px] font-[700] tracking-[.2em] uppercase text-vbam-foam/40 mb-3">
              Hours
            </h4>
            <ul className="font-inter text-[13px] text-vbam-foam/75 space-y-1.5">
              <li>Mon, Wed – Fri · 8a – 12p</li>
              <li>Mon, Wed – Fri · 1p – 5p</li>
              <li>Tue · Closed</li>
              <li>Sat – Sun · Closed</li>
              <li className="text-vbam-sea-glass mt-2">By appointment</li>
            </ul>
          </div>
        </div>

        {/* Privia attribution + compliance band */}
        <div className="pt-6 pb-5 border-t border-vbam-foam/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <a
            href="https://www.priviahealth.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-vbam-foam/70 hover:text-vbam-sunrise transition-colors"
            aria-label="Privia Medical Group — priviahealth.com"
          >
            {/* Placeholder logo — replace with official Privia asset when provided */}
            <PriviaLogo variant="light" height={20} className="opacity-70" />
            <span
              className="font-archivo font-[700]"
              style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              Proud to be part of Privia Medical Group
            </span>
          </a>
          <nav
            aria-label="Privia compliance"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-archivo text-vbam-foam/55"
            style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            <a href="https://www.priviahealth.com/notice-nondiscrimination/" target="_blank" rel="noopener noreferrer" className="hover:text-vbam-foam/85 transition-colors">
              Notice of Nondiscrimination
            </a>
            <a href="https://www.priviahealth.com/privacy-and-compliance/" target="_blank" rel="noopener noreferrer" className="hover:text-vbam-foam/85 transition-colors">
              HIPAA Privacy Notice
            </a>
            <a href="https://www.priviahealth.com/newsroom/" target="_blank" rel="noopener noreferrer" className="hover:text-vbam-foam/85 transition-colors">
              Press Room
            </a>
            <a href="https://www.priviahealth.com/who-we-support/physicians/" target="_blank" rel="noopener noreferrer" className="hover:text-vbam-foam/85 transition-colors">
              Prospective Doctors
            </a>
            <a href="https://www.priviahealth.com/" target="_blank" rel="noopener noreferrer" className="hover:text-vbam-foam/85 transition-colors">
              priviahealth.com
            </a>
          </nav>
        </div>

        {/* Colophon */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left pt-5 border-t border-vbam-foam/10 font-archivo text-[9px] tracking-[.14em] uppercase text-vbam-foam/35 gap-3">
          <span>© 2026 Vero Beach Adult Medicine · verobeachadultmedicine.com</span>
          <span>
            <Link href="/contact/" className="hover:text-vbam-foam/60 transition-colors mr-4">Contact</Link>
            Sibling of{' '}
            <a href="https://verobeachpediatrics.com" className="hover:text-vbam-foam/60 transition-colors">
              Vero Beach Pediatrics
            </a>
          </span>
        </div>

      </div>
    </footer>
  );
}
