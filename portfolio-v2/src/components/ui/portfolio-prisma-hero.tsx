import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Sparkles,
  Download,
  ChevronDown,
  Layers,
  ExternalLink
} from "lucide-react";
import { WordsPullUp } from "./prisma-hero";
import { projectsData } from "../../data/portfolioData";

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
  "Distributed .NET Microservices",
  "AI-Native Engineering & Agents",
  "High-Throughput Performance Tuning",
  "Legacy Monolith Modernization"
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

/* ---------------- 4 Featured Portfolio Thumbnails Deck ---------------- */
function PortfolioThumbnailsDeck({
  isDark,
  onSelectProject
}: {
  isDark: boolean;
  onSelectProject?: (project: any) => void;
}) {
  // Grab the 4 premier case studies
  const featured = projectsData.slice(0, 4);

  // Key architectural badges for each project
  const projectBadges: Record<string, string> = {
    "ethos-risk-management": "90% Downtime Drop",
    "ey-taxation": "Enterprise gRPC & Bus",
    "geologiq-oil-rig": "North Sea Telemetry",
    "piql-connect": "1,000-Yr Cold Vault"
  };

  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("case-studies");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Deck Header: Title, Subtitle + Prominent View All Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 sm:mb-6 border-b pb-4 sm:pb-5 transition-colors border-white/10 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase mb-1.5 border backdrop-blur-md bg-[#dfc898]/10 border-[#dfc898]/30 text-[#dfc898]">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-heading ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            Production Systems Architecture
          </h2>
          <p
            className={`text-xs sm:text-sm mt-0.5 font-sans ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            High-concurrency platforms, deep data vaults & distributed cloud microservices.
          </p>
        </div>

        {/* View All Button */}
        <div>
          <a
            href="#case-studies"
            onClick={handleViewAll}
            className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl cursor-pointer ${
              isDark
                ? "bg-gradient-to-r from-[#dfc898] to-[#b89b5e] hover:from-[#f1e8d6] hover:to-[#dfc898] text-black shadow-[#dfc898]/20"
                : "bg-slate-900 hover:bg-black text-[#dfc898] shadow-slate-900/25"
            }`}
          >
            <span>View All Projects</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/80 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5 text-[#dfc898]" />
            </span>
          </a>
        </div>
      </div>

      {/* 4 Thumbnails Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {featured.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => {
              if (onSelectProject) {
                onSelectProject(proj);
              } else {
                const el = document.getElementById("case-studies");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`group relative rounded-2xl overflow-hidden border backdrop-blur-xl transition-all duration-300 shadow-2xl flex flex-col justify-between cursor-pointer ${
              isDark
                ? "bg-slate-950/80 border-white/10 hover:border-[#dfc898]/50 shadow-black/80"
                : "bg-white/95 border-slate-200 hover:border-[#b89b5e]/60 shadow-slate-200/90"
            }`}
          >
            <div>
              {/* Visual Thumbnail Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Gradient Shading for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* Client Pill (Top-Left) */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/80 border border-white/15 text-[#dfc898] backdrop-blur-md shadow-md">
                    {proj.client}
                  </span>
                </div>

                {/* Key Metric Badge (Top-Right) */}
                {projectBadges[proj.id] && (
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-md">
                      {projectBadges[proj.id]}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-4.5">
                <h3
                  className={`text-sm sm:text-base font-bold font-heading line-clamp-1 group-hover:text-[#dfc898] transition-colors ${
                    isDark ? "text-slate-100" : "text-slate-900"
                  }`}
                >
                  {proj.title}
                </h3>

                <p
                  className={`text-[11px] sm:text-xs leading-relaxed font-sans line-clamp-2 mt-1.5 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {proj.summary}
                </p>
              </div>
            </div>

            {/* Card Footer: Tech Tags + Interactive Action */}
            <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {proj.tech.slice(0, 3).map((t, i) => (
                  <span
                    key={i}
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                      isDark
                        ? "bg-slate-900/80 border-slate-800 text-slate-300"
                        : "bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    {t}
                  </span>
                ))}
                {proj.tech.length > 3 && (
                  <span
                    className={`text-[9px] font-mono px-1 py-0.5 rounded ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    +{proj.tech.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono font-semibold pt-2 border-t border-white/5 dark:border-white/5 text-[#dfc898] group-hover:text-[#f1e8d6]">
                <span>Inspect Architecture</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Main Scrollytelling Portfolio Hero ---------------- */
export const PortfolioPrismaHero: React.FC<PortfolioPrismaHeroProps> = ({
  name = "MD RABBY",
  surname = "HASAN",
  tagline = "Lead Software Engineer & Systems Architect",
  typewriterPhrases = defaultTypewriterPhrases,
  summary = "I’m a Lead Software Engineer and Systems Architect with 10+ years of experience building .NET applications, distributed systems, and cloud-based platforms. I enjoy solving complex engineering problems, improving existing systems, and using modern AI tools to make the way we build software faster, smarter, and more reliable.",
  ctaText = "Explore Architectural Case Studies",
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

  // Pinned Scrollytelling Container Target
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  /* ---------------- Scroll-Driven Animation Curves ---------------- */
  // Phase 1 -> Phase 2: Displacement of original Hero content (0.0 to 0.40)
  // The hero name lifts into an architectural watermark
  const heroNameY = useTransform(scrollYProgress, [0, 0.35], [0, -50]);
  const heroNameScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);
  const heroNameOpacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 0.7, 0.08]);

  // Role badge and Typewriter shift & vanish
  const heroMetaY = useTransform(scrollYProgress, [0, 0.32], [0, -35]);
  const heroMetaOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Right column (Bio + Buttons) displace downwards & blur-fade out
  const heroBioY = useTransform(scrollYProgress, [0, 0.35], [0, 75]);
  const heroBioOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const heroBioScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.94]);

  // Pointer events disabled when faded so it doesn't intercept thumbnail clicks
  const heroInteractiveEvents = useTransform(scrollYProgress, (v) =>
    v > 0.35 ? "none" : "auto"
  );

  // Phase 2 -> Phase 3: Materialization of the 4 Portfolio Thumbnails Deck (0.35 to 0.88)
  const deckOpacity = useTransform(scrollYProgress, [0.32, 0.48, 0.86, 0.98], [0, 1, 1, 0]);
  const deckY = useTransform(scrollYProgress, [0.32, 0.48, 0.86, 0.98], [55, 0, 0, -45]);
  const deckScale = useTransform(scrollYProgress, [0.32, 0.48, 0.86, 0.98], [0.94, 1, 1, 0.96]);
  const deckPointerEvents = useTransform(scrollYProgress, (v) =>
    v >= 0.35 && v <= 0.92 ? "auto" : "none"
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className={`relative h-[240vh] w-full transition-colors duration-500 ${
        isDark ? "bg-[#07090e]" : "bg-[#f8fafc]"
      }`}
    >
      {/* Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-end">
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
                ? "opacity-75"
                : "opacity-65 filter contrast-110 saturate-125 brightness-105"
              : "opacity-0"
          }`}
          src={videoSrc}
        />

        {/* 2. Multi-Spectral Prismatic Refraction Aura */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-24 -left-20 w-[60vw] max-w-[850px] h-[60vw] max-h-[850px] rounded-full blur-[140px] transition-all duration-700 ${
              isDark
                ? "bg-[#dfc898]/18"
                : "bg-gradient-to-br from-amber-300/45 via-yellow-400/30 to-transparent"
            }`}
          />
          <div
            className={`absolute top-1/4 right-0 w-[55vw] max-w-[800px] h-[55vw] max-h-[800px] rounded-full blur-[160px] transition-all duration-700 ${
              isDark
                ? "bg-[#6366f1]/16"
                : "bg-gradient-to-bl from-indigo-500/40 via-purple-400/30 to-transparent"
            }`}
          />
          <div
            className={`absolute bottom-1/4 left-1/4 w-[50vw] max-w-[700px] h-[50vw] max-h-[700px] rounded-full blur-[150px] transition-all duration-700 ${
              isDark
                ? "bg-[#10b981]/14"
                : "bg-gradient-to-tr from-emerald-400/40 via-teal-300/30 to-transparent"
            }`}
          />
          <div
            className={`absolute top-1/2 left-2/3 w-[40vw] max-w-[600px] h-[40vw] max-h-[600px] rounded-full blur-[140px] transition-all duration-700 ${
              isDark
                ? "bg-[#f43f5e]/10"
                : "bg-gradient-to-tl from-rose-400/35 via-pink-300/25 to-transparent"
            }`}
          />
        </div>

        {/* 3. Film Noise Texture Overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />

        {/* 4. Bottom Gradient Ramp */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 transition-all duration-500 ${
            isDark
              ? "h-[65%] bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent"
              : "h-[50%] bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/70 to-transparent"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,9,14,0.6)_100%)]"
              : "bg-[radial-gradient(circle_at_center,transparent_30%,rgba(248,250,252,0.45)_100%)]"
          }`}
        />

        {/* ---------------- INITIAL HERO CONTENT (Phase 1 -> Displaces on Scroll) ---------------- */}
        <motion.div
          style={{
            pointerEvents: heroInteractiveEvents
          }}
          className="relative z-20 w-full max-w-[1720px] mx-auto px-6 pb-12 sm:px-10 sm:pb-14 md:px-14 md:pb-16 lg:px-20 lg:pb-20"
        >
          <div className="grid grid-cols-12 items-end gap-8 lg:gap-12">
            {/* Left Column: Role Badge + Editorial Typography + Typewriter */}
            <div className="col-span-12 lg:col-span-8 space-y-4">
              {/* Leadership Role Pill */}
              <motion.div
                style={{
                  y: heroMetaY,
                  opacity: heroMetaOpacity
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

              {/* Giant Editorial Typography (Becomes architectural watermark during scroll) */}
              <motion.h1
                style={{
                  y: heroNameY,
                  scale: heroNameScale,
                  opacity: heroNameOpacity
                }}
                className={`font-extrabold leading-[0.84] tracking-[-0.065em] text-[13vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[7.8vw] xl:text-[7.2vw] font-heading select-none transition-colors duration-300 ${
                  isDark
                    ? "text-[#E1E0CC] drop-shadow-[0_2px_25px_rgba(225,224,204,0.15)]"
                    : "text-slate-950 drop-shadow-[0_2px_16px_rgba(255,255,255,0.9)]"
                }`}
              >
                <WordsPullUp text={`${name} ${surname}`} showAsterisk={false} />
              </motion.h1>

              {/* Typewriter Capsule */}
              <motion.div
                style={{
                  y: heroMetaY,
                  opacity: heroMetaOpacity
                }}
                className="pt-2 sm:pt-3"
              >
                <Typewriter phrases={typewriterPhrases} theme={theme} />
              </motion.div>
            </div>

            {/* Right Column: Bio Summary + Action CTAs (Displace & Blur-Fade on Scroll) */}
            <motion.div
              style={{
                y: heroBioY,
                opacity: heroBioOpacity,
                scale: heroBioScale
              }}
              className="col-span-12 flex flex-col gap-6 lg:col-span-4 lg:pb-3"
            >
              <p
                className={`text-xs sm:text-sm md:text-base font-sans leading-relaxed border-l-2 pl-4 py-3 rounded-r-2xl backdrop-blur-xl transition-colors shadow-xl ${
                  isDark
                    ? "text-slate-200 border-[#dfc898]/50 bg-black/60 shadow-black/50"
                    : "text-slate-800 border-[#b89b5e] bg-white/90 shadow-slate-200/80 font-medium"
                }`}
              >
                {summary}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#case-studies"
                  onClick={ctaAction}
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

                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono font-medium backdrop-blur-xl border transition-all shadow-md ${
                      isDark
                        ? "bg-black/60 hover:bg-white/10 border-white/20 text-white hover:border-[#dfc898]/50"
                        : "bg-white/95 hover:bg-white border-slate-300 text-slate-800 hover:border-[#b89b5e] shadow-slate-200/60 font-semibold"
                    }`}
                  >
                    <Download
                      className={`h-3.5 w-3.5 ${isDark ? "text-[#dfc898]" : "text-[#854d0e]"}`}
                    />
                    <span>Resume PDF</span>
                  </a>
                )}

                {onOpenTerminal && (
                  <button
                    onClick={onOpenTerminal}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-mono backdrop-blur-xl border transition-all shadow-md ${
                      isDark
                        ? "bg-black/60 hover:bg-black/90 border-slate-700 text-[#dfc898] hover:border-[#dfc898]/50"
                        : "bg-white/95 hover:bg-white border-slate-300 text-[#854d0e] hover:border-[#b89b5e] shadow-slate-200/60 font-semibold"
                    }`}
                    title="Launch CLI Mode"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>CLI</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ---------------- REVEALED 4 PORTFOLIO THUMBNAILS DECK (Materializes on Scroll) ---------------- */}
        <motion.div
          style={{
            opacity: deckOpacity,
            y: deckY,
            scale: deckScale,
            pointerEvents: deckPointerEvents
          }}
          className="absolute inset-x-0 bottom-10 sm:bottom-14 md:bottom-16 z-30 flex items-center justify-center pointer-events-auto"
        >
          <PortfolioThumbnailsDeck
            isDark={isDark}
            onSelectProject={onSelectProject}
          />
        </motion.div>

        {/* ---------------- SCROLL HINT INDICATOR ---------------- */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0])
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity"
        >
          <div
            className={`flex flex-col items-center gap-1 text-[10px] font-mono tracking-widest uppercase transition-colors ${
              isDark ? "text-zinc-400 hover:text-[#dfc898]" : "text-slate-600 hover:text-[#854d0e]"
            }`}
          >
            <span>Scroll to Explore Architecture</span>
            <ChevronDown
              className={`w-3.5 h-3.5 animate-bounce ${
                isDark ? "text-[#dfc898]" : "text-[#854d0e]"
              }`}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
