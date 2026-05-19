import Link from 'next/link';
import SunSeaMark from '@/components/shared/SunSeaMark';

type FooterLink = { href: string; label: string; external?: boolean };

const LINKS: Record<string, FooterLink[]> = {
  Practice: [
    { href: '/about/',        label: 'About'          },
    { href: '/about/',        label: 'Our Doctors'    },
    { href: '/services/',     label: 'Services'       },
  ],
  Patients: [
    { href: '/contact/',      label: 'Book an Appointment' },
    { href: '/for-patients/', label: 'New Patient Forms'   },
    { href: '/for-patients/', label: 'Insurance'           },
    { href: 'https://www.myprivia.com/account-access/', label: 'Patient Portal', external: true },
    { href: 'https://payment.patient.athenahealth.com/statement/', label: 'Bill Pay', external: true },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--grad-atlantic)' }} className="text-vbam-foam/85 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        {/* Brand */}
        <div className="text-center mb-14">
          <Link href="/" className="inline-flex items-center gap-3 justify-center">
            <SunSeaMark gradId="footer" strokeColor="#F5F1E8" className="w-11 h-[27px]" />
            <span className="font-fraunces text-[22px] font-[400] text-vbam-foam">
              Vero Beach{' '}
              <em className="font-cormorant italic text-grad-sunrise ml-0.5">Adult Medicine</em>
            </span>
          </Link>
          <p className="font-cormorant italic text-[20px] text-vbam-sunrise mt-3">
            Sunrise to shoreline care.
          </p>
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
              <li>Mon – Thu · 8a – 5p</li>
              <li>Fri · 8a – 12p</li>
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
            className="font-archivo font-[700] text-vbam-foam/70 hover:text-vbam-sunrise transition-colors"
            style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            Proud to be part of Privia Medical Group
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
            <a href="https://www.priviahealth.com/" target="_blank" rel="noopener noreferrer" className="hover:text-vbam-foam/85 transition-colors">
              priviahealth.com
            </a>
          </nav>
        </div>

        {/* Colophon */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left pt-5 border-t border-vbam-foam/10 font-archivo text-[9px] tracking-[.14em] uppercase text-vbam-foam/35 gap-3">
          <span>© 2026 Vero Beach Adult Medicine · vbadultmedicine.com</span>
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
