import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Download } from 'lucide-react';
import { educationData, developerData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 sm:px-8 relative z-10 bg-slate-950/40">
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
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Education & <span className="gold-gradient-text">Credentials</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="luxury-card p-8 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#dfc898]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-[#dfc898]/30 flex items-center justify-center text-[#dfc898]">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-medium text-slate-400 pt-1">
                    {edu.institution}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {edu.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Resume Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="luxury-card p-10 text-center max-w-2xl mx-auto space-y-6 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white font-heading">
            Official Technical Documentation
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-lg mx-auto">
            Download the official PDF document covering complete career milestones, engineering leadership references, and technical stack details.
          </p>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={developerData.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#dfc898] to-[#b89b5e] text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-gold"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Resume (PDF)</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
