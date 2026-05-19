import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const APPLE_EASE = 'power4.out';
const APPLE_EASE_SPRING = 'back.out(1.4)';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

function ensureAmbientLayer() {
  if (document.querySelector('.apple-ambient')) return;

  const wrap = document.createElement('div');
  wrap.className = 'apple-ambient';
  wrap.setAttribute('aria-hidden', 'true');
  ['a', 'b', 'c'].forEach((id) => {
    const orb = document.createElement('div');
    orb.className = `apple-ambient__orb apple-ambient__orb--${id}`;
    orb.dataset.appleOrb = id;
    wrap.appendChild(orb);
  });
  document.body.prepend(wrap);
}

function setupPageIntro() {
  document.documentElement.classList.add('apple-page-loading');

  const curtain = document.createElement('div');
  curtain.className = 'apple-page-curtain';
  document.body.appendChild(curtain);

  const tl = gsap.timeline({
    onComplete: () => {
      curtain.remove();
      document.documentElement.classList.remove('apple-page-loading');
    },
  });

  tl.fromTo(
    curtain,
    { scaleY: 1, opacity: 1 },
    { scaleY: 0, opacity: 0, duration: 0.9, ease: APPLE_EASE, transformOrigin: 'center top' }
  ).fromTo(
    document.body,
    { opacity: 0.92 },
    { opacity: 1, duration: 0.5, ease: 'power2.out' },
    0.15
  );

  return () => {
    tl.kill();
    curtain.remove();
    document.documentElement.classList.remove('apple-page-loading');
  };
}

function setupAmbientOrbs() {
  ensureAmbientLayer();
  const orbs = gsap.utils.toArray('[data-apple-orb]');
  const tweens = orbs.map((orb, i) =>
    gsap.to(orb, {
      x: i === 0 ? 48 : i === 1 ? -40 : 24,
      y: i === 0 ? 32 : i === 1 ? -28 : -18,
      duration: 14 + i * 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  );

  return () => tweens.forEach((t) => t.kill());
}

function setupSectionHeaderReveals() {
  const headers = gsap.utils.toArray('main section[id] header');
  const timelines = [];

  headers.forEach((header) => {
    header.classList.add('apple-header-reveal');
    const divider = header.querySelector('.liquid-divider');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 88%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    tl.from(
      header,
      {
        y: 56,
        opacity: 0,
        filter: 'blur(14px)',
        duration: 1.05,
        ease: APPLE_EASE,
        clearProps: 'filter',
      },
      0
    );

    if (divider) {
      tl.from(
        divider,
        { scaleX: 0, opacity: 0, duration: 0.85, ease: APPLE_EASE_SPRING },
        0.12
      );
      divider.classList.add('apple-scroll-line');
    }

    timelines.push(tl);
  });

  return () => timelines.forEach((tl) => tl.kill());
}

function setupCardScrollReveals() {
  const cards = gsap.utils.toArray(
    'main section[id]:not(#home) .liquid-panel-interactive, main section[id]:not(#home) .spotlight-card, #experience article'
  );
  const seen = new Set();
  const unique = cards.filter((el) => {
    if (seen.has(el)) return false;
    seen.add(el);
    return true;
  });

  const tweens = unique.map((card, index) =>
    gsap.from(card, {
      y: 40,
      opacity: 0,
      scale: 0.96,
      filter: 'blur(8px)',
      duration: 0.95,
      ease: APPLE_EASE,
      clearProps: 'filter',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none',
        once: true,
      },
      delay: (index % 4) * 0.06,
    })
  );

  return () => tweens.forEach((t) => t.kill());
}

function setupHeroScrollParallax() {
  const home = document.getElementById('home');
  if (!home) return () => {};

  const hero = home.querySelector('.w3d-hero-wrapper');
  const title = home.querySelector('h1');
  const stats = gsap.utils.toArray('#home .liquid-panel, #home .liquid-panel-strong');

  stats.forEach((el) => el.classList.add('apple-stat-card'));
  if (hero) hero.classList.add('apple-hero-float');

  const tweens = [];

  if (hero) {
    tweens.push(
      gsap.to(hero, {
        y: -48,
        ease: 'none',
        scrollTrigger: { trigger: home, start: 'top top', end: 'bottom top', scrub: 1.2 },
      })
    );
  }

  if (title) {
    tweens.push(
      gsap.to(title, {
        y: -24,
        opacity: 0.55,
        ease: 'none',
        scrollTrigger: { trigger: home, start: 'top top', end: 'center top', scrub: 1 },
      })
    );
  }

  stats.forEach((card, i) => {
    tweens.push(
      gsap.fromTo(
        card,
        { y: 0 },
        {
          y: -12 - i * 6,
          ease: 'none',
          scrollTrigger: { trigger: home, start: 'top top', end: 'bottom top', scrub: 1.4 + i * 0.1 },
        }
      )
    );
  });

  return () => tweens.forEach((t) => t.kill());
}

function setupTitleShimmer() {
  const titles = gsap.utils.toArray('.liquid-title');
  titles.forEach((el) => el.classList.add('apple-shimmer-title'));

  const triggers = titles.map((title) =>
    ScrollTrigger.create({
      trigger: title,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        title.classList.add('is-shimmer-active');
        window.setTimeout(() => title.classList.remove('is-shimmer-active'), 1200);
      },
    })
  );

  return () => triggers.forEach((t) => t.kill());
}

function setupCardTilt() {
  if (isTouchDevice()) return () => {};

  const cards = gsap.utils.toArray('.liquid-panel-interactive, .spotlight-card');
  const cleanups = [];

  cards.forEach((card) => {
    if (card.closest('#home')) return;

    card.classList.add('apple-tilt');
    const glow = document.createElement('div');
    glow.className = 'apple-tilt-glow';
    if (!card.style.position) card.style.position = 'relative';
    card.prepend(glow);

    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * -8;
        const ry = ((x / rect.width) - 0.5) * 10;
        card.style.setProperty('--apple-tilt-x', `${x}px`);
        card.style.setProperty('--apple-tilt-y', `${y}px`);
        gsap.to(card, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 900,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: true,
        });
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.65,
        ease: APPLE_EASE_SPRING,
        overwrite: true,
      });
    };

    card.addEventListener('mousemove', onMove, { passive: true });
    card.addEventListener('mouseleave', onLeave, { passive: true });
    cleanups.push(() => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      glow.remove();
      card.classList.remove('apple-tilt');
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

function connectLenis(lenis) {
  if (!lenis) return () => {};
  const onScroll = () => ScrollTrigger.update();
  lenis.on('scroll', onScroll);
  return () => lenis.off('scroll', onScroll);
}

export function initAppleAnimations(lenis) {
  if (prefersReducedMotion()) return () => {};

  gsap.registerPlugin(ScrollTrigger);

  const cleanups = [
    connectLenis(lenis),
    setupPageIntro(),
    setupAmbientOrbs(),
    setupSectionHeaderReveals(),
    setupCardScrollReveals(),
    setupHeroScrollParallax(),
    setupTitleShimmer(),
    setupCardTilt(),
  ];

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    cleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
