import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

export default function Services() {
  const services = [
    {
      number: '01',
      title: 'Modern AI & Autonomous Engineering',
      description: 'Accelerating software delivery with spec-driven development, custom task automation agents, and data intelligence.',
      image: '/img/unsplash-workspace-1.jpg'
    },
    {
      number: '02',
      title: 'Distributed Microservices & Web APIs',
      description: 'Architecting decoupled, high-availability .NET 8 backends and contract-first Web APIs engineered for 99.99% uptime.',
      image: '/img/unsplash-workspace-2.jpg'
    },
    {
      number: '03',
      title: 'Cloud-Native Infrastructure & DevOps',
      description: 'Designing scalable cloud foundations across Azure and AWS with container orchestration and zero-downtime CI/CD pipelines.',
      image: '/img/portfolio/geologiq.jpg'
    },
    {
      number: '04',
      title: 'High-Concurrency Data & Distributed Caching',
      description: 'Tuning SQL Server queries, Redis caching, and Cosmos DB storage for sub-50ms data paths under heavy load.',
      image: '/img/unsplash-workspace-3.jpg'
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-28 border-b border-[var(--velora-neutral-03)]">
      <div className="velora-container space-y-16 sm:space-y-20">
        {/* Section Header with "—— Services" */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start" delay={0}>
          {/* Left: —— Services (Heading/Section Header with hairline rule) */}
          <div className="lg:col-span-5 flex items-center gap-3 pt-1">
            <span className="inline-block w-8 sm:w-10 h-[1px] bg-[var(--velora-neutral-08)] select-none"></span>
            <h2 className="velora-section-header">
              Services
            </h2>
          </div>

          {/* Right: Intro statement (Others/Section Intro) */}
          <div className="lg:col-span-7">
            <p className="velora-section-intro max-w-2xl">
              From strategy to execution, I provide robust backend systems, distributed cloud pipelines, and AI-native engineering.
            </p>
          </div>
        </Reveal>

        {/* Velora Sticky Collapsing Stack: Each card sticks and subsequent cards collapse upward over it */}
        <div className="relative">
          {services.map((svc, idx) => (
            <div
              key={svc.number}
              style={{ zIndex: 10 + idx }}
              className="sticky top-20 sm:top-24 lg:top-[120px] bg-[var(--velora-bg)] border-t border-[var(--velora-neutral-03)] transition-colors"
            >
              <div className="py-8 sm:py-12 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center group">
                {/* Col 1: Number above Title (lg:col-span-4) */}
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-xs font-sans text-[var(--velora-neutral-09)] font-normal block">
                    {svc.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-sans font-medium tracking-tight text-[var(--velora-neutral-12)] group-hover:text-[var(--velora-main-02)] transition-colors">
                    {svc.title}
                  </h3>
                </div>

                {/* Col 2: Description (lg:col-span-4) */}
                <div className="lg:col-span-4">
                  <p className="text-base font-sans text-[var(--velora-neutral-10)] leading-relaxed font-normal">
                    {svc.description}
                  </p>
                </div>

                {/* Col 3: Wide Editorial Photography (lg:col-span-4) */}
                <div className="lg:col-span-4">
                  <div className="aspect-[16/8] sm:aspect-[16/7] w-full rounded-[4px] overflow-hidden bg-[var(--velora-neutral-02)] border border-[var(--velora-neutral-04)]">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center grayscale-[25%] group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        e.target.src = '/img/hero-workspace.jpg';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom closing border */}
          <div className="border-t border-[var(--velora-neutral-03)]" />
        </div>
      </div>
    </section>
  );
}
