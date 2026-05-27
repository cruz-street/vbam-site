/* eslint-disable @next/next/no-img-element */
interface Props {
  className?: string;
  /** Render the mark in white for dark (Atlantic) backgrounds, e.g. the footer. */
  onDark?: boolean;
}

/**
 * Sun & Sea mark — the official Vero Beach Adult Medicine logo (final brand
 * vector). Rendered as the static SVG asset at /images/vbam-mark.svg so it
 * stays pixel-true to the artwork. On dark backgrounds, a brightness/invert
 * filter renders it as a clean white silhouette (no separate white asset).
 */
export default function SunSeaMark({ className, onDark = false }: Props) {
  return (
    <img
      src="/images/vbam-mark.svg"
      alt=""
      aria-hidden="true"
      className={className}
      style={onDark ? { filter: 'brightness(0) invert(1)', opacity: 0.92 } : undefined}
    />
  );
}
