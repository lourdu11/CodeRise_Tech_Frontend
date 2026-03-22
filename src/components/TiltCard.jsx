import React, { useRef } from 'react';

const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Deeper 3D rotation
    const rotateX = (y - 0.5) * 20;
    const rotateY = (x - 0.5) * -20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    // Also move the image slightly for parallax (if it exists)
    const img = card.querySelector('img');
    if (img) {
      img.style.transform = `translate(${(x - 0.5) * -15}px, ${(y - 0.5) * -15}px) scale(1.15)`;
    }
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    
    const img = cardRef.current.querySelector('img');
    if (img) {
      img.style.transform = `translate(0, 0) scale(1.1)`;
    }
  };

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-all duration-300 ease-out`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
