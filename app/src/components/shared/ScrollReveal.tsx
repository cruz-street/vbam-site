'use client';
import { useRef, useEffect, type ReactNode, type CSSProperties, type ElementType } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  animation?: 'rise' | 'left' | 'scale';
  delay?: number; // ms
  threshold?: number;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  className = '',
  style,
  animation = 'rise',
  delay = 0,
  threshold = 0.12,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transitionDelay = delay ? `${delay}ms` : '';

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-in');
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold]);

  const srClass = { rise: 'sr-rise', left: 'sr-left', scale: 'sr-scale' }[animation];

  return <Tag ref={ref} className={`${srClass} ${className}`} style={style}>{children}</Tag>;
}
