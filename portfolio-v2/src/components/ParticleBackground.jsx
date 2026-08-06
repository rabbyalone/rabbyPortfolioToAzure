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

    // Mouse tracker for spotlight glow
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Nebula Floating Glow Orbs
    const nebulaOrbs = [
      { x: width * 0.2, y: height * 0.3, radius: 320, vx: 0.25, vy: 0.18, colorDark: 'rgba(223, 200, 152, 0.08)', colorLight: 'rgba(184, 155, 94, 0.12)' },
      { x: width * 0.8, y: height * 0.6, radius: 400, vx: -0.2, vy: 0.22, colorDark: 'rgba(99, 102, 241, 0.06)', colorLight: 'rgba(37, 99, 235, 0.08)' },
      { x: width * 0.5, y: height * 0.8, radius: 360, vx: 0.15, vy: -0.2, colorDark: 'rgba(16, 185, 129, 0.05)', colorLight: 'rgba(16, 185, 129, 0.07)' }
    ];

    // Constellation Particles
    const particleCount = Math.min(Math.floor(width / 35), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.4 + 0.2
    }));

    const render = () => {
      // Ease mouse coordinates smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Floating Animated Nebula Glow Orbs
      nebulaOrbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        const glowColor = theme === 'dark' ? orb.colorDark : orb.colorLight;
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Mouse Cursor Spotlight Glow
      const spotlightRadius = 380;
      const spotlightGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, spotlightRadius);
      const spotColor = theme === 'dark' ? 'rgba(223, 200, 152, 0.07)' : 'rgba(184, 155, 94, 0.10)';
      spotlightGrad.addColorStop(0, spotColor);
      spotlightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = spotlightGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, spotlightRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Ambient Constellation Particles
      const particleColor = theme === 'dark' ? '223, 200, 152' : '15, 23, 42';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles close to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.strokeStyle = `rgba(${particleColor}, ${(1 - dist / 140) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
    />
  );
}
