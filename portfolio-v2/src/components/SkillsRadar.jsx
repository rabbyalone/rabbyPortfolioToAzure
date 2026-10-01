import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Cloud, Database, Layout, CheckCircle2 } from 'lucide-react';
import { architecturalCapabilities } from '../data/portfolioData';

// Interactive Radial Cursor Spotlight Card Component for Stack
function StackDomainCard({ domain, idx, iconMap, theme }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[domain.icon] || Server;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const proficiencyMap = {
    'AI Spec-Driven Dev (SDD)': 98,
    'Prompt Engineering & SDLC': 95,
    'AI Automations & Agents': 96,
    'AI Tool Integration': 94,
    'C# / .NET 8 & .NET Core': 99,
    'Microservices & CQRS': 96,
    'RESTful & gRPC APIs': 95,
    'ASP.NET MVC & Razor': 92,
    'Generics & Design Patterns': 98,
    'AWS Cloud Infrastructure': 92,
    'Azure DevOps & CI/CD': 95,
    'Docker Containerization': 94,
    'Kubernetes (AKS)': 90,
    'MS SQL Server / Azure SQL': 96,
    'Entity Framework Core 8': 95,
    'LINQ Query Optimization': 98,
    'Cosmos DB & Redis Cache': 94
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-7 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-6 luxury-card backdrop-blur-xl overflow-hidden transition-colors duration-300 transform-gpu ${
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
                ? 'rgba(223, 200, 152, 0.14)'
                : 'rgba(184, 155, 94, 0.16)'
            }, transparent 80%)`
          }}
        />
      )}

      <div className="space-y-6 relative z-10">
        {/* Card Header */}
        <div className="flex items-center gap-4 pb-5 border-b border-slate-800/80">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
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
              className={`font-bold text-xl font-heading ${
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

        {/* Technology List with Animated Progress Meters */}
        <div className="space-y-3.5">
          {domain.technologies.map((tech, tIdx) => {
            const level = proficiencyMap[tech.name] || 92;
            return (
              <div
                key={tIdx}
                className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#dfc898] shrink-0" />
                    <span
                      className={`text-xs sm:text-sm font-semibold font-heading ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {tech.name}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    {tech.detail}
                  </span>
                </div>

                {/* Animated Framer Progress Bar */}
                <div className="flex items-center gap-3 pt-1">
                  <div
                    className={`flex-1 h-1.5 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + tIdx * 0.08, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#b89b5e] to-[#dfc898] rounded-full"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#dfc898] font-bold">
                    {level}%
                  </span>
                </div>
              </div>
            );
          })}
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
            <span>ENTERPRISE STACK & CAPABILITIES</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Technical Stack <span className="gold-gradient-text">Capabilities</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Enterprise technology stack and engineering principles refined over 10+ years of distributed backend and cloud architecture.
          </p>
        </motion.div>

        {/* Tab-Free Unified Domain Capability Matrix */}
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
