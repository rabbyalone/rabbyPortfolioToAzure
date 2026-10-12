import React, { useRef, useState, useEffect } from 'react';

/**
 * Rock-solid scroll reveal component engineered for Velora aesthetics.
 * Uses native IntersectionObserver + CSS 3D hardware-accelerated transitions.
 * Eliminates Chromium GPU layer teardown flickers in dark mode by keeping
 * translate3d(0, 0, 0) and avoiding Framer Motion's transform: none snap.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  duration = 700,
  threshold = 0.05,
  as: Component = 'div',
  style: userStyle = {},
  ...rest
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Check if element is already within viewport on initial mount
    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -10px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const computedStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`,
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    ...userStyle,
  };

  return (
    <Component ref={ref} className={className} style={computedStyle} {...rest}>
      {children}
    </Component>
  );
}
