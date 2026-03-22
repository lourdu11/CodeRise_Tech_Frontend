import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Code, 
  Database, 
  Globe, 
  Layers, 
  Settings, 
  Cpu, 
  Shield, 
  Zap, 
  Sparkles, 
  Rocket,
  Terminal,
  Activity,
  Box
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const techStack = [
  { 
    category: "Frontend", 
    tools: [
      { name: "React.js", url: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Vite", url: "https://cdn.simpleicons.org/vite/646CFF" },
      { name: "Tailwind", url: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "Framer Motion", url: "https://cdn.simpleicons.org/framer/0055FF" },
      { name: "JavaScript", url: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs/000000" }
    ], 
    icon: <Globe size={24} />,
    color: "#06B6D4",
    bgGlow: "rgba(6, 182, 212, 0.4)"
  },
  { 
    category: "Backend", 
    tools: [
      {name:"PHP",url :"https://cdn.simpleicons.org/php/777BB4"},
      { name: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express.js", url: "https://cdn.simpleicons.org/express/eeeeee" },
      { name: "JWT", url: "https://cdn.simpleicons.org/jsonwebtokens/ffffff" },
      { name: "Axios", url: "https://cdn.simpleicons.org/axios/5A29E4" }
    ], 
    icon: <Settings size={24} />,
    color: "#10B981",
    bgGlow: "rgba(16, 185, 129, 0.4)"
  },
  { 
    category: "Databases", 
    tools: [
      { name: "MongoDB", url: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Mongoose", url: "https://cdn.simpleicons.org/mongoose/880000" }
    ], 
    icon: <Database size={24} />,
    color: "#F59E0B",
    bgGlow: "rgba(245, 158, 11, 0.4)"
  },
  { 
    category: "Deployment", 
    tools: [
      { name: "Vercel", url: "https://cdn.simpleicons.org/vercel/ffffff" },
      { name: "Netlify", url: "https://cdn.simpleicons.org/netlify/00ADBB" },
      { name: "Render", url: "https://cdn.simpleicons.org/render/ffffff" },
      { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" }
    ], 
    icon: <Rocket size={24} />,
    color: "#8B5CF6",
    bgGlow: "rgba(139, 92, 246, 0.4)"
  },
  { 
    category: "Server & Legacy", 
    tools: [
      { name: "Linux", url: "https://cdn.simpleicons.org/linux/FCC624" },
      { name: "Apache", url: "https://cdn.simpleicons.org/apache/D22128" },
      { name: "MySQL", url: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "PHP", url: "https://cdn.simpleicons.org/php/777BB4" }
    ], 
    icon: <Cpu size={24} />,
    color: "#F43F5E",
    bgGlow: "rgba(244, 63, 94, 0.4)"
  },
];

const MernItem = ({ name, icon, color, delay, theme }) => {
  const iconUrl = theme === 'light' 
    ? icon.replace(/ffffff|eeeeee|818181/g, '000000')
          .replace('339933', '215732') // Darker Node green for light mode
    : icon;

  return (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    className="flex flex-col items-center gap-4 relative group"
  >
      <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl group-hover:bg-primary-blue/20 transition-all duration-700" />
      
      {/* Scanning Effect */}
      <motion.div 
        animate={{ y: [-20, 100], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none"
      />

    <motion.div 
      whileHover={{ scale: 1.1, rotate: 10 }}
      animate={{ 
        y: [0, -10, 0],
        boxShadow: [
          `0 0 20px ${color.replace('0.4', '0.1')}`,
          `0 0 40px ${color}`,
          `0 0 20px ${color.replace('0.4', '0.1')}`
        ]
      }}
      transition={{ 
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 },
        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
      className="w-20 h-20 md:w-32 md:h-32 glass rounded-3xl flex items-center justify-center border-white/10 relative z-10 transition-all group-hover:shadow-[0_0_60px_var(--glow)]"
      style={{ '--glow': color }}
    >
      <img src={iconUrl} alt={name} className="w-10 h-10 md:w-16 md:h-16 object-contain" />
    </motion.div>
    <motion.span 
      whileHover={{ scale: 1.1, x: [0, -2, 2, 0] }}
      className="text-[10px] md:text-sm font-black tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity" 
      style={{ color: "var(--text-main)" }}
    >
      {name}
    </motion.span>
  </motion.div>
  );
};

const TiltCard = ({ children, glowColor }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -15;
    const rY = ((x - centerX) / centerX) * 15;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative glass p-8 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ 
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 40%)` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

const OrbitIcon = ({ delay, duration, distance, icon: Icon, color, size = 20 }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
  >
    <motion.div 
      style={{ x: distance }}
      className={`glass p-3 rounded-full border-white/10 shadow-lg backdrop-blur-md`}
    >
      <Icon size={size} style={{ color: color }} />
    </motion.div>
  </motion.div>
);

const CodeParticle = ({ x, y, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.5, 0],
      y: [0, -100],
      scale: [0, 1, 0],
      rotate: [0, 45]
    }}
    transition={{ duration: 5, repeat: Infinity, delay, ease: "linear" }}
    className="absolute font-mono text-[8px] text-primary-blue/30 pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    {Math.random() > 0.5 ? '01' : '10'}
  </motion.div>
);


const Tech = () => {
  const { theme } = useTheme();
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const yParallax = useTransform(springScroll, [0, 1], [150, -150]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-32 overflow-hidden relative"
      style={{ backgroundColor: 'var(--bg-color)' }}
      ref={scrollRef}
    >
      <Helmet>
        <title>Tech Ecosystem | CodeRise</title>
      </Helmet>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden z-0" 
           style={{ backgroundImage: 'radial-gradient(var(--text-main) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />


      {/* Code Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <CodeParticle 
            key={i} 
            x={Math.random() * 100} 
            y={Math.random() * 100} 
            delay={i * 0.4} 
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8 border-white/10"
          >
            <Terminal size={14} className="text-primary-blue animate-pulse" />
            <span style={{ color: 'var(--text-main)' }}>Technological Supremacy</span>
            <Activity size={14} className="text-primary-purple animate-pulse" />
          </motion.div>

          {/* Decorative Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0], 
                  scale: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * 100, 0],
                  y: [0, (i >= 3 ? 1 : -1) * 50, 0]
                }}
                transition={{ 
                  duration: 4 + i, 
                  repeat: Infinity, 
                  delay: i * 0.5 
                }}
                className="absolute left-1/2 top-1/2 w-2 h-2 bg-primary-blue/20 rounded-full blur-[2px]"
              />
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black font-outfit mb-6 leading-tight tracking-tighter flex items-center justify-center gap-4">
            <motion.span
              initial={{ rotate: -20, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                rotate: { duration: 0.8 } 
              }}
              className="text-primary-blue hidden md:block"
            >
              <Cpu size={40} />
            </motion.span>
            <span>Our Neural <span className="bg-gradient-main bg-clip-text text-transparent italic">Ecosystem</span></span>
            <motion.span
              initial={{ rotate: 20, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                rotate: { duration: 0.8 },
                delay: 0.5
              }}
              className="text-primary-purple hidden md:block"
            >
              <Layers size={40} />
            </motion.span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed" style={{ color: "var(--text-alt)" }}>
            <motion.span
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 0.3 }}
            >
              We harness elite, 
              <span className="text-primary-blue font-bold"> multi-dimensional</span> tech stacks to engineer 
              <span className="text-primary-purple font-bold"> high-velocity</span> digital architectures that 
              redefine performance benchmarks.
            </motion.span>
          </p>
        </div>

        {/* 1. Featured MERN Section */}
        <div className="mb-40">
          <div className="relative glass p-12 md:p-24 rounded-[4rem] border-white/10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-primary-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div 
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="inline-block p-3 glass rounded-2xl text-primary-blue mb-8 border-primary-blue/20"
                >
                  <Box size={32} />
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-bold font-outfit mb-8 tracking-tight" style={{ color: "var(--text-main)" }}>
                  The MERN <br />
                  <span className="gradient-text italic font-black">Foundation</span>
                </h2>
                <p className="text-lg leading-relaxed mb-10 italic" style={{ color: "var(--text-alt)" }}>
                  Our architectural core is established on the industry's most robust full-stack paradigm, 
                  ensuring seamless synchronicity and elite-level security.
                </p>
                
                <div className="flex gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} className="px-6 py-3 glass rounded-xl text-xs font-bold uppercase tracking-widest border-white/5">Fullstack Mastery</motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="px-6 py-3 glass rounded-xl text-xs font-bold uppercase tracking-widest border-white/5">Cloud Ready</motion.div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:flex md:justify-center md:gap-12 gap-6">
                <MernItem name="Mongo" icon="https://cdn.simpleicons.org/mongodb/47A248" color="rgba(71, 162, 72, 0.4)" delay={0.1} theme={theme} />
                <MernItem name="Express" icon="https://cdn.simpleicons.org/express/ffffff" color="rgba(255, 255, 255, 0.5)" delay={0.2} theme={theme} />
                <MernItem name="React" icon="https://cdn.simpleicons.org/react/61DAFB" color="rgba(97, 218, 251, 0.4)" delay={0.3} theme={theme} />
                <MernItem name="Node" icon="https://cdn.simpleicons.org/nodedotjs/339933" color="rgba(51, 153, 51, 0.5)" delay={0.4} theme={theme} />
              </div>
            </div>
            
            {/* Background Decorative Element */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-blue/10 rounded-full blur-[120px] pointer-events-none" />
          </div>
        </div>

        {/* 1.5. Featured LAMP Section */}
        <div className="mb-40">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative glass p-12 md:p-24 rounded-[4rem] border-white/10 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 flex flex-wrap justify-center gap-8 md:gap-16">
                <MernItem name="Linux" icon="https://cdn.simpleicons.org/linux/FCC624" color="rgba(252, 198, 36, 0.4)" delay={0.5} theme={theme} />
                <MernItem name="Apache" icon="https://cdn.simpleicons.org/apache/D22128" color="rgba(210, 33, 40, 0.4)" delay={0.6} theme={theme} />
                <MernItem name="MySQL" icon="https://cdn.simpleicons.org/mysql/4479A1" color="rgba(68, 121, 161, 0.4)" delay={0.7} theme={theme} />
                <MernItem name="PHP" icon="https://cdn.simpleicons.org/php/777BB4" color="rgba(119, 123, 180, 0.4)" delay={0.8} theme={theme} />
              </div>

              <div className="order-1 lg:order-2 text-right">
                <motion.div 
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="inline-block p-3 glass rounded-2xl text-primary-purple mb-8 border-primary-purple/20"
                >
                  <Cpu size={32} />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-8 tracking-tight" style={{ color: "var(--text-main)" }}>
                  The Legacy <br />
                  <span className="gradient-text italic font-black text-3xl md:text-6xl">LAMP Stack</span>
                </h2>
                <p className="text-lg leading-relaxed mb-10 italic" style={{ color: "var(--text-alt)" }}>
                  Robust, battle-tested server environments for enterprise-grade 
                  stability. Reliability engineered through decades of proven performance.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-end">
                  <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-2 glass rounded-xl text-[10px] font-bold uppercase tracking-widest border-white/5">System Stability</motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-2 glass rounded-xl text-[10px] font-bold uppercase tracking-widest border-white/5">Open Source Excellence</motion.div>
                </div>
              </div>
            </div>
            
            {/* Background Decorative Element */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-purple/10 rounded-full blur-[120px] pointer-events-none" />
          </motion.div>
        </div>

        {/* 2. Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((stack, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor={stack.bgGlow}>
                <div 
                  className="mb-8 p-3 w-14 h-14 glass rounded-2xl flex items-center justify-center border-white/10 group-hover:bg-white/5 transition-all shadow-lg"
                  style={{ color: stack.color, boxShadow: `0 0 20px ${stack.bgGlow}` }}
                >
                  {stack.icon}
                </div>
                <h3 className="text-2xl font-bold mb-8 font-outfit" style={{ color: "var(--text-main)" }}>{stack.category}</h3>
                <div className="space-y-3">
                  {stack.tools.map((tool, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-3 glass rounded-xl border-white/5 hover:border-white/20 transition-all group/item"
                    >
                      <img src={tool.url} alt={tool.name} className="w-5 h-5 object-contain opacity-50 group-hover/item:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium opacity-60 group-hover/item:opacity-100" style={{ color: "var(--text-main)" }}>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Orbital DNA Visualizer */}
        <div className="mt-64 relative h-[600px] flex items-center justify-center">
          <motion.div 
            style={{ y: yParallax }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute w-[500px] h-[500px] bg-primary-blue/10 rounded-full blur-[150px] animate-pulse-slow" />
            <div className="absolute w-[300px] h-[300px] bg-primary-purple/10 rounded-full blur-[100px] animate-pulse" />

            {/* Orbiting Rings */}
            {[300, 450, 600].map((size, i) => (
              <motion.div
                key={i}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                className="absolute border border-dashed border-white/10 rounded-full"
                style={{ width: size, height: size }}
              />
            ))}

            {/* Orbiting Tech Icons */}
            <OrbitIcon duration={15} distance={150} icon={Code} color="#06B6D4" size={24} />
            <OrbitIcon duration={25} distance={-225} icon={Database} color="#10B981" size={20} delay={2} />
            <OrbitIcon duration={35} distance={300} icon={Globe} color="#F59E0B" size={28} delay={5} />
            <OrbitIcon duration={45} distance={-375} icon={Cpu} color="#F43F5E" size={22} delay={8} />

            {/* Core Prism */}
            <div className="relative z-20 group">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 bg-gradient-main rounded-full blur-[40px] opacity-30 group-hover:opacity-60 transition-opacity" 
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-40 h-40 glass rounded-[2.5rem] flex flex-col items-center justify-center border-white/20 shadow-2xl relative overflow-hidden"
              >
                <span className="text-5xl font-black bg-gradient-main bg-clip-text text-transparent">CR</span>
                <span className="text-[10px] font-bold tracking-[0.4em] mt-2 uppercase opacity-40" style={{ color: 'var(--text-main)' }}>Core Analytics</span>
                
                {/* Scanline Effect */}
                <motion.div 
                  animate={{ y: [-100, 200] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-[10%] bg-gradient-to-b from-transparent via-primary-blue/30 to-transparent pointer-events-none"
                />
              </motion.div>
            </div>
            
            <div className="absolute bottom-0 text-center">
              <p className="font-bold tracking-[0.8em] uppercase text-[10px] opacity-30 mb-4" style={{ color: 'var(--text-main)' }}>Global Deployment Matrix</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-6 h-[1px] bg-white/10" />)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tech;
