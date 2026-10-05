import React, { useState, useEffect } from 'react';
import { Terminal, Download, Menu, X, Sun, Moon } from 'lucide-react';
import { developerData } from '../data/portfolioData';

export default function Navbar({ theme, onToggleTheme, onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'case-studies', 'architecture', 'experience', 'articles', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#home', id: 'home' },
    { name: 'Case Studies', href: '#case-studies', id: 'case-studies' },
    { name: 'Architecture', href: '#architecture', id: 'architecture' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Articles', href: '#articles', id: 'articles' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none transition-all duration-300 py-3 sm:py-4 bg-transparent border-none shadow-none">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-between">

        {/* 1. Brand Logo Floating Island Capsule */}
        <a
          href="#home"
          className={`pointer-events-auto group flex items-center gap-3 px-3.5 py-1.5 rounded-full border backdrop-blur-2xl shadow-xl transition-all duration-300 ${isDark
              ? 'bg-black/75 border-white/10 hover:border-[#dfc898]/50 shadow-black/50 hover:shadow-[0_0_20px_rgba(223,200,152,0.15)]'
              : 'bg-white/90 border-slate-200/90 hover:border-[#b89b5e]/50 shadow-slate-300/40 hover:shadow-[0_0_20px_rgba(184,155,94,0.15)]'
            }`}
        >
          <div className="relative">
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center font-heading font-extrabold text-sm transition-all shadow-md ${isDark
                  ? 'bg-black/90 border border-[#dfc898]/40 text-[#dfc898] group-hover:border-[#dfc898]'
                  : 'bg-amber-50/90 border border-[#b89b5e]/40 text-[#854d0e] group-hover:border-[#b89b5e]'
                }`}
            >
              RH
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-black" />
            </span>
          </div>
          <div className="flex flex-col pr-1.5">
            <span
              className={`font-heading font-bold text-xs sm:text-sm tracking-tight transition-colors ${isDark
                  ? 'text-white group-hover:text-[#dfc898]'
                  : 'text-slate-900 group-hover:text-[#854d0e]'
                }`}
            >
              MD RABBY HASAN
            </span>
            <span
              className={`text-[9px] font-mono tracking-widest uppercase transition-colors ${isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-700'
                }`}
            >
              Systems Architect
            </span>
          </div>
        </a>

        {/* 2. Navigation Links Floating Island Capsule */}
        <nav
          className={`pointer-events-auto hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border backdrop-blur-2xl shadow-xl transition-all duration-300 ${isDark
              ? 'border-white/10 bg-black/75 shadow-black/50'
              : 'border-slate-200/90 bg-white/90 shadow-slate-300/40'
            }`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-mono transition-all ${isActive
                    ? isDark
                      ? 'bg-[#dfc898] text-black font-bold shadow-md shadow-[#dfc898]/20'
                      : 'bg-[#b89b5e] text-white font-bold shadow-md shadow-[#b89b5e]/25'
                    : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* 3. Action Buttons Floating Island Capsule */}
        <div
          className={`pointer-events-auto hidden sm:flex items-center gap-2 p-1.5 rounded-full border backdrop-blur-2xl shadow-xl transition-all duration-300 ${isDark
              ? 'border-white/10 bg-black/75 shadow-black/50'
              : 'border-slate-200/90 bg-white/90 shadow-slate-300/40'
            }`}
        >
          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full border backdrop-blur-xl transition-all shadow-sm ${isDark
                ? 'border-white/10 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-amber-300'
                : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700 hover:text-indigo-600'
              }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* CLI Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all text-xs font-mono shadow-sm ${isDark
                ? 'border-white/10 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#dfc898] hover:border-[#dfc898]/40'
                : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700 hover:text-[#854d0e] hover:border-[#b89b5e]/40'
              }`}
            title="Interactive Developer Terminal"
          >
            <Terminal className={`w-3.5 h-3.5 ${isDark ? 'text-[#dfc898]' : 'text-[#854d0e]'}`} />
            <span>CLI</span>
          </button>

          {/* Resume PDF Download */}
          <a
            href={developerData.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold text-xs transition-all shadow-md font-mono ${isDark
                ? 'bg-gradient-to-r from-[#dfc898] to-[#b89b5e] hover:from-[#f1e8d6] hover:to-[#dfc898] text-black shadow-[#dfc898]/20'
                : 'bg-slate-900 hover:bg-black text-[#dfc898] shadow-slate-900/20'
              }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div
          className={`pointer-events-auto flex items-center gap-2 p-1.5 rounded-full border backdrop-blur-2xl shadow-xl lg:hidden ${isDark ? 'bg-black/75 border-white/10' : 'bg-white/90 border-slate-200'
            }`}
        >
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full border ${isDark ? 'bg-white/5 border-white/10 text-amber-300' : 'bg-white border-slate-200 text-indigo-600'
              }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full border ${isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto max-w-md mx-auto px-4 mt-3">
          <div
            className={`border rounded-3xl p-5 backdrop-blur-2xl shadow-2xl space-y-2.5 ${isDark ? 'bg-[#07090e]/95 border-white/10 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
              }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-xl text-sm font-medium font-mono transition-all ${activeSection === link.id
                    ? isDark
                      ? 'bg-[#dfc898]/15 text-[#dfc898] border border-[#dfc898]/30 font-bold'
                      : 'bg-[#b89b5e]/15 text-[#854d0e] border border-[#b89b5e]/30 font-bold'
                    : isDark
                      ? 'text-slate-300 hover:bg-white/5'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-mono font-semibold ${isDark ? 'border-white/10 bg-white/5 text-[#dfc898]' : 'border-slate-200 bg-slate-50 text-[#854d0e]'
                  }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open CLI Terminal</span>
              </button>
              <a
                href={developerData.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-[#dfc898]/40 text-[#dfc898] font-semibold text-xs font-mono"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume PDF</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
