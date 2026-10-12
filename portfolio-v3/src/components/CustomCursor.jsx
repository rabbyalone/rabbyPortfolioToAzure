import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'pointer' | 'work'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track hover over interactive elements
    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorState(target.getAttribute('data-cursor') || 'pointer');
      } else if (e.target.closest('button, a, input, textarea, [role="button"]')) {
        setCursorState('pointer');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50">
      {/* Small dot follower (hidden during 'work' View cursor mode) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--velora-main-01)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: cursorState === 'work' ? 0 : 1,
          scale: cursorState === 'pointer' ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 500, mass: 0.1 }}
      />

      {/* Outer ring / Work 'View' circle cursor */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center select-none overflow-hidden transition-colors duration-200 ${
          cursorState === 'work'
            ? 'bg-[var(--velora-neutral-12)] border-0'
            : 'bg-transparent border border-[var(--velora-main-01)]'
        }`}
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          width: cursorState === 'work' ? 80 : cursorState === 'pointer' ? 44 : 32,
          height: cursorState === 'work' ? 80 : cursorState === 'pointer' ? 44 : 32,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 320, mass: 0.15 }}
      >
        {cursorState === 'work' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-sans font-medium text-[var(--velora-neutral-00)] select-none pointer-events-none tracking-tight"
          >
            View
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
