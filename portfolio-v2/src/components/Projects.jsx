import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  CheckCircle2,
  Building2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Archive,
  Cpu,
  Database,
  ExternalLink,
  Bot
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';

// High-signal verified production metrics for all case studies
const projectMetrics = {
  "ethos-risk-management": "90% Downtime Drop",
  "ey-taxation": "Enterprise gRPC & Bus",
  "geologiq-oil-rig": "North Sea Telemetry",
  "piql-connect": "1,000-Yr Cold Vault",
  "smilecare-chamber": "Live Doctor SaaS",
  "barqo-ecommerce": "Live E-Commerce",
  "expiry-control": "Zero Expiration Loss",
  "employee-mobility": "SAP ERP Middleware",
  "bcps-registration": "100k+ Concurrency",
  "posm-distribution": "Nationwide Field Audit",
  "idim-security": "Air-Gapped Security"
};

// Filter tabs
const CATEGORIES = [
  { id: "all", label: "Curated Showcase", count: 11 },
  { id: "flagship", label: "Global Flagships", count: 4 },
  { id: "ai-saas", label: "AI-Native & Live Products", count: 2 },
  { id: "enterprise", label: "Enterprise Systems Archive", count: 5 }
];

/* ---------------- Single Bento Card with Spotlight Cursor Aura ---------------- */
function BentoCard({
  project,
  isHovered,
  isRowHovered,
  onHover,
  onLeave,
  onSelectProject,
  theme,
  totalInRow = 4
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const isDark = theme === 'dark';

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const metricBadge = projectMetrics[project.id] || "Production Scaled";

  // Dynamic flex ratio based on number of items in the row
  const getFlexClass = () => {
    if (totalInRow >= 4) {
      if (isHovered) return 'lg:flex-[2.6] shadow-2xl';
      if (isRowHovered) return 'lg:flex-[0.8] opacity-75';
      return 'lg:flex-1';
    }
    if (totalInRow === 3) {
      if (isHovered) return 'lg:flex-[1.9] shadow-2xl';
      if (isRowHovered) return 'lg:flex-[0.85] opacity-75';
      return 'lg:flex-1';
    }
    // 2 items
    if (isHovered) return 'lg:flex-[1.4] shadow-2xl';
    if (isRowHovered) return 'lg:flex-[0.9] opacity-75';
    return 'lg:flex-1';
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => onSelectProject(project)}
      layout
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`group relative rounded-3xl overflow-hidden border cursor-pointer select-none flex flex-col justify-between transition-all duration-500 transform-gpu ${getFlexClass()} ${
        isDark
          ? isHovered
            ? 'bg-slate-900/95 border-[#dfc898]/50 shadow-black/80'
            : 'bg-slate-950/70 border-white/10 hover:border-white/20'
          : isHovered
          ? 'bg-white border-[#b89b5e]/60 shadow-slate-300/80'
          : 'bg-white/80 border-slate-200/90 hover:border-slate-300'
      } min-h-[420px] sm:min-h-[460px]`}
    >
      {/* 1. Radial Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, ${
            isDark ? 'rgba(223, 200, 152, 0.16)' : 'rgba(184, 155, 94, 0.18)'
          }, transparent 70%)`
        }}
      />

      {/* 2. Visual Thumbnail Frame with Smooth Desaturation to Full Color */}
      <div
        className={`relative w-full overflow-hidden bg-slate-950 shrink-0 transition-all duration-500 ${
          isHovered ? 'h-36 sm:h-44' : 'h-44 sm:h-52'
        }`}
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered
              ? 'scale-105 filter-none opacity-100'
              : 'scale-100 filter grayscale-[80%] opacity-70 group-hover:grayscale-[40%] group-hover:opacity-85'
          }`}
          onError={(e) => {
            e.target.src = project.fullImage;
          }}
          loading="lazy"
        />

        {/* Cinematic Gradient Overlays */}
        <div
          className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
            isDark
              ? 'from-[#0b0f17] via-[#0b0f17]/40 to-transparent opacity-90'
              : 'from-white/95 via-white/30 to-transparent opacity-90'
          }`}
        />

        {/* Top-Left Client Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-md transition-colors ${
              isDark
                ? 'bg-black/80 border-white/15 text-[#dfc898]'
                : 'bg-white/90 border-slate-300 text-[#854d0e]'
            }`}
          >
            <Building2 className="w-3 h-3 text-[#dfc898]" />
            <span className="truncate max-w-[130px] sm:max-w-[160px]">{project.client}</span>
          </span>
        </div>

        {/* Top-Right Highlight Metric Badge & Optional Live Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border backdrop-blur-md shadow-md bg-emerald-500/25 border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/40 transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
          <span
            className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-md ${
              isDark
                ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                : 'bg-emerald-50 border-emerald-300 text-emerald-800'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>{metricBadge}</span>
          </span>
        </div>
      </div>

      {/* 3. Card Body: Header, Summary, Key Deliverables on Expansion, Tech Pills */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between relative z-10">
        <div className="space-y-2.5">
          {/* Category Tag */}
          <div
            className={`text-[10px] font-mono uppercase tracking-widest ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {project.category}
          </div>

          {/* Project Title */}
          <h3
            className={`font-heading font-extrabold text-base sm:text-lg transition-colors leading-snug ${
              isHovered
                ? isDark
                  ? 'text-[#dfc898]'
                  : 'text-[#854d0e]'
                : isDark
                ? 'text-white'
                : 'text-slate-900'
            }`}
          >
            {project.title}
          </h3>

          {/* Dynamic Summary */}
          <p
            className={`text-xs leading-relaxed font-sans transition-all duration-300 ${
              isHovered
                ? isDark
                  ? 'text-slate-200 font-normal'
                  : 'text-slate-700 font-normal'
                : isDark
                ? 'text-slate-400 line-clamp-2'
                : 'text-slate-600 line-clamp-2'
            }`}
          >
            {project.summary}
          </p>

          {/* Key Technical Deliverables - Revealed on Bento Card Expansion */}
          {isHovered && project.keyFeatures && project.keyFeatures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="pt-2.5 mt-2 border-t border-white/10 dark:border-white/10 space-y-2"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider font-bold text-[#dfc898]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#dfc898] shrink-0" />
                <span>Key Technical Deliverables</span>
              </div>
              <ul className="space-y-1.5">
                {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    className={`text-[11px] leading-relaxed flex items-start gap-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfc898] mt-1.5 shrink-0" />
                    <span className="line-clamp-2">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Tech Stack Pills & CTA */}
        <div className="pt-3 mt-3 border-t border-white/5 dark:border-white/5 space-y-2.5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, isHovered ? 6 : 3).map((t, i) => (
              <span
                key={i}
                className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {t}
              </span>
            ))}
            {!isHovered && project.tech.length > 3 && (
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Bottom Action Row */}
          <div
            className={`flex items-center justify-between text-xs font-mono font-bold transition-all pt-1 ${
              isDark ? 'text-[#dfc898]' : 'text-[#854d0e]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span>Inspect Architecture</span>
              <ArrowRight
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isHovered ? 'translate-x-1' : ''
                }`}
              />
            </span>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                  isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-900'
                }`}
              >
                <span>Launch Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-[10px] opacity-60 uppercase tracking-widest hidden sm:inline">
                Full Specs Modal
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Spotlight Bento Row Container ---------------- */
function BentoRow({ projects, onSelectProject, theme }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full">
      {projects.map((proj) => (
        <BentoCard
          key={proj.id}
          project={proj}
          isHovered={hoveredId === proj.id}
          isRowHovered={hoveredId !== null}
          onHover={() => setHoveredId(proj.id)}
          onLeave={() => setHoveredId(null)}
          onSelectProject={onSelectProject}
          theme={theme}
          totalInRow={projects.length}
        />
      ))}
    </div>
  );
}

/* ---------------- Main Curated Case Studies Section ---------------- */
export default function Projects({ theme = 'dark', onSelectProject }) {
  const [activeTab, setActiveTab] = useState("all");
  const [showArchive, setShowArchive] = useState(false);
  const isDark = theme === 'dark';

  // 1. Top 4 Flagship Case Studies (International Tier-1 Engagements)
  const flagshipProjects = projectsData.filter((p) =>
    ["ethos-risk-management", "ey-taxation", "geologiq-oil-rig", "piql-connect"].includes(p.id)
  );

  // 2. AI-Native & SaaS Live Commercial Products
  const aiSaasProjects = projectsData.filter((p) =>
    ["smilecare-chamber", "barqo-ecommerce"].includes(p.id)
  );

  // 3. 5 Enterprise Systems & Production Middleware Platforms
  const enterpriseProjects = projectsData.filter((p) =>
    ["employee-mobility", "bcps-registration", "posm-distribution", "expiry-control", "idim-security"].includes(p.id)
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "enterprise") {
      setShowArchive(true);
    } else {
      setShowArchive(false);
    }
  };

  return (
    <section id="case-studies" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-[1720px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 max-w-4xl mx-auto"
        >
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono ${
              isDark
                ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898]'
                : 'bg-white border-[#b89b5e]/40 text-[#854d0e] shadow-sm'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CURATED ARCHITECTURE • 4 FLAGSHIPS + 2 AI PRODUCTS + 5 ENTERPRISE SYSTEMS</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Architectural <span className="gold-gradient-text">Case Studies</span>
          </h2>

          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />

          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Spotlighting 4 high-impact global architectures across the USA, Norway, and Big-4 enterprise systems, with verified production metrics and zero fluff.
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div className="flex justify-center">
          <div
            className={`inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full border backdrop-blur-2xl shadow-xl transition-all ${
              isDark
                ? 'bg-black/75 border-[#dfc898]/25 shadow-black/60'
                : 'bg-white/95 border-[#b89b5e]/30 shadow-slate-200/80'
            }`}
          >
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id
                    ? isDark
                      ? 'bg-gradient-to-r from-[#dfc898] to-[#b89b5e] text-black shadow-lg shadow-[#dfc898]/20'
                      : 'bg-slate-900 text-[#dfc898] shadow-md'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? isDark
                        ? 'bg-black/30 text-black'
                        : 'bg-white/20 text-[#dfc898]'
                      : isDark
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- 1. PRIMARY SPOTLIGHT: TOP 4 FLAGSHIPS ---------------- */}
        {(activeTab === "all" || activeTab === "flagship") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
              <span className="font-bold uppercase tracking-wider text-[#dfc898]/90">
                // Premier Flagships: USA Modernization, Ernst & Young, Norway Telemetry & Svalbard Vault
              </span>
              <span className="text-[11px] opacity-70 hidden sm:inline">
                Hover to expand deliverables
              </span>
            </div>

            <BentoRow
              projects={flagshipProjects}
              onSelectProject={onSelectProject}
              theme={theme}
            />
          </motion.div>
        )}

        {/* ---------------- 2. AI-NATIVE & LIVE PRODUCTS SPOTLIGHT ---------------- */}
        {(activeTab === "all" || activeTab === "ai-saas") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 pt-2 sm:pt-4"
          >
            <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
              <span className="font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                // AI-Native Engineering & Live Products: Healthcare Operations ERP & Consumer E-Commerce
              </span>
              <span className="text-[11px] opacity-70 hidden sm:inline">
                Live Production • PWA Enabled • Click to Inspect or Launch
              </span>
            </div>

            <BentoRow
              projects={aiSaasProjects}
              onSelectProject={onSelectProject}
              theme={theme}
            />
          </motion.div>
        )}

        {/* ---------------- 3. ENTERPRISE ARCHIVE SECTION (ACCORDION / TAB VIEW) ---------------- */}
        {activeTab === "all" && (
          <div className="pt-6 sm:pt-10">
            <div
              className={`rounded-3xl border p-6 sm:p-8 transition-all ${
                isDark
                  ? 'bg-slate-950/60 border-white/10'
                  : 'bg-white/80 border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#dfc898]">
                    <Archive className="w-4 h-4 text-[#dfc898]" />
                    <span>Enterprise Systems & Production Archive</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#dfc898]/15 border border-[#dfc898]/30 text-[#dfc898]">
                      5 Systems
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Prior enterprise platforms spanning SAP ERP middleware, national medical concurrency, BAT logistics, pharmaceutical batch control, and air-gapped security.
                  </p>
                </div>

                <button
                  onClick={() => setShowArchive(!showArchive)}
                  className={`shrink-0 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                    showArchive
                      ? isDark
                        ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                        : 'bg-slate-200 text-slate-800 border-slate-300 hover:bg-slate-300'
                      : isDark
                      ? 'bg-[#dfc898] text-slate-950 border-[#dfc898] hover:bg-[#edd8aa] shadow-lg shadow-[#dfc898]/10'
                      : 'bg-slate-900 text-[#dfc898] border-slate-900 hover:bg-slate-800 shadow-md'
                  }`}
                >
                  <span>{showArchive ? 'Hide Enterprise Archive' : 'Explore Archive (5 Systems)'}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showArchive ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Pill Preview of Clients When Collapsed */}
              {!showArchive && (
                <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-white/5 dark:border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Featuring:
                  </span>
                  {[
                    { client: "Berger Paints", tag: "SAP OData Middleware" },
                    { client: "BAT", tag: "Nationwide Logistics" },
                    { client: "BCPS", tag: "National Exam Concurrency" },
                    { client: "Pharma", tag: "Automated Batch Expiry" },
                    { client: "Security HQ", tag: "Air-Gapped RBAC" }
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${
                        isDark
                          ? 'bg-slate-900/80 border-slate-800 text-slate-400'
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="font-semibold text-slate-300">{item.client}</span>
                      <span className="opacity-60">• {item.tag}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Unfolded Archive Content */}
              <AnimatePresence>
                {showArchive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden pt-6 mt-6 border-t border-white/10 dark:border-white/10 space-y-8"
                  >
                    <div className="space-y-8">
                      {/* Sub-row 1: 3 Items */}
                      <div className="space-y-3">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                          // Enterprise Workflow & Middleware Systems (3)
                        </div>
                        <BentoRow
                          projects={enterpriseProjects.slice(0, 3)}
                          onSelectProject={onSelectProject}
                          theme={theme}
                        />
                      </div>

                      {/* Sub-row 2: 2 Items */}
                      <div className="space-y-3">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                          // Mission-Critical Logistics & Defense Systems (2)
                        </div>
                        <BentoRow
                          projects={enterpriseProjects.slice(3, 5)}
                          onSelectProject={onSelectProject}
                          theme={theme}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center pt-4">
                      <button
                        onClick={() => {
                          setShowArchive(false);
                          const el = document.getElementById('case-studies');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`inline-flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg border transition-colors cursor-pointer ${
                          isDark
                            ? 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                            : 'border-slate-300 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                        <span>Collapse Enterprise Archive</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ---------------- 3. ENTERPRISE TAB VIEW ---------------- */}
        {activeTab === "enterprise" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                // Enterprise Workflow & Middleware Systems (3)
              </div>
              <BentoRow
                projects={enterpriseProjects.slice(0, 3)}
                onSelectProject={onSelectProject}
                theme={theme}
              />
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                // Mission-Critical Logistics & Defense Systems (2)
              </div>
              <BentoRow
                projects={enterpriseProjects.slice(3, 5)}
                onSelectProject={onSelectProject}
                theme={theme}
              />
            </div>
          </motion.div>
        )}

        {/* Bottom Helper Note */}
        <div className="text-center pt-2">
          <p
            className={`text-xs font-mono tracking-wide ${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}
          >
            Click any card to launch its technical deep-dive specification modal.
          </p>
        </div>

      </div>
    </section>
  );
}
