import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { articlesData } from '../data/portfolioData';
import Reveal from './Reveal';

export default function Journal() {
  return (
    <section id="journal" className="py-20 sm:py-28 border-b border-[var(--velora-neutral-03)]">
      <div className="velora-container space-y-16 sm:space-y-20">
        {/* Section Header with "— Journal" */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start" delay={0}>
          {/* Left: —— Journal (Heading/Section Header with hairline rule) */}
          <div className="lg:col-span-5 flex items-center gap-3 pt-1">
            <span className="inline-block w-8 sm:w-10 h-[1px] bg-[var(--velora-neutral-08)] select-none"></span>
            <h2 className="velora-section-header">
              Journal
            </h2>
          </div>

          {/* Right: Section Intro (Others/Section Intro) */}
          <div className="lg:col-span-7">
            <p className="velora-section-intro max-w-2xl">
              Case studies, runtime internals, and architecture notes published on my personal engineering blog.
            </p>
          </div>
        </Reveal>

        {/* Articles Grid (3-Column Minimal Cards with Unified Smooth Reveal) */}
        <Reveal delay={120} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articlesData.map((art) => (
            <a
              key={art.id}
              href={art.url}
              target="_blank"
              rel="noopener noreferrer"
              className="velora-card flex flex-col justify-between space-y-6 group text-decoration-none hover:border-[var(--velora-main-02)] transition-colors duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="velora-chip">
                    {art.category}
                  </span>
                  <span className="text-xs font-sans text-[var(--velora-main-02)]">
                    {art.readTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-sans font-medium tracking-tight text-[var(--velora-neutral-12)] group-hover:text-[var(--velora-main-02)] transition-colors">
                  {art.title}
                </h3>

                <p className="text-sm font-sans text-[var(--velora-neutral-10)] leading-relaxed font-normal">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--velora-neutral-03)] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {art.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-[2px] text-[11px] font-sans bg-[var(--velora-neutral-02)] text-[var(--velora-neutral-09)] border border-[var(--velora-neutral-04)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="w-8 h-8 rounded-[4px] flex items-center justify-center border border-[var(--velora-neutral-04)] text-[var(--velora-neutral-12)] group-hover:border-[var(--velora-main-02)] group-hover:text-[var(--velora-main-02)] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
