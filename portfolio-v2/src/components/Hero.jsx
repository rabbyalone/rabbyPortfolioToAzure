import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal } from 'lucide-react';
import { developerData } from '../data/portfolioData';

export default function Hero({ theme, onOpenTerminal }) {
  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-center items-center pt-36 pb-24 px-6 sm:px-8 text-center overflow-hidden">
      {/* Ambient Glow */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none ${
        theme === 'dark'
          ? 'bg-gradient-to-tr from-[#dfc898]/10 via-[#6366f1]/05 to-transparent'
          : 'bg-gradient-to-tr from-[#b89b5e]/15 via-[#2563eb]/08 to-transparent'
      }`} />

      <div className="max-w-4xl mx-auto z-10 space-y-10">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-mono backdrop-blur-md shadow-sm ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-[#dfc898]/30 text-[#dfc898]'
              : 'bg-white/90 border-[#b89b5e]/40 text-[#854d0e]'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              theme === 'dark' ? 'bg-[#dfc898]' : 'bg-[#854d0e]'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              theme === 'dark' ? 'bg-[#dfc898]' : 'bg-[#854d0e]'
            }`}></span>
          </span>
          <span>Lead Software Engineer & Systems Architect</span>
        </motion.div>

        {/* Executive Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-4"
        >
          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-heading leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            MD RABBY <span className="gold-gradient-text">HASAN</span>
          </h1>

          <p className={`text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed pt-2 ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Architecting high-scale distributed microservices, resilient cloud platforms, AI spec-driven development, and backend data pipelines with over <span className={`font-semibold ${
              theme === 'dark' ? 'text-[#dfc898]' : 'text-[#854d0e]'
            }`}>10+ years of engineering leadership</span>.
          </p>
        </motion.div>

        {/* Domain Tags Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
        >
          {[
            'AI Spec-Driven Dev (SDD)',
            'AI Automations & Agents',
            'US Healthcare Risk (Ethos)',
            'Ernst & Young Taxation',
            'Arctic Data Vault (Piql Norway)',
            '.NET 8 / Microservices'
          ].map((tag, idx) => (
            <span
              key={idx}
              className={`px-4 py-1.5 rounded-full border text-xs font-mono ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-800 shadow-sm'
              }`}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#case-studies"
            className={`px-8 py-4 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-[#dfc898] to-[#b89b5e] text-black shadow-glow-gold'
                : 'bg-slate-900 text-white hover:bg-black'
            }`}
          >
            <span>View Architectural Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={developerData.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-7 py-4 rounded-xl border font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-[#dfc898]/40'
                : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400 shadow-sm'
            }`}
          >
            <Download className={`w-4 h-4 ${theme === 'dark' ? 'text-[#dfc898]' : 'text-[#854d0e]'}`} />
            <span>Official Resume PDF</span>
          </motion.a>
        </motion.div>

        {/* Metric Cards Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`pt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto border-t ${
            theme === 'dark' ? 'border-slate-800/80' : 'border-slate-300/80'
          }`}
        >
          {developerData.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl luxury-card text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-heading gold-gradient-text">
                {stat.value}
              </div>
              <div className={`text-xs font-semibold font-heading ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {stat.label}
              </div>
              <div className={`text-[10px] font-mono uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {stat.detail}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
