interface Props {
  className?: string;
  /** Unique prefix for the internal SVG gradient ID — must differ per page if rendered multiple times */
  gradId?: string;
  /** Stroke color for rays + wave 1. Use '#F5F1E8' on dark (Atlantic) backgrounds. */
  strokeColor?: string;
}

export default function SunSeaMark({ className, gradId = 'ssg', strokeColor = '#0A3D4A' }: Props) {
  const gid = `${gradId}-grad`;
  return (
    <svg className={className} viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9C784" />
          <stop offset="100%" stopColor="#EE7752" />
        </linearGradient>
      </defs>
      <g stroke={strokeColor} strokeWidth="1.1" strokeLinecap="round" fill="none">
        <line x1="50" y1="6"  x2="50"   y2="13"  />
        <line x1="38" y1="10" x2="41.5" y2="16"  />
        <line x1="62" y1="10" x2="58.5" y2="16"  />
        <line x1="29" y1="17" x2="33.5" y2="22"  />
        <line x1="71" y1="17" x2="66.5" y2="22"  />
      </g>
      <path d="M37 35 A 13 13 0 0 1 63 35 Z" fill={`url(#${gid})`} />
      <path d="M8 35 Q 25 33 37 35 L 63 35 Q 78 37 92 35"
            fill="none" stroke={strokeColor} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 44 Q 32 41 50 44 T 86 44"
            fill="none" stroke="#1A6B7E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M20 52 Q 35 50 50 52 T 80 52"
            fill="none" stroke="#5FB3C0" strokeWidth="1" strokeLinecap="round" opacity={0.5} />
    </svg>
  );
}
