import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { experiences } from '../data/portfolioData';

export default function ExperienceTimeline({ theme }) {
  const [expanded, setExpanded] = useState(false);

  // Show top 3 by default, or all 8 if expanded
  const visibleExperiences = expanded ? experiences : experiences.slice(0, 3);
  const hiddenCount = experiences.length - 3;

  const handleToggle = () => {
    if (expanded) {
      // Keep user at current location by scrolling to the next section (Case Studies)
      const caseStudiesEl = document.getElementById('case-studies');
      if (caseStudiesEl) {
        caseStudiesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setExpanded(!expanded);
  };

  return (
    <section id="experience" className="py-32 px-6 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono ${
            theme === 'dark'
              ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898]'
              : 'bg-white border-[#b89b5e]/40 text-[#854d0e] shadow-sm'
          }`}>
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Engineering <span className="gold-gradient-text">Leadership</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className={`absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 -translate-x-1/2 hidden md:block ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#dfc898] via-slate-700 to-slate-900'
              : 'bg-gradient-to-b from-[#b89b5e] via-slate-300 to-slate-200'
          }`} />
          <div className={`absolute top-0 bottom-0 left-4 w-0.5 md:hidden ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'
          }`} />

          <div className="space-y-16">
            <AnimatePresence>
              {visibleExperiences.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Luxury Node Dot */}
                    <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-20 top-0 shadow-md ${
                      theme === 'dark'
                        ? 'bg-[#07090e] border-[#dfc898]'
                        : 'bg-white border-[#b89b5e]'
                    }`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        theme === 'dark' ? 'bg-[#dfc898]' : 'bg-[#b89b5e]'
                      }`} />
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block w-1/2" />

                    {/* Experience Card */}
                    <div
                      className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                        isEven ? 'md:pr-12' : 'md:pl-12'
                      }`}
                    >
                      <div className="luxury-card p-8 space-y-5">
                        {/* Date & Active Tag */}
                        <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-4 ${
                          theme === 'dark' ? 'border-slate-800/80' : 'border-slate-200'
                        }`}>
                          <div className={`flex items-center gap-2 text-xs font-mono ${
                            theme === 'dark' ? 'text-[#dfc898]' : 'text-[#854d0e]'
                          }`}>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.period}</span>
                          </div>
                          {exp.current && (
                            <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                              theme === 'dark'
                                ? 'bg-[#dfc898]/10 border-[#dfc898]/30 text-[#dfc898]'
                                : 'bg-[#b89b5e]/15 border-[#b89b5e]/40 text-[#854d0e] font-semibold'
                            }`}>
                              Active Position
                            </span>
                          )}
                        </div>

                        {/* Role & Company */}
                        <div>
                          <h3 className={`text-xl font-bold font-heading ${
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                          }`}>
                            {exp.role}
                          </h3>
                          <div className={`text-sm font-semibold flex items-center gap-2 pt-1 ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            <span>{exp.company}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1 font-normal">
                              <MapPin className="w-3.5 h-3.5" />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        {/* Bullet Highlights */}
                        <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                          {exp.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${
                                theme === 'dark' ? 'text-[#dfc898]' : 'text-[#854d0e]'
                              }`} />
                              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Pills */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          {exp.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className={`px-3 py-1 rounded-lg border text-[11px] font-mono ${
                                theme === 'dark'
                                  ? 'bg-slate-900 border-slate-800 text-slate-400'
                                  : 'bg-slate-100 border-slate-200 text-slate-700'
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Expand / Collapse Button */}
          {experiences.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-12 text-center relative z-20"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleToggle}
                className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl border text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-[#dfc898]/40 text-[#dfc898] hover:bg-slate-800 hover:border-[#dfc898]'
                    : 'bg-white border-[#b89b5e]/50 text-[#854d0e] hover:bg-slate-50 shadow-sm'
                }`}
              >
                <span>
                  {expanded
                    ? 'Collapse Earlier Engagements'
                    : `View Full Career Trajectory (+${hiddenCount} Earlier Roles)`}
                </span>
                {expanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
