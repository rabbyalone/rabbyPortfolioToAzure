import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
      {/* Ambient Spotlight Mesh Background */}
      <ParticleBackground theme={theme} />

      {/* Navbar with Theme Toggle */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Sections */}
      <main className="space-y-8">
        <Hero theme={theme} onOpenTerminal={() => setTerminalOpen(true)} />
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

      {/* Developer CLI Terminal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Project Specs Modal - Rendered at App Root to prevent z-index stacking trapping */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
