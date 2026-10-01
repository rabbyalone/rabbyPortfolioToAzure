import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Download } from 'lucide-react';
import { educationData, developerData } from '../data/portfolioData';

export default function Education({ theme = 'dark' }) {
  return (
    <section id="education" className="py-32 px-6 sm:px-8 relative z-10">
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
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
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
              className={`p-8 space-y-5 flex flex-col justify-between rounded-3xl border transition-all luxury-card backdrop-blur-xl ${
                theme === 'dark'
                  ? 'bg-slate-900/85 border-slate-800/90 shadow-xl'
                  : 'bg-white/95 border-slate-200/90 shadow-lg'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 text-xs font-mono font-medium ${
                    theme === 'dark' ? 'text-[#dfc898]' : 'text-[#854d0e]'
                  }`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898]'
                      : 'bg-amber-50 border-amber-200 text-[#854d0e]'
                  }`}>
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-bold font-heading ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {edu.degree}
                  </h3>
                  <div className={`text-sm font-medium pt-1 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {edu.institution}
                  </div>
                </div>

                <p className={`text-xs leading-relaxed pt-1 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {edu.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Resume Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`p-10 text-center max-w-2xl mx-auto space-y-6 rounded-3xl border shadow-2xl backdrop-blur-xl luxury-card ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-white/95 border-slate-200 shadow-slate-200/80'
          }`}
        >
          <h3 className={`text-2xl font-bold font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Official Technical Documentation
          </h3>
          <p className={`text-xs leading-relaxed max-w-lg mx-auto ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Download the official PDF document covering complete career milestones, engineering leadership references, and technical stack details.
          </p>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={developerData.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-[#dfc898] to-[#b89b5e] hover:from-[#f1e8d6] hover:to-[#dfc898] text-black shadow-[#dfc898]/20'
                : 'bg-slate-900 hover:bg-black text-[#dfc898] shadow-slate-900/25'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download Official Resume (PDF)</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
