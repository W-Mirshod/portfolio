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
  <div className={`animate-pulse bg-gray-800 rounded-lg ${height} flex items-center justify-center`}>
    <div className="text-gray-600 text-sm">Loading...</div>
  </div>
);

function App() {
  useEffect(() => {
    // Load Font Awesome after initial render (idle callback)
    loadFontAwesome();
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
