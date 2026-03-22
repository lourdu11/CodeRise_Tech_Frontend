import React from 'react';
import { motion } from 'framer-motion';

const techTop = [
  "MongoDB", "Express", "React", "Node.js", "JavaScript", "TypeScript", "Next.js", "GraphQL"
];

const techMiddle = [
  "Tailwind CSS", "Framer Motion", "Three.js", "GSAP", "Socket.io", "Redux", "Vite", "Prisma"
];

const techBottom = [
  "Docker", "AWS", "Firebase", "PostgreSQL", "Redis", "Figma", "Git", "Kubernetes"
];

const MarqueeRow = ({ items, direction = 1, speed = 30, colorClass = "text-white/10", hoverColor = "hover:text-primary-blue" }) => {
  return (
    <div className="flex whitespace-nowrap py-4">
      <motion.div
        animate={{ x: direction > 0 ? [0, -2000] : [-2000, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 items-center px-8"
      >
        {/* Triple the items for a truly seamless infinite loop */}
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <motion.span 
            key={index}
            whileHover={{ scale: 1.1, y: -5, opacity: 1 }}
            className={`text-5xl md:text-9xl font-black font-outfit ${colorClass} ${hoverColor} transition-all duration-500 cursor-default select-none uppercase tracking-tighter opacity-30 group-hover:opacity-60`}
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

const TechMarquee = () => {
  return (
    <div className="py-24 overflow-hidden relative group" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Decorative gradients for depth */}
      <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[var(--bg-color)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[var(--bg-color)] to-transparent z-10 pointer-events-none" />
      
      <div className="flex flex-col gap-6 -rotate-3 scale-110">
        <MarqueeRow items={techTop} direction={1} speed={30} colorClass="text-accent-cyan/20" hoverColor="hover:text-accent-cyan" />
        <MarqueeRow items={techMiddle} direction={-1} speed={40} colorClass="text-accent-purple/20" hoverColor="hover:text-primary-purple" />
        <MarqueeRow items={techBottom} direction={1} speed={35} colorClass="text-accent-rose/20" hoverColor="hover:text-accent-rose" />
      </div>
      
      {/* Centered Overlay Text with pulsing effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass px-16 py-6 rounded-[3rem] border-[var(--surface-border)] backdrop-blur-3xl shadow-[0_0_80px_rgba(6,182,212,0.15)] flex flex-col items-center gap-2"
        >
          <p className="text-[10px] font-black tracking-[0.8em] uppercase flex items-center gap-6">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent-cyan" />
            <span className="bg-gradient-vibrant bg-clip-text text-transparent">Powering the Future</span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent-rose" />
          </p>
          <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>Our Tech Ecosystem</h3>
        </motion.div>
      </div>
    </div>
  );
};

export default TechMarquee;
