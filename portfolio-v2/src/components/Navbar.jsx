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

      const sections = ['home', 'about', 'architecture', 'experience', 'case-studies', 'articles', 'education', 'contact'];
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
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Stack', href: '#architecture', id: 'architecture' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Case Studies', href: '#case-studies', id: 'case-studies' },
    { name: 'Articles', href: '#articles', id: 'articles' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-slate-800/60 py-4 shadow-2xl'
            : 'bg-[#ffffff]/85 backdrop-blur-xl border-b border-slate-200/80 py-4 shadow-md'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="group flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-heading font-extrabold text-sm transition-colors shadow-sm ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-[#dfc898] group-hover:border-[#dfc898]/50'
              : 'bg-slate-100 border-slate-300 text-[#b89b5e] group-hover:border-[#b89b5e]'
          }`}>
            RH
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-bold text-base tracking-tight transition-colors ${
              theme === 'dark' ? 'text-white group-hover:text-[#dfc898]' : 'text-slate-900 group-hover:text-[#b89b5e]'
            }`}>
              MD RABBY HASAN
            </span>
            <span className={`text-[10px] font-mono tracking-widest uppercase ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Systems Architect
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full border backdrop-blur-md ${
          theme === 'dark'
            ? 'bg-slate-900/60 border-slate-800/80'
            : 'bg-white/80 border-slate-200 shadow-sm'
        }`}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-[#dfc898]/15 text-[#dfc898] border border-[#dfc898]/30 font-semibold'
                      : 'bg-[#b89b5e]/15 text-[#854d0e] border border-[#b89b5e]/40 font-bold'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800 text-amber-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* CLI Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className={`p-2.5 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-[#dfc898]'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-[#b89b5e]'
            }`}
            title="Interactive CLI Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Resume PDF Download */}
          <a
            href={developerData.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-sm ${
              theme === 'dark'
                ? 'bg-slate-900 border border-[#dfc898]/40 text-[#dfc898] hover:bg-[#dfc898] hover:text-black'
                : 'bg-slate-900 text-[#dfc898] hover:bg-black hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-amber-300'
                : 'bg-slate-100 border-slate-300 text-indigo-600'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-6 backdrop-blur-xl animate-fadeIn space-y-3 ${
          theme === 'dark' ? 'bg-[#07090e]/95 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                activeSection === link.id
                  ? theme === 'dark'
                    ? 'bg-[#dfc898]/10 text-[#dfc898] border border-[#dfc898]/30'
                    : 'bg-[#b89b5e]/10 text-[#854d0e] border border-[#b89b5e]/30'
                  : theme === 'dark'
                  ? 'text-slate-300'
                  : 'text-slate-700'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href={developerData.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-[#dfc898]/40 text-[#dfc898] font-semibold text-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Resume</span>
          </a>
        </div>
      )}
    </header>
  );
}
