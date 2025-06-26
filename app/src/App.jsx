import { useEffect } from 'react';
import './App.css';
import './components/styles/SectionsCommon.css';
import './utils/i18n';

// Import components
import Header from './components/sections/Header';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Achievements from './components/sections/Achievements';
import Certificate from './components/sections/Certificate';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

function App() {
  useEffect(() => {
    // Add Font Awesome script
    const fontAwesomeScript = document.createElement('script');
    fontAwesomeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
    fontAwesomeScript.async = true;
    document.body.appendChild(fontAwesomeScript);
    
    // Add reCAPTCHA script
    const recaptchaScript = document.createElement('script');
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
    recaptchaScript.async = true;
    recaptchaScript.defer = true;
    document.body.appendChild(recaptchaScript);

    return () => {
      document.body.removeChild(fontAwesomeScript);
      document.body.removeChild(recaptchaScript);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
        <Experience />
        <Skills />
        <Achievements />
        <Certificate />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App
