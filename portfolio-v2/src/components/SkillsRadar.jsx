import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Cloud, Database, Layout, CheckCircle2 } from 'lucide-react';
import { architecturalCapabilities } from '../data/portfolioData';

export default function SkillsRadar() {
  const iconMap = {
    Server: Server,
    Cloud: Cloud,
    Database: Database,
    Layout: Layout
  };

  return (
    <section id="architecture" className="py-32 px-6 sm:px-8 relative z-10">
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
            <Cpu className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL DOMAINS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Core Technical <span className="gold-gradient-text">Capabilities</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Enterprise technology stack and engineering principles refined over 9+ years of distributed backend and cloud architecture.
          </p>
        </motion.div>

        {/* Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {architecturalCapabilities.map((domain, idx) => {
            const IconComponent = iconMap[domain.icon] || Server;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="luxury-card p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-800/80">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#dfc898]/40 flex items-center justify-center text-[#dfc898] shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-white font-heading">
                        {domain.domain}
                      </h3>
                      <p className="text-xs text-slate-400 pt-0.5">
                        {domain.description}
                      </p>
                    </div>
                  </div>

                  {/* Technology List */}
                  <div className="space-y-3.5">
                    {domain.technologies.map((tech, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#dfc898] shrink-0" />
                          <span className="text-sm font-semibold text-white font-heading">
                            {tech.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {tech.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
