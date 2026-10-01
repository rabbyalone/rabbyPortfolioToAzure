import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { testimonialsData } from '../data/portfolioData';

export default function Testimonials({ theme = 'dark' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono ${
            theme === 'dark'
              ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898]'
              : 'bg-white border-[#b89b5e]/40 text-[#854d0e] shadow-sm'
          }`}>
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>CLIENT & STAKEHOLDER ENDORSEMENTS</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Client <span className="gold-gradient-text">Testimonials</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative">
          <div className={`rounded-3xl p-8 sm:p-12 border space-y-8 relative overflow-hidden shadow-2xl min-h-[320px] flex flex-col justify-between backdrop-blur-xl luxury-card transition-colors ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-white/95 border-slate-200 shadow-slate-200/80'
          }`}>
            {/* Background Accent Quote Icon */}
            <Quote className={`absolute right-6 top-6 w-32 h-32 pointer-events-none transition-colors ${
              theme === 'dark' ? 'text-[#dfc898]/05' : 'text-[#b89b5e]/10'
            }`} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#dfc898]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#dfc898]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className={`text-base sm:text-lg font-normal leading-relaxed italic ${
                  theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
                }`}>
                  "{current.quote}"
                </p>

                {/* Author Meta */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#dfc898] to-[#b89b5e] p-[1.5px] shadow-sm">
                      <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-xs font-mono ${
                        theme === 'dark' ? 'bg-slate-950 text-[#dfc898]' : 'bg-white text-[#854d0e]'
                      }`}>
                        {current.avatar}
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-bold text-base font-heading ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {current.author}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {current.role}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1))
                      }
                      className={`p-2 rounded-xl border transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                          : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900'
                      }`}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
                      }
                      className={`p-2 rounded-xl border transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                          : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900'
                      }`}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-6 bg-[#dfc898]'
                    : theme === 'dark' ? 'w-2 bg-slate-800 hover:bg-slate-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
