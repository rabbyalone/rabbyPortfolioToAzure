import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import CaseStudyModal from './CaseStudyModal';
import Reveal from './Reveal';

export default function Works() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Top 4 featured works matching Velora's default 4-card collection, or all when toggled
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 4);

  return (
    <section id="works" className="py-20 sm:py-28 border-b border-[var(--velora-neutral-03)]">
      <div className="velora-container space-y-16 sm:space-y-20">
        {/* Section Header with "— Selected Works" */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start" delay={0}>
          {/* Left: —— Selected Works (Heading/Section Header with hairline rule) */}
          <div className="lg:col-span-5 flex items-center gap-3 pt-1">
            <span className="inline-block w-8 sm:w-10 h-[1px] bg-[var(--velora-neutral-08)] select-none"></span>
            <h2 className="velora-section-header">
              Selected Works
            </h2>
          </div>

          {/* Right: Large Editorial Intro Statement (Others/Section Intro) */}
          <div className="lg:col-span-7">
            <p className="velora-section-intro max-w-2xl">
              Discover curated works that inspire and deliver impact, showcasing creativity, functionality, and design excellence.
            </p>
          </div>
        </Reveal>

        {/* Works Grid — 2-Column Minimalist Layout (Section 05 & Section 08) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {visibleProjects.map((project, idx) => (
            <Reveal
              key={project.id}
              as="article"
              onClick={() => setSelectedProject(project)}
              data-cursor="work"
              delay={(idx % 2) * 120}
              className="group cursor-none flex flex-col space-y-4"
            >
              {/* Image Container with 4px radius, fill crop, and hover scrim */}
              <div
                data-cursor="work"
                className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-[4px] overflow-hidden bg-[var(--velora-neutral-02)] border border-[var(--velora-neutral-04)] cursor-none"
              >
                {/* Showcase Image with smooth growth and blur on hover */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[2px] will-change-transform block"
                  onError={(e) => {
                    e.target.src = '/img/portfolio/insurance.jpg';
                  }}
                />

                {/* Velora Dark Scrim Overlay with backdrop blur & crisp high-contrast white typography */}
                <div className="absolute inset-0 z-10 bg-[var(--velora-overlay)] backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 sm:p-10 text-center select-none pointer-events-none">
                  {/* Centered Brief Overview statement in pure white for universal visibility */}
                  <p className="text-white text-base sm:text-lg font-medium leading-relaxed max-w-md tracking-tight">
                    {project.summary}
                  </p>
                </div>
              </div>

              {/* Title & Metadata below Image */}
              <div className="pt-1 flex flex-col space-y-1">
                <h3 className="text-xl sm:text-2xl font-sans font-medium tracking-tight text-[var(--velora-neutral-12)] group-hover:text-[var(--velora-main-02)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-base font-sans tracking-tight text-[var(--velora-neutral-10)]">
                  {project.category}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All / Collapse Toggle (Button Text: Sentence case, 2-3 words) */}
        {projectsData.length > 4 && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="velora-button text-sm uppercase tracking-widest py-2"
            >
              <span>{showAll ? 'Show fewer works' : `View all ${projectsData.length} works`}</span>
              <span className="ml-2 font-sans">{showAll ? '↑' : '↓'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Case Study Modal Drawer */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
