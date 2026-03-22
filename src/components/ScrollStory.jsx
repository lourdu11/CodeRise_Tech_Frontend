import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ScrollStory = () => {
  const containerRef = useRef(null);
  const { activeTheme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

  const opacity = useTransform(springScroll, [0, 0.2, 0.5, 0.8], [0, 1, 1, 0]);
  const scale = useTransform(springScroll, [0, 0.5, 1], [0.8, 1, 1.2]);
  const y = useTransform(springScroll, [0, 1], [150, -150]);
  
  // Character Split Animation Variables
  const text = "We orchestrate intricate logic into immersive digital realities.";
  const words = text.split(" ");

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen py-32 flex items-center justify-center relative overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-5xl mx-auto px-4 text-center z-10"
      >
        <motion.span 
          initial={{ letterSpacing: "0.2em", opacity: 0 }}
          whileInView={{ letterSpacing: "0.5em", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-primary-blue font-bold uppercase text-sm mb-12 block"
        >
          Our Philosophy
        </motion.span>
        
        <h2 className="text-4xl md:text-7xl font-bold font-outfit leading-tight mb-12 flex flex-wrap justify-center gap-x-[0.3em]" style={{ color: 'var(--text-main)' }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={(word === "intricate" || word === "realities.") ? "gradient-text" : ""}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
          {[
            { val: "100%", label: "Client Satisfaction", color: "var(--accent-cyan)" },
            { val: "5+", label: "Projects Completed", color: "var(--accent-rose)" },
            { val: "24/7", label: "Support & Maintenance", color: "var(--accent-amber)" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-8 glass rounded-[2.5rem] border-[var(--surface-border)]"
            >
              <h4 className="text-5xl font-black mb-2 font-outfit tracking-tighter" style={{ color: stat.color }}>{stat.val}</h4>
              <p className="uppercase tracking-[0.2em] text-[10px] font-bold" style={{ color: 'var(--text-alt)' }}>{stat.label}</p>
              
              {/* Stat Glow */}
              <div 
                className="absolute inset-0 blur-3xl opacity-10 rounded-full -z-10" 
                style={{ backgroundColor: stat.color }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Decorative Cinematic Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div 
          animate={{ x: [-1000, 1000], opacity: [0, 1, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-blue to-transparent -rotate-12"
        />
        <motion.div 
          animate={{ x: [1000, -1000], opacity: [0, 1, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-purple to-transparent rotate-12"
        />
        
        {/* Dynamic Grid Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--surface-border) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            opacity: activeTheme === 'light' ? 0.3 : 0.1
          }} 
        />
      </div>
    </section>
  );
};

export default ScrollStory;
