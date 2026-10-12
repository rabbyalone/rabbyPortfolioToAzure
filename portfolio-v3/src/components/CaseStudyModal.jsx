import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CaseStudyModal({ project: incomingProject, onClose, onSelectNext }) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [project, setProject] = useState(incomingProject);

  useEffect(() => {
    let timer;
    let raf1;
    let raf2;
    if (incomingProject) {
      setProject(incomingProject);
      setMounted(true);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setActive(true);
        });
      });
    } else {
      setActive(false);
      timer = setTimeout(() => {
        setMounted(false);
        setProject(null);
      }, 250);
    }
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
  }, [incomingProject]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (incomingProject) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [incomingProject, onClose]);

  if (!mounted || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop Scrim */}
      <div
        onClick={onClose}
        style={{
          opacity: active ? 1 : 0,
          transition: 'opacity 220ms ease-out',
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Window: Zero shadows, 6px radius, Neutral 00 surface, 1px Neutral 04 border */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="casestudy-modal-title"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
          transition: 'opacity 220ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[6px] bg-[var(--velora-neutral-00)] border border-[var(--velora-neutral-04)] z-10 text-[var(--velora-neutral-12)]"
      >
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[var(--velora-neutral-00)]/95 backdrop-blur-md border-b border-[var(--velora-neutral-03)]">
            <div className="flex items-center gap-3">
              <span className="velora-chip">
                {project.index} / {project.category}
              </span>
              <span className="hidden sm:inline text-xs font-sans text-[var(--velora-neutral-09)]">
                {project.year}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-[4px] flex items-center justify-center border border-[var(--velora-neutral-04)] text-[var(--velora-neutral-10)] hover:text-[var(--velora-neutral-12)] hover:border-[var(--velora-main-02)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Title block */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl font-sans font-medium tracking-tightest leading-tight text-[var(--velora-neutral-12)]">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-[var(--velora-neutral-10)] leading-relaxed font-normal">
                {project.summary}
              </p>
            </div>

            {/* Media Image: 8px radius (Section 03: Work detail gallery wrappers) */}
            <div className="relative rounded-[8px] overflow-hidden border border-[var(--velora-neutral-04)] bg-[var(--velora-neutral-02)] aspect-video max-h-[440px]">
              <img
                src={project.fullImage}
                alt={project.title}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.src = '/img/portfolio/insurance.jpg';
                }}
              />
            </div>

            {/* Velora Metadata Grid: Section/Work information (Section 08) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[var(--velora-neutral-03)]">
              <div>
                <span className="velora-label mb-1">
                  CLIENT
                </span>
                <span className="text-sm font-sans font-medium text-[var(--velora-neutral-12)] block pt-1">
                  {project.client}
                </span>
              </div>
              <div>
                <span className="velora-label mb-1">
                  ROLE
                </span>
                <span className="text-sm font-sans font-medium text-[var(--velora-neutral-12)] block pt-1">
                  {project.role}
                </span>
              </div>
              <div>
                <span className="velora-label mb-1">
                  DOMAIN
                </span>
                <span className="text-sm font-sans font-medium text-[var(--velora-neutral-12)] block pt-1">
                  {project.category}
                </span>
              </div>
              <div>
                <span className="velora-label mb-1">
                  YEAR
                </span>
                <span className="text-sm font-sans font-medium text-[var(--velora-neutral-12)] block pt-1">
                  {project.year}
                </span>
              </div>
            </div>

            {/* In-depth Editorial Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {/* Challenge */}
              <div className="space-y-3 p-6 rounded-[4px] bg-[var(--velora-neutral-02)] border border-[var(--velora-neutral-04)]">
                <h3 className="font-sans font-medium text-lg text-[var(--velora-neutral-12)]">
                  The Problem & Challenge
                </h3>
                <p className="text-sm font-sans text-[var(--velora-neutral-10)] leading-relaxed font-normal">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-3 p-6 rounded-[4px] bg-[var(--velora-neutral-02)] border border-[var(--velora-neutral-04)]">
                <h3 className="font-sans font-medium text-lg text-[var(--velora-neutral-12)]">
                  Architectural Solution
                </h3>
                <p className="text-sm font-sans text-[var(--velora-neutral-10)] leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Outcome */}
            <div className="p-6 rounded-[4px] bg-[var(--velora-neutral-00)] border border-[var(--velora-neutral-04)] space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--velora-main-02)]" />
                <h3 className="font-sans font-medium text-lg text-[var(--velora-neutral-12)]">
                  Key Outcomes & Impact
                </h3>
              </div>
              <p className="text-sm font-sans text-[var(--velora-neutral-10)] leading-relaxed font-normal">
                {project.outcome}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-3">
              <span className="velora-label block">
                TECHNOLOGIES & ARCHITECTURE
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-[2px] text-xs font-sans bg-[var(--velora-neutral-02)] border border-[var(--velora-neutral-04)] text-[var(--velora-neutral-12)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions / Live link */}
            {project.liveUrl && (
              <div className="pt-4 flex items-center justify-between border-t border-[var(--velora-neutral-03)]">
                <span className="text-xs font-sans text-[var(--velora-neutral-09)]">
                  Live Production System
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="velora-button text-sm py-1.5"
                >
                  <span>Visit live platform</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
