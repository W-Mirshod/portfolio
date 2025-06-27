import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { initializeAudio } from '../../utils/audio';
import { motion } from 'framer-motion';

const Home = () => {
  const { t } = useTranslation();
  const [typingText, setTypingText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingTexts = [
    "Backend Developer & AI Engineer",
    "Microservices & APIs Specialist", 
    "DevOps & Cloud Expert",
    "AI APIs Enthusiast",
    "Performance Optimization Expert",
    "Full-Stack Python Developer"
  ];

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentText = typingTexts[currentIndex];

    if (!isDeleting && typingText === currentText) {
      setTimeout(() => setIsDeleting(true), 2000);
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

  const techStack = [
    // Backend
    { name: 'Python', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Django', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
    { name: 'Flask', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    { name: 'FastAPI', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    // Frontend
    { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Vite', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    { name: 'Tailwind', img: 'https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg' },
    { name: 'HTML5', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    // Frontend cont.
    { name: 'CSS3', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'SCSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
    { name: 'PyGame', img: 'https://www.pygame.org/docs/_static/pygame_logo.png' },
    { name: 'Swagger/OpenAPI', img: 'https://icon.icepanel.io/Technology/svg/Swagger.svg' },
    // DevOps & Cloud
    { name: 'AWS', img: 'https://icon.icepanel.io/Technology/png-shadow-512/AWS.png' },
    { name: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Linux', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'Fedora', img: 'https://icon.icepanel.io/Technology/svg/Fedora.svg' },
    // DevOps cont.
    { name: 'Git', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub Codespaces', img: 'https://icon.icepanel.io/Technology/png-shadow-512/GitHub-Codespaces.png' },
    { name: 'GitLab', img: 'https://icon.icepanel.io/Technology/svg/GitLab.svg' },
    { name: 'Apache', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg' },
    // Databases
    { name: 'PostgreSQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'SQLite', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
    { name: 'Redis', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    // Utilities & Testing
    { name: 'Postman', img: 'https://icon.icepanel.io/Technology/svg/Postman.svg' },
    { name: 'Pytest', img: 'https://docs.pytest.org/en/latest/_static/pytest1.png' },
    { name: 'Celery', img: 'https://docs.celeryq.dev/en/stable/_static/celery_512.png' },
    { name: 'Azure APIs', img: 'https://icon.icepanel.io/Technology/svg/Azure.svg' },
  ];

  useEffect(() => {
    const cleanupAudio = initializeAudio('/warm-ambient-sound.mp3', 0.4);
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
    'E-Courses platform including teacher\'s and blog\'s own section with comprehensive features.',
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
        }, 22);
        return () => clearTimeout(timeout);
      } else {
        setIsAnimating(false);
        const timeout = setTimeout(() => {
          setTerminalHistory((h) => [...h, terminalLines[currentLine]]);
          setTyped('');
          setCurrentLine((l) => (l + 1) % terminalLines.length);
          const terminalDiv = document.querySelector('.bg-\\[\\#10151f\\]');
          if (terminalDiv) terminalDiv.scrollTop = terminalDiv.scrollHeight;
        }, 180);
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
      }, 70);
      return () => clearTimeout(timeout);
    }
  }, [typed, currentLine, terminalLines]);

  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen h-screen w-full overflow-hidden pt-12">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0a101a] via-[#1a2633] to-[#008080] opacity-90 animate-gradient-move" style={{ zIndex: 0 }} />
      </div>
      <div className="relative flex flex-col justify-center items-center w-full h-full max-w-7xl mx-auto px-2 sm:px-4 z-10">
        <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto h-full py-6">
          <div className="flex flex-col items-center justify-center text-center w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-2xl mb-4 text-xs text-primary font-medium animate-fadeInUp">
              <i className="fas fa-code" />
              <span>Full Stack Developer</span>
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              {"Mirshod Qayimov".split("").map((l, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>{l === ' ' ? '\u00A0' : l}</motion.span>
              ))}
            </motion.h1>
            <div className="flex items-center justify-center mb-2 min-h-8 w-full">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="font-semibold text-primary text-base md:text-lg tracking-wide" id="typing-text">
                {typingText.split("").map((l, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i }}>{l === ' ' ? '\u00A0' : l}</motion.span>
                ))}
              </motion.div>
              <span className="font-normal text-primary text-base md:text-lg animate-blink">|</span>
            </div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="text-base sm:text-lg text-text-secondary my-4 max-w-md">
              Building robust microservices, scalable APIs, and intelligent AI solutions for modern businesses.
            </motion.p>
            <motion.a whileHover={{ scale: 1.08, boxShadow: '0 0 16px #00fff0, 0 0 32px #ff00ea' }} transition={{ type: 'spring', stiffness: 300, damping: 15 }} href="#contact" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-semibold text-base bg-gradient-to-r from-primary to-primary-dark text-white border-2 border-transparent shadow transition-all duration-200 hover:scale-105 relative overflow-hidden mb-6">
              <span className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,255,240,0.15) 0%, transparent 80%)' }} />
              <i className="fas fa-envelope z-10" />
              <span className="z-10">{t("Get In Touch")}</span>
            </motion.a>
            <div className="w-full flex justify-center mb-8">
              <div className="bg-[#10151f] border border-[#222c3a] rounded-lg shadow-lg w-full max-w-xl p-4 text-left text-green-400 font-mono text-sm overflow-y-auto" style={{ height: 90 }}>
                <div className="flex flex-col justify-end" style={{ height: '100%' }}>
                  {terminalHistory.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                  {currentLine < terminalLines.length && (
                    <div>{typed}<span className="animate-blink">|</span></div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 my-4 max-w-3xl mx-auto">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 sm:px-4 py-2 rounded-full text-sm font-medium text-text-primary backdrop-blur-md shadow hover:scale-110 hover:bg-white/10 hover:border-primary transition-all duration-200 cursor-pointer"
                  title={tech.name}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  whileHover={{ scale: 1.15, boxShadow: '0 0 16px #00fff0, 0 0 32px #ff00ea', rotateX: 8, rotateY: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <img
                    src={tech.img}
                    alt={tech.name}
                    loading="lazy"
                    width="28"
                    height="28"
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    style={{ filter: 'drop-shadow(0 0 3px #00fff0)' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;