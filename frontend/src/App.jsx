import { useEffect } from 'react';
import './App.css';
import './components/styles/SectionsCommon.css';
import './utils/i18n';
import { Routes, Route } from "react-router-dom";
import LazySection from './components/ui/LazySection';
import GoToTop from './components/ui/GoToTop';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

// Optimized Font Awesome loading with idle callback
const loadFontAwesome = () => {
  if (!document.querySelector('script[src*="font-awesome"]')) {
    const inject = () => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(inject, { timeout: 3000 });
    } else {
      setTimeout(inject, 2000);
    }
  }
};

// Skeleton loading component
const SectionSkeleton = ({ height = 'h-64' }) => (
  <div className={`bg-gray-800/50 rounded-lg ${height} flex items-center justify-center relative overflow-hidden`}>
    <div className="absolute inset-0 shimmer"></div>
    <div className="text-gray-600 text-sm relative z-10">Loading...</div>
  </div>
);

function App() {
  useEffect(() => {
    loadFontAwesome();

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

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
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
