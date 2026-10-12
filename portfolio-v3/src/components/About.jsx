import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { developerData, experienceData } from '../data/portfolioData';
import Reveal from './Reveal';

export default function About() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExp = (idx) => {
    setExpandedIndex(expandedIndex === idx ? -1 : idx);
  };

  return (
    <section id="about" className="py-20 sm:py-28 border-b border-[var(--velora-neutral-03)]">
      <div className="velora-container">
        {/* Two-Column Studio Layout (Section 05 Pattern) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Large H2 Name + Portrait + Bio + CTA (lg:col-span-5) */}
          <Reveal className="lg:col-span-5 space-y-8" delay={0}>
            {/* Eyebrow: —— About Me with hairline rule */}
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-block w-8 sm:w-10 h-[1px] bg-[var(--velora-neutral-08)] select-none"></span>
              <h2 className="velora-section-header">
                About Me
              </h2>
            </div>

            {/* Massive H2 Name (Heading/H2 as on Velora) */}
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium text-[var(--velora-neutral-12)] tracking-tightest leading-tight">
              {developerData.name}
            </h3>

            {/* Real Executive Portrait with 100px round avatar ringed by Neutral 02 */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-[var(--velora-neutral-04)] ring-4 ring-[var(--velora-neutral-02)] shrink-0">
              <img
                src="/img/rabby-hasan.jpg"
                alt={developerData.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-4">
              <p className="text-base font-sans text-[var(--velora-neutral-12)] leading-relaxed font-normal">
                I specialize in architecting distributed systems and enterprise microservices under extreme performance constraints. With over a decade of lead engineering experience across the USA, Norway, and international clients, I build software that solves real-world scale problems reliably.
              </p>

              <p className="text-base font-sans text-[var(--velora-neutral-10)] leading-relaxed font-normal">
                Passionate about domain-driven boundaries, high-throughput caching, and AI-native developer workflows, I collaborate with teams to turn complex challenges into clean, maintainable infrastructure.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="velora-button inline-flex items-center gap-1.5 py-1"
              >
                <span>Contact me</span>
                <span className="text-sm font-sans">↓</span>
              </a>
            </div>
          </Reveal>

          {/* Right Column: Experience Accordion (lg:col-span-7) */}
          <Reveal className="lg:col-span-7 space-y-8" delay={120}>
            <div className="border-t border-[var(--velora-neutral-03)] divide-y divide-[var(--velora-neutral-03)]">
              {experienceData.slice(0, 5).map((exp, idx) => {
                const isExpanded = expandedIndex === idx;

                return (
                  <div key={`${exp.company}-${exp.period}`} className="py-5">
                    {/* Role Row Header */}
                    <div
                      onClick={() => toggleExp(idx)}
                      className="cursor-pointer flex items-baseline justify-between gap-4 select-none group"
                    >
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-sans font-medium text-[var(--velora-neutral-12)] group-hover:text-[var(--velora-main-02)] transition-colors">
                          {exp.company}
                        </h3>
                        <p className="text-sm font-sans text-[var(--velora-neutral-10)]">
                          {exp.role}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs font-sans text-[var(--velora-neutral-09)] shrink-0">
                          {exp.period}
                        </span>
                        <span className="text-sm text-[var(--velora-neutral-09)] group-hover:text-[var(--velora-neutral-12)] transition-colors">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </div>
                    </div>

                    {/* Expandable Highlight with Component Micro-Reveal (Section 06) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.44, 0, 0.56, 1]
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pb-2 space-y-2.5">
                            <ul className="space-y-2">
                              {exp.highlights.slice(0, 2).map((h, hIdx) => (
                                <li key={hIdx} className="text-sm font-sans text-[var(--velora-neutral-10)] leading-relaxed flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-[var(--velora-main-02)] mt-2 shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Impact Statement at bottom of timeline */}
            <div className="pt-4 border-t border-[var(--velora-neutral-03)]">
              <p className="text-sm sm:text-base font-sans text-[var(--velora-neutral-10)] leading-relaxed">
                Over 10 years of engineering leadership, helping enterprise platforms eliminate 90% of downtime and preserve humanity’s records for 1,000 years in the Arctic.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
