import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, className = "", strength = 40 }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(button, {
        x: x * (strength / 100),
        y: y * (strength / 100),
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={buttonRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

export default MagneticButton;
