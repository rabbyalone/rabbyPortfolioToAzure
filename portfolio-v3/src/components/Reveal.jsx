import React, { useRef, useState, useEffect } from 'react';

/**
 * Rock-solid scroll reveal component engineered for Velora aesthetics.
 * Uses native IntersectionObserver + 2D CSS transitions.
 * Eliminates Chromium GPU layer teardown flickers in dark mode by using
 * 2D translateY, automatically cleaning up transform upon completion,
 * and removing backface-visibility so ClearType font rendering remains crisp.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 20,
  duration = 600,
  threshold = 0.05,
  as: Component = 'div',
  style: userStyle = {},
  ...rest
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      setIsDone(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Check if element is already within viewport on initial mount
    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsDone(true), duration + delay + 50);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
          setTimeout(() => setIsDone(true), duration + delay + 50);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, duration, delay]);

  const computedStyle = isDone
    ? {
        opacity: 1,
        ...userStyle,
      }
    : {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ...userStyle,
      };

  return (
    <Component ref={ref} className={className} style={computedStyle} {...rest}>
      {children}
    </Component>
  );
}
