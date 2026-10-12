import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { developerData } from '../data/portfolioData';

export default function Footer() {
  const [dhakaTime, setDhakaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options = {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        setDhakaTime(new Intl.DateTimeFormat('en-US', options).format(now));
      } catch (e) {
        setDhakaTime('GMT+6');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 sm:py-20 bg-[#0C0C0D] text-white border-t border-[#222226]">
      <div className="velora-container space-y-12">
        {/* Top Lockup: Wordmark & Time */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#222226]">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-sans font-medium tracking-tight text-white">
              {developerData.name}
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#8E8E93] max-w-lg leading-relaxed">
              Lead Software Engineer & Systems Architect specializing in resilient distributed systems and enterprise microservices.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="space-y-1 text-right">
              <span className="text-[10px] font-sans text-[#71717A] uppercase tracking-wider block">
                LOCAL TIME (DHAKA)
              </span>
              <span className="text-sm font-sans text-white font-medium block">
                {dhakaTime || '10:45 AM GMT+6'}
              </span>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-10 h-10 rounded-[4px] flex items-center justify-center border border-[#2C2C32] bg-[#141416] text-white hover:border-[var(--velora-main-01)] transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Strip: Navigation & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs text-[#8E8E93] font-sans">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#works" className="hover:text-white transition-colors">Works</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#journal" className="hover:text-white transition-colors">Journal</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="space-y-1 sm:text-right">
            <div>
              © {new Date().getFullYear()} Md Rabby Hasan. All rights reserved.
            </div>
            <div className="text-[11px] text-[#71717A]">
              Minimalist portfolio-v3 · Built with React & Framer Motion
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
