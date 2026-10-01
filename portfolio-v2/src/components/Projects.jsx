import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Building2, ChevronRight } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

export default function Projects({ theme = 'dark', onSelectProject }) {
  return (
    <section id="case-studies" className="py-32 px-6 sm:px-8 relative z-10">
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
            <Layers className="w-3.5 h-3.5" />
            <span>FEATURED ENGAGEMENTS</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Architectural <span className="gold-gradient-text">Case Studies</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
          <p className={`text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Enterprise engagements engineered for international clients, deep data preservation vaults, and distributed cloud applications.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => onSelectProject(project)}
              className={`luxury-card group overflow-hidden cursor-pointer flex flex-col justify-between border rounded-3xl transition-all duration-300 transform-gpu backdrop-blur-xl ${
                theme === 'dark'
                  ? 'bg-slate-900/85 border-slate-800/90 shadow-xl hover:border-[#dfc898]/40 hover:shadow-2xl hover:shadow-[#dfc898]/05'
                  : 'bg-white/95 border-slate-200/90 shadow-lg hover:border-[#b89b5e]/60 hover:shadow-xl'
              }`}
            >
              <div>
                {/* Thumbnail Banner */}
                <div className="relative h-56 bg-slate-950 overflow-hidden rounded-t-3xl">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = project.fullImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-transparent opacity-85" />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[10px] font-mono text-[#dfc898] backdrop-blur-md">
                    {project.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Building2 className="w-3.5 h-3.5 text-[#dfc898] shrink-0" />
                    <span>{project.client}</span>
                  </div>

                  <h3 className={`text-xl font-bold font-heading transition-colors line-clamp-1 ${
                    theme === 'dark'
                      ? 'text-white group-hover:text-[#dfc898]'
                      : 'text-slate-900 group-hover:text-[#854d0e]'
                  }`}>
                    {project.title}
                  </h3>

                  <p className={`text-xs leading-relaxed line-clamp-3 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2.5 py-1 rounded-md border text-[10px] font-mono ${
                          theme === 'dark'
                            ? 'bg-slate-900/90 border-slate-800 text-slate-400'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className={`px-7 py-4 border-t flex items-center justify-between text-xs font-bold transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800/80 text-[#dfc898] group-hover:text-white'
                  : 'bg-slate-50 border-slate-200 text-[#854d0e] group-hover:text-slate-900'
              }`}>
                <span>Inspect Technical Architecture</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
