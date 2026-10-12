import React, { useState } from 'react';
import { Copy, Check, ArrowRight, ArrowUpRight, MessageSquare } from 'lucide-react';
import { developerData } from '../data/portfolioData';
import ContactModal from './ContactModal';
import Reveal from './Reveal';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(developerData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative bg-[#0C0C0D] text-white pt-20 sm:pt-32 pb-20 border-t border-[#222226]">
      <div className="velora-container space-y-16 sm:space-y-24">
        {/* Massive Signature Lockup: "Stay connected" strictly on ONE line + "Get in touch" CTA button */}
        <Reveal delay={0} className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#222226]">
            {/* Gigantic Warm Sand Heading — guaranteed on ONE line via whitespace-nowrap and fluid clamp */}
            <div className="overflow-visible min-w-0">
              <h2 className="text-[clamp(2.1rem,6.8vw,7.6rem)] font-sans font-medium tracking-tightest leading-none text-[var(--velora-main-01)] whitespace-nowrap select-none m-0 p-0">
                Stay connected
              </h2>
            </div>

            {/* "Get in touch" CTA Button — opens ContactModal */}
            <div className="shrink-0 pt-2 lg:pt-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-2.5 text-base sm:text-lg font-sans font-medium text-white hover:text-[var(--velora-main-01)] transition-colors py-2 px-1 cursor-pointer select-none"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[var(--velora-main-01)]" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Contact Details Grid */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" delay={120}>
          {/* Left Column: Direct Email, Phone, Location */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
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
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                  className="p-2 rounded-[4px] border border-[#2C2C32] hover:border-[var(--velora-main-01)] text-[#C8C8CF] hover:text-white transition-colors shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--velora-main-01)]" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5 text-sm font-sans text-[#A1A1AA]">
              <div className="flex items-center gap-2 text-white font-medium">
                <span>{developerData.phone}</span>
              </div>
              <div>{developerData.location}</div>
              <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open for Lead Architect & Senior .NET Contracts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Online Profiles & Direct Contact Card */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
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

            {/* Quick Inquiry Card */}
            <div className="p-6 rounded-[8px] bg-[#141416] border border-[#2C2C32] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--velora-main-01)] text-sm font-medium">
                  <MessageSquare className="w-4 h-4" />
                  <span>Send a Direct Inquiry</span>
                </div>
                <span className="text-xs font-sans text-[#71717A]">
                  Reply within 24h
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-[#A1A1AA] leading-relaxed">
                Have an active project scope, microservices migration, or technical leadership requirement? Launch the contact form to share details directly.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="velora-link inline-flex items-center gap-1.5 text-sm font-medium text-[var(--velora-main-01)] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Open Contact Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Interactive Contact Modal with Azure & FormSubmit dual dispatch */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
