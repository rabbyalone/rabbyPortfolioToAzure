import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, FileText, ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { experienceData, developerData } from '../data/portfolioData';

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(0); // first item open by default

  const toggleExp = (idx) => {
    setExpandedIndex(expandedIndex === idx ? -1 : idx);
  };

  return (
    <section id="experience" className="py-24 sm:py-32 border-b border-velora-border">
      <div className="velora-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Section Header */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="velora-chip">
                03 / EXPERIENCE
              </span>
              <span className="text-xs font-mono text-velora-label">
                10+ Years
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tightest text-velora-primary">
              Work Experience
            </h2>

            <p className="text-base sm:text-lg text-velora-secondary leading-relaxed">
              Proven track record leading engineering modernization, distributed microservices refactoring, and AI-assisted workflows for international enterprises.
            </p>

            <div className="pt-4">
              <a
                href={developerData.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-velora border border-velora-border bg-velora-card text-velora-primary hover:border-velora-sand2 text-xs font-mono transition-colors"
              >
                <FileText className="w-4 h-4 text-velora-sand2" />
                <span>View Full Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-velora-label" />
              </a>
            </div>
          </div>

          {/* Right Column: Experience Accordion */}
          <div className="lg:col-span-7 border-t border-velora-divider divide-y divide-velora-divider">
            {experienceData.map((exp, idx) => {
              const isExpanded = expandedIndex === idx;

              return (
                <div key={`${exp.company}-${exp.period}`} className="py-6 sm:py-8">
                  {/* Row Trigger */}
                  <div
                    onClick={() => toggleExp(idx)}
                    className="cursor-pointer flex items-start justify-between gap-4 select-none group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-display font-medium tracking-tight text-velora-primary group-hover:text-velora-sand2 transition-colors">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-chip text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Present
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-velora-label">
                        <span className="font-semibold text-velora-secondary">
                          {exp.company}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-velora-sand2" />
                          {exp.period}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <button
                      aria-label="Expand career highlights"
                      className="w-8 h-8 rounded-velora flex items-center justify-center border border-velora-border bg-velora-card text-velora-primary hover:border-velora-sand2 transition-colors shrink-0 mt-1"
                    >
                      {isExpanded ? (
                        <Minus className="w-3.5 h-3.5 text-velora-sand2" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 space-y-4">
                          <p className="text-sm text-velora-secondary font-medium">
                            {exp.summary}
                          </p>

                          {/* Highlights Bullet List */}
                          <ul className="space-y-2.5 pl-1">
                            {exp.highlights.map((h, hIdx) => (
                              <li key={hIdx} className="text-xs sm:text-sm text-velora-secondary flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-velora-sand2 mt-1.5 shrink-0" />
                                <span className="leading-relaxed">{h}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech Badges */}
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {exp.tech.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 rounded-chip text-[11px] font-mono bg-velora-fill text-velora-label border border-velora-border"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
