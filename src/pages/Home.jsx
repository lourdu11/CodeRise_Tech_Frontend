import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import ProjectsPreview from '../components/ProjectsPreview';
import TechMarquee from '../components/TechMarquee';
import ScrollStory from '../components/ScrollStory';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>CodeRise | Building Future-Ready Digital Products</title>
        <meta name="description" content="Premium software solutions for the modern age." />
      </Helmet>

      <Hero />
      <ServicesPreview />
      <TechMarquee />
      <ScrollStory />
      <ProjectsPreview />
    </motion.div>
  );
};

export default Home;
