import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Cloud, Database, Layout, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { architecturalCapabilities } from '../data/portfolioData';

// Interactive Cursor Spotlight Card for Architectural Stack Domain
function StackDomainCard({ domain, idx, iconMap, theme }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[domain.icon] || Server;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: idx * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-6 luxury-card backdrop-blur-xl overflow-hidden transition-all duration-300 transform-gpu ${
        theme === 'dark'
          ? 'bg-slate-900/90 border-slate-800/90 shadow-2xl hover:border-[#dfc898]/40'
          : 'bg-white/95 border-slate-200/90 shadow-xl hover:border-[#b89b5e]/50'
      }`}
    >
      {/* Radial Hover Spotlight Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${
              theme === 'dark'
                ? 'rgba(223, 200, 152, 0.12)'
                : 'rgba(184, 155, 94, 0.14)'
            }, transparent 80%)`
          }}
        />
      )}

      <div className="space-y-6 relative z-10">
        {/* Card Header */}
        <div className="flex items-start sm:items-center gap-4 pb-5 border-b border-slate-800/80">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.08 }}
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-all ${
              theme === 'dark'
                ? 'bg-slate-900 border-[#dfc898]/40 text-[#dfc898] shadow-md'
                : 'bg-amber-50 border-amber-200 text-[#854d0e] shadow-sm'
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </motion.div>
          <div className="space-y-1">
            <h3
              className={`font-bold text-lg sm:text-xl font-heading ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              {domain.domain}
            </h3>
            <p
              className={`text-xs ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {domain.description}
            </p>
          </div>
        </div>

        {/* Technology Capabilities Matrix - Clean High-Signal Spec */}
        <div className="space-y-3">
          {domain.technologies.map((tech, tIdx) => (
            <div
              key={tIdx}
              className={`p-3.5 rounded-2xl border transition-all space-y-1.5 ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700/90'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#dfc898] shrink-0" />
                  <span
                    className={`text-xs sm:text-sm font-semibold font-heading ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {tech.name}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border self-start sm:self-auto font-medium ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-[#dfc898]'
                      : 'bg-amber-50 border-amber-200 text-[#854d0e]'
                  }`}
                >
                  {tech.scope}
                </span>
              </div>

              {/* Architectural Technical Detail */}
              <p
                className={`text-[11px] leading-relaxed pl-5 sm:pl-5 font-mono ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {tech.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsRadar({ theme = 'dark' }) {
  const iconMap = {
    Cpu: Cpu,
    Server: Server,
    Cloud: Cloud,
    Database: Database,
    Layout: Layout
  };

  return (
    <section id="architecture" className="py-32 px-6 sm:px-8 relative z-10 overflow-hidden">
      {/* Ambient Backdrop Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[170px] pointer-events-none ${
          theme === 'dark'
            ? 'bg-gradient-to-tr from-[#dfc898]/08 via-[#6366f1]/05 to-transparent'
            : 'bg-gradient-to-tr from-[#b89b5e]/12 via-[#2563eb]/06 to-transparent'
        }`}
      />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#dfc898]/30 text-[#dfc898] text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>ENTERPRISE ARCHITECTURE MATRIX</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Technical Stack <span className="gold-gradient-text">& Architecture</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Systems engineering disciplines and enterprise technology stack refined across 10+ years of distributed backend and cloud architecture.
          </p>
        </motion.div>

        {/* Architectural Domain Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {architecturalCapabilities.map((domain, idx) => (
            <StackDomainCard
              key={idx}
              domain={domain}
              idx={idx}
              iconMap={iconMap}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
