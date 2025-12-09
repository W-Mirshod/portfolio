import { useState, useEffect, useRef } from 'react';
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
    'Mirshod Qayimov - Backend + AI Engineer',
    '',
    '> current_status',
    'Building TAFFI.AI, 99.7% uptime',
    '',
    '> stack --primary',
    'FastAPI • Django • PostgreSQL • Redis • Docker • AWS',
    '',
    '> expertise',
    'Backend APIs | AI Integration | DevOps & Cloud',
    '',
    '> availability',
    '🟢 Open for contracts',
    '',
    '> _'
  ];
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [typed, setTyped] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const terminalScrollRef = useRef(null);

  // Auto-scroll function that forces terminal to bottom
  const scrollToBottom = () => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTo({
        top: terminalScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (currentLine >= terminalLines.length) return;
    if (terminalLines[currentLine].startsWith('>')) {
      setIsAnimating(true);
      if (typed.length < terminalLines[currentLine].length) {
        const timeout = setTimeout(() => {
          setTyped(terminalLines[currentLine].slice(0, typed.length + 1));
          // Auto-scroll on every character typed
          scrollToBottom();
        }, 32);
        return () => clearTimeout(timeout);
      } else {
        setIsAnimating(false);
        const timeout = setTimeout(() => {
          setTerminalHistory((h) => [...h, terminalLines[currentLine]]);
          setTyped('');
          setCurrentLine((l) => (l + 1) % terminalLines.length);
          // Auto-scroll when line is complete
          scrollToBottom();
        }, 160);
        return () => clearTimeout(timeout);
      }
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => {
        setTerminalHistory((h) => [...h, terminalLines[currentLine]]);
        setTyped('');
        setCurrentLine((l) => (l + 1) % terminalLines.length);
        // Auto-scroll when output line is complete
        scrollToBottom();
      }, 96);
      return () => clearTimeout(timeout);
    }
  }, [typed, currentLine, terminalLines]);

  // Additional effect to ensure scroll on history changes
  useEffect(() => {
    scrollToBottom();
  }, [terminalHistory]);

  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-10 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20">
      {enableEffects && (
        <ParallaxBackground className="absolute inset-0">
          <div className="absolute inset-0 w-full h-full bg-bg-secondary/30" />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-transparent to-bg-secondary/20" />
        </ParallaxBackground>
      )}
      {!enableEffects && (
        <div className="absolute inset-0 w-full h-full bg-bg-secondary/30" />
      )}

      <div className="relative flex flex-col justify-center items-center w-full h-full max-w-7xl mx-auto z-10 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-white/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center w-full space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 px-4 sm:px-6 md:px-8">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm text-white/90 font-medium shadow-lg layered-entrance">
              <i className="fas fa-code text-xs text-white/70" />
              <span>{t('hero.badge')}</span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent layered-entrance px-2" style={{ animationDelay: '0.1s' }}>
                Mirshod Qayimov
              </h1>

              <div className="flex items-center justify-center min-h-[2.5rem] sm:min-h-[2.75rem] md:min-h-10 w-full layered-entrance px-2" style={{ animationDelay: '0.2s' }}>
                <div className="font-semibold text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide" id="typing-text">
                  {typingText}
                </div>
                <span className="font-bold text-white text-base sm:text-lg md:text-xl lg:text-2xl animate-blink ml-1.5 sm:ml-2 inline-block w-0.5 sm:w-1 h-5 sm:h-6 md:h-7 bg-white rounded-sm"></span>
              </div>
            </div>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl leading-relaxed layered-entrance px-4" style={{ animationDelay: '0.3s' }}>
              {t('hero.subtitle')}
            </p>

            <div className="w-full flex justify-center layered-entrance max-w-full" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-xl w-full max-w-2xl p-3 sm:p-4 text-left text-green-400 font-mono text-xs sm:text-sm overflow-hidden shadow-2xl terminal-glow min-h-[8rem] sm:min-h-[9rem] md:h-32 lg:h-36 flex flex-col">
                <div className="flex items-center gap-2 mb-2 sm:mb-3 pb-2 border-b border-white/10 flex-shrink-0">
                  <div className="flex gap-1 sm:gap-1.5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-400">terminal</span>
                </div>
                <div ref={terminalScrollRef} className="terminal-scroll-container space-y-0.5 sm:space-y-1 flex-1 overflow-y-auto pr-1">
                  {terminalHistory.slice(-3).map((line, idx) => (
                    <div key={idx} className="opacity-80 hover:opacity-100 transition-opacity duration-200 text-[10px] sm:text-xs break-words">{line}</div>
                  ))}
                  {currentLine < terminalLines.length && (
                    <div className="text-green-300 text-[10px] sm:text-xs break-words">
                      {typed}
                      <span className="animate-blink text-green-300 font-bold inline-block w-0.5 sm:w-1 h-3 sm:h-4 bg-green-300 rounded-sm ml-0.5"></span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center w-full px-1 sm:px-2 flex-shrink-0">
              <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-14 gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 layered-entrance w-full max-w-6xl mx-auto" style={{ animationDelay: '0.6s' }}>
              {techStackData.map((tech, index) => (
                <div
                  key={tech.name}
                  className="group flex flex-col items-center gap-1 sm:gap-1.5 bg-white/5 backdrop-blur-sm border border-white/10 p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 sm:hover:scale-110 hover:bg-white/8 hover:border-white/20 hover:shadow-xl hover:shadow-primary/5 tech-hover"
                  title={tech.name}
                  style={{ animationDelay: `${0.7 + (index * 0.02)}s` }}
                >
                  <LazyImage
                    src={tech.img}
                    alt={tech.name}
                    width="40"
                    height="40"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 object-contain transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2IiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+Cg=="
                  />
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 font-medium hidden sm:block group-hover:text-white transition-colors duration-300 text-center leading-tight">
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