
import React from 'react';
import { motion } from 'framer-motion';


const Logo = ({ className = "", isFooter = false }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`font-black font-outfit select-none flex items-center ${className}`}
    >
      <span className="text-primary-blue">&lt;</span>
      {isFooter && <span className="text-primary-blue">/</span>}
      <span className="tracking-tight" style={{ color: 'var(--text-main)' }}>Code</span>
      <span className="text-primary-blue tracking-tight">Rise</span>
      <span className="text-primary-blue">&gt;</span>
      {isFooter && (
        <motion.span 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[3px] md:w-[4px] h-[1em] bg-primary-blue ml-1 glow-glow rounded-full"
          style={{ boxShadow: '0 0 10px #2563EB' }}
        />
      )}
    </motion.div>
  );
};

export default Logo; 
