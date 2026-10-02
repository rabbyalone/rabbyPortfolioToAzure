import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import { PortfolioPrismaHero } from './components/ui/portfolio-prisma-hero';
import About from './components/About';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsRadar from './components/SkillsRadar';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Education from './components/Education';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState(() => {
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

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#07090e] text-slate-100' : 'bg-[#f8fafc] text-slate-800'
    }`}>
      {/* Luxury Modern Preloader (Eliminates all loading/asset flashes) */}
      <Preloader theme={theme} />

      {/* Ambient Spotlight & Constellation Mesh Background */}
      <ParticleBackground theme={theme} />

      {/* Transparent Floating Island Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Sections */}
      <main className="space-y-16">
        <PortfolioPrismaHero
          theme={theme}
          name="MD RABBY"
          surname="HASAN"
          tagline="Lead Software Engineer & Systems Architect"
          summary="I'm a Lead Software Engineer and Systems Architect with 10+ years of experience designing distributed .NET microservices, high-throughput cloud platforms, and AI-native engineering workflows. I specialize in modernizing complex legacy architectures, sub-second performance optimization, and building resilient distributed systems."
          typewriterPhrases={[
            "Distributed .NET Microservices",
            "AI-Native Engineering & Agents",
            "High-Throughput Performance Tuning",
            "Legacy Monolith Modernization"
          ]}
          resumeUrl="./doc/rabby_hasan_9_years_full_stack_dot_net_dev.pdf"
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <About theme={theme} />
        <SkillsRadar theme={theme} />
        <ExperienceTimeline theme={theme} />
        <Projects theme={theme} onSelectProject={setSelectedProject} />
        <Articles theme={theme} />
        <Education theme={theme} />
        <Testimonials theme={theme} />
        <Contact theme={theme} />
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
