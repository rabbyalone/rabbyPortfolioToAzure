import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Download, Terminal, Sparkles, Award, Zap, Database } from 'lucide-react';
import { developerData } from '../data/portfolioData';

// Interactive Floating Glassmorphism Metric Tile Sub-component
function FloatingMetricTile({ tile, idx, theme }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tile.icon;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 30 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -8, 0]
      }}
      transition={{
        opacity: { duration: 0.7, delay: 0.3 + idx * 0.1 },
        x: { duration: 0.7, delay: 0.3 + idx * 0.1 },
        y: {
          duration: 4.5 + idx * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: tile.floatDelay
        }
      }}
      whileHover={{ scale: 1.05, y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-5 sm:p-6 rounded-2xl border backdrop-blur-xl text-left transition-all overflow-hidden cursor-default ${
        theme === 'dark'
          ? 'bg-slate-900/85 border-slate-800/90 shadow-xl hover:border-[#dfc898]/40 hover:shadow-2xl hover:shadow-[#dfc898]/10'
          : 'bg-white/90 border-slate-200/90 shadow-md hover:border-[#b89b5e]/50 hover:shadow-xl'
      }`}
    >
      {/* Radial Hover Spotlight Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${
              theme === 'dark'
                ? 'rgba(223, 200, 152, 0.14)'
                : 'rgba(184, 155, 94, 0.18)'
            }, transparent 80%)`
          }}
        />
      )}

      <div className="flex items-start justify-between gap-3 pb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
            theme === 'dark'
              ? 'bg-slate-800/90 border-slate-700/80 text-[#dfc898]'
              : 'bg-amber-50 border-amber-200 text-[#854d0e]'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
            theme === 'dark'
              ? 'bg-slate-800/60 border-slate-700 text-slate-400'
              : 'bg-slate-100 border-slate-200 text-slate-500'
          }`}
        >
          Key Impact
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-extrabold font-heading gold-gradient-text tracking-tight">
          {tile.value}
        </div>
        <div
          className={`text-xs font-bold font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}
        >
          {tile.title}
        </div>
        <div
          className={`text-[11px] font-mono leading-snug ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {tile.detail}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero({ theme, onOpenTerminal }) {
  const phrases = [
    'AI Spec-Driven Development',
    'Distributed Microservices',
    'Enterprise Cloud Platforms',
    'Sub-50ms Data Architectures'
  ];

  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [phrases.length]);

  // Metric Tiles for Right Floating Section
  const metricTiles = [
    {
      value: '10+ YOE',
      title: 'Engineering Leadership',
      detail: 'Lead & Senior Architect Roles',
      icon: Award,
      floatDelay: 0
    },
    {
      value: 'AI + SDD',
      title: 'AI Spec-Driven Dev',
      detail: 'Agentic Workflows & Velocity',
      icon: Sparkles,
      floatDelay: 0.5
    },
    {
      value: '90%',
      title: 'Downtime Reduction',
      detail: 'Refactored Resiliency',
      icon: Zap,
      floatDelay: 1.0
    },
    {
      value: '1,000 Yrs',
      title: 'Data Archival Scope',
      detail: 'Arctic World Vault Architecture',
      icon: Database,
      floatDelay: 1.5
    }
  ];

  // 3D Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ['2deg', '-2deg']);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ['-3deg', '3deg']);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 px-6 sm:px-8 overflow-hidden"
    >
      {/* Dynamic Ambient Backlight Glow */}
      <motion.div
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [-25, 25])
        }}
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          theme === 'dark'
            ? 'bg-gradient-to-tr from-[#dfc898]/12 via-[#6366f1]/06 to-transparent'
            : 'bg-gradient-to-tr from-[#b89b5e]/15 via-[#2563eb]/08 to-transparent'
        }`}
      />

      <motion.div
        style={{ rotateX, rotateY }}
        className="max-w-7xl mx-auto z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Executive Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Availability Badge & CLI trigger */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div
                className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-[#dfc898]/30 text-[#dfc898]'
                    : 'bg-white/80 border-[#b89b5e]/40 text-[#854d0e]'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      theme === 'dark' ? 'bg-[#dfc898]' : 'bg-[#854d0e]'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      theme === 'dark' ? 'bg-[#dfc898]' : 'bg-[#854d0e]'
                    }`}
                  />
                </span>
                <span>Lead Software Engineer & Systems Architect</span>
              </div>

              <button
                onClick={onOpenTerminal}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-[#dfc898] hover:border-[#dfc898]/30'
                    : 'bg-white/80 border-slate-300 text-slate-600 hover:text-[#854d0e] hover:border-[#b89b5e]'
                }`}
                title="Open CLI Mode"
              >
                <Terminal className="w-3.5 h-3.5 text-[#dfc898]" />
                <span>CLI</span>
              </button>
            </div>

            {/* Title & Word Flipper */}
            <div className="space-y-4">
              <h1
                className={`text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                MD RABBY <span className="gold-gradient-text">HASAN</span>
              </h1>

              {/* Word Flipper Line */}
              <div className="h-10 flex items-center justify-center lg:justify-start overflow-hidden">
                <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-lg font-semibold tracking-wide">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                    Specializing in:
                  </span>
                  <div className="relative h-8 overflow-hidden min-w-[240px] sm:min-w-[320px] text-left">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={phraseIdx}
                        initial={{ y: 25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -25, opacity: 0 }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                        className="absolute inset-0 gold-gradient-text font-bold inline-flex items-center"
                      >
                        {phrases[phraseIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <p
                className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Architecting high-availability microservices, AI spec-driven workflows, resilient cloud platforms, and enterprise data pipelines with over{' '}
                <span
                  className={`font-semibold ${
                    theme === 'dark' ? 'text-[#dfc898]' : 'text-[#854d0e]'
                  }`}
                >
                  10+ years of engineering leadership
                </span>
                .
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#case-studies"
                className={`px-8 py-3.5 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-[#dfc898] to-[#b89b5e] text-black shadow-glow-gold'
                    : 'bg-slate-900 text-white hover:bg-black'
                }`}
              >
                <span>View Architectural Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={developerData.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-7 py-3.5 rounded-xl border font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-[#dfc898]/40 hover:text-white'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400 shadow-sm'
                }`}
              >
                <Download
                  className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-[#dfc898]' : 'text-[#854d0e]'
                  }`}
                />
                <span>Resume PDF</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Floating Interactive Metric Tiles Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-4 lg:pt-0">
            {metricTiles.map((tile, idx) => (
              <FloatingMetricTile
                key={idx}
                tile={tile}
                idx={idx}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
