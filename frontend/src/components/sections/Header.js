import i18n from '../../utils/i18n.js';
import {
  iconHome,
  iconBriefcase,
  iconCode,
  iconTrophy,
  iconProjectDiagram,
  iconEnvelope,
} from '../ui/Icons.js';
import '../styles/menu-futuristic.css';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'ru', name: 'Russian' },
];

const LANG_DISPLAY = { en: 'EN', uz: 'UZ', ru: 'RU' };
const getLanguageDisplay = (c) => LANG_DISPLAY[c] || String(c || '').toUpperCase();

const SECTIONS = ['home', 'experience', 'skills', 'proof', 'projects', 'contact'];

function getNavItems() {
  return [
    { href: '#home', key: 'home', label: i18n.t('navigation.home'), icon: iconHome('18') },
    { href: '#experience', key: 'experience', label: i18n.t('navigation.experience'), icon: iconBriefcase('18') },
    { href: '#skills', key: 'skills', label: i18n.t('navigation.skills'), icon: iconCode('18') },
    { href: '#proof', key: 'proof', label: i18n.t('navigation.proof'), icon: iconTrophy('18') },
    { href: '#projects', key: 'projects', label: i18n.t('navigation.projects'), icon: iconProjectDiagram('18') },
    { href: '#contact', key: 'contact', label: i18n.t('navigation.contact'), icon: iconEnvelope('18') },
  ];
}

function buildHeaderMarkup(activeKey, currentLang) {
  const navItems = getNavItems();

  const desktopLinks = navItems
    .map(
      (item) => `
        <a class="top-nav-link${activeKey === item.key ? ' is-active' : ''}" href="${item.href}" data-key="${item.key}" aria-label="Navigate to ${item.label} section"${activeKey === item.key ? ' aria-current="page"' : ''}>
          <span class="top-nav-link-icon" aria-hidden="true">${item.icon}</span>
          <span class="top-nav-link-label">${item.label}</span>
        </a>`
    )
    .join('');

  const langOptions = LANGUAGES.map(
    (lang) => `
      <button class="top-nav-lang-option${currentLang === lang.code ? ' is-selected' : ''}" data-lang="${lang.code}" role="menuitem" aria-selected="${currentLang === lang.code}" aria-label="Switch to ${lang.name}">
        <span class="top-nav-lang-option-code">${getLanguageDisplay(lang.code)}</span>
        <span class="top-nav-lang-option-name">${lang.name}</span>
      </button>`
  ).join('');

  const sheetLinks = navItems
    .map(
      (item) => `
        <a class="top-nav-sheet-link${activeKey === item.key ? ' is-active' : ''}" href="${item.href}" data-key="${item.key}" aria-label="Navigate to ${item.label} section"${activeKey === item.key ? ' aria-current="page"' : ''}>
          <span class="top-nav-sheet-icon" aria-hidden="true">${item.icon}</span>
          <span class="top-nav-sheet-label">${item.label}</span>
        </a>`
    )
    .join('');

  const header = `
    <header id="top-nav" class="top-nav" role="banner" aria-label="Primary" data-active="${activeKey}" data-lang="${currentLang}">
      <div class="top-nav-surface" aria-hidden="true"></div>
      <div class="top-nav-inner">
        <a href="#home" class="top-nav-brand" aria-label="Go to home section">
          <span class="top-nav-brand-mark" aria-hidden="true">M<span class="top-nav-brand-dot">.</span></span>
          <span class="top-nav-brand-name nav-logo-display">Mirshod</span>
        </a>
        <nav class="top-nav-rail" aria-label="Main navigation">
          <span class="top-nav-pill" aria-hidden="true"></span>
          ${desktopLinks}
        </nav>
        <div class="top-nav-actions">
          <div class="top-nav-lang" data-open="false">
            <button type="button" class="top-nav-lang-btn" aria-haspopup="menu" aria-expanded="false" aria-label="Current language: ${getLanguageDisplay(currentLang)}. Change language">
              <span class="top-nav-lang-code">${getLanguageDisplay(currentLang)}</span>
              <svg class="top-nav-lang-caret" viewBox="0 0 12 8" width="10" height="8" aria-hidden="true"><path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="top-nav-lang-menu" role="menu" aria-label="Language selection">${langOptions}</div>
          </div>
          <button type="button" class="top-nav-toggle liquid-menu-toggle" aria-expanded="false" aria-controls="topNavSheet" aria-label="Toggle navigation menu">
            <span class="liquid-menu-toggle-line line-1" aria-hidden="true"></span>
            <span class="liquid-menu-toggle-line line-2" aria-hidden="true"></span>
            <span class="liquid-menu-toggle-line line-3" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>
    <div id="topNavSheet" class="top-nav-sheet" aria-hidden="true" data-open="false">
      <div class="top-nav-sheet-backdrop" aria-hidden="true"></div>
      <nav class="top-nav-sheet-panel" aria-label="Mobile navigation">
        <div class="top-nav-sheet-surface" aria-hidden="true"></div>
        <div class="top-nav-sheet-inner">
          ${sheetLinks}
        </div>
      </nav>
    </div>
  `;

  return header;
}

function scrollToSection(href) {
  const el = document.querySelector(href);
  if (!el) return;
  if (window.lenis) {
    window.lenis.scrollTo(href, { duration: 1.1, offset: -72 });
  } else {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function initController(headerEl, sheetEl) {
  if (!headerEl || headerEl.dataset.ready === 'true') return;
  headerEl.dataset.ready = 'true';

  const rail = headerEl.querySelector('.top-nav-rail');
  const pill = headerEl.querySelector('.top-nav-pill');
  const langRoot = headerEl.querySelector('.top-nav-lang');
  const langBtn = headerEl.querySelector('.top-nav-lang-btn');
  const langCode = headerEl.querySelector('.top-nav-lang-code');
  const langMenu = headerEl.querySelector('.top-nav-lang-menu');
  const toggleBtn = headerEl.querySelector('.top-nav-toggle');
  const desktopLinks = Array.from(headerEl.querySelectorAll('.top-nav-link'));
  const sheetLinks = sheetEl ? Array.from(sheetEl.querySelectorAll('.top-nav-sheet-link')) : [];

  let activeKey = headerEl.dataset.active || 'home';
  let sheetOpen = false;
  let langOpen = false;
  let pillRaf = 0;
  let condenseRaf = 0;
  let condensed = false;
  let lastFocused = null;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const saveData =
    typeof navigator !== 'undefined' &&
    navigator.connection &&
    (navigator.connection.saveData === true ||
      navigator.connection.effectiveType === 'slow-2g' ||
      navigator.connection.effectiveType === '2g');

  if (saveData) headerEl.classList.add('is-lite');
  if (prefersReducedMotion) headerEl.classList.add('is-reduced-motion');

  function moveActivePill(key, instant = false) {
    if (!rail || !pill) return;
    const target = desktopLinks.find((l) => l.dataset.key === key);
    if (!target) {
      pill.style.opacity = '0';
      return;
    }
    const rectRail = rail.getBoundingClientRect();
    const rectLink = target.getBoundingClientRect();
    const x = rectLink.left - rectRail.left;
    const w = rectLink.width;
    if (w <= 0) return;
    if (instant) {
      const prev = pill.style.transition;
      pill.style.transition = 'none';
      pill.style.transform = `translate3d(${x}px, 0, 0)`;
      pill.style.width = `${w}px`;
      pill.style.opacity = '1';
      void pill.offsetWidth;
      pill.style.transition = prev;
    } else {
      pill.style.transform = `translate3d(${x}px, 0, 0)`;
      pill.style.width = `${w}px`;
      pill.style.opacity = '1';
    }
  }

  function schedulePillMove(key, instant = false) {
    if (pillRaf) cancelAnimationFrame(pillRaf);
    pillRaf = requestAnimationFrame(() => {
      pillRaf = 0;
      moveActivePill(key, instant);
    });
  }

  function setActive(key) {
    if (!SECTIONS.includes(key)) return;
    activeKey = key;
    headerEl.dataset.active = key;
    desktopLinks.forEach((link) => {
      const isActive = link.dataset.key === key;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    sheetLinks.forEach((link) => {
      const isActive = link.dataset.key === key;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    schedulePillMove(key);
  }

  function openSheet() {
    if (sheetOpen || !sheetEl) return;
    sheetOpen = true;
    lastFocused = document.activeElement;
    document.body.classList.add('mobile-menu-open');
    sheetEl.dataset.open = 'true';
    sheetEl.setAttribute('aria-hidden', 'false');
    toggleBtn?.setAttribute('aria-expanded', 'true');
    toggleBtn?.classList.add('is-open');
    const first = sheetEl.querySelector('.top-nav-sheet-link');
    if (first && typeof first.focus === 'function') {
      setTimeout(() => first.focus({ preventScroll: true }), 60);
    }
  }

  function closeSheet() {
    if (!sheetOpen || !sheetEl) return;
    sheetOpen = false;
    document.body.classList.remove('mobile-menu-open');
    sheetEl.dataset.open = 'false';
    sheetEl.setAttribute('aria-hidden', 'true');
    toggleBtn?.setAttribute('aria-expanded', 'false');
    toggleBtn?.classList.remove('is-open');
    if (lastFocused && typeof lastFocused.focus === 'function') {
      try {
        lastFocused.focus({ preventScroll: true });
      } catch (_) {
        /* noop */
      }
    }
  }

  function toggleSheet() {
    if (sheetOpen) closeSheet();
    else openSheet();
  }

  function openLang() {
    if (langOpen || !langRoot) return;
    langOpen = true;
    langRoot.dataset.open = 'true';
    langBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeLang() {
    if (!langOpen || !langRoot) return;
    langOpen = false;
    langRoot.dataset.open = 'false';
    langBtn?.setAttribute('aria-expanded', 'false');
  }

  function toggleLang() {
    if (langOpen) closeLang();
    else openLang();
  }

  function onDocumentClick(ev) {
    if (langOpen && !ev.target.closest('.top-nav-lang')) closeLang();
  }

  function onDocumentKeydown(ev) {
    if (ev.key === 'Escape') {
      if (sheetOpen) {
        ev.stopPropagation();
        closeSheet();
      } else if (langOpen) {
        ev.stopPropagation();
        closeLang();
      }
    }
    if (sheetOpen && ev.key === 'Tab' && sheetEl) {
      const focusables = sheetEl.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (ev.shiftKey && document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    }
  }

  function onDesktopLinkClick(ev) {
    const link = ev.currentTarget;
    const href = link.getAttribute('href');
    ev.preventDefault();
    scrollToSection(href);
    closeLang();
  }

  function onSheetLinkClick(ev) {
    const link = ev.currentTarget;
    const href = link.getAttribute('href');
    ev.preventDefault();
    closeSheet();
    scrollToSection(href);
  }

  function onBrandClick(ev) {
    ev.preventDefault();
    scrollToSection('#home');
    closeSheet();
    closeLang();
  }

  function onLangOptionClick(ev) {
    const code = ev.currentTarget.dataset.lang;
    if (!code) return;
    i18n.changeLanguage(code);
    closeLang();
  }

  function setLanguageDisplay(lng) {
    headerEl.dataset.lang = lng;
    if (langCode) langCode.textContent = getLanguageDisplay(lng);
    langBtn?.setAttribute(
      'aria-label',
      `Current language: ${getLanguageDisplay(lng)}. Change language`
    );
    langRoot?.querySelectorAll('.top-nav-lang-option').forEach((btn) => {
      const selected = btn.dataset.lang === lng;
      btn.classList.toggle('is-selected', selected);
      btn.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
  }

  function refreshLabels() {
    const items = getNavItems();
    const byKey = Object.fromEntries(items.map((x) => [x.key, x]));
    desktopLinks.forEach((link) => {
      const key = link.dataset.key;
      const spec = byKey[key];
      if (!spec) return;
      const labelEl = link.querySelector('.top-nav-link-label');
      if (labelEl) labelEl.textContent = spec.label;
      link.setAttribute('aria-label', `Navigate to ${spec.label} section`);
    });
    sheetLinks.forEach((link) => {
      const key = link.dataset.key;
      const spec = byKey[key];
      if (!spec) return;
      const labelEl = link.querySelector('.top-nav-sheet-label');
      if (labelEl) labelEl.textContent = spec.label;
      link.setAttribute('aria-label', `Navigate to ${spec.label} section`);
    });
    schedulePillMove(activeKey, true);
  }

  function updateCondense() {
    condenseRaf = 0;
    const y = window.scrollY || window.pageYOffset || 0;
    const shouldCondense = y > 8;
    if (shouldCondense !== condensed) {
      condensed = shouldCondense;
      headerEl.classList.toggle('is-condensed', shouldCondense);
    }
  }

  function onScroll() {
    if (condenseRaf) return;
    condenseRaf = requestAnimationFrame(updateCondense);
  }

  function onResize() {
    schedulePillMove(activeKey, true);
  }

  const brand = headerEl.querySelector('.top-nav-brand');
  brand?.addEventListener('click', onBrandClick);
  desktopLinks.forEach((link) => link.addEventListener('click', onDesktopLinkClick));
  sheetLinks.forEach((link) => link.addEventListener('click', onSheetLinkClick));
  toggleBtn?.addEventListener('click', toggleSheet);
  langBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLang();
  });
  langMenu?.querySelectorAll('.top-nav-lang-option').forEach((btn) => {
    btn.addEventListener('click', onLangOptionClick);
  });
  sheetEl?.querySelector('.top-nav-sheet-backdrop')?.addEventListener('click', closeSheet);

  document.addEventListener('click', onDocumentClick, true);
  document.addEventListener('keydown', onDocumentKeydown);

  if (window.lenis && typeof window.lenis.on === 'function') {
    window.lenis.on('scroll', onScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  let io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (best && best.target?.id) setActive(best.target.id);
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: [0, 0.15, 0.3, 0.55, 0.8, 1],
      }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  } else {
    const fallback = () => {
      const y = window.scrollY + Math.max(160, window.innerHeight * 0.3);
      if (y < 120) {
        setActive('home');
        return;
      }
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && y >= el.offsetTop) {
          setActive(SECTIONS[i]);
          return;
        }
      }
    };
    window.addEventListener('scroll', fallback, { passive: true });
    fallback();
  }

  i18n.on('languageChanged', (lng) => {
    const base = String(lng || '').split('-')[0];
    setLanguageDisplay(base);
    refreshLabels();
  });

  setLanguageDisplay(i18n.language);
  schedulePillMove(activeKey, true);
  updateCondense();

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      headerEl.querySelector('.top-nav-surface')?.style.setProperty('will-change', 'auto');
    });
  }
}

export function hydrateHeader() {
  const header = document.getElementById('top-nav');
  const sheet = document.getElementById('topNavSheet');
  if (!header) return null;
  initController(header, sheet);
  return { header, sheet };
}

export default function createHeader() {
  const fragment = document.createDocumentFragment();
  const wrapper = document.createElement('div');
  wrapper.innerHTML = buildHeaderMarkup('home', i18n.language).trim();
  const nodes = Array.from(wrapper.children);
  nodes.forEach((n) => fragment.appendChild(n));

  queueMicrotask(() => {
    const header = document.getElementById('top-nav');
    const sheet = document.getElementById('topNavSheet');
    if (header) initController(header, sheet);
  });

  return fragment;
}
