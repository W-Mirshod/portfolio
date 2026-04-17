const MAX_DOTS = 8200;
const BASE_STEP = 13;
const MAX_STEP = 44;
const COLOR_BUCKETS = 28;

function computeStep(cssW, cssH) {
  let step = BASE_STEP;
  while (step < MAX_STEP) {
    const cols = Math.ceil((cssW + step) / step) + 3;
    const rows = Math.ceil((cssH + step) / step) + 3;
    if (cols * rows <= MAX_DOTS) break;
    step += 1;
  }
  return step;
}

function waveField(x, y, w, h, time) {
  const nx = x / w;
  const ny = y / h;
  const cx = nx - 0.5;
  const cy = ny - 0.5;
  const t = time;
  return (
    Math.sin(nx * Math.PI * 2 * 1.45 + t * 0.85) * 0.38 +
    Math.sin(ny * Math.PI * 2 * 1.92 - t * 0.62) * 0.3 +
    Math.sin((nx + ny) * Math.PI * 3.6 + t * 0.48) * 0.22 +
    Math.sin((cx * cx + cy * cy) * Math.PI * 5.2 + t * 0.35) * 0.16 +
    Math.sin(nx * Math.PI * 6.2 + ny * Math.PI * 4.1 + t * 0.28) * 0.12
  );
}

function fillForBucket(bucket) {
  const crest = bucket / (COLOR_BUCKETS - 1);
  const r = Math.round(208 + (72 - 208) * crest * 0.55);
  const g = Math.round(218 + (255 - 218) * crest * 0.5);
  const b = Math.round(228 + (55 - 228) * crest * 0.45);
  const a = 0.046 + crest * 0.092;
  return `rgba(${r},${g},${b},${a})`;
}

export function initTideBackground() {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const existing = document.getElementById('tide-bg');
  if (existing) {
    existing.remove();
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'tide-bg';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    zIndex: '-2',
    pointerEvents: 'none',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    return () => {};
  }

  let cssW = 0;
  let cssH = 0;
  let dpr = 1;
  let step = BASE_STEP;
  let rafId = 0;
  let start = performance.now();
  let running = !document.hidden;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    cssW = window.innerWidth;
    cssH = window.innerHeight;
    step = computeStep(cssW, cssH);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawFrame(timeSec) {
    ctx.clearRect(0, 0, cssW, cssH);
    const amp = Math.min(7.5, cssH * 0.011);
    const buckets = Array.from({ length: COLOR_BUCKETS }, () => []);

    let row = 0;
    for (let y = 0; y <= cssH + step; y += step) {
      const xOff = (row % 2) * (step * 0.5);
      for (let x = -xOff; x <= cssW + step; x += step) {
        const h = waveField(x, y, cssW, cssH, timeSec);
        const crest = Math.max(0, Math.min(1, (h + 1.15) * 0.45));
        const dy = h * amp;
        const px = x;
        const py = y + dy;
        const rad = 0.4 + crest * 0.58;
        const bk = Math.min(COLOR_BUCKETS - 1, Math.floor(crest * COLOR_BUCKETS));
        buckets[bk].push(px, py, rad);
      }
      row += 1;
    }

    for (let b = 0; b < COLOR_BUCKETS; b += 1) {
      const pts = buckets[b];
      if (pts.length === 0) continue;
      ctx.fillStyle = fillForBucket(b);
      ctx.beginPath();
      for (let i = 0; i < pts.length; i += 3) {
        ctx.arc(pts[i], pts[i + 1], pts[i + 2], 0, Math.PI * 2);
      }
      ctx.fill();
    }
  }

  function frame(now) {
    if (!running) return;
    const elapsed = (now - start) / 1000;
    if (reducedMotion) {
      drawFrame(0);
      return;
    }
    drawFrame(elapsed * 0.42);
    rafId = requestAnimationFrame(frame);
  }

  function onVisibility() {
    if (document.hidden) {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    } else {
      running = true;
      start = performance.now();
      if (reducedMotion) {
        drawFrame(0);
      } else {
        rafId = requestAnimationFrame(frame);
      }
    }
  }

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);

  if (reducedMotion) {
    drawFrame(0);
  } else {
    rafId = requestAnimationFrame(frame);
  }

  return function dispose() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.remove();
  };
}
