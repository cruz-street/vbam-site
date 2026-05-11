import Link from 'next/link';
import SunSeaMark from '@/components/shared/SunSeaMark';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="max-w-[1200px] mx-auto px-12 flex items-center justify-between gap-10">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <SunSeaMark gradId="nav" className="w-9 h-[22px]" />
          <span className="font-fraunces text-[17px] font-[500] text-vbam-atlantic leading-none">
            Vero Beach{' '}
            <em className="font-cormorant not-italic italic text-grad-sunrise ml-0.5">
              Adult Medicine
            </em>
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          {[
            { href: '/about/',       label: 'Our Doctors' },
            { href: '/services/',    label: 'Services'    },
            { href: '/for-patients/', label: 'For Patients' },
          ].map(({ href, label }) => (
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
            className="font-archivo text-[13px] font-[600] bg-vbam-atlantic text-vbam-foam px-5 py-2.5 rounded-full hover:bg-vbam-inlet transition-colors"
          >
            Book an Appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
