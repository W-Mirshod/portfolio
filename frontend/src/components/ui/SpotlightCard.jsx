import { useRef, useEffect, useState, useCallback } from 'react';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(6, 182, 212, 0.4)', ...props }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    card.addEventListener('mousemove', handleMouseMove, { passive: true });
    card.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    card.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card relative ${className}`}
      style={{
        '--spotlight-x': `${mousePosition.x}px`,
        '--spotlight-y': `${mousePosition.y}px`,
        '--spotlight-opacity': isHovering ? '1' : '0',
        '--spotlight-color': spotlightColor,
      }}
      {...props}
    >
      <div className="spotlight-overlay"></div>
      {children}
    </div>
  );
};

export default SpotlightCard;
