import React, { useEffect } from 'react';
import { X, CheckCircle2, Layers, Building2, Cpu, ExternalLink } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed top-[68px] left-0 right-0 bottom-0 z-30 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl bg-[#0d1017] border border-[#dfc898]/40 text-white shadow-2xl overflow-hidden h-full max-h-[calc(100vh-5.5rem)] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-slate-800 bg-[#0d1017] shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#dfc898]/40 flex items-center justify-center text-[#dfc898] shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white line-clamp-1">
                {project.title}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono pt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#dfc898]" />
                <span>{project.client}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Main Image Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center max-h-96">
            <img
              src={project.fullImage}
              alt={`${project.title} - Production Architecture Diagram by Md Rabby Hasan`}
              className="w-full h-auto object-contain max-h-96"
              onError={(e) => {
                e.target.src = project.thumbnail;
              }}
            />
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-[#dfc898] uppercase tracking-widest">
              Executive Architectural Summary
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono text-[#dfc898] uppercase tracking-widest">
                Key Technical & Business Deliverables
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#dfc898] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono text-[#dfc898] uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Technology Stack & Frameworks</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-slate-800 bg-[#0d1017] flex items-center justify-between gap-4 shrink-0">
          <div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 group cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                <span>Launch Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#dfc898] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
