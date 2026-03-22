import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-color)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Logo className="text-5xl md:text-7xl" />
      </motion.div>
      
      <div className="w-48 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-border)' }}>
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full bg-gradient-main"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
