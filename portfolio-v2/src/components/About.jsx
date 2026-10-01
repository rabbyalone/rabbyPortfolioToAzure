import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, Layers, Bot, Sparkles, Quote, Zap, Code2, Pin, Move } from 'lucide-react';
import { developerData } from '../data/portfolioData';

// Interactive Architect Memo Card Component
function ArchitectMemoCard({ note, isFocused, isAnyFocused, onFocus, onBlur, theme }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const Icon = note.icon;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="relative pt-4">
      {/* Metallic Accent Pin at Top Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="w-8 h-8 rounded-full shadow-lg border border-amber-300/60 bg-gradient-to-tr from-amber-500 via-[#dfc898] to-amber-200 flex items-center justify-center text-slate-950 font-extrabold shadow-amber-500/20">
          <Pin className="w-4 h-4 fill-slate-950 text-slate-950" />
        </div>
      </div>

      <motion.div
        drag
        dragConstraints={{ left: -20, right: 20, top: -10, bottom: 10 }}
        dragElastic={0.08}
        whileDrag={{ scale: 1.03, zIndex: 40, cursor: 'grabbing' }}
        initial={{ opacity: 0, y: 30, rotate: note.rotation }}
        whileInView={{ opacity: 1, y: 0, rotate: note.rotation }}
        viewport={{ once: true, margin: '-60px' }}
        animate={{
          rotate: isFocused ? 0 : note.rotation,
          scale: isFocused ? 1.025 : 1,
          y: isFocused ? -6 : 0,
          zIndex: isFocused ? 30 : 10,
          opacity: isAnyFocused && !isFocused ? 0.75 : 1
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
        onMouseEnter={onFocus}
        onMouseLeave={onBlur}
        onMouseMove={handleMouseMove}
        className={`relative p-7 sm:p-8 rounded-3xl border text-left cursor-grab transition-colors duration-300 overflow-hidden transform-gpu luxury-card backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-slate-900/95 border-slate-800 shadow-2xl hover:border-[#dfc898]/50'
            : 'bg-white/95 border-slate-200 shadow-xl hover:border-[#b89b5e]/60'
        }`}
      >
        {/* Radial Cursor Spotlight */}
        {isFocused && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${
                theme === 'dark'
                  ? 'rgba(223, 200, 152, 0.14)'
                  : 'rgba(184, 155, 94, 0.16)'
              }, transparent 80%)`
            }}
          />
        )}

        {/* Card Header Tag */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800/60 pt-2">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
              theme === 'dark'
                ? 'bg-slate-800 text-[#dfc898] border border-[#dfc898]/30'
                : 'bg-amber-50 text-[#854d0e] border border-amber-200'
            }`}
          >
            {note.badge}
          </span>

          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 opacity-60">
            <Move className="w-3 h-3" />
            <span className="hidden sm:inline">Drag</span>
          </div>
        </div>

        {/* Card Details */}
        <div className="space-y-4 pt-4 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3
                className={`text-xl font-bold font-heading leading-snug ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                {note.title}
              </h3>
              <div className="text-xs font-mono font-bold gold-gradient-text">
                {note.metric}
              </div>
            </div>

            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                theme === 'dark'
                  ? 'bg-slate-800/90 border-slate-700/80 text-[#dfc898]'
                  : 'bg-amber-50 border-amber-200 text-[#854d0e]'
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>

          <p
            className={`text-xs sm:text-sm font-heading font-medium leading-relaxed italic ${
              theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            "{note.quote}"
          </p>

          <p
            className={`text-xs leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {note.highlight}
          </p>

          <div className="pt-3 border-t border-slate-800/60 flex flex-wrap gap-1.5">
            {note.tags.map((tag, tIdx) => (
              <motion.span
                key={tIdx}
                whileHover={{ scale: 1.06 }}
                className={`px-2.5 py-1 rounded-md border text-[10px] font-mono transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-[#dfc898]/40 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-400'
                }`}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function About({ theme = 'dark' }) {
  const [focusedNoteId, setFocusedNoteId] = useState(null);

  const architectMemos = [
    {
      id: 'memo-systems-architecture',
      title: 'Systems Architecture',
      badge: '10+ Years Track Record',
      rotation: -2.5,
      icon: ShieldCheck,
      metric: 'Distributed .NET & Microservices',
      quote:
        'Designing mission-critical enterprise systems and resilient microservices with clean domain architecture, asynchronous event handling, and high availability.',
      highlight:
        'Led architecture and full-lifecycle engineering across US Risk Management (Ethos Risk), Global Taxation (Ernst & Young), Arctic Data Archival (Piql Norway), and Offshore Telemetry (GeologiQ).',
      tags: ['Ethos Risk (USA)', 'Ernst & Young', 'Piql Norway', 'GeologiQ Rig Telemetry']
    },
    {
      id: 'memo-modern-workflows',
      title: 'Engineering Automation',
      badge: 'Hackathon 2nd Prize',
      rotation: 1.5,
      icon: Bot,
      metric: 'Autonomous Task Engines',
      quote:
        'Awarded 2nd Prize in company-wide internal AI Hackathon for designing autonomous task automation engines and developer agent workflows.',
      highlight:
        'Integrating modern AI-assisted engineering tools, spec-driven design, and developer automation pipelines to accelerate architecture, refactoring, and code quality.',
      tags: ['Spec-Driven Design', 'Autonomous Workflows', 'Prompt Engineering', 'Quality Pipelines']
    },
    {
      id: 'memo-performance-resiliency',
      title: 'Performance & Resiliency',
      badge: '90% Downtime Drop',
      rotation: -1.5,
      icon: Cpu,
      metric: '20% Throughput Boost',
      quote:
        'Decomposing legacy monolithic backends into decoupled .NET 8 microservices, achieving high query efficiency and fault-tolerant event streaming.',
      highlight:
        'Modernized legacy core components, tuned SQL query execution plans and Redis caching, cutting production downtime by 90% and improving throughput by 20%.',
      tags: ['.NET 8 Microservices', 'CQRS Architecture', 'Redis Caching', 'Query Optimization']
    }
  ];

  const engineeringPillars = [
    {
      number: '01',
      title: 'Distributed Systems & Microservices',
      icon: Layers,
      summary:
        'Modernizing legacy monolithic backends into decoupled, maintainable .NET 8 microservices. Enforcing clean architecture, CQRS patterns via MediatR, and clear domain boundaries.',
      tags: ['.NET 8', 'Microservices', 'CQRS', 'Clean Architecture']
    },
    {
      number: '02',
      title: 'Resiliency, Caching & Performance',
      icon: Cpu,
      summary:
        'Analyzing query execution plans, tuning SQL Server indexes, and implementing distributed Redis caching strategies to maximize throughput and achieve a 90% reduction in production downtime.',
      tags: ['SQL Query Tuning', 'Redis Cache', 'Throughput Boost', 'Zero-Downtime']
    },
    {
      number: '03',
      title: 'Mission-Critical Global Applications',
      icon: ShieldCheck,
      summary:
        'Architecting high-security platforms across demanding international domains—from Ernst & Young taxation modules and Arctic 1,000-year deep data archival to real-time North Sea oil rig telemetry.',
      tags: ['Azure Cloud', 'Cosmos DB', 'Docker / AKS', 'InfoSec Compliance']
    }
  ];

  return (
    <section id="about" className="py-32 px-6 sm:px-8 relative z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[160px] pointer-events-none ${
          theme === 'dark'
            ? 'bg-gradient-to-tr from-[#dfc898]/08 via-[#6366f1]/05 to-transparent'
            : 'bg-gradient-to-tr from-[#b89b5e]/10 via-[#2563eb]/06 to-transparent'
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL PROFILE</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Engineering <span className="gold-gradient-text">Philosophy & Track Record</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Key Architectural Milestones • Click, hover, or drag cards to inspect engineering impact
          </p>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
        </motion.div>

        {/* Interactive Stacked Memos Collage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch pt-4">
          {architectMemos.map((note) => (
            <ArchitectMemoCard
              key={note.id}
              note={note}
              theme={theme}
              isFocused={focusedNoteId === note.id}
              isAnyFocused={focusedNoteId !== null}
              onFocus={() => setFocusedNoteId(note.id)}
              onBlur={() => setFocusedNoteId(null)}
            />
          ))}
        </div>

        {/* 3 Core Pillars Grid */}
        <div className="pt-12 border-t border-slate-800/60 max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3
              className={`text-xl font-bold font-heading ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              Core Engineering Pillars
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Systems architecture principles honed over a decade of production platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engineeringPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className={`p-7 rounded-2xl border flex flex-col justify-between space-y-6 luxury-card transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-900/80 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-extrabold text-[#dfc898]/40">
                        {pillar.number}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                          theme === 'dark'
                            ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898]'
                            : 'bg-amber-50 border-amber-200 text-[#854d0e]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h4
                      className={`text-lg font-bold font-heading leading-snug ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {pillar.title}
                    </h4>

                    <p
                      className={`text-xs leading-relaxed ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {pillar.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2.5 py-1 rounded-md border text-[10px] font-mono ${
                          theme === 'dark'
                            ? 'bg-slate-900 border-slate-800 text-slate-400'
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
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
