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
          }, 250);
          return 100;
        }
        // Accelerate smoothly
        const step = prev < 50 ? 15 : prev < 85 ? 18 : 10;
        return Math.min(prev + step, 100);
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] text-white overflow-hidden pointer-events-none"
        >
          {/* Ambient Prismatic Radial Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#dfc898]/15 via-[#6366f1]/12 to-[#10b981]/10 blur-[130px] pointer-events-none" />

          {/* Film Grain Texture */}
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay" />

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-xs text-center px-4">
            {/* Monogram RH Badge with Live Emerald Indicator */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-16 h-16 rounded-2xl bg-black/90 border border-[#dfc898]/40 flex items-center justify-center font-heading font-extrabold text-xl text-[#dfc898] shadow-2xl shadow-[#dfc898]/20"
            >
              RH
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-black" />
              </span>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-1">
              <h2 className="font-heading font-bold text-base sm:text-lg tracking-wider text-[#E1E0CC]">
                MD RABBY HASAN
              </h2>
              <p className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
                Lead Systems Architect
              </p>
            </div>

            {/* Glowing Champagne Laser Progress Bar */}
            <div className="w-52 sm:w-60 h-1.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#dfc898] via-[#f1e8d6] to-[#b89b5e] rounded-full shadow-[0_0_12px_#dfc898]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Status & Counter */}
            <div className="flex items-center justify-between w-52 sm:w-60 text-[10px] font-mono text-slate-400">
              <span className="text-[#dfc898] tracking-wider">SYSTEMS ARCHITECT</span>
              <span className="font-semibold text-slate-200">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
