import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Layers, Bot, Sparkles, Quote, Zap, Code2 } from 'lucide-react';
import { developerData } from '../data/portfolioData';

export default function About() {
  const engineeringPillars = [
    {
      number: "01",
      title: "AI Spec-Driven Development & Automations",
      icon: Bot,
      summary: "Pioneering Spec-Driven Development (SDD) using AI agentic workflows, prompt engineering, and custom automation pipelines to accelerate architecture, refactoring, and quality engineering.",
      tags: ["AI Spec-Driven (SDD)", "AI Automations", "LLM Workflows", "Agentic Engineering"]
    },
    {
      number: "02",
      title: "Distributed Resiliency & Performance",
      icon: Cpu,
      summary: "Modernizing legacy monolithic backends into decoupled .NET microservices. Specializing in high-frequency database query optimization, Redis caching strategies, and cutting production downtime by up to 90%.",
      tags: [".NET 8", "Redis", "Microservices", "Query Tuning"]
    },
    {
      number: "03",
      title: "Mission-Critical Global Systems",
      icon: Layers,
      summary: "Architecting high-security platforms across international domains—from Ernst & Young taxation modules and Arctic 1,000-year long-term data archival to real-time North Sea oil rig telemetry.",
      tags: ["Azure Cloud", "Cosmos DB", "Docker / AKS", "InfoSec"]
    }
  ];

  return (
    <section id="about" className="py-32 px-6 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#dfc898]/30 text-[#dfc898] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE BIOGRAPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Engineering <span className="gold-gradient-text">Philosophy & AI Impact</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
        </motion.div>

        {/* Narrative Statement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="luxury-card p-10 sm:p-14 relative overflow-hidden shadow-2xl max-w-5xl mx-auto"
        >
          {/* Subtle Faded Quote Icon */}
          <Quote className="absolute right-6 top-6 w-32 h-32 text-slate-800/15 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <p className="text-lg sm:text-2xl text-slate-100 font-heading font-medium leading-relaxed">
              "Combining <span className="gold-gradient-text font-bold">10+ years of deep enterprise software engineering</span> with cutting-edge <span className="text-[#dfc898] font-bold">AI Spec-Driven Development (SDD)</span> to deliver resilient, high-throughput systems at unprecedented velocity."
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="font-heading font-bold text-white text-base">
                  Md Rabby Hasan
                </div>
                <div className="text-xs font-mono text-[#dfc898]">
                  Lead Software Engineer & Distributed Systems Architect
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>10+ YOE • AI Spec-Driven & Remote Leader</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dedicated AI Impact Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="luxury-card p-8 sm:p-10 border border-[#dfc898]/30 max-w-5xl mx-auto space-y-6 bg-gradient-to-r from-slate-900/90 via-[#0d1017] to-slate-900/90"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#dfc898]/40 flex items-center justify-center text-[#dfc898]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">
                AI Engineering & Personal Automations
              </h3>
              <p className="text-xs font-mono text-[#dfc898]">
                Accelerating Modern SDLC with Agentic AI Workflows
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-slate-800/80">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-white font-heading">
                <Zap className="w-4 h-4 text-[#dfc898]" />
                <span>Spec-Driven Dev (SDD)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Writing formal technical specifications and guiding LLM agent workflows to generate production-ready code with zero hallucination.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-white font-heading">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Personal AI Automations</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Running automated AI agents for personal workflows, automated unit test suites, documentation synchronization, and dev task management.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-white font-heading">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Velocity & Quality Boost</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Merging 10+ years of C#/.NET enterprise architectural rigor with AI speed to produce bug-free, highly maintainable systems.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3 Executive Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {engineeringPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="luxury-card p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Pillar Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-extrabold text-[#dfc898]/40">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#dfc898]/30 flex items-center justify-center text-[#dfc898]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white font-heading leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {pillar.summary}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {pillar.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
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
    </section>
  );
}
