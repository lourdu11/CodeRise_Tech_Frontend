import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // return (
  //   <>
  //     <div
  //       className="cursor-glow"
  //       style={{
  //         left: `${position.x}px`,
  //         top: `${position.y}px`,
  //       }}
  //     />
  //     <div
  //       className="fixed w-4 h-4 bg-primary-blue rounded-full pointer-events-none z-[10000] mix-blend-difference"
  //       style={{
  //         left: `${position.x}px`,
  //         top: `${position.y}px`,
  //         transform: 'translate(-50%, -50%)',
  //       }}
  //     />
  //   </>
  // );
};

export default CustomCursor;
