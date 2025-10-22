import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { initializeAudio } from '../../utils/audio';
import ParallaxBackground from '../ui/ParallaxBackground';
import LazyImage from '../ui/LazyImage';
import techStackData from '../../data/techStack.json';

const Home = () => {
  const { t } = useTranslation();
  const [typingText, setTypingText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingTexts = t('hero.typingTexts', { returnObjects: true });
  
  // Conditional effects for better performance
  const enableEffects = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
    window.matchMedia('(min-width: 768px)').matches;

  useEffect(() => {
    const typeSpeed = isDeleting ? 80 : 140;
    const currentText = typingTexts[currentIndex];

    if (!isDeleting && typingText === currentText) {
      setTimeout(() => setIsDeleting(true), 1200);
      return;
    }

    if (isDeleting && typingText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setTypingText(prev => {
        if (isDeleting) {
          return currentText.substring(0, prev.length - 1);
        } else {
          return currentText.substring(0, prev.length + 1);
        }
      });
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, currentIndex, typingTexts]);

  useEffect(() => {
    // Load audio after first user interaction
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const cleanup = initializeAudio('/warm-ambient-sound.mp3', 0.5);
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, []);

  const terminalLines = [
    '> whoami',
    'w mirshod',
    '> skills',
    'Backend: Python, Django, Flask, FastAPI, REST APIs, WebSockets, Celery, PyGame',
    'Frontend: JavaScript, React, Vite, Tailwind, HTML5, CSS3, SCSS',
    'DevOps: AWS, Docker, Linux, Git, GitHub Actions, CI/CD, Nginx, Apache',
    'Databases: PostgreSQL, MySQL, SQLite, Redis',
    'AI: Azure APIs, AI APIs, GPT-Neo',
    '> projects',
    'Yaklabs IoT Platform, Texnomart API, Online Shopping Platform, Online Course Platform, Hospital Management System, GPT-Neo AI',
    '> stack',
    'Python, Django, Flask, FastAPI, React, Vite, Tailwind, AWS, Docker, Linux, Git, PostgreSQL, MySQL, SQLite, Redis, Pytest, Celery, Swagger, Postman, Azure APIs',
    '> show project Yaklabs IoT Platform',
    'Innovative platform for IoT device management and data analytics with real-time capabilities.',
    '> show project Texnomart API',
    'Comprehensive API for online shopping website with full e-commerce functionality.',
    '> show project Online Shopping Platform',
    'Micro-service architecture e-shopping platform with modern design and scalable backend.',
    '> show project Online Course Platform',
    "E-Courses platform including teacher's and blog's own section with comprehensive features.",
    '> show project Hospital Management System',
    'Platform for hospitals where patients and doctors have their pages with patient records and departments.',
    '> show project GPT-Neo AI',
    'Basic Artificial Intelligence implementation running on local machine with advanced capabilities.',
    '> _'
  ];
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [typed, setTyped] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentLine >= terminalLines.length) return;
    if (terminalLines[currentLine].startsWith('>')) {
      setIsAnimating(true);
      if (typed.length < terminalLines[currentLine].length) {
        const timeout = setTimeout(() => {
          setTyped(terminalLines[currentLine].slice(0, typed.length + 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setIsAnimating(false);
        const timeout = setTimeout(() => {
          setTerminalHistory((h) => [...h, terminalLines[currentLine]]);
          setTyped('');
          setCurrentLine((l) => (l + 1) % terminalLines.length);
          const terminalDiv = document.querySelector('.bg-\\[\\#10151f\\]');
          if (terminalDiv) terminalDiv.scrollTop = terminalDiv.scrollHeight;
        }, 200);
        return () => clearTimeout(timeout);
      }
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => {
        setTerminalHistory((h) => [...h, terminalLines[currentLine]]);
        setTyped('');
        setCurrentLine((l) => (l + 1) % terminalLines.length);
        const terminalDiv = document.querySelector('.bg-\\[\\#10151f\\]');
        if (terminalDiv) terminalDiv.scrollTop = terminalDiv.scrollHeight;
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [typed, currentLine, terminalLines]);

  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen h-screen w-full overflow-hidden pt-16 sm:pt-20 xl:pt-10 xl:sm:pt-12">
      {enableEffects && (
        <ParallaxBackground className="absolute inset-0">
          <div className="absolute inset-0 w-full h-full bg-bg-secondary/30" />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-transparent to-bg-secondary/20" />
        </ParallaxBackground>
      )}
      {!enableEffects && (
        <div className="absolute inset-0 w-full h-full bg-bg-secondary/30" />
      )}

      <div className="relative flex flex-col justify-center items-center w-full h-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 z-10">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto h-full py-4 sm:py-6 md:py-8 relative">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center w-full space-y-4 sm:space-y-6">
            {/* Professional Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm text-white/90 font-medium shadow-lg layered-entrance">
              <i className="fas fa-code text-xs text-white/70" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Modern Typography */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent layered-entrance" style={{ animationDelay: '0.1s' }}>
                Mirshod Qayimov
              </h1>

              <div className="flex items-center justify-center min-h-10 w-full layered-entrance" style={{ animationDelay: '0.2s' }}>
                <div className="font-semibold text-white/80 text-lg md:text-xl tracking-wide subtle-bounce" id="typing-text">
                  {typingText}
                </div>
                <span className="font-normal text-white/80 text-lg md:text-xl animate-blink ml-1">|</span>
              </div>
            </div>

            {/* Professional Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed layered-entrance" style={{ animationDelay: '0.3s' }}>
              {t('hero.subtitle')}
            </p>

            {/* Modern CTA Button */}
            <a href="#contact" className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] relative overflow-hidden layered-entrance modern-glow gradient-shift" style={{ animationDelay: '0.4s' }}>
              <span className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500 to-blue-700" />
              <i className="fas fa-envelope z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="z-10">{t("Get In Touch")}</span>
            </a>

            {/* Compact Terminal */}
            <div className="w-full flex justify-center layered-entrance" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-xl w-full max-w-2xl p-4 text-left text-green-400 font-mono text-sm overflow-hidden shadow-2xl terminal-glow">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-400">terminal</span>
                </div>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {terminalHistory.slice(-3).map((line, idx) => (
                    <div key={idx} className="opacity-80 hover:opacity-100 transition-opacity duration-200 text-xs">{line}</div>
                  ))}
                  {currentLine < terminalLines.length && (
                    <div className="text-green-300 text-xs">{typed}<span className="animate-blink text-green-300">|</span></div>
                  )}
                </div>
              </div>
            </div>

            {/* Modern Tech Stack Grid */}
            <div className="flex justify-center items-center w-full px-2">
              <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 lg:grid-cols-18 xl:grid-cols-22 2xl:grid-cols-26 gap-1.5 sm:gap-2 md:gap-2.5 layered-entrance max-w-full" style={{ animationDelay: '0.6s' }}>
              {techStackData.map((tech, index) => (
                <div
                  key={tech.name}
                  className="group flex flex-col items-center gap-1.5 bg-white/5 backdrop-blur-sm border border-white/10 p-2.5 sm:p-3 md:p-3.5 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 sm:hover:scale-110 hover:bg-white/8 hover:border-white/20 hover:shadow-xl hover:shadow-primary/5 tech-hover"
                  title={tech.name}
                  style={{ animationDelay: `${0.7 + (index * 0.02)}s` }}
                >
                  <LazyImage
                    src={tech.img}
                    alt={tech.name}
                    width="40"
                    height="40"
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 object-contain transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2IiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+Cg=="
                  />
                  <span className="text-xs text-gray-300 font-medium hidden md:block group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;