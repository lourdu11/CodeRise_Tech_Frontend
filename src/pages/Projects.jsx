import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ProjectsPreview from '../components/ProjectsPreview';

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20"
    >
      <Helmet>
        <title>Projects | CodeRise</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6">
            Architectural <span className="gradient-text">Registry</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl italic" style={{ color: 'var(--text-alt)' }}>
            Exploring the convergence of aesthetic mastery and high-performance engineering.
          </p>
        </div>

        <ProjectsPreview />
        
      </div>
    </motion.div>
  );
};

export default Projects;
