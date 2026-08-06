import React from 'react';
import { ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#07090e] py-12 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#dfc898]/40 flex items-center justify-center font-heading font-extrabold text-xs text-[#dfc898]">
            RH
          </div>
          <span className="font-heading font-bold text-sm text-white tracking-wide">
            MD RABBY HASAN <span className="text-[#dfc898] font-normal">| Systems Architect</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400 font-mono text-center">
          © {new Date().getFullYear()} Md Rabby Hasan. Engineered with React, Tailwind & .NET Enterprise Principles.
        </p>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#dfc898] hover:border-[#dfc898]/30 transition-all flex items-center gap-1.5 text-xs font-mono"
        >
          <span>Top</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
