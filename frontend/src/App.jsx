import { useEffect, Suspense, lazy } from 'react';
import './App.css';
import './components/styles/SectionsCommon.css';
import './utils/i18n';
import { Routes, Route } from "react-router-dom";
import performanceMonitor from './utils/performanceMonitor';
import PerformanceMonitor from './components/ui/PerformanceMonitor';

// Import critical components immediately
import Header from './components/sections/Header';
import Home from './components/sections/Home';
import Footer from './components/sections/Footer';

// Lazy load non-critical sections for code splitting
const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Achievements = lazy(() => import('./components/sections/Achievements'));
const Certificate = lazy(() => import('./components/sections/Certificate'));
const Projects = lazy(() => import('./components/sections/Projects'));

// Optimized Font Awesome loading with facade pattern
const loadFontAwesome = () => {
  if (!document.querySelector('script[src*="font-awesome"]')) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      performanceMonitor.markUserInteraction('fontawesome-loaded');
      performanceMonitor.measureUserInteraction('fontawesome-loaded');
    };
    document.body.appendChild(script);
  }
};

// Skeleton loading component
const SectionSkeleton = ({ height = 'h-64' }) => (
  <div className={`animate-pulse bg-gray-800 rounded-lg ${height} flex items-center justify-center`}>
    <div className="text-gray-600 text-sm">Loading...</div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.markUserInteraction('app-start');
    
    // Load Font Awesome after initial render
    const timeoutId = setTimeout(() => {
      loadFontAwesome();
    }, 100);
    
    // Mark app initialization complete
    performanceMonitor.markUserInteraction('app-initialized');
    performanceMonitor.measureUserInteraction('app-initialized');
    
    return () => {
      clearTimeout(timeoutId);
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
              <Suspense fallback={<SectionSkeleton height="h-96" />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionSkeleton height="h-80" />}>
                <Experience />
              </Suspense>
              <Suspense fallback={<SectionSkeleton height="h-72" />}>
                <Skills />
              </Suspense>
              <Suspense fallback={<SectionSkeleton height="h-64" />}>
                <Achievements />
              </Suspense>
              <Suspense fallback={<SectionSkeleton height="h-64" />}>
                <Certificate />
              </Suspense>
              <Suspense fallback={<SectionSkeleton height="h-96" />}>
                <Projects />
              </Suspense>
            </main>
            <Footer />
          </>
        } />
      </Routes>
      
      {/* Performance Monitor (dev only) */}
      <PerformanceMonitor />
    </>
  );
}

// Export utility functions for components
export { loadFontAwesome };

export default App
