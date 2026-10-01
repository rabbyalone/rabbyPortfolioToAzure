import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Sparkles, Trophy } from 'lucide-react';
import { experiences } from '../data/portfolioData';

export default function ExperienceTimeline({ theme = 'dark' }) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);

  // Scroll Progress Tracker for Animated Timeline Mover Line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const displayedExperiences = expanded ? experiences : experiences.slice(0, 3);

  const toggleExpand = () => {
    if (expanded) {
      setExpanded(false);
      setTimeout(() => {
        const el = document.getElementById('experience');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      setExpanded(true);
    }
  };

  return (
    <section id="experience" className="py-32 px-6 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-20">
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
            <span>10+ YEARS CAREER TRAJECTORY</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Career <span className="gold-gradient-text">Trajectory & Milestones</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
          <p className={`text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Proven engineering track record architecting enterprise microservices, resilient distributed backends, and cloud platforms.
          </p>
        </motion.div>

        {/* Timeline Container with Animated Scroll Mover */}
        <div ref={containerRef} className="relative pl-6 sm:pl-10 space-y-12">
          {/* Base Vertical Timeline Axis Line */}
          <div className={`absolute top-3 bottom-3 left-[19px] sm:left-[27px] w-0.5 ${
            theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-300'
          }`} />

          {/* Animated Scroll-Driven Timeline Fill Mover Line */}
          <motion.div
            style={{ scaleY }}
            className={`absolute top-3 bottom-3 left-[19px] sm:left-[27px] w-0.5 origin-top shadow-[0_0_12px_2px] ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-[#dfc898] via-[#b89b5e] to-[#dfc898] shadow-[#dfc898]/50'
                : 'bg-gradient-to-b from-[#854d0e] via-[#b89b5e] to-[#854d0e] shadow-[#854d0e]/40'
            }`}
          />

          {displayedExperiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Node Pulsing Marker Dot */}
              <div className="absolute -left-[25px] sm:-left-[37px] top-6 z-10 flex items-center justify-center">
                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 group-hover:scale-125 ${
                  exp.current
                    ? theme === 'dark'
                      ? 'bg-[#dfc898] border-white shadow-[0_0_16px_4px_rgba(223,200,152,0.8)]'
                      : 'bg-[#854d0e] border-white shadow-[0_0_16px_4px_rgba(133,77,14,0.6)]'
                    : theme === 'dark'
                    ? 'bg-slate-900 border-[#dfc898]/60 group-hover:border-[#dfc898] group-hover:bg-[#dfc898]'
                    : 'bg-white border-[#854d0e]/60 group-hover:border-[#854d0e] group-hover:bg-[#854d0e]'
                }`}>
                  {exp.current && (
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      theme === 'dark' ? 'bg-[#dfc898]' : 'bg-[#854d0e]'
                    }`} />
                  )}
                </div>
              </div>

              {/* Experience Card */}
              <div className={`luxury-card p-6 sm:p-8 space-y-6 rounded-3xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/85 border-slate-800/90 shadow-xl'
                  : 'bg-white/95 border-slate-200/90 shadow-lg'
              }`}>
                {/* Role & Company Header */}
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
                  theme === 'dark' ? 'border-slate-800/80' : 'border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-xl font-bold font-heading ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                          theme === 'dark'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        }`}>
                          Current Role
                        </span>
                      )}
                    </div>
                    <div className={`text-sm font-semibold pt-1 ${
                      theme === 'dark' ? 'text-[#dfc898]' : 'text-[#854d0e]'
                    }`}>
                      {exp.company}
                    </div>
                  </div>

                  {/* Period & Location Metadata */}
                  <div className="flex flex-col sm:items-end text-xs font-mono space-y-1 text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#dfc898]" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights & Key Accomplishments */}
                <ul className="space-y-2.5">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className={`text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                        theme === 'dark' ? 'bg-[#dfc898]' : 'bg-[#854d0e]'
                      }`} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Tags */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {exp.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className={`px-3 py-1 rounded-md text-[11px] font-mono border transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-[#dfc898]/40 hover:text-[#dfc898]'
                          : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-400'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expand / Collapse Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-4"
        >
          <button
            onClick={toggleExpand}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold border transition-all shadow-md ${
              theme === 'dark'
                ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898] hover:bg-slate-800 hover:border-[#dfc898]'
                : 'bg-white border-[#b89b5e]/40 text-[#854d0e] hover:bg-slate-50 shadow-sm'
            }`}
          >
            <span>{expanded ? 'Collapse to Top 3 Roles' : 'View Full Career Trajectory (+5 Earlier Roles)'}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
