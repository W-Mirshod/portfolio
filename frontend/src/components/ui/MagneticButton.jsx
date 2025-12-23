import { useRef, useEffect } from 'react';

const MagneticButton = ({ children, strength = 0.4, className = '', onClick, ...props }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = 120;
      
      if (distance < maxDistance) {
        const pull = (1 - distance / maxDistance) * strength;
        const translateX = distanceX * pull;
        const translateY = distanceY * pull;
        
        button.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.05)`;
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0) scale(1)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button transition-transform duration-300 ease-out ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
