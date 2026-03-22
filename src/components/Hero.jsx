import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { activeTheme } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-[10%] -left-[10%] w-[50%] h-[50%] ${activeTheme === 'light' ? 'bg-primary-blue/5' : 'bg-primary-blue/10'} rounded-full blur-[150px]`}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -40, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] ${activeTheme === 'light' ? 'bg-primary-purple/5' : 'bg-primary-purple/10'} rounded-full blur-[150px]`}
        />
        
        {/* Phase 7: Morphing Gradient Orb */}
        <motion.div
          animate={{
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 20% 80% / 25% 80% 20% 75%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-main opacity-5 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full glass text-[10px] font-black uppercase tracking-[0.2em] text-primary-blue mb-6 inline-block border border-primary-blue/30 bg-primary-blue/5">
            Engineering the Future of Digital Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 tracking-tighter" style={{ color: 'var(--text-main)' }}>
            Develop. Deploy.<br/>
            Elevate with <span className="text-transparent bg-clip-text bg-gradient-main">CodeRise.</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-light" style={{ color: 'var(--text-alt)' }}>
            We harmonize elite aesthetics with high-performance engineering to 
            architect immersive, full-stack digital ecosystems that define industries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact">
              <MagneticButton strength={50}>
                <button className="gradient-bg px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 text-white hover:glow-glow transition-all group shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                  Initiate Deployment <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>
            </Link>
            <Link to="/projects">
              <MagneticButton strength={50}>
                <button className="px-10 py-5 rounded-full font-bold text-lg glass border-white/20 hover:bg-white/10 transition-all" style={{ color: 'var(--text-main)' }}>
                  View Work
                </button>
              </MagneticButton>
            </Link>
          </div>
        </motion.div>

        {/* Floating Icons - Moved for better positioning away from main text */}
        <motion.div 
          animate={{ y: [0, -40, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] lg:right-[15%] p-4 sm:p-6 glass rounded-2xl flex items-center justify-center border-white/10 shadow-lg opacity-20 sm:opacity-40 lg:opacity-60 scale-50 sm:scale-75 md:scale-90"
        >
          <span className="text-primary-blue text-3xl sm:text-4xl font-mono font-bold">&lt;/&gt;</span>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 50, 0], rotate: [0, -15, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] left-[10%] lg:left-[15%] p-4 sm:p-6 glass rounded-2xl flex items-center justify-center border-white/10 shadow-lg opacity-20 sm:opacity-40 lg:opacity-60 scale-50 sm:scale-75 md:scale-90"
        >
          <span className="text-primary-purple text-3xl sm:text-4xl font-mono font-bold">{'{ }'}</span>
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] left-[8%] lg:left-[12%] p-3 sm:p-4 glass rounded-full flex items-center justify-center border-white/10 opacity-15 sm:opacity-30 lg:opacity-40 scale-50 sm:scale-75 md:scale-80"
        >
          <Code className="text-primary-blue" size={24} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
