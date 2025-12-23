import { useRef, useEffect, useState } from 'react';

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(6, 182, 212, 0.4)', ...props }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
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
