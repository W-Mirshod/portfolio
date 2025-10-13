import { useEffect, Suspense, lazy } from 'react';
import './App.css';
import './components/styles/SectionsCommon.css';
import './utils/i18n';
import { Routes, Route } from "react-router-dom";

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
const Contact = lazy(() => import('./components/sections/Contact'));

// Load scripts only when needed
const loadFontAwesome = () => {
  if (!document.querySelector('script[src*="font-awesome"]')) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
    script.async = true;
    document.body.appendChild(script);
  }
};

const loadRecaptcha = () => {
  if (!document.querySelector('script[src*="recaptcha"]')) {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
};

function App() {
  // Load Font Awesome immediately since it's used in the Home section
  useEffect(() => {
    loadFontAwesome();
    // reCAPTCHA will be loaded lazily by the Contact component when needed
  }, []);

  return (
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Home />
              <Suspense fallback={<div className="section-loading">Loading...</div>}>
                <About />
              </Suspense>
              <Suspense fallback={<div className="section-loading">Loading...</div>}>
                <Experience />
              </Suspense>
              <Suspense fallback={<div className="section-loading">Loading...</div>}>
                <Skills />
              </Suspense>
              <Suspense fallback={<div className="section-loading">Loading...</div>}>
                <Achievements />
              </Suspense>
              <Suspense fallback={<div className="section-loading">Loading...</div>}>
                <Certificate />
              </Suspense>
              <Suspense fallback={<div className="section-loading">Loading...</div>}>
                <Projects />
              </Suspense>
              <Suspense fallback={<div className="section-loading">Loading...</div>}>
                <Contact />
              </Suspense>
            </main>
            <Footer />
          </>
        } />
      </Routes>
  );
}

// Export utility functions for components
export { loadFontAwesome, loadRecaptcha };

export default App
