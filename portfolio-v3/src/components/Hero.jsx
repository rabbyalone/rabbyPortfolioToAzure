import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { developerData } from '../data/portfolioData';

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smoothly grows on scroll down (scale 1.0 -> 1.20) as user scrolls through the hero fold
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[580px] lg:h-screen lg:max-h-[1024px] flex flex-col justify-between pt-16 bg-[var(--velora-bg)] border-b border-[var(--velora-neutral-03)] overflow-hidden"
    >
      <div className="velora-container flex-1 flex flex-col justify-between pt-0 pb-6 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 flex-1 items-stretch">
          {/* LEFT COLUMN: Hero Image starts adjacent to topbar; Name anchored at bottom fold (on desktop: order-1; on mobile: order-2) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-between items-start pb-1 sm:pb-2 pt-0">
            {/* Integrated wrapper that locks the image width to the exact width of the display name */}
            <div className="w-full lg:w-fit max-w-full flex-1 flex flex-col justify-between items-start">
              {/* Minimalist Developer & Systems Workspace Image flush with topbar, width aligned with name */}
              <div className="w-full mb-4 sm:mb-6 overflow-hidden rounded-b-xl sm:rounded-b-2xl border-x border-b border-[var(--velora-neutral-03)] bg-[var(--velora-neutral-02)]">
                <motion.img
                  src="/img/hero-workspace.jpg"
                  alt="Md Rabby Hasan - Software Architect & Lead Engineer Workspace"
                  className="w-full h-[240px] sm:h-[300px] lg:h-[320px] xl:h-[350px] object-cover block origin-center will-change-transform"
                  style={{ scale: imageScale }}
                  loading="eager"
                />
              </div>

              {/* Massive H1 Name strictly on a SINGLE LINE, anchored at bottom fold */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-sans font-medium tracking-[-0.06em] leading-[1.1] text-[var(--velora-neutral-12)] whitespace-nowrap overflow-visible select-none m-0 p-0">
                {developerData.name}
              </h1>
            </div>
          </div>

          {/* RIGHT COLUMN: Welcome section kept at current position with breathing room, Scroll indicator at bottom (on desktop: order-2; on mobile: order-1) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-between items-start lg:items-end pb-1 sm:pb-2">
            {/* Welcome block with elegant breathing room below navbar */}
            <div className="max-w-[434px] w-full flex flex-col space-y-3 sm:space-y-4 text-left pt-14 lg:pt-20 xl:pt-24">
              {/* Welcome. heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-sans font-medium tracking-[-0.05em] text-[var(--velora-neutral-12)] leading-[1.2] m-0 p-0">
                Welcome.
              </h2>

              {/* Intro paragraph matching Velora size and leading */}
              <p className="text-base text-[var(--velora-neutral-10)] leading-[1.4] font-normal max-w-md m-0 p-0">
                I architect high-availability distributed systems, enterprise .NET 8 microservices, and AI-native engineering workflows that scale under extreme load. Let’s build something exceptional together.
              </p>

              {/* About me link with downward arrow */}
              <div className="pt-1">
                <a
                  href="#about"
                  className="velora-link inline-flex items-center gap-1.5 text-base font-medium text-[var(--velora-neutral-12)] py-1"
                >
                  <span>About me</span>
                  <span className="text-sm font-sans">↓</span>
                </a>
              </div>
            </div>

            {/* Right Side: Scroll to see more indicator aligned with the bottom fold */}
            <div className="pt-6 self-end hidden sm:block">
              <a
                href="#works"
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans text-[var(--velora-neutral-09)] hover:text-[var(--velora-neutral-12)] transition-colors"
              >
                <span>Scroll to see more</span>
                <span className="text-xs group-hover:translate-y-0.5 transition-transform">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
