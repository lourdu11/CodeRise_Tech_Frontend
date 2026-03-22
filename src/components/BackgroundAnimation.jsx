import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const { activeTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 40;
    const symbols = ['< />', '{ }', '( )', '=>', 'import', 'const', '01'];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 12 + 8;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.4;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
      }

      update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        const particleOpacity = activeTheme === 'light' ? this.opacity * 0.4 : this.opacity;
        ctx.font = `${this.size}px monospace`;
        ctx.fillStyle = activeTheme === 'light' 
          ? `rgba(15, 23, 42, ${particleOpacity})` 
          : `rgba(37, 99, 235, ${particleOpacity})`;
        ctx.fillText(this.symbol, this.x, this.y);
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      const gridOpacity = activeTheme === 'light' ? 0.05 : 0.03;
      const gridColor = activeTheme === 'light' ? '37, 99, 235' : '37, 99, 235';
      
      ctx.strokeStyle = `rgba(${gridColor}, ${gridOpacity})`;
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};

export default BackgroundAnimation;
