import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import { PortfolioPrismaHero } from './components/ui/portfolio-prisma-hero';
import Projects from './components/Projects';
import SkillsRadar from './components/SkillsRadar';
import ExperienceTimeline from './components/ExperienceTimeline';
import Articles from './components/Articles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Background atmosphere state ('matte-dark' | 'warm-gray' | 'studio-white')
  const [currentBg, setCurrentBg] = useState(() => {
    return localStorage.getItem('portfolio_bg') || 'matte-dark';
  });

  // Aesthetic color palette permanently locked to Brushed Titanium
  const currentPalette = 'brushed-titanium';

  const [theme, setTheme] = useState(() => {
    const savedBg = localStorage.getItem('portfolio_bg');
    if (savedBg === 'warm-gray' || savedBg === 'studio-white') return 'light';
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio_palette', 'brushed-titanium');
    document.documentElement.setAttribute('data-palette', 'brushed-titanium');
    document.body.setAttribute('data-palette', 'brushed-titanium');
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio_bg', currentBg);
    document.body.setAttribute('data-bg', currentBg);
    if (currentBg === 'warm-gray' || currentBg === 'studio-white') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [currentBg]);

  const toggleTheme = () => {
    if (currentBg === 'matte-dark') {
      setCurrentBg('warm-gray');
    } else if (currentBg === 'warm-gray') {
      setCurrentBg('studio-white');
    } else {
      setCurrentBg('matte-dark');
    }
  };

  const getContainerBg = () => {
    switch (currentBg) {
      case 'warm-gray':
        return 'bg-[#f5f4ef] text-stone-900';
      case 'studio-white':
        return 'bg-[#ffffff] text-slate-900';
      case 'matte-dark':
      default:
        return 'bg-[#08090d] text-slate-100';
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${getContainerBg()}`}>
      {/* Luxury Modern Preloader (Struxent Cinema Curtain Reveal) */}
      <Preloader theme={theme} tagline="Building something that works." />

      {/* Subtle, calm dynamic top ceiling vignette for Matte Dark & Warm Gray */}
      {currentBg === 'matte-dark' && (
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(ellipse 75% 40% at 50% -8%, rgba(226, 232, 240, 0.12), transparent 70%)'
          }}
        />
      )}
      {currentBg === 'warm-gray' && (
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(ellipse 75% 40% at 50% -8%, rgba(51, 65, 85, 0.05), transparent 70%)'
          }}
        />
      )}

      {/* Transparent Floating Island Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Streamlined Sections (Strict High-Signal, Minimalist Hierarchy) */}
      <main>
        <PortfolioPrismaHero
          theme={theme}
          name="MD RABBY"
          surname="HASAN"
          tagline="Lead Software Engineer & Systems Architect"
          summary="For more than a decade, I’ve been designing and building software that solves real-world problems at scale. I work mainly with .NET, distributed systems, microservices, cloud platforms, and increasingly AI-driven development. My experience has taken me from Arctic cold-storage and offshore sensor systems to large, mission-critical enterprise platforms."
          ctaText="Get in Touch"
          ctaTarget="contact"
          ctaAction={() => {
            const el = document.getElementById("contact");
            if (el) {
              const navOffset = 70;
              const elementPosition = el.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - navOffset;

              window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: "smooth"
              });

              try {
                if (window.history && window.history.pushState) {
                  window.history.pushState(null, "", "#contact");
                }
              } catch (e) {}
            }
          }}
          typewriterPhrases={[
            "AI-Native Engineering & Agents",
            "SaaS & Distributed Microservices",
            "Legacy Software Conversion",
            "Performance Optimization & Tuning"
          ]}
          resumeUrl="./doc/rabby_hasan_9_years_full_stack_dot_net_dev.pdf"
          onOpenTerminal={() => setTerminalOpen(true)}
          onSelectProject={setSelectedProject}
        />
        <div className="relative">
          <Projects theme={theme} onSelectProject={setSelectedProject} />
          <SkillsRadar theme={theme} />
          <ExperienceTimeline theme={theme} />
          <Articles theme={theme} />
          <Contact theme={theme} />
        </div>
      </main>

      {/* Footer */}
      <Footer theme={theme} />



      {/* Developer CLI Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Project Specs Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
