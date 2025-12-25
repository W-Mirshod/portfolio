import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);
  const buttonRef = useRef(null);
  const arrowRef = useRef(null);
  const wRef = useRef(null);

  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollY = window.lenis?.scroll || window.pageYOffset || 0;
      const shouldShow = scrollY > 800;
      
      if (shouldShow !== isVisible) {
        setIsVisible(shouldShow);
      }

      if (isScrollingToTop && scrollY < 50) {
        setIsScrollingToTop(false);
        transformToArrow();
      }
    };

    const lenisInstance = window.lenis;
    if (lenisInstance) {
      lenisInstance.on('scroll', checkScrollPosition);
    } else {
      window.addEventListener('scroll', checkScrollPosition, { passive: true });
    }

    checkScrollPosition();

    return () => {
      if (lenisInstance) {
        lenisInstance.off('scroll', checkScrollPosition);
      } else {
        window.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [isVisible, isScrollingToTop]);

  useEffect(() => {
    if (!buttonRef.current) return;

    if (isVisible) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isVisible]);

  const transformToW = () => {
    if (!arrowRef.current || !wRef.current) return;

    gsap.to(arrowRef.current, {
      opacity: 0,
      scale: 0.5,
      rotation: -180,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(arrowRef.current, { visibility: 'hidden' });
      }
    });

    gsap.set(wRef.current, { visibility: 'visible', display: 'block' });
    gsap.fromTo(
      wRef.current,
      {
        opacity: 0,
        scale: 0.5,
        rotation: 180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: 'back.out(1.7)'
      }
    );
  };

  const transformToArrow = () => {
    if (!arrowRef.current || !wRef.current) return;

    gsap.to(wRef.current, {
      opacity: 0,
      scale: 0.5,
      rotation: 180,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(wRef.current, { visibility: 'hidden', display: 'none' });
      }
    });

    gsap.set(arrowRef.current, { visibility: 'visible' });
    gsap.fromTo(
      arrowRef.current,
      {
        opacity: 0,
        scale: 0.5,
        rotation: -180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: 'back.out(1.7)'
      }
    );
  };

  const handleMouseEnter = () => {
    if (buttonRef.current && !isScrollingToTop) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current && !isScrollingToTop) {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }

    setIsScrollingToTop(true);
    transformToW();

    const lenisInstance = window.lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: false, duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center
                 w-12 h-12 rounded-2xl
                 bg-white/10 backdrop-blur-xl border border-white/20
                 hover:bg-white/20 hover:border-cyan-400/50
                 transition-all duration-300
                 cursor-pointer
                 overflow-hidden
                 group"
      style={{ boxShadow: '0 15px 50px -12px rgba(6, 182, 212, 0.2)' }}
      aria-label="Scroll to top"
    >
      <svg
        ref={arrowRef}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-cyan-300 absolute z-10 transition-colors duration-300 group-hover:text-cyan-200"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      
      <span
        ref={wRef}
        className="text-xl font-bold text-cyan-300 absolute z-10 transition-colors duration-300 group-hover:text-cyan-200"
        style={{ visibility: 'hidden', opacity: 0 }}
      >
        W
      </span>
    </button>
  );
};

export default GoToTop;
