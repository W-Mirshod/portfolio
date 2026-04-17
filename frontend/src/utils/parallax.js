/**
 * Sets up multi-layer parallax on the given element refs (layer1, layer2, layer3).
 * Returns a cleanup function.
 */
export function setupMultiLayerParallax(layer1, layer2, layer3) {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return () => {};

  let rafId = null;

  const handleScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      if (layer1 && layer2 && layer3) {
        const scrolled = window.pageYOffset;
        layer1.style.transform = `translate3d(0, ${scrolled * -0.3}px, 0)`;
        layer2.style.transform = `translate3d(0, ${scrolled * -0.15}px, 0)`;
        layer3.style.transform = `translate3d(0, ${scrolled * -0.05}px, 0)`;
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  handleScroll();

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
  };
}

/**
 * Sets up scroll reveal on the given element.
 * Returns a cleanup function.
 */
export function setupScrollReveal(element, threshold = 0.1) {
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

  if (element) {
    observer.observe(element);
  }

  return () => observer.disconnect();
}

export function setupStaggerReveal(container, options = {}) {
  const { threshold = 0.06, rootMargin = '0px 0px -36px 0px' } = options;
  if (!container || typeof IntersectionObserver === 'undefined') {
    return () => {};
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold, rootMargin }
  );
  observer.observe(container);
  return () => observer.disconnect();
}

/**
 * Creates floating particles inside a container with class 'floating-particles'.
 * Returns a cleanup function.
 */
export function setupFloatingParticles(particleCount = 20) {
  const container = document.querySelector('.floating-particles');
  if (!container) return () => {};

  container.innerHTML = '';

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
}
