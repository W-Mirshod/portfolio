import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
    { name: 'Python', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Django', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
    { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'FastAPI', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'AWS', img: 'https://static-00.iconduck.com/assets.00/aws-icon-2048x1224-tyr5ef11.png' },
    { name: 'Vite', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    { name: 'HTML5', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'PostgreSQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Nginx', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
    { name: 'Linux', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'GitHub', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'MySQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Redis', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    { name: 'Celery', img: 'https://docs.celeryq.dev/en/stable/_static/celery_512.png' },
    { name: 'Apache', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg' },
    { name: 'Pygame', img: 'https://www.pygame.org/docs/_static/pygame_logo.png' },
    { name: 'WebSocket', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg' }
  ];

  return (
    <section id="home" className="relative flex items-start justify-center pt-24 min-h-[80vh] bg-bg-primary">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center w-full mt-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-2xl mb-4 text-xs text-primary font-medium animate-fadeInUp">
              <i className="fas fa-code" />
              <span>Full Stack Developer</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 animate-fadeInUp bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Hi, I'm <span className="">Mirshod Qayimov</span><br />
              <span className="text-text-secondary font-semibold">Building Digital Solutions</span>
            </h1>
            <div className="flex items-center justify-center mb-2 min-h-8 w-full animate-fadeInUp">
              <div className="font-semibold text-primary text-base md:text-lg tracking-wide" id="typing-text">{typingText}</div>
              <span className="font-normal text-primary text-base md:text-lg animate-blink">|</span>
            </div>
            <a 
              href="https://pdp.uz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400/15 to-emerald-700/15 border-2 border-emerald-500/30 px-6 py-3 rounded-full my-4 font-bold text-emerald-500 text-base backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-105 hover:border-emerald-500 hover:text-emerald-600 relative overflow-hidden"
            >
              <i className="fas fa-graduation-cap text-emerald-500 text-lg drop-shadow" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-extrabold text-emerald-500 text-base leading-tight">{t("PDP University Student")}</span>
                <span className="font-semibold text-emerald-600 text-xs leading-tight">{t("Programming & Development")}</span>
              </div>
            </a>
            <p className="text-base md:text-lg text-text-secondary my-6 max-w-xl mx-auto leading-relaxed animate-fadeInUp">
              As an 18-year-old developer, I specialize in building robust microservices, scalable APIs, and intelligent AI solutions. Currently working 18/7 on innovative projects using Python, Django, AWS, and cutting-edge technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 my-8 max-w-3xl mx-auto animate-fadeInUp">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-text-primary backdrop-blur-md shadow hover:scale-105 hover:bg-white/10 hover:border-primary transition-all duration-200 cursor-pointer"
                  title={tech.name}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={tech.img}
                    alt={tech.name}
                    loading="lazy"
                    width="32"
                    height="32"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center my-6 animate-fadeInUp">
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-base bg-gradient-to-r from-primary to-primary-dark text-white border-2 border-transparent shadow transition-all duration-200 hover:scale-105">
                <i className="fas fa-envelope" />
                {t("Get In Touch")}
              </a>
              <a href="#experience" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-base border-2 border-primary text-primary bg-transparent shadow transition-all duration-200 hover:bg-primary hover:text-white hover:scale-105">
                <i className="fas fa-briefcase" />
                {t("View Experience")}
              </a>
            </div>
          </div>
          <div className="relative w-full h-72 mt-12 animate-fadeInUp"></div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fadeInUp">
          <div className="flex items-center justify-center w-10 h-10 border-2 border-primary rounded-full text-primary animate-bounce cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white">
            <i className="fas fa-chevron-down" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;