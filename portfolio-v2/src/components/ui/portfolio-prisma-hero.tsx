import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Sparkles, Download, ChevronDown } from "lucide-react";
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
  resumeUrl?: string;
  videoSrc?: string;
  posterImage?: string;
  theme?: "dark" | "light";
}

const defaultTypewriterPhrases = [
  "Distributed .NET 8 & Microservices",
  "High-Throughput Enterprise Architecture",
  "Cloud Resilience & Event-Driven Systems",
  "Modern AI-Assisted Engineering Workflows"
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
  const [typingSpeed, setTypingSpeed] = useState(55);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Smooth periodic blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const fullText = phrases[currentIdx % phrases.length];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward with organic character cadence
        const nextChar = fullText.charAt(currentText.length);
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        // Natural micro-pause after spaces
        setTypingSpeed(nextChar === " " ? 90 : 50);

        if (currentText === fullText) {
          // Pause at completed phrase to give viewer time to read
          setTimeout(() => setIsDeleting(true), 2600);
        }
      } else {
        // Snappy backspacing
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(22);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentIdx((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIdx, typingSpeed, phrases]);

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
        {/* Architectural Index Counter Badge */}
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-wider ${
            isDark
              ? "bg-slate-900 border-slate-800 text-[#dfc898]"
              : "bg-amber-50 border-amber-200 text-[#854d0e]"
          }`}
        >
          <span>0{currentIdx + 1}</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-500">0{phrases.length}</span>
        </div>

        {/* Minimal Terminal Prompt Symbol */}
        <span
          className={`text-xs font-mono font-bold select-none ${
            isDark ? "text-[#dfc898]" : "text-[#854d0e]"
          }`}
        >
          ❯
        </span>

        {/* Dynamic Typed Phrase with Stable Fixed Min-Width (Zero Jitter) */}
        <div className="flex items-center min-w-[230px] sm:min-w-[340px] md:min-w-[410px]">
          <span
            className={`text-xs sm:text-sm md:text-base font-mono font-semibold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-950 font-bold"
            }`}
          >
            {currentText}
          </span>

          {/* Champagne Glowing Vertical Cursor */}
          <span
            className={`inline-block w-[2px] h-[1.2em] ml-1 rounded-full transition-opacity duration-150 ${
              isDark
                ? "bg-[#dfc898] shadow-[0_0_10px_#dfc898]"
                : "bg-[#854d0e] shadow-[0_0_8px_#854d0e]"
            } ${cursorVisible ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* Micro Phase Dots Indicator */}
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

/* ---------------- Main Full-Screen & Full-Width Portfolio Hero ---------------- */
export const PortfolioPrismaHero: React.FC<PortfolioPrismaHeroProps> = ({
  name = "MD RABBY",
  surname = "HASAN",
  tagline = "Lead Software Engineer & Systems Architect",
  typewriterPhrases = defaultTypewriterPhrases,
  summary = "Lead Software Engineer and Systems Architect with 10+ years architecting resilient distributed systems, enterprise .NET microservices, high-throughput cloud platforms, and modern engineering workflows.",
  ctaText = "Explore Architectural Case Studies",
  ctaAction,
  onOpenTerminal,
  resumeUrl = "./doc/rabby_hasan_9_years_full_stack_dot_net_dev.pdf",
  videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
  posterImage = "",
  theme = "dark"
}) => {
  const isDark = theme === "dark";
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section
      id="home"
      className={`relative h-screen w-full overflow-hidden flex flex-col justify-end transition-colors duration-500 ${
        isDark ? "bg-[#07090e]" : "bg-[#f8fafc]"
      }`}
    >
      {/* 1. Cinematic Background Video with Smooth Fade-In and Zero Circuit Board Flash */}
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

      {/* 2. Multi-Spectral Prismatic Refraction Aura (Vibrant in Light Mode & Glowing in Dark Mode) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Golden Amber / Champagne Prism Refraction */}
        <div
          className={`absolute -top-24 -left-20 w-[60vw] max-w-[850px] h-[60vw] max-h-[850px] rounded-full blur-[140px] transition-all duration-700 ${
            isDark
              ? "bg-[#dfc898]/18"
              : "bg-gradient-to-br from-amber-300/45 via-yellow-400/30 to-transparent"
          }`}
        />

        {/* Electric Violet / Indigo Prism Beam */}
        <div
          className={`absolute top-1/4 right-0 w-[55vw] max-w-[800px] h-[55vw] max-h-[800px] rounded-full blur-[160px] transition-all duration-700 ${
            isDark
              ? "bg-[#6366f1]/16"
              : "bg-gradient-to-bl from-indigo-500/40 via-purple-400/30 to-transparent"
          }`}
        />

        {/* Emerald / Cyan Prism Shimmer */}
        <div
          className={`absolute bottom-1/4 left-1/4 w-[50vw] max-w-[700px] h-[50vw] max-h-[700px] rounded-full blur-[150px] transition-all duration-700 ${
            isDark
              ? "bg-[#10b981]/14"
              : "bg-gradient-to-tr from-emerald-400/40 via-teal-300/30 to-transparent"
          }`}
        />

        {/* Soft Rose Magenta Prism Refraction */}
        <div
          className={`absolute top-1/2 left-2/3 w-[40vw] max-w-[600px] h-[40vw] max-h-[600px] rounded-full blur-[140px] transition-all duration-700 ${
            isDark
              ? "bg-[#f43f5e]/10"
              : "bg-gradient-to-tl from-rose-400/35 via-pink-300/25 to-transparent"
          }`}
        />
      </div>

      {/* 3. Authentic Film Noise Texture Overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />

      {/* 4. Smooth Bottom Gradient Ramp (Protects readability without washing out upper canvas) */}
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

      {/* 5. Hero Content Container */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-6 pb-12 sm:px-10 sm:pb-14 md:px-14 md:pb-16 lg:px-20 lg:pb-20">
        <div className="grid grid-cols-12 items-end gap-8 lg:gap-12">
          
          {/* Left Column: Role Badge + Typography (NO ASTERISK) + Typewriter */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            
            {/* Leadership & Architectural Focus Pill */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-xl border shadow-lg text-xs font-mono transition-colors ${
                isDark
                  ? "bg-black/75 border-[#dfc898]/30 text-[#dfc898]"
                  : "bg-white/95 border-[#b89b5e]/40 text-[#854d0e]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="tracking-wide uppercase font-semibold">{tagline}</span>
            </motion.div>

            {/* Giant Editorial Typography without Asterisk */}
            <h1
              className={`font-extrabold leading-[0.84] tracking-[-0.065em] text-[13vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[7.8vw] xl:text-[7.2vw] font-heading select-none transition-colors duration-300 ${
                isDark
                  ? "text-[#E1E0CC] drop-shadow-[0_2px_25px_rgba(225,224,204,0.15)]"
                  : "text-slate-950 drop-shadow-[0_2px_16px_rgba(255,255,255,0.9)]"
              }`}
            >
              {/* Asterisk explicitly removed */}
              <WordsPullUp text={`${name} ${surname}`} showAsterisk={false} />
            </h1>

            {/* Dynamic Typewriter with theme-matched color */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 sm:pt-3"
            >
              <Typewriter phrases={typewriterPhrases} theme={theme} />
            </motion.div>

          </div>

          {/* Right Column: Bio Summary + Action CTAs */}
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4 lg:pb-3">
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`text-xs sm:text-sm md:text-base font-sans leading-relaxed border-l-2 pl-4 py-2.5 rounded-r-2xl backdrop-blur-xl transition-colors shadow-xl ${
                isDark
                  ? "text-slate-200 border-[#dfc898]/50 bg-black/60 shadow-black/50"
                  : "text-slate-800 border-[#b89b5e] bg-white/90 shadow-slate-200/80 font-medium"
              }`}
            >
              {summary}
            </motion.p>

            {/* Action CTA Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              {/* Main Case Studies CTA */}
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

              {/* Resume Download */}
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

              {/* Terminal CLI Modal Launcher */}
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
            </motion.div>

          </div>

        </div>
      </div>

      {/* 6. Smooth Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
        <a
          href="#about"
          className={`pointer-events-auto flex flex-col items-center gap-1 text-[10px] font-mono tracking-widest uppercase transition-colors ${
            isDark ? "text-zinc-400 hover:text-[#dfc898]" : "text-slate-600 hover:text-[#854d0e]"
          }`}
        >
          <span>Scroll</span>
          <ChevronDown
            className={`w-3.5 h-3.5 animate-bounce ${
              isDark ? "text-[#dfc898]" : "text-[#854d0e]"
            }`}
          />
        </a>
      </div>
    </section>
  );
};
