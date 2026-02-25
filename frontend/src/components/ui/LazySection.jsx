import { useEffect, useRef, useState } from 'react';

export default function LazySection({ 
  loader, 
  fallback = null, 
  rootMargin = '320px 0px', 
  minHeight = '16rem' 
}) {
  const ref = useRef(null);
  const [Comp, setComp] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loader().then(mod => setComp(() => mod.default)).catch(() => {});
        obs.disconnect();
      }
    }, { rootMargin, threshold: 0.01 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [loader, rootMargin]);

  // Two-phase reveal: first render with section-reveal (opacity:0),
  // then add is-visible on the next frame so the CSS transition plays properly
  useEffect(() => {
    if (!Comp) return;
    const frame = requestAnimationFrame(() => {
      setRevealed(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [Comp]);

  const className = Comp
    ? `section-reveal${revealed ? ' is-visible' : ''}`
    : '';

  return (
    <section ref={ref} className={className} style={{ minHeight }}>
      {Comp ? <Comp /> : (fallback || null)}
    </section>
  );
}
