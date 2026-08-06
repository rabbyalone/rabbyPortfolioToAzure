import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { testimonialsData } from '../data/portfolioData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/40">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            What Clients <span className="text-cyan-400">Say</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full" />
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative">
          <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 space-y-8 relative overflow-hidden shadow-2xl min-h-[320px] flex flex-col justify-between">
            {/* Background Quote Icon */}
            <Quote className="absolute right-6 top-6 w-32 h-32 text-cyan-500/5 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-xl text-slate-100 font-normal leading-relaxed italic">
                  "{current.quote}"
                </p>

                {/* Author Meta */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 p-[1px]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-sm text-cyan-400 font-mono">
                        {current.avatar}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base font-heading">
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
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
                      }
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
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
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-cyan-400 shadow-glow-cyan'
                    : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
