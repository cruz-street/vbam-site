import { Fragment } from 'react';

const ITEMS = [
  'Now welcoming new patients',
  'Boutique panel · Direct doctor access',
  'Sibling of Vero Beach Pediatrics',
  'Most insurance accepted',
];

export default function TrustBar() {
  return (
    <div
      className="bg-vbam-sand border-y border-vbam-atlantic/[.08]"
      style={{ padding: '22px 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-12 flex justify-center items-center gap-[26px] flex-wrap">
        {ITEMS.map((item, i) => (
          <Fragment key={item}>
            <div className="flex items-center gap-[9px]">
              <span
                aria-hidden="true"
                className="w-[5px] h-[5px] rounded-full bg-vbam-coral flex-shrink-0"
              />
              <span
                className="font-archivo font-[700] text-vbam-inlet"
                style={{ fontSize: 11, letterSpacing: '0.13em', textTransform: 'uppercase' }}
              >
                {item}
              </span>
            </div>
            {i < ITEMS.length - 1 && (
              <span className="text-vbam-atlantic/[.22] select-none" aria-hidden="true">·</span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
