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
    const cleanupAudio = initializeAudio('/warm-ambient-sound.mp3', 0.5);
    return cleanupAudio;
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
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen h-screen w-full overflow-hidden pt-10 sm:pt-12">
      <ParallaxBackground className="absolute inset-0">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0a101a] via-[#1a2633] to-[#008080] opacity-80" />
      </ParallaxBackground>

      <div className="relative flex flex-col justify-center items-center w-full h-full max-w-7xl mx-auto px-2 sm:px-4 z-10">
        <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto h-full py-4 sm:py-6">
          <div className="flex flex-col items-center justify-center text-center w-full">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-2xl mb-4 text-xs text-primary font-medium layered-entrance">
              <i className="fas fa-code" />
              <span>{t('hero.badge')}</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent layered-entrance" style={{ animationDelay: '0.1s' }}>
              {"Mirshod Qayimov"}
            </h1>

            <div className="flex items-center justify-center mb-2 min-h-8 w-full layered-entrance" style={{ animationDelay: '0.2s' }}>
              <div className="font-semibold text-primary text-base md:text-lg tracking-wide" id="typing-text">
                {typingText}
              </div>
              <span className="font-normal text-primary text-base md:text-lg animate-blink">|</span>
            </div>

            <p className="text-xs sm:text-base md:text-lg text-text-secondary my-3 sm:my-4 max-w-md layered-entrance" style={{ animationDelay: '0.3s' }}>
              {t('hero.subtitle')}
            </p>

            <a href="#contact" className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 rounded-full font-semibold text-base bg-gradient-to-r from-primary to-primary-dark text-white border-2 border-transparent shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(63,162,246,0.4)] relative overflow-hidden mb-6 layered-entrance depth-pulse" style={{ animationDelay: '0.4s' }}>
              <span className="absolute inset-0 z-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(63,162,246,0.2) 0%, transparent 80%)' }} />
              <i className="fas fa-envelope z-10 transition-transform duration-300 hover:scale-110" />
              <span className="z-10">{t("Get In Touch")}</span>
            </a>

            <div className="w-full flex justify-center mb-6 sm:mb-8 layered-entrance" style={{ animationDelay: '0.5s' }}>
              <div className="bg-[#10151f]/90 backdrop-blur-md border border-[#222c3a] rounded-lg w-full max-w-xl p-3 sm:p-4 text-left text-green-400 font-mono text-xs sm:text-sm overflow-y-auto shadow-lg" style={{ height: 90 }}>
                <div className="flex flex-col justify-end" style={{ height: '100%' }}>
                  {terminalHistory.map((line, idx) => (
                    <div key={idx} className="opacity-80 hover:opacity-100 transition-opacity duration-200">{line}</div>
                  ))}
                  {currentLine < terminalLines.length && (
                    <div className="text-green-300">{typed}<span className="animate-blink text-green-300">|</span></div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center layered-entrance" style={{ animationDelay: '0.6s' }}>
              {techStackData.map((tech, index) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-text-primary transition-all duration-300 cursor-pointer hover:scale-110 hover:bg-white/10 hover:shadow-[0_4px_15px_rgba(255,255,255,0.1)] depth-pulse"
                  title={tech.name}
                  style={{ animationDelay: `${0.7 + (index * 0.05)}s` }}
                >
                  <LazyImage
                    src={tech.img}
                    alt={tech.name}
                    width="24"
                    height="24"
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain transition-transform duration-300 hover:rotate-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;