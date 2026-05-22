interface Props {
  variant?: 'light' | 'dark';
  height?: number;
  className?: string;
}

export default function PriviaLogo({ variant = 'light', height = 22, className }: Props) {
  const ringColor = variant === 'light' ? '#F5F1E8' : '#0A3D4A';
  const textColor = variant === 'light' ? '#F5F1E8' : '#0A3D4A';
  const ringOpacity = variant === 'light' ? 0.85 : 0.9;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 40"
      height={height}
      role="img"
      aria-label="Privia Medical Group"
      className={className}
      style={{ display: 'inline-block' }}
    >
      <g>
        <path
          d="M 26 4 A 16 16 0 1 0 32 36"
          fill="none"
          stroke={ringColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity={ringOpacity}
        />
        <text
          x="48"
          y="22"
          fontFamily="'Archivo', 'Helvetica Neue', sans-serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="0.06em"
          fill={textColor}
        >
          PRIVIA
        </text>
        <text
          x="106"
          y="14"
          fontFamily="'Archivo', 'Helvetica Neue', sans-serif"
          fontSize="6"
          fill={textColor}
          opacity="0.75"
        >
          TM
        </text>
        <text
          x="48"
          y="34"
          fontFamily="'Archivo', 'Helvetica Neue', sans-serif"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="0.18em"
          fill={textColor}
          opacity="0.78"
        >
          MEDICAL GROUP
        </text>
      </g>
    </svg>
  );
}
