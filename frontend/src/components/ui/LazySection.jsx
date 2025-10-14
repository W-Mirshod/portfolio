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

  return (
    <section ref={ref} style={{ minHeight }}>
      {Comp ? <Comp /> : (fallback || null)}
    </section>
  );
}
