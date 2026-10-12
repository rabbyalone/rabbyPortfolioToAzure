import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ArrowUpRight, Menu, X, FileText } from 'lucide-react';
import { developerData } from '../data/portfolioData';

export default function Navbar({ isDark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Works', href: '#works' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ['works', 'services', 'about', 'reviews', 'journal', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-14 sm:h-16 bg-[var(--velora-bg)] border-b border-[var(--velora-neutral-03)] flex items-center transition-colors"
    >
      <div className="velora-container flex items-center justify-between">
        {/* Brand wordmark lockup (Others/Brand: Inter 600, -0.04em, 18px, Neutral 11) */}
        <a
          href="#home"
          className="group flex items-center text-decoration-none"
        >
          <span className="velora-brand text-[var(--velora-neutral-11)] group-hover:text-[var(--velora-main-02)] transition-colors">
            {developerData.name}
          </span>
        </a>

        {/* Desktop Nav Items (Others/Nav: Inter 400, -0.04em, 16px, #666666) */}
        <nav className="hidden lg:flex items-center gap-8 py-2.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[15px] font-sans transition-colors ${
                activeSection === link.href.substring(1)
                  ? 'text-[var(--velora-neutral-12)] font-medium'
                  : 'text-[#666666] hover:text-[var(--velora-neutral-12)]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle & Resume */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="w-9 h-9 rounded-[4px] flex items-center justify-center border border-[var(--velora-neutral-04)] bg-[var(--velora-neutral-00)] text-[var(--velora-neutral-10)] hover:text-[var(--velora-neutral-12)] hover:border-[var(--velora-main-02)] transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume Link */}
          <a
            href={developerData.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] text-xs font-sans font-medium border border-[var(--velora-neutral-04)] bg-[var(--velora-neutral-00)] text-[var(--velora-neutral-12)] hover:border-[var(--velora-main-02)] hover:bg-[var(--velora-neutral-02)] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--velora-main-02)]" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-[var(--velora-neutral-09)]" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-9 h-9 rounded-[4px] flex items-center justify-center border border-[var(--velora-neutral-04)] bg-[var(--velora-neutral-00)] text-[var(--velora-neutral-12)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-velora-border bg-velora-bg/98 backdrop-blur-xl px-6 py-6"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-velora-primary hover:text-velora-sand2 transition-colors py-1 flex items-center justify-between border-b border-velora-divider"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-velora-label" />
                </a>
              ))}
              <div className="pt-2">
                <a
                  href={developerData.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-velora text-sm font-mono border border-velora-border bg-velora-card text-velora-primary"
                >
                  <FileText className="w-4 h-4 text-velora-sand2" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
