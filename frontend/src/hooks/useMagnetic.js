import { useRef, useEffect } from 'react';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    // Skip entirely on touch devices — no hover, wastes resources
    if (isTouchDevice()) return;

    const element = ref.current;
    if (!element) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      // Throttle to one computation per animation frame
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const pull = (1 - distance / maxDistance) * strength;
          element.style.transform = `translate(${distanceX * pull}px, ${distanceY * pull}px)`;
        } else {
          element.style.transform = 'translate(0, 0)';
        }
      });
    };

    const handleMouseLeave = () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

export default useMagnetic;
