import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete, theme = 'dark' }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 180);
          return 100;
        }
        // Snappy, organic easing progression
        const increment = prev < 30 ? 12 : prev < 70 ? 16 : prev < 90 ? 14 : 8;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Formatted zero-padded percentage
  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] text-white overflow-hidden pointer-events-none select-none border-b border-[#dfc898]/20"
        >
          {/* Subtle Ambient Golden Prismatic Aura */}
          <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#dfc898]/12 via-[#b89b5e]/06 to-transparent blur-[120px] pointer-events-none" />

          {/* Film Grain Texture */}
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay" />

          <div className="relative z-10 flex flex-col items-center gap-7 text-center">
            {/* Minimalist Isometric Prism Wireframe Icon */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -4, 0]
              }}
              transition={{
                scale: { duration: 0.5, ease: 'easeOut' },
                opacity: { duration: 0.5 },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative flex items-center justify-center"
            >
              <svg
                width="52"
                height="52"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* Outer Isometric Hexagon Contour */}
                <motion.polygon
                  points="24,4 41.3,14 41.3,34 24,44 6.7,34 6.7,14"
                  stroke="#dfc898"
                  strokeWidth="1.25"
                  strokeOpacity="0.85"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                />

                {/* Interior Isometric Y-Edges defining 3D Prism Volume */}
                <motion.line
                  x1="24"
                  y1="24"
                  x2="24"
                  y2="4"
                  stroke="#dfc898"
                  strokeWidth="1.2"
                  strokeOpacity="0.9"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
                <motion.line
                  x1="24"
                  y1="24"
                  x2="41.3"
                  y2="34"
                  stroke="#dfc898"
                  strokeWidth="1.2"
                  strokeOpacity="0.9"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                />
                <motion.line
                  x1="24"
                  y1="24"
                  x2="6.7"
                  y2="34"
                  stroke="#dfc898"
                  strokeWidth="1.2"
                  strokeOpacity="0.9"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                />

                {/* Center Node Beacon Dot */}
                <circle cx="24" cy="24" r="2" fill="#dfc898" />
                <circle
                  cx="24"
                  cy="24"
                  r="4"
                  stroke="#dfc898"
                  strokeWidth="0.75"
                  strokeOpacity="0.4"
                  className="animate-ping"
                />
              </svg>
            </motion.div>

            {/* Understated Minimalist Monospace Label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-3 flex flex-col items-center"
            >
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-slate-400">
                <span className="text-[#dfc898] font-bold">RH</span>
                <span className="text-slate-600">//</span>
                <span>SYSTEMS ARCHITECT</span>
              </div>

              {/* Minimal 1px Hairline Progress Bar */}
              <div className="w-36 sm:w-44 h-[1px] bg-slate-800/80 relative overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-[#dfc898] to-[#f1e8d6] shadow-[0_0_8px_#dfc898]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>

              {/* Minimalist Monospace Numeric Counter */}
              <div className="text-[11px] font-mono text-[#dfc898] tracking-widest font-medium">
                <span>{formattedProgress}</span>
                <span className="text-slate-600 ml-0.5">%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
