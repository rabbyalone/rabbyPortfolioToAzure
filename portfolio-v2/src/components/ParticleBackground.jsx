import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracker
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isActive: false
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // 1. Prismatic Floating Nebula Glow Orbs
    const nebulaOrbs = [
      {
        x: width * 0.2,
        y: height * 0.25,
        radius: 500,
        vx: 0.35,
        vy: 0.2,
        colorDark: 'rgba(223, 200, 152, 0.18)', // Champagne Gold
        colorLight: 'rgba(223, 200, 152, 0.25)'
      },
      {
        x: width * 0.8,
        y: height * 0.45,
        radius: 540,
        vx: -0.28,
        vy: 0.28,
        colorDark: 'rgba(99, 102, 241, 0.14)', // Prismatic Violet / Indigo
        colorLight: 'rgba(99, 102, 241, 0.16)'
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        radius: 480,
        vx: 0.22,
        vy: -0.3,
        colorDark: 'rgba(16, 185, 129, 0.12)', // Prismatic Emerald / Cyan
        colorLight: 'rgba(16, 185, 129, 0.14)'
      },
      {
        x: width * 0.85,
        y: height * 0.9,
        radius: 420,
        vx: -0.2,
        vy: -0.2,
        colorDark: 'rgba(244, 63, 94, 0.09)', // Prismatic Rose
        colorLight: 'rgba(244, 63, 94, 0.11)'
      }
    ];

    // 2. Spiderweb Constellation Particles
    const particleCount = Math.min(Math.floor(width / 20), 85);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      radius: Math.random() * 2.0 + 1.2,
      alpha: Math.random() * 0.45 + 0.35
    }));

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // A. Draw Floating Prismatic Nebula Orbs
      nebulaOrbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -150 || orb.x > width + 150) orb.vx *= -1;
        if (orb.y < -150 || orb.y > height + 150) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        const glowColor = theme === 'dark' ? orb.colorDark : orb.colorLight;
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // B. Draw Interactive Mouse Spotlight Glow
      if (mouse.isActive) {
        const spotlightRadius = 380;
        const spotlightGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, spotlightRadius);
        const spotColor = theme === 'dark' ? 'rgba(223, 200, 152, 0.16)' : 'rgba(184, 155, 94, 0.20)';
        spotlightGrad.addColorStop(0, spotColor);
        spotlightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotlightGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // C. Draw Spiderweb Particle Constellation Network
      const baseRgb = theme === 'dark' ? '223, 200, 152' : '133, 77, 14';

      // 1. Inter-particle spiderweb connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            const edgeAlpha = (1 - dist / 120) * (theme === 'dark' ? 0.25 : 0.20);
            ctx.strokeStyle = `rgba(${baseRgb}, ${edgeAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw nodes and connect to mouse cursor
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Particle node
        ctx.fillStyle = `rgba(${baseRgb}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect to mouse if nearby
        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 180) {
            const lineAlpha = (1 - dist / 180) * (theme === 'dark' ? 0.6 : 0.5);
            ctx.strokeStyle = `rgba(${baseRgb}, ${lineAlpha})`;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-700"
    />
  );
}
