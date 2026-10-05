import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
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
  ShieldCheck
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

/* ---------------- 7 UNIFIED CAPABILITY & MILESTONE ITEMS ---------------- */
export const allSpotlightItems = [
  {
    id: "milestone-systems",
    type: "milestone" as const,
    category: "01 · Systems",
    title: "Enterprise Architecture",
    badge: "10+ Years",
    icon: ShieldCheck,
    proof: "Distributed .NET microservices for Ethos Risk (US), EY & North Sea telemetry.",
    tags: [".NET 8", "Microservices"],
    glowColor: "from-blue-300 via-sky-200 to-indigo-400",
    borderHover: "hover:border-blue-400/70",
    targetSection: "case-studies"
  },
  {
    id: "milestone-automation",
    type: "milestone" as const,
    category: "02 · AI Agents",
    title: "Autonomous AI Agents",
    badge: "Hackathon 2nd Prize",
    icon: Bot,
    proof: "Autonomous task engines & spec-driven AI agent workflows.",
    tags: ["Custom Agents", "CI/CD"],
    glowColor: "from-purple-300 via-fuchsia-200 to-indigo-400",
    borderHover: "hover:border-purple-400/70",
    targetSection: "architecture"
  },
  {
    id: "milestone-resiliency",
    type: "milestone" as const,
    category: "03 · Performance",
    title: "Scale & Resiliency",
    badge: "90% Downtime Drop",
    icon: Cpu,
    proof: "Monolith decomposition, sub-50ms Redis caching & SQL tuning.",
    tags: ["SQL Tuning", "Zero-Downtime"],
    glowColor: "from-emerald-300 via-teal-200 to-cyan-400",
    borderHover: "hover:border-emerald-400/70",
    targetSection: "case-studies"
  },
  {
    id: "ai-strategy",
    type: "service" as const,
    category: "04 · AI Strategy",
    title: "AI Strategy & Roadmaps",
    badge: "01 · Plan",
    icon: Compass,
    proof: "Spec-driven agent architectures & enterprise roadmaps.",
    tags: ["Roadmaps", "Workflows"],
    glowColor: "from-indigo-300 via-sky-200 to-blue-400",
    borderHover: "hover:border-indigo-400/70",
    targetSection: "architecture"
  },
  {
    id: "process-automation",
    type: "service" as const,
    category: "05 · Automation",
    title: "Process Automation",
    badge: "02 · Automate",
    icon: Workflow,
    proof: "Autonomous CI/CD pipelines & task orchestrators.",
    tags: ["Pipelines", "Azure DevOps"],
    glowColor: "from-emerald-300 via-teal-200 to-cyan-400",
    borderHover: "hover:border-emerald-400/70",
    targetSection: "architecture"
  },
  {
    id: "custom-agents",
    type: "service" as const,
    category: "06 · Agents",
    title: "Custom Agent Engines",
    badge: "03 · Build",
    icon: Bot,
    proof: "Domain-specific autonomous agents in .NET & Python.",
    tags: [".NET 8", "Task Agents"],
    glowColor: "from-purple-300 via-fuchsia-200 to-indigo-400",
    borderHover: "hover:border-purple-400/70",
    targetSection: "case-studies"
  },
  {
    id: "data-intelligence",
    type: "service" as const,
    category: "07 · Data",
    title: "Data Intelligence",
    badge: "04 · Measure",
    icon: Database,
    proof: "Real-time North Sea sensor telemetry & streaming.",
    tags: ["Cosmos DB", "Redis"],
    glowColor: "from-cyan-300 via-sky-200 to-indigo-400",
    borderHover: "hover:border-cyan-400/70",
    targetSection: "case-studies"
  }
];

export const architecturalMilestones = allSpotlightItems.filter((i) => i.type === "milestone");
export const serviceTiles = allSpotlightItems.filter((i) => i.type === "service");

/* ---------------- Unified Sleek Minimal Hero Card (Spotlight & Hover Glow) ---------------- */
function UnifiedHeroCard({
  item,
  isDark,
  onSelect,
  className = "",
  motionStyle
}: {
  item: typeof allSpotlightItems[0];
  isDark: boolean;
  onSelect: (target: string) => void;
  className?: string;
  motionStyle?: any;
}) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = item.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      style={motionStyle}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(item.targetSection)}
      className={`group relative p-3.5 sm:p-4.5 rounded-2xl sm:rounded-3xl border text-left cursor-pointer transition-all duration-300 overflow-hidden select-none flex flex-col justify-between ${
        isDark
          ? `bg-slate-950/85 hover:bg-slate-900/95 border-white/10 ${item.borderHover} shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)]`
          : `bg-white/95 hover:bg-white border-slate-200/90 ${item.borderHover} shadow-md hover:shadow-xl`
      } min-h-[145px] sm:min-h-[160px] ${className}`}
    >
      {/* Dynamic Hover Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, ${
              isDark ? "rgba(226, 232, 240, 0.10)" : "rgba(51, 65, 85, 0.06)"
            }, transparent 80%)`
          }}
        />
      )}

      {/* Top Header Row: Category Badge + Icon */}
      <div className="flex items-center justify-between gap-2 relative z-20">
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
            isDark
              ? "bg-slate-900 border-white/15 text-slate-300"
              : "bg-slate-100 border-slate-200 text-slate-800"
          }`}
        >
          {item.badge}
        </span>

        <div
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
            isDark
              ? "bg-slate-900 border-white/10 text-slate-200 group-hover:border-white/30"
              : "bg-slate-100 border-slate-200 text-slate-800"
          }`}
        >
          <IconComponent className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Minimal Title + 1-Line Impact */}
      <div className="py-1.5 space-y-1 relative z-20">
        <h3
          className={`text-base sm:text-lg font-bold font-heading leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`text-xs leading-relaxed line-clamp-2 ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {item.proof}
        </p>
      </div>

      {/* Bottom Tags & Action */}
      <div className="pt-2 border-t border-white/10 dark:border-white/10 flex items-center justify-between gap-2 relative z-20">
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-400"
                  : "bg-slate-100 border-slate-200 text-slate-600"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className={`flex items-center gap-1 text-[11px] font-mono font-bold transition-transform shrink-0 ${
            isDark ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"
          }`}
        >
          <span>Explore</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Carousel Testing Modes ('spotlight' | 'marquee' | 'autotabs')
  const [carouselMode, setCarouselMode] = useState<'spotlight' | 'marquee' | 'autotabs'>('spotlight');

  // Spotlight Auto-Carousel state
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [carouselProgress, setCarouselProgress] = useState(0);

  // Auto Tabs state
  const [stageView, setStageView] = useState<'milestones' | 'services'>('milestones');
  const [autoTabProgress, setAutoTabProgress] = useState(0);
  const [isTabPaused, setIsTabPaused] = useState(false);

  // Spotlight auto-advance interval (cycles every 4 seconds)
  useEffect(() => {
    if (carouselMode !== 'spotlight' || isCarouselPaused) return;

    const interval = 50;
    const totalDuration = 4000;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setCarouselProgress((prev) => {
        if (prev >= 100) {
          setSpotlightIdx((s) => (s + 1) % allSpotlightItems.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [carouselMode, isCarouselPaused]);

  // Auto Tabs auto-advance interval (cycles every 5 seconds)
  useEffect(() => {
    if (carouselMode !== 'autotabs' || isTabPaused) return;

    const interval = 50;
    const totalDuration = 5000;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setAutoTabProgress((prev) => {
        if (prev >= 100) {
          setStageView((v) => (v === 'milestones' ? 'services' : 'milestones'));
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [carouselMode, isTabPaused]);

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
        {/* STAGE 2: ARCHITECTURAL PROFILE (MINIMAL, PUNCHY & MOBILE READY)           */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: vaultOpacity,
            scale: vaultScale,
            y: vaultY,
            rotateX: vaultRotateX,
            pointerEvents: vaultPointerEvents
          }}
          className="absolute inset-x-0 z-30 flex items-center justify-center px-3 sm:px-8 lg:px-12 pointer-events-none"
        >
          <div className="w-full max-w-[1720px] mx-auto space-y-3 sm:space-y-4 pointer-events-auto max-h-[85vh] sm:max-h-none overflow-y-auto sm:overflow-visible py-2 sm:py-0 px-1 sm:px-0">
            
            {/* Header: Pure Minimalist Geist Label + Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 pb-2.5 border-b border-white/10 dark:border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border bg-white/5 border-white/15 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ARCHITECTURAL PROFILE</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-heading text-white">
                  Engineering <span className="gold-gradient-text">Philosophy & Capabilities</span>
                </h2>
              </div>

              {/* Mode Switcher Pill */}
              <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end w-full sm:w-auto">
                <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-900/90 border border-white/15 text-[10px] font-mono shrink-0 shadow-lg">
                  <span className="px-2 text-slate-400 hidden sm:inline text-[9px] uppercase tracking-wider font-semibold">Carousel Mode:</span>
                  <button
                    onClick={() => {
                      setCarouselMode('spotlight');
                      setSpotlightIdx(0);
                      setCarouselProgress(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      carouselMode === 'spotlight'
                        ? 'bg-white/20 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Spotlight
                  </button>
                  <button
                    onClick={() => setCarouselMode('marquee')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      carouselMode === 'marquee'
                        ? 'bg-white/20 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Marquee
                  </button>
                  <button
                    onClick={() => {
                      setCarouselMode('autotabs');
                      setAutoTabProgress(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      carouselMode === 'autotabs'
                        ? 'bg-white/20 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Auto Tabs
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* CAROUSEL MODE 1: SPOTLIGHT AUTO-SLIDER (3-CARD DESKTOP / 1-CARD MOBILE)   */}
            {/* ========================================================================= */}
            {carouselMode === 'spotlight' && (
              <div
                className="space-y-3"
                onMouseEnter={() => setIsCarouselPaused(true)}
                onMouseLeave={() => setIsCarouselPaused(false)}
              >
                {/* Responsive Sliding Cards Window */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  {[0, 1, 2].map((offset) => {
                    const itemIdx = (spotlightIdx + offset) % allSpotlightItems.length;
                    const item = allSpotlightItems[itemIdx];
                    return (
                      <div
                        key={`${item.id}-${offset}`}
                        className={offset > 0 ? "hidden md:block" : "block"}
                      >
                        <UnifiedHeroCard
                          item={item}
                          isDark={isDark}
                          onSelect={handleScrollToTarget}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Tactile Control Bar */}
                <div className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-white/10 text-xs font-mono">
                  {/* Left: Auto-progress bar + Pause button */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setIsCarouselPaused((p) => !p)}
                      title={isCarouselPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
                      className="p-1 rounded-lg hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                    >
                      {isCarouselPaused ? (
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Pause className="w-3.5 h-3.5 text-amber-300" />
                      )}
                    </button>

                    <div className="w-16 sm:w-28 h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-slate-200 to-white transition-all duration-75"
                        style={{ width: `${carouselProgress}%` }}
                      />
                    </div>

                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      {spotlightIdx + 1}/{allSpotlightItems.length} · {allSpotlightItems[spotlightIdx].title}
                    </span>
                  </div>

                  {/* Middle: 7 Direct Jump Dots */}
                  <div className="flex items-center gap-1.5">
                    {allSpotlightItems.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => {
                          setSpotlightIdx(dotIdx);
                          setCarouselProgress(0);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          dotIdx === spotlightIdx
                            ? "w-5 bg-white shadow-sm"
                            : "w-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                        title={`Jump to item ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Right: Prev / Next Navigation Arrows */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setSpotlightIdx((s) => (s - 1 + allSpotlightItems.length) % allSpotlightItems.length);
                        setCarouselProgress(0);
                      }}
                      className="p-1 rounded-lg hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                      title="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSpotlightIdx((s) => (s + 1) % allSpotlightItems.length);
                        setCarouselProgress(0);
                      }}
                      className="p-1 rounded-lg hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                      title="Next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CAROUSEL MODE 2: CONTINUOUS AMBIENT MARQUEE (INFINITE LOOP)               */}
            {/* ========================================================================= */}
            {carouselMode === 'marquee' && (
              <div className="space-y-2">
                <div
                  className="relative w-full overflow-hidden py-1"
                  style={{
                    maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)"
                  }}
                >
                  <div className="animate-marquee-track gap-3 sm:gap-4 flex">
                    {[...allSpotlightItems, ...allSpotlightItems].map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="w-[280px] sm:w-[350px] shrink-0"
                      >
                        <UnifiedHeroCard
                          item={item}
                          isDark={isDark}
                          onSelect={handleScrollToTarget}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Ambient continuous loop · Hover to pause
                  </span>
                  <span>7 verified capabilities</span>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CAROUSEL MODE 3: AUTO-CYCLING TABS (MILESTONES & SERVICES ROTATION)      */}
            {/* ========================================================================= */}
            {carouselMode === 'autotabs' && (
              <div
                className="space-y-3"
                onMouseEnter={() => setIsTabPaused(true)}
                onMouseLeave={() => setIsTabPaused(false)}
              >
                {/* View Switcher with Countdown Progress */}
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-900 border border-white/10 text-[10px] font-mono shrink-0">
                    <button
                      onClick={() => {
                        setStageView('milestones');
                        setAutoTabProgress(0);
                      }}
                      className={`relative px-2.5 py-1 rounded-lg transition-all cursor-pointer overflow-hidden ${
                        stageView === 'milestones'
                          ? 'bg-white/15 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">Milestones (3)</span>
                      {stageView === 'milestones' && !isTabPaused && (
                        <div
                          className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 transition-all duration-75"
                          style={{ width: `${autoTabProgress}%` }}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setStageView('services');
                        setAutoTabProgress(0);
                      }}
                      className={`relative px-2.5 py-1 rounded-lg transition-all cursor-pointer overflow-hidden ${
                        stageView === 'services'
                          ? 'bg-white/15 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">AI Systems (4)</span>
                      {stageView === 'services' && !isTabPaused && (
                        <div
                          className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 transition-all duration-75"
                          style={{ width: `${autoTabProgress}%` }}
                        />
                      )}
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                    {isTabPaused
                      ? "Rotation paused (hovering)"
                      : `Auto-rotating in ${Math.max(1, Math.ceil((100 - autoTabProgress) * 0.05))}s`}
                  </span>
                </div>

                {stageView === 'milestones' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    {architecturalMilestones.map((milestone) => (
                      <UnifiedHeroCard
                        key={milestone.id}
                        item={milestone}
                        isDark={isDark}
                        onSelect={handleScrollToTarget}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {serviceTiles.map((tile) => (
                      <UnifiedHeroCard
                        key={tile.id}
                        item={tile}
                        isDark={isDark}
                        onSelect={handleScrollToTarget}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Direct CTA Strip to Case Studies Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-center sm:text-left">
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                Scroll down for in-depth production case studies & technical architecture
              </span>
              <a
                href="#case-studies"
                onClick={handleScrollToProjects}
                className={`inline-flex items-center gap-2 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer shrink-0 ${
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
            <span>Scroll to Inspect Architectural Profile</span>
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
            <span>Scroll Down to Case Studies</span>
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
