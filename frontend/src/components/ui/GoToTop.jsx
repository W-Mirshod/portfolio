import { useState, useEffect } from 'react';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.lenis?.scroll || window.pageYOffset || 0;
      if (scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const lenisInstance = window.lenis;
    if (lenisInstance) {
      lenisInstance.on('scroll', toggleVisibility);
    } else {
      window.addEventListener('scroll', toggleVisibility);
    }

    toggleVisibility();

    return () => {
      if (lenisInstance) {
        lenisInstance.off('scroll', toggleVisibility);
      } else {
        window.removeEventListener('scroll', toggleVisibility);
      }
    };
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const lenisInstance = window.lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: false, duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group"
          aria-label="Go to top"
          style={{
            padding: '10px',
            borderRadius: '10px',
            border: '1.5px solid transparent',
            backgroundImage: isHovered
              ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 25%, #24243e 50%, #302b63 75%, #0f0c29 100%), linear-gradient(135deg, #ff00ff, #00ffff, #ff00ff)'
              : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%), linear-gradient(135deg, #00ffff, #ff00ff)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: isHovered
              ? '0 0 25px rgba(255, 0, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.4), 0 6px 20px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 0, 255, 0.15)'
              : '0 0 15px rgba(0, 255, 255, 0.3), 0 3px 10px rgba(0, 0, 0, 0.25), inset 0 0 15px rgba(0, 255, 255, 0.08)',
            transform: isHovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '8px',
              background: isHovered
                ? 'linear-gradient(45deg, transparent 30%, rgba(255, 0, 255, 0.25) 50%, transparent 70%)'
                : 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.15) 50%, transparent 70%)',
              animation: isHovered ? 'shimmer 2s infinite' : 'none',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* 3D Inner shadow effect */}
          <div
            style={{
              position: 'absolute',
              inset: '1.5px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Icon container with 3D effect */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#arrowGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 0 8px #ff00ff) drop-shadow(0 0 4px #00ffff) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4))'
                  : 'drop-shadow(0 0 5px #00ffff) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
              }}
            >
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isHovered ? '#ff00ff' : '#00ffff'} />
                  <stop offset="50%" stopColor={isHovered ? '#00ffff' : '#ff00ff'} />
                  <stop offset="100%" stopColor={isHovered ? '#ff00ff' : '#00ffff'} />
                </linearGradient>
              </defs>
              <polyline points="18 15 12 9 6 15"></polyline>
              <line x1="12" y1="21" x2="12" y2="9"></line>
            </svg>
          </div>

          {/* Animated glow particles */}
          {isHovered && (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '20%',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: '#00ffff',
                  boxShadow: '0 0 6px #00ffff',
                  animation: 'float 3s ease-in-out infinite',
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '60%',
                  right: '20%',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: '#ff00ff',
                  boxShadow: '0 0 6px #ff00ff',
                  animation: 'float 3s ease-in-out infinite 1.5s',
                  zIndex: 1,
                }}
              />
            </>
          )}

          <style>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%) translateY(-100%) rotate(45deg);
              }
              100% {
                transform: translateX(200%) translateY(200%) rotate(45deg);
              }
            }
            
            @keyframes float {
              0%, 100% {
                transform: translateY(0) scale(1);
                opacity: 0.7;
              }
              50% {
                transform: translateY(-6px) scale(1.1);
                opacity: 1;
              }
            }
          `}</style>
        </button>
      )}
    </div>
  );
};

export default GoToTop;
