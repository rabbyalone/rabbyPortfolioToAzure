import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import { developerData } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(developerData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative bg-[#0C0C0D] text-white pt-24 sm:pt-36 pb-20 border-t border-[#222226]">
      <div className="velora-container space-y-20 sm:space-y-28">
        {/* Massive Signature Lockup: "Stay connected" in Main 01 sand accent + "Get in touch →" */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 58, mass: 1 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4"
          >
            {/* Gigantic Warm Sand Heading (Section 01: Main 01 #E3CAA6) */}
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[150px] font-sans font-medium tracking-tightest leading-none text-[var(--velora-main-01)] select-none">
              Stay connected
            </h2>

            {/* "Get in touch →" CTA */}
            <div className="lg:pb-4 shrink-0">
              <a
                href={`mailto:${developerData.email}`}
                className="group inline-flex items-center gap-2.5 text-xl sm:text-2xl font-sans font-medium text-white hover:text-[var(--velora-main-01)] transition-colors"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Contact Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 58, mass: 1, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-8 border-t border-[#222226]"
        >
          {/* Left Column: Direct Email & Phone */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-sans text-[#8E8E93] uppercase tracking-wider block">
                Direct Email
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${developerData.email}`}
                  className="text-2xl sm:text-3xl font-sans font-medium text-white hover:text-[var(--velora-main-01)] transition-colors break-all"
                >
                  {developerData.email}
                </a>
                <button
                  onClick={copyEmail}
                  title="Copy email"
                  aria-label="Copy email"
                  className="p-2 rounded-[4px] border border-[#2C2C32] hover:border-[var(--velora-main-01)] text-[#C8C8CF] hover:text-white transition-colors shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--velora-main-01)]" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1 text-sm font-sans text-[#A1A1AA]">
              <div>{developerData.phone}</div>
              <div>{developerData.location}</div>
            </div>
          </div>

          {/* Right Column: Online Profiles */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-sans text-[#8E8E93] uppercase tracking-wider block">
              Online Profiles
            </span>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {developerData.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-base font-sans font-medium text-white hover:text-[var(--velora-main-01)] transition-colors py-1 group"
                >
                  <span>{s.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[var(--velora-main-01)] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
