interface Props {
  className?: string;
  /** Kept for backward compatibility with existing call sites; no longer used
   *  now that the sun is a solid fill (logo V4). Safe to omit. */
  gradId?: string;
  /** Stroke color for rays + the upper (navy) wave.
   *  Use '#F5F1E8' on dark (Atlantic) backgrounds. Default = Atlantic. */
  strokeColor?: string;
  /** Solid fill for the sun. Defaults to the brand sun token value. */
  sunColor?: string;
  /** Color for the lower wave. Defaults to Sea Glass. */
  waveColor?: string;
}

/**
 * Sun & Sea mark — Vero Beach Adult Medicine logo V4.
 * Solid amber sun, seven navy rays, two waves (navy + sea glass).
 * Hand-built to match the approved V4 brand logo. viewBox kept at 100×60
 * so existing width/height utility classes render at the same proportions.
 */
export default function SunSeaMark({
  className,
  strokeColor = '#0A3D4A',
  sunColor = '#F9A826',
  waveColor = '#5FB3C0',
}: Props) {
  return (
    <svg className={className} viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Seven rays — fanned across the top hemisphere, detached from the sun */}
      <g stroke={strokeColor} strokeWidth="1.1" strokeLinecap="round" fill="none">
        <line x1="50"    y1="19.5" x2="50"    y2="13"   />
        <line x1="56.18" y1="20.7" x2="58.62" y2="14.67" />
        <line x1="43.82" y1="20.7" x2="41.38" y2="14.67" />
        <line x1="61.46" y1="24.13" x2="65.98" y2="19.46" />
        <line x1="38.54" y1="24.13" x2="34.02" y2="19.46" />
        <line x1="65.07" y1="29.29" x2="71.01" y2="26.64" />
        <line x1="34.93" y1="29.29" x2="28.99" y2="26.64" />
      </g>

      {/* Sun — solid amber semicircle */}
      <path d="M37 36 A 13 13 0 0 1 63 36 Z" fill={sunColor} />

      {/* Upper wave — navy, hugs the sun base */}
      <path d="M8 37 Q 25 34.5 37 37 L 63 37 Q 78 39 92 37"
            fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" />

      {/* Lower wave — sea glass */}
      <path d="M14 46 Q 32 43 50 46 T 86 46"
            fill="none" stroke={waveColor} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
