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

    const animate = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle Spotlight Glow at cursor according to current theme
      const radialGradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        500
      );

      if (theme === 'dark') {
        radialGradient.addColorStop(0, 'rgba(223, 200, 152, 0.04)');
        radialGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
        radialGradient.addColorStop(1, 'rgba(7, 9, 14, 0)');
      } else {
        radialGradient.addColorStop(0, 'rgba(184, 155, 94, 0.06)');
        radialGradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.03)');
        radialGradient.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-100"
    />
  );
}
