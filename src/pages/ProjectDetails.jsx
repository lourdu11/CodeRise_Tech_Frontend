import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  ArrowLeft,
  Calendar,
  User,
  Layout,
  Cpu,
  CheckCircle2,
  Globe,
  Zap,
  Shield,
  Layers
} from 'lucide-react';
import axios from 'axios';
import TiltCard from '../components/TiltCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Scroll Animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projRes, allRes] = await Promise.all([
          axios.get(`${API_URL}/api/projects/${id}`),
          axios.get(`${API_URL}/api/projects`)
        ]);
        setProject(projRes.data);
        setProjects(allRes.data);
      } catch (err) {
        console.error("Error fetching project details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)]">
        <Loader2 className="animate-spin text-primary-blue mb-4" size={48} />
        <p className="text-[var(--text-alt)] font-medium animate-pulse">Loading architectural blueprints...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] px-4">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <p className="text-[var(--text-alt)] mb-8">The project you are looking for does not exist or has been relocated.</p>
        <Link to="/projects" className="px-8 py-3 gradient-bg rounded-full font-bold text-white shadow-lg">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex(p => p._id === id);
  const nextProject = projects[currentIndex + 1] || projects[0];
  const prevProject = projects[currentIndex - 1] || projects[projects.length - 1];

  const getImageUrl = (img) => {
    if (!img) return null;
    // If it's already a full URL (ImageKit, Unsplash, etc.)
    if (img.startsWith('http')) return img;
    // If it's a local upload path
    return img.includes('uploads') 
      ? `${API_URL}${img.startsWith('/') ? '' : '/'}${img}` 
      : img;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] pt-24 pb-12 overflow-x-hidden selection:bg-primary-blue selection:text-white">
      {/* Cinematic Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-purple-500 to-primary-blue z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Background Particles (The "Wow" factor) */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-blue rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random()
            }}
            animate={{ 
              y: [null, Math.random() * 100 + "%"],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 20 + 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Hero Section with Parallax Background */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        {getImageUrl(project.image) && (
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={getImageUrl(project.image)} 
              alt={project.title}
              className="w-full h-full object-cover grayscale opacity-30"
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)] via-transparent to-[var(--bg-color)] z-1"></div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.button 
              variants={fadeInUp}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-blue font-bold mb-8 hover:translate-x-[-10px] transition-transform group"
            >
              <ArrowLeft size={20} className="group-hover:scale-125 transition-transform" /> 
              <span className="tracking-widest uppercase text-xs">Back to Registry</span>
            </motion.button>
            
            <motion.div variants={fadeInUp}>
              <span className="text-primary-blue font-black uppercase tracking-[0.5em] text-[10px] mb-6 inline-block bg-primary-blue/10 px-8 py-2 rounded-full border border-primary-blue/20 backdrop-blur-sm">
                {project.category}
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-9xl font-black font-outfit tracking-tighter mb-10 leading-[0.9] uppercase"
            >
              {project.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? 'gradient-text' : 'text-white'}>{word} </span>
              ))}
            </motion.h1>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-8 items-center"
            >
               <div className="flex items-center gap-3 glass px-6 py-3 rounded-2xl border-white/5">
                  <User size={16} className="text-primary-blue" />
                  <span className="text-xs font-bold tracking-widest uppercase opacity-60">Architect: {project.developer}</span>
               </div>
               <div className="flex items-center gap-3 glass px-6 py-3 rounded-2xl border-white/5">
                  <Calendar size={16} className="text-primary-blue" />
                  <span className="text-xs font-bold tracking-widest uppercase opacity-60">Deployed: 2024</span>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Project Details */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full lg:w-7/12 space-y-20"
          >
            {/* Main Showcase Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="glass rounded-[3.5rem] overflow-hidden border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group relative"
            >
               <div className="aspect-video relative overflow-hidden bg-black/40">
                  <AnimatePresence mode="wait">
                    {(() => {
                      const src = getImageUrl(project.images && project.images.length > 0 ? project.images[activeImgIndex] : project.image);
                      return src ? (
                        <motion.img 
                          key={activeImgIndex}
                          src={src}
                          alt={`Showcase ${activeImgIndex}`}
                          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                          transition={{ duration: 0.8, ease: "anticipate" }}
                          className="w-full h-full object-contain p-4 md:p-12"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Layout className="text-primary-blue opacity-50" size={64} />
                        </div>
                      );
                    })()}
                  </AnimatePresence>
                  
                  {project.images && project.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setActiveImgIndex(prev => (prev === 0 ? project.images.length - 1 : prev - 1))}
                        className="p-4 glass rounded-full hover:bg-primary-blue transition-colors shadow-xl"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={() => setActiveImgIndex(prev => (prev === project.images.length - 1 ? 0 : prev + 1))}
                        className="p-4 glass rounded-full hover:bg-primary-blue transition-colors shadow-xl"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  )}
               </div>
               
               {/* Gallery Thumbnails */}
               {project.images && project.images.length > 1 && (
                 <div className="p-6 bg-white/[0.02] border-t border-[var(--surface-border)] flex gap-4 overflow-x-auto no-scrollbar">
                    {project.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all ${activeImgIndex === idx ? 'ring-2 ring-primary-blue scale-95 opacity-100' : 'opacity-40 hover:opacity-100'}`}
                      >
                        <img src={getImageUrl(img)} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                      </button>
                    ))}
                 </div>
               )}
            </motion.div>

            {/* Overview Section */}
            <motion.section variants={fadeInUp} className="glass p-8 md:p-12 rounded-[2.5rem] border-[var(--surface-border)]">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Layout className="text-primary-blue" /> Project Overview
              </h2>
              <p className="text-lg md:text-xl leading-relaxed opacity-90 whitespace-pre-line" style={{ color: 'var(--text-alt)' }}>
                {project.desc}
              </p>
            </motion.section>

            {/* Strategic Value Section */}
            {project.useCase && (
              <motion.section variants={fadeInUp} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 rounded-[3rem] blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative glass p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-white/[0.03] backdrop-blur-3xl">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <CheckCircle2 className="text-primary-blue" /> Strategic Solution
                  </h2>
                  <p className="text-lg leading-relaxed opacity-90 italic">
                    {project.useCase}
                  </p>
                </div>
              </motion.section>
            )}
          </motion.div>

          {/* Right: Sidebar Info */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 space-y-8"
          >
            {/* Tech Stack Card */}
            <motion.div variants={fadeInUp} className="glass p-8 rounded-[2.5rem] border-[var(--surface-border)] bg-gradient-to-br from-primary-blue/5 to-transparent">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                 <Cpu className="text-primary-blue" /> Technology Core
               </h3>
               <div className="flex flex-wrap gap-3">
                 {project.tech && project.tech.map((t, i) => (
                   <span key={i} className="px-5 py-2.5 glass rounded-2xl text-xs font-black border-white/5 hover:border-primary-blue/40 transition-all uppercase tracking-widest text-primary-blue">
                     {t}
                   </span>
                 ))}
               </div>
            </motion.div>

            {/* Meta Info Card */}
            <motion.div variants={fadeInUp} className="glass p-8 rounded-[2.5rem] border-[var(--surface-border)] divide-y divide-white/5">
                <div className="py-4 first:pt-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 block mb-2">Architect</span>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center font-bold text-lg shadow-lg">
                      {project.developer ? project.developer.charAt(0) : 'C'}
                    </div>
                    <p className="font-bold text-lg font-outfit uppercase tracking-wider">{project.developer || 'CodeRise Labs'}</p>
                  </div>
                </div>

                <div className="py-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 block mb-2">Completion Status</span>
                  <p className="font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" /> Fully Deployed
                  </p>
                </div>

                <div className="py-4 last:pb-0">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 block mb-2">Digital Location</span>
                   {project.demoUrl ? (
                     <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group flex items-center justify-between p-5 bg-primary-blue rounded-2xl hover:bg-primary-blue/80 transition-all shadow-lg overflow-hidden relative"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-white/20 translate-x-[-100%]"
                        whileHover={{ translateX: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="font-bold text-white transition-colors relative z-10">Visit Live Portfolio</span>
                      <ExternalLink size={20} className="text-white relative z-10" />
                    </a>
                   ) : (
                     <p className="text-sm italic opacity-50">Confidential / Internal Portal</p>
                   )}
                </div>
            </motion.div>

            {/* Newsletter / CTA */}
            <motion.div variants={fadeInUp} className="gradient-bg p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center text-white relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
               <Globe size={48} className="mb-6 opacity-20 group-hover:rotate-12 transition-transform duration-700" />
               <h3 className="text-2xl font-bold mb-4 font-outfit">Ready to evolve?</h3>
               <p className="text-sm opacity-80 mb-8 leading-relaxed">
                 Harness the same architectural excellence for your next market-disrupting digital asset.
               </p>
                <Link to="/contact" className="w-full py-4 bg-white text-[#0F172A] rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform shadow-xl">
                  Consult Our Architects
                </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-20 pt-20 border-t border-white/5 pb-32">
          {project.images && project.images.length > 0 ? (
            <>
              <div className="flex items-center gap-4 mb-16">
                <h3 className="text-2xl font-bold font-outfit tracking-tight">Project <span className="gradient-text">Showcase</span></h3>
                <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                {/* Include primary image first for 'all images' showcase */}
                {[project.image, ...(project.images || [])].filter(Boolean).map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 80, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      delay: idx * 0.2, 
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <TiltCard className="group relative h-[450px] md:h-[650px] rounded-[3.5rem] overflow-hidden glass border border-white/5 hover:border-primary-blue/40 transition-all duration-1000 shadow-2xl">
                      <img 
                        src={getImageUrl(img)} 
                        alt={`${project.title} perspective ${idx + 1}`} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                      />
                      
                      {/* Premium Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)]/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-all duration-700" />
                      
                      {/* Floating Label */}
                      <div className="absolute bottom-12 left-12 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                         <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-blue bg-primary-blue/10 w-fit px-4 py-1 rounded-full border border-primary-blue/20">Perspective {idx + 1}</span>
                            <h4 className="text-xl font-bold text-white/40">Architectural Detail</h4>
                         </div>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                         <div className="w-12 h-12 border-t-2 border-r-2 border-primary-blue/30 rounded-tr-2xl" />
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="mb-20">
               <div className="flex items-center gap-4 mb-16">
                <h3 className="text-2xl font-bold font-outfit tracking-tight opacity-40 italic">Gallery in <span className="gradient-text">Production</span></h3>
                <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>
            </div>
          )}

          {/* Always show Navigation */}
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[1px] flex-1 bg-white/5"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-500">Navigate Collection</span>
              <div className="h-[1px] flex-1 bg-white/5"></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8 mb-40">
              <Link 
                to={`/projects/${prevProject._id}`}
                className="group flex flex-col items-start gap-4 p-10 glass rounded-[2.5rem] border-white/5 hover:border-primary-blue/20 hover:bg-white/5 transition-all w-full md:w-5/12"
                onClick={() => window.scrollTo(0, 0)}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-blue flex items-center gap-2">
                  <ChevronLeft size={16} /> Previous Masterpiece
                </span>
                <span className="text-2xl md:text-3xl font-bold group-hover:text-primary-blue transition-colors leading-tight">{prevProject.title}</span>
              </Link>

              <Link 
                to={`/projects/${nextProject._id}`}
                className="group flex flex-col items-end gap-4 p-10 glass rounded-[2.5rem] border-white/5 hover:border-primary-blue/20 hover:bg-white/5 transition-all w-full md:w-5/12 text-right"
                onClick={() => window.scrollTo(0, 0)}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-blue flex items-center justify-end gap-2">
                  Next Architecture <ChevronRight size={16} />
                </span>
                <span className="text-2xl md:text-3xl font-bold group-hover:text-primary-blue transition-colors leading-tight">{nextProject.title}</span>
              </Link>
            </div>
          </div>

          {/* Always show Other Projects at the very bottom */}
          <div className="mt-20">
             <div className="flex items-center gap-4 mb-16">
                <h3 className="text-2xl font-bold font-outfit tracking-tight">Explore The <span className="gradient-text">Registry</span></h3>
                <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.filter(p => p._id.toString() !== id.toString()).map((p, idx) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                  >
                    <Link to={`/projects/${p._id}`} onClick={() => window.scrollTo(0, 0)}>
                      <TiltCard className="group relative aspect-square rounded-3xl overflow-hidden glass border border-white/5 hover:border-primary-blue/30 transition-all">
                        <img 
                          src={getImageUrl(p.image)} 
                          alt={p.title} 
                          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent opacity-80" />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                           <h4 className="text-sm font-bold truncate group-hover:text-primary-blue transition-colors">{p.title}</h4>
                        </div>
                      </TiltCard>
                    </Link>
                  </motion.div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
