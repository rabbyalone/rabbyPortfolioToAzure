import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { articlesData, developerData } from '../data/portfolioData';

export default function Articles({ theme }) {
  return (
    <section id="articles" className="py-32 px-6 sm:px-8 relative z-10">
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>THOUGHT LEADERSHIP</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Technical <span className="gold-gradient-text">Publications</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
          <p className={`text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Featured technical engineering articles on AI Spec-Driven Development, .NET 8 microservices, sub-50ms database tuning, and cloud architecture.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articlesData.map((article, idx) => (
            <motion.a
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-card group p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Category & Read Time Top Bar */}
                <div className="flex items-center justify-between border-b pb-4 border-slate-800/80">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono border ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898]'
                      : 'bg-slate-100 border-[#b89b5e]/40 text-[#854d0e] font-semibold'
                  }`}>
                    {article.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {article.readTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className={`text-xl font-bold font-heading group-hover:text-[#dfc898] transition-colors leading-snug ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {article.title}
                </h3>

                {/* Article Summary */}
                <p className={`text-xs leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {article.summary}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                {/* Article Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-mono border ${
                        theme === 'dark'
                          ? 'bg-slate-900 border-slate-800 text-slate-400'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* External Read CTA */}
                <div className="flex items-center justify-between text-xs font-semibold text-[#dfc898] group-hover:underline pt-1">
                  <span>Read Article on Blog</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Blog Banner Footer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-8"
        >
          <a
            href={developerData.socials.blog}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md ${
              theme === 'dark'
                ? 'bg-slate-900 border-[#dfc898]/40 text-[#dfc898] hover:bg-slate-800 hover:border-[#dfc898]'
                : 'bg-white border-[#b89b5e]/50 text-[#854d0e] hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#dfc898]" />
            <span>Visit blog.rabbyhasan.com.bd for Full Publications</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
