import { useEffect, useRef, useState } from 'react';

export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        elementRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed]);

  return elementRef;
};

export const useMultiLayerParallax = () => {
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (layer1Ref.current && layer2Ref.current && layer3Ref.current) {
        const scrolled = window.pageYOffset;

        // Different speeds for different layers create depth
        layer1Ref.current.style.transform = `translate3d(0, ${scrolled * -0.3}px, 0)`;
        layer2Ref.current.style.transform = `translate3d(0, ${scrolled * -0.15}px, 0)`;
        layer3Ref.current.style.transform = `translate3d(0, ${scrolled * -0.05}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return { layer1Ref, layer2Ref, layer3Ref };
};

export const useScrollReveal = (threshold = 0.1) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('layered-entrance');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return elementRef;
};

export const useFloatingParticles = (particleCount = 20) => {
  useEffect(() => {
    const container = document.querySelector('.floating-particles');
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      container.appendChild(particle);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [particleCount]);
};

export const useHolographicTransition = (threshold = 0.2) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= threshold;
        setIsVisible(visible);
        
        if (visible && !isRevealing) {
          setIsRevealing(true);
          if (elementRef.current) {
            elementRef.current.classList.add('active');
            // Use requestAnimationFrame for smoother timing
            requestAnimationFrame(() => {
              setTimeout(() => {
                if (elementRef.current) {
                  elementRef.current.classList.add('revealing');
                }
              }, 150);
            });
          }
        } else if (!visible && isRevealing) {
          // Reset when scrolled out of view (optional - comment out if you want one-time effect)
          // setIsRevealing(false);
          // elementRef.current?.classList.remove('active', 'revealing');
        }
      },
      {
        threshold: [0, threshold, 0.5, 1],
        rootMargin: '-50px 0px -100px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, isRevealing]);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        const progress = Math.max(
          0,
          Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight))
        );

        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVisible]);

  return { elementRef, isVisible, scrollProgress, isRevealing };
};
