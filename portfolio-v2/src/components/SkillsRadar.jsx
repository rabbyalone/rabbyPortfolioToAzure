import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Server,
  Cloud,
  Database,
  Layout,
  Sparkles
} from 'lucide-react';
import { architecturalCapabilities } from '../data/portfolioData';

export default function SkillsRadar({ theme = 'dark' }) {
  const iconMap = {
    Cpu,
    Server,
    Cloud,
    Database,
    Layout
  };

  const isDark = theme === 'dark';

  return (
    <section id="architecture" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Ambient Radial Spotlight */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full blur-[160px] pointer-events-none ${
          isDark
            ? 'bg-gradient-to-tr from-[#dfc898]/08 via-[#6366f1]/05 to-transparent'
            : 'bg-gradient-to-tr from-[#b89b5e]/12 via-[#2563eb]/06 to-transparent'
        }`}
      />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800/40">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border transition-colors bg-slate-900/90 border-[#dfc898]/30 text-[#dfc898]">
              <Cpu className="w-3.5 h-3.5" />
              <span>Verified 10+ Yrs Production Experience • Core Stack</span>
            </div>
            
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-heading ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Technical Stack <span className="gold-gradient-text">& Architecture</span>
            </h2>
            
            <p
              className={`text-sm sm:text-base max-w-xl font-normal leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Systems engineering disciplines, distributed runtimes, and multi-cloud platforms refined over a decade of production architecture.
            </p>
          </div>
        </div>

        {/* ---------------- MINIMAL BENTO GRID ---------------- */}
        <div className="space-y-6">
          
          {/* Top Row: 2 Flagship Hero Cards (AI & Modern Engineering FIRST, then Core .NET Backend) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {architecturalCapabilities.slice(0, 2).map((domain, idx) => {
              const Icon = iconMap[domain.icon] || Server;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-xl ${
                    isDark
                      ? 'bg-slate-900/70 border-slate-800/90 hover:border-[#dfc898]/50 hover:bg-slate-900/90 shadow-black/40'
                      : 'bg-white/95 border-slate-200/90 hover:border-amber-300 shadow-slate-200/60'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Clean Card Header (No Subheading) */}
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${
                            isDark
                              ? 'bg-slate-950 border-[#dfc898]/30 text-[#dfc898]'
                              : 'bg-amber-50 border-amber-200 text-[#854d0e]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3
                          className={`font-bold text-base sm:text-lg leading-snug font-heading ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {domain.domain}
                        </h3>
                      </div>

                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border shrink-0 ${
                          isDark
                            ? 'bg-slate-950/80 border-slate-800 text-[#dfc898]'
                            : 'bg-amber-50 border-amber-200 text-[#854d0e]'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </div>

                    {/* High-Signal Technology Chips */}
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {domain.technologies.map((tech, tIdx) => {
                        const isAward = tech.scope?.includes('2nd Prize');
                        return (
                          <div
                            key={tIdx}
                            title={tech.detail}
                            className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all duration-200 select-none ${
                              isAward
                                ? isDark
                                  ? 'bg-amber-950/40 border-[#dfc898]/70 text-amber-200 shadow-[0_0_12px_rgba(223,200,152,0.15)] ring-1 ring-[#dfc898]/40'
                                  : 'bg-amber-50 border-amber-300 text-amber-950 shadow-sm ring-1 ring-amber-300'
                                : isDark
                                ? 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-[#dfc898]/50 hover:bg-slate-800/80'
                                : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-300 hover:bg-white'
                            }`}
                          >
                            {isAward && <Sparkles className="w-3.5 h-3.5 text-[#dfc898] shrink-0 animate-pulse" />}
                            <span className="font-semibold">{tech.name}</span>
                            {tech.yoe && (
                              <span
                                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border font-semibold tracking-tight ${
                                  isAward
                                    ? isDark
                                      ? 'bg-[#dfc898]/20 border-[#dfc898]/60 text-[#dfc898]'
                                      : 'bg-amber-100 border-amber-300 text-amber-900'
                                    : isDark
                                    ? 'bg-slate-900 border-slate-800 text-[#dfc898] group-hover:border-[#dfc898]/40'
                                    : 'bg-amber-50 border-amber-200 text-[#854d0e] group-hover:border-amber-300'
                                }`}
                              >
                                {tech.yoe}
                              </span>
                            )}
                            {tech.scope && (
                              <span
                                className={`text-[10px] pl-1.5 border-l ${
                                  isAward
                                    ? 'border-amber-400/50 text-[#dfc898] font-bold'
                                    : isDark
                                    ? 'border-slate-800 text-slate-400 group-hover:text-[#dfc898]'
                                    : 'border-slate-300 text-slate-500 group-hover:text-amber-800'
                                }`}
                              >
                                {tech.scope.split('•')[0].trim()}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row: 3 Foundational Architecture Cards (Cloud DevOps, Databases, Frontend) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architecturalCapabilities.slice(2, 5).map((domain, idx) => {
              const Icon = iconMap[domain.icon] || Server;
              const realIdx = idx + 2;
              return (
                <motion.div
                  key={realIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-xl ${
                    isDark
                      ? 'bg-slate-900/70 border-slate-800/90 hover:border-[#dfc898]/50 hover:bg-slate-900/90 shadow-black/40'
                      : 'bg-white/95 border-slate-200/90 hover:border-amber-300 shadow-slate-200/60'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Clean Card Header (No Subheading) */}
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${
                            isDark
                              ? 'bg-slate-950 border-[#dfc898]/30 text-[#dfc898]'
                              : 'bg-amber-50 border-amber-200 text-[#854d0e]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3
                          className={`font-bold text-base sm:text-lg leading-snug font-heading ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {domain.domain}
                        </h3>
                      </div>

                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border shrink-0 ${
                          isDark
                            ? 'bg-slate-950/80 border-slate-800 text-[#dfc898]'
                            : 'bg-amber-50 border-amber-200 text-[#854d0e]'
                        }`}
                      >
                        0{realIdx + 1}
                      </span>
                    </div>

                    {/* High-Signal Technology Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {domain.technologies.map((tech, tIdx) => (
                        <div
                          key={tIdx}
                          title={tech.detail || (tech.scope ? `${tech.scope} • ${tech.yoe}` : undefined)}
                          className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-200 select-none ${
                            isDark
                              ? 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-[#dfc898]/50 hover:bg-slate-800/80'
                              : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-300 hover:bg-white'
                          }`}
                        >
                          <span className="font-semibold">{tech.name}</span>
                          {tech.yoe && (
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border font-semibold tracking-tight ${
                                isDark
                                  ? 'bg-slate-900 border-slate-800 text-[#dfc898] group-hover:border-[#dfc898]/40'
                                  : 'bg-amber-50 border-amber-200 text-[#854d0e] group-hover:border-amber-300'
                              }`}
                            >
                              {tech.yoe}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
