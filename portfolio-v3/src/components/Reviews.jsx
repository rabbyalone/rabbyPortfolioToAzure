import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsData } from '../data/portfolioData';
import Reveal from './Reveal';

export default function Reviews() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const goToSlide = (idx) => {
    if (idx === activeIdx) return;
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  // Auto-play carousel every 5.5s, paused when hovering over card
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIdx((prev) => (prev + 1) % testimonialsData.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeIdx, isPaused]);

  return (
    <section id="reviews" className="py-20 sm:py-28 border-b border-[var(--velora-neutral-03)]">
      <div className="velora-container">
        {/* Two-Column Layout matching Velora Reviews (Section 05) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Subtitle (lg:col-span-5) */}
          <Reveal className="lg:col-span-5 space-y-4 pt-1" delay={0}>
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 sm:w-10 h-[1px] bg-[var(--velora-neutral-08)] select-none"></span>
              <h2 className="velora-section-header">
                What People Say
              </h2>
            </div>

            <p className="text-base font-sans text-[var(--velora-neutral-10)] max-w-md pt-2 leading-relaxed font-normal">
              Worked with enterprise platforms and international engineering teams, delivering high-availability microservices.
            </p>
          </Reveal>

          {/* Right Column: Testimonial Carousel & Pagination (lg:col-span-7) */}
          <Reveal className="lg:col-span-7 space-y-6" delay={120}>
            {/* Sliding Carousel Card Container with Drag/Swipe support */}
            <div
              className="relative overflow-hidden min-h-[320px] sm:min-h-[280px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIdx}
                  custom={direction}
                  initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (offset.x < -40 || swipe < -100) {
                      nextSlide();
                    } else if (offset.x > 40 || swipe > 100) {
                      prevSlide();
                    }
                  }}
                  className="bg-[var(--velora-neutral-02)] border border-[var(--velora-neutral-04)] rounded-[8px] p-8 sm:p-10 flex flex-col justify-between space-y-6 cursor-grab active:cursor-grabbing select-none"
                >
                  {/* Decorative Quote Mark in Main 01 sand accent */}
                  <div className="text-4xl text-[var(--velora-main-01)] font-serif leading-none select-none">
                    “
                  </div>

                  {/* Quote with editorial typography (20-22px font-medium) */}
                  <p className="text-lg sm:text-[20px] font-sans font-medium text-[var(--velora-neutral-12)] leading-snug tracking-tight">
                    "{testimonialsData[activeIdx].quote}"
                  </p>

                  {/* Author Row with circular avatar photo */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-[var(--velora-neutral-03)]">
                    <img
                      src={testimonialsData[activeIdx].image}
                      alt={testimonialsData[activeIdx].author}
                      className="w-10 h-10 rounded-full object-cover border border-[var(--velora-neutral-04)] shrink-0 pointer-events-none"
                    />
                    <div className="space-y-0.5">
                      <div className="text-sm font-sans font-medium text-[var(--velora-neutral-12)]">
                        {testimonialsData[activeIdx].author}
                      </div>
                      <div className="text-xs font-sans text-[var(--velora-neutral-09)]">
                        {testimonialsData[activeIdx].role}, {testimonialsData[activeIdx].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Centered Pill Pagination & Navigation Controls matching Velora */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {/* Prev button */}
              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--velora-neutral-02)] border border-[var(--velora-neutral-04)] text-[var(--velora-neutral-10)] hover:text-[var(--velora-neutral-12)] hover:border-[var(--velora-main-01)] transition-all cursor-pointer select-none"
              >
                <span className="text-sm font-sans">←</span>
              </button>

              {/* Dots pill indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--velora-neutral-02)] border border-[var(--velora-neutral-04)]">
                {testimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Scroll to testimonial ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer border-0 p-0 block ${
                      activeIdx === idx
                        ? 'w-6 h-2 bg-[var(--velora-neutral-12)]'
                        : 'w-2 h-2 bg-[var(--velora-neutral-06)] hover:bg-[var(--velora-neutral-08)]'
                    }`}
                  />
                ))}
              </div>

              {/* Next button */}
              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--velora-neutral-02)] border border-[var(--velora-neutral-04)] text-[var(--velora-neutral-10)] hover:text-[var(--velora-neutral-12)] hover:border-[var(--velora-main-01)] transition-all cursor-pointer select-none"
              >
                <span className="text-sm font-sans">→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
