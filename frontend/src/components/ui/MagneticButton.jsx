import { useRef, useEffect } from 'react';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const MagneticButton = ({ children, strength = 0.4, className = '', onClick, ...props }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const button = buttonRef.current;
    if (!button) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const maxDistance = 120;

        if (distance < maxDistance) {
          const pull = (1 - distance / maxDistance) * strength;
          button.style.transform = `translate(${distanceX * pull}px, ${distanceY * pull}px) scale(1.05)`;
        }
      });
    };

    const handleMouseLeave = () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      button.style.transform = 'translate(0, 0) scale(1)';
    };

    button.addEventListener('mousemove', handleMouseMove, { passive: true });
    button.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
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
