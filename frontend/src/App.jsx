import { useEffect } from 'react';
import './App.css';
import './components/styles/SectionsCommon.css';
import './utils/i18n';
import { Routes, Route } from "react-router-dom";
import LazySection from './components/ui/LazySection';
import GoToTop from './components/ui/GoToTop';

// Import critical components immediately
import Header from './components/sections/Header';
import Home from './components/sections/Home';
import Footer from './components/sections/Footer';

// Lazy load non-critical sections for code splitting
const Experience = () => import('./components/sections/Experience');
const Skills = () => import('./components/sections/Skills');
const Achievements = () => import('./components/sections/Achievements');
const Certificate = () => import('./components/sections/Certificate');
const Projects = () => import('./components/sections/Projects');

// Load Font Awesome CSS (much lighter than the JS bundle)
const loadFontAwesome = () => {
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const inject = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      link.media = 'print';
      link.onload = () => { link.media = 'all'; };
      document.head.appendChild(link);
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(inject, { timeout: 2000 });
    } else {
      setTimeout(inject, 1500);
    }
  }
};

const shouldEnableSmoothScroll = () => (
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
  window.matchMedia('(min-width: 1024px)').matches
);

// Skeleton loading component
const SectionSkeleton = ({ height = 'h-64' }) => (
  <div className={`liquid-panel rounded-lg ${height} flex items-center justify-center relative overflow-hidden`}>
    <div className="absolute inset-0 shimmer"></div>
    <div className="text-blue-100/70 text-sm relative z-10">Loading...</div>
  </div>
);

function App() {
  useEffect(() => {
    loadFontAwesome();

    if (!shouldEnableSmoothScroll()) {
      return undefined;
    }

    let isUnmounted = false;
    let lenisInstance = null;
    let gsapInstance = null;
    let tickerCallback = null;

    const setupSmoothScroll = async () => {
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);

        if (isUnmounted) {
          return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        window.lenis = lenis;
        lenis.on('scroll', ScrollTrigger.update);

        tickerCallback = (time) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        lenisInstance = lenis;
        gsapInstance = gsap;
      } catch {
        delete window.lenis;
      }
    };

    setupSmoothScroll();

    return () => {
      isUnmounted = true;
      if (gsapInstance && tickerCallback) {
        gsapInstance.ticker.remove(tickerCallback);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      delete window.lenis;
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Home />
              <LazySection loader={Experience} fallback={<SectionSkeleton height="h-80" />} minHeight="20rem" />
              <LazySection loader={Skills} fallback={<SectionSkeleton height="h-72" />} minHeight="18rem" />
              <LazySection loader={Achievements} fallback={<SectionSkeleton height="h-64" />} minHeight="16rem" />
              <LazySection loader={Certificate} fallback={<SectionSkeleton height="h-64" />} minHeight="16rem" />
              <LazySection loader={Projects} fallback={<SectionSkeleton height="h-96" />} minHeight="24rem" />
            </main>
            <Footer />
          </>
        } />
      </Routes>
      
      {/* Go to Top Button */}
      <GoToTop />
    </>
  );
}

// Export utility functions for components
export { loadFontAwesome };

export default App
