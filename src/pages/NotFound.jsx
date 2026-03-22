import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft, Terminal, Cpu, Database, Activity } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Logo from '../components/Logo';

const NotFound = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Professional background particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 15
  }));

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>
      <Helmet>
        <title>404 - Architecture Compromised | CodeRise</title>
      </Helmet>

      {/* SVG Circuit Board Background Animation */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="2" fill="currentColor" />
            <circle cx="90" cy="10" r="2" fill="currentColor" />
            <circle cx="90" cy="90" r="2" fill="currentColor" />
            <circle cx="10" cy="90" r="2" fill="currentColor" />
            <path d="M 50 10 L 50 30 M 50 70 L 50 90 M 10 50 L 30 50 M 70 50 L 90 50" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" style={{ color: 'var(--text-main)' }} />
        
        {/* Animated circuit paths */}
        <motion.path
          d="M -100 200 L 500 200 L 500 800 L 1200 800"
          fill="none"
          stroke="var(--primary-blue)"
          strokeWidth="1"
          opacity="0.2"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathLength: 0.2, pathOffset: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 1500 100 L 800 100 L 800 600 L -200 600"
          fill="none"
          stroke="var(--primary-blue)"
          strokeWidth="1"
          opacity="0.2"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathLength: 0.2, pathOffset: 1 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </svg>

      {/* Cinematic Scanning Line */}
      <motion.div 
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent z-[5] blur-[1px]"
      />

      {/* Floating Cyber Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}%`, y: `${p.y}%` }}
          animate={{ 
            y: [`${p.y}%`, `${(p.y + 15) % 100}%`],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full bg-primary-blue pointer-events-none"
          style={{ width: p.size, height: p.size }}
        />
      ))}

      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Centered Content */}
      <div className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-4xl w-full text-center">
          
          {/* Elite Security Status */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-red-500/10 mb-12 bg-red-500/[0.02] shadow-[0_0_30px_rgba(239,68,68,0.05)]"
          >
            <div className="relative">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/80">404 Error: Page Not Found</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16 px-4">
            
            {/* Holographic Chamber */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative p-10 glass rounded-[3.5rem] border-[var(--surface-border)] shadow-3xl bg-white/[0.01]"
            >
              <div className="absolute inset-0 border border-primary-blue/5 rounded-[3.5rem] animate-pulse" />
              
              <div className="relative z-10">
                <motion.div
                   animate={{ 
                     filter: glitch ? ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'] : 'none',
                     scale: glitch ? [1, 1.05, 1] : 1
                   }}
                >
                  <ShieldAlert size={120} className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]" />
                </motion.div>
                
                <div className="mt-8">
                   <motion.h1 
                    animate={glitch ? { x: [-2, 2, -1, 1, 0], opacity: [1, 0.8, 1] } : {}}
                    className="text-9xl font-black font-outfit tracking-tighter"
                    style={{ color: 'var(--text-main)' }}
                   >
                     404
                   </motion.h1>
                   <div className="h-[2px] w-20 mx-auto mt-2 bg-gradient-to-r from-transparent via-primary-blue to-transparent opacity-30" />
                </div>
              </div>

              {/* Orbital Details */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border border-dashed border-white/5 rounded-[3rem] pointer-events-none"
              />
            </motion.div>

            {/* Messaging & Actions */}
            <div className="text-center lg:text-left max-w-lg">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-black italic gradient-text font-outfit mb-6"
              >
                Page Not Found
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ color: 'var(--text-alt)' }}
                className="text-xl leading-relaxed mb-10 font-medium"
              >
                We couldn't find the page you're looking for. 
                The link may be broken, or the page may have been removed from the <span className="text-primary-blue font-bold">CodeRise website</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <Link to="/" className="w-full sm:w-auto">
                  <button className="w-full px-8 py-5 gradient-bg rounded-2xl font-bold flex items-center justify-center gap-3 hover:glow-glow transition-all shadow-2xl group relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    <Home size={22} className="group-hover:rotate-12 transition-transform" />
                    <span className="text-lg">Back to Home</span>
                  </button>
                </Link>
                <button 
                  onClick={() => window.history.back()}
                  className="w-full sm:w-auto px-8 py-5 glass rounded-2xl font-bold hover:bg-white/5 transition-all border-[var(--surface-border)] flex items-center justify-center gap-3 group"
                  style={{ color: 'var(--text-main)' }}
                >
                  <ArrowLeft size={22} className="group-hover:-translate-x-2 transition-transform" />
                  <span className="text-lg">Go Back</span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Elite HUD Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-[var(--surface-border)] pt-12">
            {[
              { icon: Terminal, label: 'System.Log', value: '404_ERR' },
              { icon: Cpu, label: 'Architecture', value: 'BLOCK_S5' },
              { icon: Database, label: 'Db.Access', value: 'RESTRICTED' },
              { icon: Activity, label: 'Network', value: 'FILTERED' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="flex flex-col items-center gap-2 group hover:opacity-100 transition-opacity"
              >
                <stat.icon size={20} style={{ color: 'var(--primary-blue)' }} />
                <div className="text-center">
                  <p className="text-[9px] uppercase tracking-widest font-black" style={{ color: 'var(--text-alt)' }}>{stat.label}</p>
                  <p className="text-[10px] font-mono text-primary-blue font-bold">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Extreme Decorative Overlay */}
      <div className="absolute bottom-10 right-10 opacity-10 font-mono text-[10px] hidden lg:block" style={{ color: 'var(--text-alt)' }}>
        <p>IDENT: CODE-CR-404-ELITE</p>
        <p>VECTOR_KEY: {Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
        <p>TIMESTAMP: {new Date().toISOString()}</p>
      </div>

      <div className="absolute top-32 left-10 opacity-10 font-mono text-[10px] hidden lg:block" style={{ color: 'var(--text-alt)' }}>
        <p className="flex items-center gap-2"><div className="w-1 h-1 bg-primary-blue rounded-full" /> ARCH_HANDSHAKE: FAIL</p>
        <p className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full" /> SECURITY_FLAG: SET</p>
      </div>
    </div>
  );
};

export default NotFound;
