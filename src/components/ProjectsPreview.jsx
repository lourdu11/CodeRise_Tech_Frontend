import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, X, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import TiltCard from './TiltCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProjectsPreview = () => {
  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('http')) return img;
    return img.includes('uploads') 
      ? `${API_URL}${img.startsWith('/') ? '' : '/'}${img}` 
      : img;
  };

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects';

  const categories = [
    'All',
    'Client Live',
    'Completed Project',
    'Our Own Project',
    'Frontend Only',
    'Others'
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/projects`);
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

        {isProjectsPage && (
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-primary-blue text-white shadow-xl shadow-primary-blue/30 scale-105' 
                  : 'glass text-gray-400 hover:text-white hover:border-primary-blue/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-primary-blue" size={48} />
          </div>
        ) : (
          (() => {
            const filteredProjects = projects.filter(p => activeCategory === 'All' || p.category === activeCategory);
            return filteredProjects.length === 0 ? (
              <div className="text-center py-20 text-gray-500 italic">
                No active deployments found in {activeCategory} sector.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project._id || index}
                    initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="cursor-pointer"
                  >
                    <Link to={`/projects/${project._id}`}>
                      <TiltCard className="group relative overflow-hidden rounded-[2.5rem] glass border border-[var(--surface-border)] hover:border-primary-blue/60 shadow-2xl aspect-[4/5] bg-gradient-to-br from-white/[0.05] to-transparent">
                        {/* Phase 8: Animated Glow Overlay */}
                        <div className="absolute inset-0 bg-primary-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10" />
                        
                        {project.image ? (
                          <img 
                            src={getImageUrl(project.image)} 
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 opacity-40 group-hover:opacity-70 scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-primary-blue/20 flex items-center justify-center">
                            <Layout className="text-primary-blue opacity-50" size={48} />
                          </div>
                        )}
                        
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/20 to-transparent opacity-90 transition-opacity group-hover:opacity-70"></div>
                        
                        <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1]">
                          <span className="text-primary-blue font-black text-[10px] mb-4 block tracking-[0.3em] uppercase bg-primary-blue/10 px-4 py-1.5 rounded-full border border-primary-blue/20 w-fit group-hover:bg-primary-blue group-hover:text-white transition-all duration-500">
                            {project.category}
                          </span>
                          <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter drop-shadow-2xl leading-none group-hover:text-primary-blue transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-4 group-hover:translate-y-0">
                            {project.tech && project.tech.slice(0, 3).map((t, i) => (
                              <span key={i} className="text-[10px] px-3 py-1.5 rounded-lg glass text-inherit border border-white/10 uppercase font-black tracking-widest">{t}</span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-primary-blue font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0 transition-all duration-700 delay-200">
                            Analyze Blueprint <ExternalLink size={18} />
                          </div>
                        </div>
                      </TiltCard>
                    </Link>
                  </motion.div>
                ))}
              </div>
            );
          })()
        )}
      </div>
    </section>
  );
};

export default ProjectsPreview;
