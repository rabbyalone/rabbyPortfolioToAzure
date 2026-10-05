import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Cpu,
  Server,
  Cloud,
  Database,
  Trophy,
  Zap,
  CheckCircle2,
  Workflow,
  Compass,
  Bot,
  ShieldCheck,
  Move,
  Pin
} from "lucide-react";
import { WordsPullUp } from "./prisma-hero";

export interface PortfolioPrismaHeroProps {
  name?: string;
  surname?: string;
  tagline?: string;
  typewriterPhrases?: string[];
  summary?: string;
  ctaText?: string;
  ctaAction?: () => void;
  onOpenTerminal?: () => void;
  onSelectProject?: (project: any) => void;
  resumeUrl?: string;
  videoSrc?: string;
  posterImage?: string;
  theme?: "dark" | "light";
}

const defaultTypewriterPhrases = [
  "AI-Native Engineering & Agents",
  "SaaS & Distributed Microservices",
  "Legacy Software Conversion",
  "Performance Optimization & Tuning"
];

/* ---------------- Minimal & Tactile Architectural Typewriter ---------------- */
function Typewriter({
  phrases = defaultTypewriterPhrases,
  theme = "dark"
}: {
  phrases?: string[];
  theme?: "dark" | "light";
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    const fullText = phrases[currentIdx % phrases.length];

    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 2500);
      return () => clearTimeout(waitTimer);
    }

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        const nextChar = fullText.charAt(currentText.length);
        const speed = nextChar === " " ? 95 : 45 + Math.random() * 20;
        const timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, speed);
        return () => clearTimeout(timer);
      } else {
        setIsWaiting(true);
      }
    } else {
      if (currentText.length > 0) {
        const timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }, 22);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setCurrentIdx((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [currentText, isDeleting, isWaiting, currentIdx, phrases]);

  const isDark = theme === "dark";

  return (
    <div className="flex items-center flex-wrap gap-3 pt-1">
      <div
        className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-xl ${
          isDark
            ? "bg-black/55 border-[#dfc898]/20 shadow-black/40 hover:border-[#dfc898]/40"
            : "bg-white/95 border-[#b89b5e]/30 shadow-slate-200/80 hover:border-[#b89b5e]/60"
        }`}
      >
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-wider ${
            isDark
              ? "bg-slate-900 border-slate-800 text-[#dfc898]"
              : "bg-amber-50 border-amber-200 text-[#854d0e]"
          }`}
        >
          <span>{String(currentIdx + 1).padStart(2, "0")}</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-500">{String(phrases.length).padStart(2, "0")}</span>
        </div>

        <span
          className={`text-xs font-mono font-bold select-none ${
            isDark ? "text-[#dfc898]" : "text-[#854d0e]"
          }`}
        >
          {"\u276F"}
        </span>

        <div className="flex items-center min-w-[230px] sm:min-w-[340px] md:min-w-[410px]">
          <span
            className={`text-xs sm:text-sm md:text-base font-mono font-semibold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-950 font-bold"
            }`}
          >
            {currentText}
          </span>
          <span
            className={`inline-block w-[2px] h-[1.2em] ml-1 rounded-full transition-opacity duration-150 ${
              isDark
                ? "bg-[#dfc898] shadow-[0_0_10px_#dfc898]"
                : "bg-[#854d0e] shadow-[0_0_8px_#854d0e]"
            } ${cursorVisible ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        <div className="hidden sm:flex items-center gap-1.5 pl-2.5 border-l border-white/10 dark:border-slate-800">
          {phrases.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIdx
                  ? isDark
                    ? "bg-[#dfc898] shadow-[0_0_6px_#dfc898] scale-125"
                    : "bg-[#854d0e] shadow-[0_0_4px_#854d0e] scale-125"
                  : isDark
                  ? "bg-slate-800"
                  : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 4 AI SYSTEMS SERVICE TILES (each backed by one verified proof point) ---------------- */
const serviceTiles = [
  {
    id: "ai-strategy",
    icon: Compass,
    category: "01 · Plan",
    title: "AI Strategy",
    proof: "AI-assisted delivery workflows at Ethos Risk (USA)",
    tags: ["Use-Case Mapping", "Spec-Driven Dev", "Roadmaps"],
    glowColor: "from-indigo-300 via-sky-200 to-blue-400",
    borderHover: "hover:border-indigo-400/70",
    targetSection: "architecture"
  },
  {
    id: "process-automation",
    icon: Workflow,
    category: "02 · Automate",
    title: "Process Automation",
    proof: "−20% deployment cycle time via automated pipelines",
    tags: ["Workflow Engines", "CI/CD", "Azure Functions"],
    glowColor: "from-emerald-300 via-teal-200 to-cyan-400",
    borderHover: "hover:border-emerald-400/70",
    targetSection: "architecture"
  },
  {
    id: "custom-agents",
    icon: Bot,
    category: "03 · Build",
    title: "Custom Agents",
    proof: "2nd Prize · company AI Hackathon for autonomous agents",
    tags: ["Autonomous Agents", "Task Automation", ".NET 8"],
    glowColor: "from-purple-300 via-fuchsia-200 to-indigo-400",
    borderHover: "hover:border-purple-400/70",
    targetSection: "case-studies"
  },
  {
    id: "data-intelligence",
    icon: Database,
    category: "04 · Measure",
    title: "Data Intelligence",
    proof: "Real-time North Sea rig telemetry · GeologiQ (Norway)",
    tags: ["Cosmos DB", "SQL Server", "Redis"],
    glowColor: "from-cyan-300 via-sky-200 to-indigo-400",
    borderHover: "hover:border-cyan-400/70",
    targetSection: "case-studies"
  }
];

/* ---------------- 3 ARCHITECTURAL PROFILE MILESTONES ---------------- */
const architecturalMilestones = [
  {
    id: "memo-systems-architecture",
    title: "Systems Architecture",
    badge: "10+ Years Track Record",
    icon: ShieldCheck,
    metric: "Distributed .NET & Microservices",
    quote:
      "Designing mission-critical enterprise systems and resilient microservices with clean domain architecture, asynchronous event handling, and high availability.",
    highlight:
      "Led architecture and full-lifecycle engineering across US Risk Management (Ethos Risk), Global Taxation (Ernst & Young), Arctic Data Archival (Piql Norway), and Offshore Telemetry (GeologiQ).",
    tags: ["Ethos Risk (USA)", "Ernst & Young", "Piql Norway", "GeologiQ Rig Telemetry"],
    targetSection: "case-studies"
  },
  {
    id: "memo-modern-workflows",
    title: "Engineering Automation",
    badge: "Hackathon 2nd Prize Winner",
    icon: Bot,
    metric: "Autonomous Task Engines",
    quote:
      "Awarded 2nd Prize in company-wide internal AI Hackathon for designing autonomous task automation engines and developer agent workflows.",
    highlight:
      "Integrating modern AI-assisted engineering tools, spec-driven design, and developer automation pipelines to accelerate architecture, refactoring, and code quality.",
    tags: ["Spec-Driven Design", "Autonomous Workflows", "Prompt Engineering", "Quality Pipelines"],
    targetSection: "architecture"
  },
  {
    id: "memo-performance-resiliency",
    title: "Performance & Resiliency",
    badge: "90% Downtime Drop",
    icon: Cpu,
    metric: "20% Throughput Boost",
    quote:
      "Decomposing legacy monolithic backends into decoupled .NET 8 microservices, achieving high query efficiency and fault-tolerant event streaming.",
    highlight:
      "Modernized legacy core components, tuned SQL query execution plans and Redis caching, cutting production downtime by 90% and improving throughput by 20%.",
    tags: [".NET 8 Microservices", "CQRS Architecture", "Redis Caching", "Query Optimization"],
    targetSection: "case-studies"
  }
];

/* ---------------- Interactive Geist Milestone Card ---------------- */
function GeistMilestoneCard({
  milestone,
  motionStyle,
  isDark,
  onSelect
}: {
  milestone: typeof architecturalMilestones[0];
  motionStyle: any;
  isDark: boolean;
  onSelect: (target: string) => void;
}) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = milestone.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="relative pt-3">
      {/* Sleek Metallic Titanium Pin */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="w-7 h-7 rounded-full shadow-md border border-white/20 bg-gradient-to-tr from-slate-800 via-slate-600 to-slate-200 flex items-center justify-center text-slate-950 font-extrabold shadow-black/40">
          <Pin className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
        </div>
      </div>

      <motion.div
        style={motionStyle}
        drag
        dragConstraints={{ left: -25, right: 25, top: -15, bottom: 15 }}
        dragElastic={0.08}
        whileDrag={{ scale: 1.03, zIndex: 40, cursor: "grabbing" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={() => onSelect(milestone.targetSection)}
        className={`group relative p-6 sm:p-7 rounded-3xl border text-left cursor-grab transition-all duration-300 overflow-hidden transform-gpu select-none flex flex-col justify-between min-h-[350px] sm:min-h-[370px] ${
          isDark
            ? "bg-slate-950/85 hover:bg-slate-900/95 border-white/10 hover:border-white/30 shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
            : "bg-white/95 hover:bg-white border-slate-200/90 hover:border-slate-400 shadow-xl hover:shadow-2xl"
        }`}
      >
        {/* Dynamic Hover Spotlight */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${
                isDark ? "rgba(226, 232, 240, 0.12)" : "rgba(51, 65, 85, 0.08)"
              }, transparent 80%)`
            }}
          />
        )}

        {/* Top Header Pill Row */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10 dark:border-white/10 pt-1 relative z-20">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
              isDark
                ? "bg-slate-900 border-white/15 text-slate-200"
                : "bg-slate-100 border-slate-200 text-slate-800"
            }`}
          >
            {milestone.badge}
          </span>

          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 opacity-60">
            <Move className="w-3 h-3" />
            <span className="hidden sm:inline">Drag</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-3 py-3 relative z-20">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <h3
                className={`text-lg sm:text-xl font-bold font-heading leading-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {milestone.title}
              </h3>
              <div className="text-xs font-mono font-bold gold-gradient-text">
                {milestone.metric}
              </div>
            </div>

            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${
                isDark
                  ? "bg-slate-900 border-white/10 text-slate-200"
                  : "bg-slate-100 border-slate-200 text-slate-800"
              }`}
            >
              <IconComponent className="w-4 h-4" />
            </div>
          </div>

          <p
            className={`text-xs sm:text-sm font-medium leading-relaxed italic ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            "{milestone.quote}"
          </p>

          <p
            className={`text-xs leading-relaxed ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {milestone.highlight}
          </p>
        </div>

        {/* Bottom Tags & Action */}
        <div className="pt-3 border-t border-white/10 dark:border-white/10 space-y-2.5 relative z-20">
          <div className="flex flex-wrap gap-1">
            {milestone.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                  isDark
                    ? "bg-slate-900 border-slate-800 text-slate-300"
                    : "bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className={`flex items-center justify-between text-xs font-mono font-bold transition-transform pt-0.5 ${
              isDark ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"
            }`}
          >
            <span>Inspect Technical Impact</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-slate-300" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- Main On-Scroll Break-Apart & Service Tiles Hero ---------------- */
export const PortfolioPrismaHero: React.FC<PortfolioPrismaHeroProps> = ({
  name = "MD RABBY",
  surname = "HASAN",
  tagline = "Lead Software Engineer & Systems Architect",
  typewriterPhrases = defaultTypewriterPhrases,
  summary = "Designing resilient distributed microservices, high-throughput cloud infrastructure, and modern AI engineering workflows across international enterprise systems.",
  ctaText = "Explore Selected Work",
  ctaAction,
  onOpenTerminal,
  onSelectProject,
  resumeUrl = "./doc/rabby_hasan_9_years_full_stack_dot_net_dev.pdf",
  videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
  posterImage = "",
  theme = "dark"
}) => {
  const isDark = theme === "dark";
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [stageView, setStageView] = useState<'milestones' | 'services'>('milestones');
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress across 215vh pin sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // =========================================================================
  // 1. KINETIC 3D BREAK-APART: NAME & HERO ELEMENTS DISPERSAL
  // =========================================================================
  // "MD": Fractures diagonally up-left with negative tilt and blur dissolve
  const mdX = useTransform(scrollYProgress, [0.06, 0.36], [0, -170]);
  const mdY = useTransform(scrollYProgress, [0.06, 0.36], [0, -90]);
  const mdRotate = useTransform(scrollYProgress, [0.06, 0.36], [0, -14]);
  const mdOpacity = useTransform(scrollYProgress, [0.06, 0.28], [1, 0]);
  const mdBlurVal = useTransform(scrollYProgress, [0.06, 0.34], [0, 8]);
  const mdBlur = useTransform(mdBlurVal, (b) => `blur(${b}px)`);

  // "RABBY": Elevates upward, letter-spacing opens into grand architectural watermark
  const rabbyY = useTransform(scrollYProgress, [0.06, 0.42], [0, -100]);
  const rabbyScale = useTransform(scrollYProgress, [0.06, 0.45], [1, 1.2]);
  const rabbyOpacity = useTransform(scrollYProgress, [0.06, 0.30, 0.50], [1, 0.25, 0.08]);
  const rabbyTracking = useTransform(scrollYProgress, [0.06, 0.42], ["-0.065em", "0.2em"]);

  // "HASAN": Fractures diagonally down-right with positive tilt and blur dissolve
  const hasanX = useTransform(scrollYProgress, [0.06, 0.36], [0, 180]);
  const hasanY = useTransform(scrollYProgress, [0.06, 0.36], [0, 90]);
  const hasanRotate = useTransform(scrollYProgress, [0.06, 0.36], [0, 14]);
  const hasanOpacity = useTransform(scrollYProgress, [0.06, 0.28], [1, 0]);
  const hasanBlurVal = useTransform(scrollYProgress, [0.06, 0.34], [0, 8]);
  const hasanBlur = useTransform(hasanBlurVal, (b) => `blur(${b}px)`);

  // Role Badge: Peels off and spins into negative space
  const roleX = useTransform(scrollYProgress, [0.06, 0.32], [0, -200]);
  const roleRotate = useTransform(scrollYProgress, [0.06, 0.32], [0, -18]);
  const roleScale = useTransform(scrollYProgress, [0.06, 0.32], [1, 0.75]);
  const roleOpacity = useTransform(scrollYProgress, [0.06, 0.24], [1, 0]);

  // Typewriter Capsule: Slides down-left and dissolves
  const typeX = useTransform(scrollYProgress, [0.06, 0.33], [0, -160]);
  const typeY = useTransform(scrollYProgress, [0.06, 0.33], [0, 50]);
  const typeOpacity = useTransform(scrollYProgress, [0.06, 0.24], [1, 0]);

  // Bio Summary Card: 3D perspective shutter tilt and lateral dispersal
  const bioRotateX = useTransform(scrollYProgress, [0.06, 0.34], [0, 20]);
  const bioRotateY = useTransform(scrollYProgress, [0.06, 0.34], [0, -18]);
  const bioX = useTransform(scrollYProgress, [0.06, 0.34], [0, 220]);
  const bioY = useTransform(scrollYProgress, [0.06, 0.34], [0, -30]);
  const bioOpacity = useTransform(scrollYProgress, [0.06, 0.26], [1, 0]);
  const bioScale = useTransform(scrollYProgress, [0.06, 0.34], [1, 0.82]);

  // Initial Action CTAs
  const ctaX = useTransform(scrollYProgress, [0.06, 0.33], [0, 150]);
  const ctaY = useTransform(scrollYProgress, [0.06, 0.33], [0, 60]);
  const ctaOpacity = useTransform(scrollYProgress, [0.06, 0.24], [1, 0]);

  // Pointer events toggling
  const heroPointerEvents = useTransform(scrollYProgress, (v) => (v < 0.18 ? "auto" : "none"));
  const vaultPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.24 ? "auto" : "none"));

  // =========================================================================
  // 2. SERVICE TILES VAULT OPENING TRANSFORMS (3D APERTURE BLOOM)
  // =========================================================================
  const vaultOpacity = useTransform(scrollYProgress, [0.18, 0.40], [0, 1]);
  const vaultScale = useTransform(scrollYProgress, [0.18, 0.46], [0.78, 1]);
  const vaultY = useTransform(scrollYProgress, [0.18, 0.46], [90, 0]);
  const vaultRotateX = useTransform(scrollYProgress, [0.18, 0.46], [16, 0]);

  // Individual 4-Card Kinetic Fan-Out Trajectories
  const card1X = useTransform(scrollYProgress, [0.20, 0.48], [-35, 0]);
  const card1Rot = useTransform(scrollYProgress, [0.20, 0.48], [-2.5, 0]);

  const card2Y = useTransform(scrollYProgress, [0.20, 0.48], [25, 0]);

  const card3Y = useTransform(scrollYProgress, [0.20, 0.48], [25, 0]);

  const card4X = useTransform(scrollYProgress, [0.20, 0.48], [35, 0]);
  const card4Rot = useTransform(scrollYProgress, [0.20, 0.48], [2.5, 0]);

  // Subtle Scroll Cues
  const scrollCue1Opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const scrollCue2Opacity = useTransform(scrollYProgress, [0.42, 0.60, 0.88, 0.98], [0, 1, 1, 0]);

  const handleScrollToTarget = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    if (ctaAction) {
      ctaAction();
    } else {
      handleScrollToTarget("case-studies");
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[215vh] w-full"
    >
      {/* Pinned Viewport Container */}
      <div
        className={`sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-[#08090d]" : "bg-[#f8fafc]"
        }`}
        style={{ perspective: 1200 }}
      >
        {/* 1. Cinematic Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 pointer-events-none ${
            videoLoaded
              ? isDark
                ? "opacity-60"
                : "opacity-45 filter contrast-110 saturate-125 brightness-105"
              : "opacity-0"
          }`}
          src={videoSrc}
        />

        {/* 2. Prismatic Refraction Atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-24 -left-20 w-[60vw] max-w-[850px] h-[60vw] max-h-[850px] rounded-full blur-[150px] transition-all duration-700 ${
              isDark
                ? "bg-[#dfc898]/12"
                : "bg-gradient-to-br from-amber-300/35 via-yellow-400/25 to-transparent"
            }`}
          />
          <div
            className={`absolute top-1/4 right-0 w-[55vw] max-w-[800px] h-[55vw] max-h-[800px] rounded-full blur-[160px] transition-all duration-700 ${
              isDark
                ? "bg-[#6366f1]/12"
                : "bg-gradient-to-bl from-indigo-500/30 via-purple-400/20 to-transparent"
            }`}
          />
          <div
            className={`absolute bottom-1/4 left-1/4 w-[50vw] max-w-[700px] h-[50vw] max-h-[700px] rounded-full blur-[150px] transition-all duration-700 ${
              isDark
                ? "bg-[#10b981]/10"
                : "bg-gradient-to-tr from-emerald-400/30 via-teal-300/20 to-transparent"
            }`}
          />
        </div>

        {/* 3. Noise Overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay" />

        {/* 4. Cinematic Vignettes */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 transition-all duration-500 ${
            isDark
              ? "h-[50%] bg-gradient-to-t from-[#08090d] via-[#08090d]/60 to-transparent"
              : "h-[45%] bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/70 to-transparent"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,9,13,0.55)_100%)]"
              : "bg-[radial-gradient(circle_at_center,transparent_30%,rgba(248,250,252,0.45)_100%)]"
          }`}
        />

        {/* ========================================================================= */}
        {/* STAGE 1: INITIAL HERO STAGE (PHYSICALLY SHATTERS & BREAKS APART ON SCROLL) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ pointerEvents: heroPointerEvents }}
          className="relative z-20 w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 my-auto"
        >
          <div className="grid grid-cols-12 items-end gap-8 lg:gap-12">
            
            {/* Left Column: Role Badge + Fractured Name + Typewriter */}
            <div className="col-span-12 lg:col-span-8 space-y-4 sm:space-y-5">
              {/* Leadership Role Pill - Spins & Peels away */}
              <motion.div
                style={{
                  x: roleX,
                  rotate: roleRotate,
                  scale: roleScale,
                  opacity: roleOpacity
                }}
                className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-xl border shadow-lg text-xs font-mono transition-colors ${
                  isDark
                    ? "bg-black/75 border-[#dfc898]/30 text-[#dfc898]"
                    : "bg-white/95 border-[#b89b5e]/40 text-[#854d0e]"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="tracking-wide uppercase font-semibold">{tagline}</span>
              </motion.div>

              {/* Giant Editorial Headline - Breaks into kinetic 3D shards */}
              <h1
                className={`font-extrabold leading-[0.85] tracking-[-0.065em] text-[13vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[7.8vw] xl:text-[7.2vw] font-heading select-none transition-colors duration-300 flex flex-wrap items-center gap-x-[0.35em] ${
                  isDark
                    ? "text-[#E1E0CC] drop-shadow-[0_2px_25px_rgba(225,224,204,0.15)]"
                    : "text-slate-950 drop-shadow-[0_2px_16px_rgba(255,255,255,0.9)]"
                }`}
              >
                {/* "MD" Shard */}
                <motion.span
                  style={{
                    x: mdX,
                    y: mdY,
                    rotate: mdRotate,
                    opacity: mdOpacity,
                    filter: mdBlur
                  }}
                  className="inline-block transform-gpu"
                >
                  MD
                </motion.span>

                {/* "RABBY" Core - Elevates & expands into architectural watermark */}
                <motion.span
                  style={{
                    y: rabbyY,
                    scale: rabbyScale,
                    opacity: rabbyOpacity,
                    letterSpacing: rabbyTracking
                  }}
                  className="inline-block transform-gpu"
                >
                  RABBY
                </motion.span>

                {/* "HASAN" Shard */}
                <motion.span
                  style={{
                    x: hasanX,
                    y: hasanY,
                    rotate: hasanRotate,
                    opacity: hasanOpacity,
                    filter: hasanBlur
                  }}
                  className="inline-block transform-gpu"
                >
                  HASAN
                </motion.span>
              </h1>

              {/* Typewriter Capsule - Disperses down-left */}
              <motion.div
                style={{
                  x: typeX,
                  y: typeY,
                  opacity: typeOpacity
                }}
                className="pt-1 sm:pt-2"
              >
                <Typewriter phrases={typewriterPhrases} theme={theme} />
              </motion.div>
            </div>

            {/* Right Column: Bio Summary (3D Shutter Tilt) + CTAs */}
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-4 lg:pb-3">
              {/* Bio Summary Card - Tilts & breaks outward */}
              <motion.div
                style={{
                  x: bioX,
                  y: bioY,
                  rotateX: bioRotateX,
                  rotateY: bioRotateY,
                  scale: bioScale,
                  opacity: bioOpacity,
                  transformPerspective: 800
                }}
                className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-colors shadow-xl ${
                  isDark
                    ? "text-slate-200 border-[#dfc898]/40 bg-black/60 shadow-black/50"
                    : "text-slate-800 border-[#b89b5e] bg-white/90 shadow-slate-200/80 font-medium"
                }`}
              >
                <p className="text-xs sm:text-sm font-sans leading-relaxed">
                  {summary}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                style={{
                  x: ctaX,
                  y: ctaY,
                  opacity: ctaOpacity
                }}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <a
                  href="#case-studies"
                  onClick={handleScrollToProjects}
                  className={`group inline-flex items-center gap-2 rounded-full py-2.5 pl-6 pr-2.5 text-xs sm:text-sm font-bold transition-all hover:gap-3 cursor-pointer shadow-xl ${
                    isDark
                      ? "bg-gradient-to-r from-[#dfc898] to-[#b89b5e] hover:from-[#f1e8d6] hover:to-[#dfc898] text-black shadow-[#dfc898]/20"
                      : "bg-slate-900 hover:bg-black text-[#dfc898] shadow-slate-900/25"
                  }`}
                >
                  <span>{ctaText}</span>
                  <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4 text-[#dfc898]" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* STAGE 2: ARCHITECTURAL PROFILE (PURE GEIST TITANIUM MILESTONES)          */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: vaultOpacity,
            scale: vaultScale,
            y: vaultY,
            rotateX: vaultRotateX,
            pointerEvents: vaultPointerEvents
          }}
          className="absolute inset-x-0 z-30 flex items-center justify-center px-4 sm:px-8 lg:px-12 pointer-events-none"
        >
          <div className="w-full max-w-[1720px] mx-auto space-y-4 pointer-events-auto">
            
            {/* Header: Pure Minimalist Geist Label */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-white/10 dark:border-white/10">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border bg-white/5 border-white/15 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ARCHITECTURAL PROFILE</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-white">
                  Engineering <span className="gold-gradient-text">Philosophy & Track Record</span>
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400 hidden xl:inline">
                  Key Architectural Milestones • Click, hover, or drag cards to inspect engineering impact
                </span>

                {/* View Switcher Pill */}
                <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 text-[10px] font-mono">
                  <button
                    onClick={() => setStageView('milestones')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      stageView === 'milestones'
                        ? 'bg-white/15 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Milestones (3)
                  </button>
                  <button
                    onClick={() => setStageView('services')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      stageView === 'services'
                        ? 'bg-white/15 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    AI Systems (4)
                  </button>
                </div>
              </div>
            </div>

            {/* Content: 3 Architectural Milestones Cards OR 4 AI Systems Consoles */}
            {stageView === 'milestones' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
                {architecturalMilestones.map((milestone, idx) => {
                  let cardMotion = {};
                  if (idx === 0) cardMotion = { x: card1X, rotate: card1Rot };
                  else if (idx === 1) cardMotion = { y: card2Y };
                  else if (idx === 2) cardMotion = { x: card4X, rotate: card4Rot };

                  return (
                    <GeistMilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      motionStyle={cardMotion}
                      isDark={isDark}
                      onSelect={(target) => handleScrollToTarget(target)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {serviceTiles.map((tile, idx) => {
                  const IconComponent = tile.icon;

                  let cardMotion = {};
                  if (idx === 0) cardMotion = { x: card1X, rotate: card1Rot };
                  else if (idx === 1) cardMotion = { y: card2Y };
                  else if (idx === 2) cardMotion = { y: card3Y };
                  else if (idx === 3) cardMotion = { x: card4X, rotate: card4Rot };

                  return (
                    <motion.div
                      key={tile.id}
                      style={cardMotion}
                      whileHover={{ y: -6, transition: { duration: 0.25 } }}
                      onClick={() => handleScrollToTarget(tile.targetSection)}
                      className={`group relative rounded-3xl overflow-hidden border p-6 sm:p-7 cursor-pointer select-none flex flex-col justify-between transition-all duration-300 ${
                        isDark
                          ? `bg-slate-950/85 hover:bg-slate-900/95 border-white/10 ${tile.borderHover} shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)]`
                          : `bg-white/95 hover:bg-white border-slate-200/90 ${tile.borderHover} shadow-xl hover:shadow-2xl`
                      } min-h-[280px] sm:min-h-[310px]`}
                    >
                      {/* Top Pill Row: Icon + Category + Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-colors ${
                              isDark
                                ? "bg-slate-900 border-white/10 text-slate-200 group-hover:border-white/30"
                                : "bg-slate-100 border-slate-200 text-slate-800"
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                            {tile.category}
                          </span>
                        </div>
                      </div>

                      {/* Service Name (hero text) + One Verified Proof Line */}
                      <div className="py-5">
                        <div
                          className={`text-3xl sm:text-4xl font-extrabold font-heading tracking-tight leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r ${tile.glowColor}`}
                        >
                          {tile.title}
                        </div>

                        <div className="flex items-start gap-1.5 text-[11px] font-mono text-slate-400 mt-3 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-px shrink-0 text-emerald-400" />
                          <span>{tile.proof}</span>
                        </div>
                      </div>

                      {/* Bottom Tags & Action */}
                      <div className="pt-3 border-t border-white/10 dark:border-white/10 space-y-2.5">
                        <div className="flex flex-wrap gap-1">
                          {tile.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                                isDark
                                  ? "bg-slate-900 border-slate-800 text-slate-300"
                                  : "bg-slate-100 border-slate-200 text-slate-700"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div
                          className={`flex items-center justify-between text-xs font-mono font-bold transition-transform pt-0.5 ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          <span>Explore Capabilities</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Bottom Direct CTA Strip to Case Studies Section */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-slate-400">
                Continue scrolling for complete architectural deep-dives & production case studies
              </span>
              <a
                href="#case-studies"
                onClick={handleScrollToProjects}
                className={`inline-flex items-center gap-2 text-xs font-mono font-bold px-4 py-1.5 rounded-full border transition-colors cursor-pointer ${
                  isDark
                    ? "bg-slate-900 border-white/15 text-slate-200 hover:border-white/40"
                    : "bg-white border-slate-300 text-slate-800 hover:border-slate-500"
                }`}
              >
                <span>Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SUBTLE SCROLL GUIDANCE CUES                                              */}
        {/* ========================================================================= */}
        {/* Phase 1 Scroll Cue */}
        <motion.div
          style={{ opacity: scrollCue1Opacity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex flex-col items-center transition-opacity"
        >
          <a
            href="#case-studies"
            onClick={handleScrollToProjects}
            className={`pointer-events-auto flex flex-col items-center gap-1 text-[10px] font-mono tracking-widest uppercase transition-colors ${
              isDark ? "text-zinc-400 hover:text-[#dfc898]" : "text-slate-600 hover:text-[#854d0e]"
            }`}
          >
            <span>Scroll to Deconstruct Hero & Open Services</span>
            <ChevronDown
              className={`w-3.5 h-3.5 animate-bounce ${
                isDark ? "text-[#dfc898]" : "text-[#854d0e]"
              }`}
            />
          </a>
        </motion.div>

        {/* Phase 2 Scroll Cue */}
        <motion.div
          style={{ opacity: scrollCue2Opacity }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex flex-col items-center transition-opacity"
        >
          <div
            className={`flex flex-col items-center gap-0.5 text-[9px] font-mono tracking-widest uppercase transition-colors ${
              isDark ? "text-zinc-400" : "text-slate-500"
            }`}
          >
            <span>Scroll Down to In-Depth Specifications</span>
            <ChevronDown
              className={`w-3 h-3 animate-bounce ${
                isDark ? "text-[#dfc898]" : "text-[#854d0e]"
              }`}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
