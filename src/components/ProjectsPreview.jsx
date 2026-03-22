import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, X, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const ProjectsPreview = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject || selectedProject.images.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setActiveImgIndex(prev => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImgIndex(prev => (prev === selectedProject.images.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        if (Array.isArray(res.data)) {
          setProjects(res.data);
        } else {
          console.error("API Error: Expected array but got", typeof res.data);
          setProjects([]);
        }
      } catch (err) {
        console.error("Error fetching projects", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const TiltCard = ({ children, className }) => {
    const cardRef = React.useRef(null);
    
    const handleMouseMove = (e) => {
      const card = cardRef.current;
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const rotateX = (y - 0.5) * 20;
      const rotateY = (x - 0.5) * -20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    return (
      <div 
        ref={cardRef} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${className} transition-transform duration-200 ease-out`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    );
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
              Elite <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="max-w-xl italic text-sm md:text-base opacity-80" style={{ color: 'var(--text-alt)' }}>
              A curated collection of high-performance digital architectures engineered for market dominance.
            </p>
          </div>
          {!isProjectsPage && (
            <Link to="/projects">
              <button className="glass px-8 py-3 rounded-full hover:bg-white/10 transition-colors border-[var(--surface-border)] text-sm font-bold tracking-widest uppercase">
                Explore Full Registry
              </button>
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-primary-blue" size={48} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-gray-500 italic">
            No active deployments found in this sector.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
                <TiltCard className="group relative overflow-hidden rounded-3xl glass border border-[var(--surface-border)] hover:border-primary-blue/40 shadow-lg aspect-[4/5]">
                  <img 
                    src={project.image && project.image.includes('uploads') ? `${API_URL}${project.image.startsWith('/') ? '' : '/'}${project.image}` : project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-80"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-primary-blue font-semibold text-sm mb-2 block tracking-wider uppercase">{project.category}</span>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight drop-shadow-md">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech && project.tech.map((t, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-md glass text-inherit border border-[var(--surface-border)]">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {(project.demoUrl || project.liveDemo) && (
                        <a href={project.demoUrl || project.liveDemo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="p-3 bg-primary-blue hover:bg-primary-blue/80 rounded-full transition-colors shadow-lg flex items-center gap-2 px-6">
                            <span className="text-sm font-bold">Live Demo</span>
                            <ExternalLink size={18} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="glass max-w-6xl w-full rounded-[2.5rem] overflow-hidden relative shadow-3xl border-[var(--surface-border)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  setActiveImgIndex(0);
                }}
                className="absolute top-6 right-6 p-3 glass rounded-full hover:bg-white/10 transition-colors z-[210] shadow-xl border-[var(--surface-border)]"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col lg:flex-row max-h-[90vh] md:max-h-[85vh] w-full">
                {/* Left: Gallery */}
                <div className="w-full lg:w-5/12 h-[45vh] lg:h-auto relative bg-black/40 flex flex-col p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-white/5 flex-shrink-0">
                  <div className="flex-1 relative rounded-3xl overflow-hidden mb-4 shadow-2xl bg-black/30">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImgIndex}
                        src={
                          (() => {
                            const img = (selectedProject.images && selectedProject.images.length > 0 
                              ? selectedProject.images[activeImgIndex] 
                              : selectedProject.image);
                            return img && img.includes('uploads') 
                              ? `${API_URL}${img.startsWith('/') ? '' : '/'}${img}` 
                              : img;
                          })()
                        } 
                        alt={selectedProject.title} 
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full object-contain p-2" 
                      />
                    </AnimatePresence>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                    {/* Navigation Arrows */}
                    {selectedProject.images && selectedProject.images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIndex(prev => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
                          }}
                          className="p-3 glass rounded-full hover:bg-white/20 transition-all pointer-events-auto shadow-lg backdrop-blur-md"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIndex(prev => (prev === selectedProject.images.length - 1 ? 0 : prev + 1));
                          }}
                          className="p-3 glass rounded-full hover:bg-white/20 transition-all pointer-events-auto shadow-lg backdrop-blur-md"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Gallery Thumbnails */}
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto p-2 no-scrollbar justify-center items-center">
                      {selectedProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImgIndex(idx)}
                          className={`relative w-16 h-16 rounded-2xl overflow-hidden transition-all flex-shrink-0 ${activeImgIndex === idx ? 'ring-2 ring-primary-blue scale-95 shadow-xl opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                          <img 
                            src={img && img.includes('uploads') ? `${API_URL}${img.startsWith('/') ? '' : '/'}${img}` : img} 
                            className="w-full h-full object-cover" 
                            alt={`Screenshot ${idx + 1}`} 
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Right: Scrollable Content */}
                <div className="w-full lg:w-7/12 p-6 md:p-10 lg:p-14 overflow-y-auto custom-scrollbar bg-gradient-to-br from-white/[0.02] to-transparent">
                  <div className="max-w-3xl">
                    <span className="text-primary-blue font-bold uppercase tracking-[0.2em] text-xs mb-4 inline-block bg-primary-blue/10 px-4 py-1.5 rounded-full border border-primary-blue/20">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-bold mb-8 font-outfit tracking-tight" style={{ color: 'var(--text-main)' }}>{selectedProject.title}</h3>
                    
                    <div className="space-y-12">
                      {/* Description Area */}
                      <section>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4 opacity-50">Overview</h4>
                        <p className="text-lg leading-relaxed italic opacity-90 white-space-pre-line" style={{ color: 'var(--text-alt)', whiteSpace: 'pre-line' }}>
                          {selectedProject.desc}
                        </p>
                      </section>

                      {/* Use Case Card */}
                      {selectedProject.useCase && (
                        <section className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                          <div className="relative p-8 glass rounded-[2rem] border-white/5 bg-white/[0.03] backdrop-blur-3xl">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-blue mb-4">Strategic Logic: Use Case</h4>
                            <p className="text-base leading-[1.8] opacity-90" style={{ whiteSpace: 'pre-line' }}>
                                {selectedProject.useCase}
                            </p>
                          </div>
                        </section>
                      )}

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {selectedProject.developer && (
                          <section>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4 opacity-50">Architect</h4>
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center font-bold text-lg shadow-lg">
                                {selectedProject.developer.charAt(0)}
                              </div>
                              <p className="font-bold text-lg font-outfit">
                                {selectedProject.developer}
                              </p>
                            </div>
                          </section>
                        )}
                        
                        <section>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4 opacity-50">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tech.map((t, i) => (
                              <span key={i} className="px-4 py-2 glass rounded-xl text-xs font-bold border-white/5 hover:border-primary-blue/20 transition-colors uppercase tracking-widest">{t}</span>
                            ))}
                          </div>
                        </section>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-10 flex gap-4">
                        {(selectedProject.demoUrl || selectedProject.liveDemo) && (
                          <a href={selectedProject.demoUrl || selectedProject.liveDemo} target="_blank" rel="noreferrer" className="flex-1 gradient-bg py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:glow-glow transition-all shadow-xl shadow-primary-blue/20 text-white group">
                            Live Deployment <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsPreview;
