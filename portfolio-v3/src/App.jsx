import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Services from './components/Services';
import About from './components/About';
import Reviews from './components/Reviews';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('velora_theme');
    if (saved) return saved === 'dark';
    return false; // Velora signature light aesthetic default
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('velora_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('velora_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-velora-bg text-velora-primary font-sans antialiased selection:bg-velora-sand1 selection:text-black transition-colors duration-300">
      <CustomCursor />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Works />
        <Services />
        <About />
        <Reviews />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
