import { Fragment } from 'react';
import Link from 'next/link';
import { TRUST_BAR_ITEMS } from '@/content/home';

const TRUST_BAR_LINKS: Record<string, string> = {
  'Limited founding panel': '/for-patients/new-patient-registration/',
};

export default function TrustBar() {
  return (
    <div
      className="bg-vbam-sand border-y border-vbam-atlantic/[.08]"
      style={{ padding: '22px 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 flex justify-center items-center gap-[16px] sm:gap-[26px] flex-wrap">
        {TRUST_BAR_ITEMS.map((item, i) => {
          const href = TRUST_BAR_LINKS[item];
          const dot = (
            <span
              aria-hidden="true"
              className="w-[5px] h-[5px] rounded-full bg-vbam-coral flex-shrink-0"
            />
          );
          const label = (
            <span
              className="font-archivo font-[700] text-vbam-inlet"
              style={{ fontSize: 11, letterSpacing: '0.13em', textTransform: 'uppercase' }}
            >
              {item}
              {href && <span aria-hidden="true" style={{ marginLeft: 6 }}>→</span>}
            </span>
          );
          return (
            <Fragment key={item}>
              {href ? (
                <Link href={href} className="flex items-center gap-[9px] hover:text-vbam-coral transition-colors">
                  {dot}
                  {label}
                </Link>
              ) : (
                <div className="flex items-center gap-[9px]">
                  {dot}
                  {label}
                </div>
              )}
              {i < TRUST_BAR_ITEMS.length - 1 && (
                <span className="text-vbam-atlantic/[.22] select-none" aria-hidden="true">·</span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
