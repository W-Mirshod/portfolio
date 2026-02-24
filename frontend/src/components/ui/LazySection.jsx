import { useEffect, useRef, useState } from 'react';

export default function LazySection({ 
  loader, 
  fallback = null, 
  rootMargin = '600px 0px', 
  minHeight = '16rem' 
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [Comp, setComp] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        loader().then(mod => setComp(() => mod.default)).catch(() => {});
        obs.disconnect();
      }
    }, { rootMargin, threshold: 0.01 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [loader, rootMargin]);

  /* Section-reveal visibility trigger */
  useEffect(() => {
    if (!Comp) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [Comp]);

  return (
    <section ref={ref} className={Comp ? 'section-reveal' : ''} style={{ minHeight }}>
      {Comp ? <Comp /> : (fallback || null)}
    </section>
  );
}
