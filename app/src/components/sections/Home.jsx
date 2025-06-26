import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../components/styles/HomeSection.css';

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
    <section id="home" className="section hero-section">
      <div className="container">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-code"></i>
              <span>Full Stack Developer</span>
            </div>

            <h1>
              Hi, I'm <span className="highlight">Mirshod Qayimov</span><br/>
              Building Digital Solutions
            </h1>

            <div className="typing-container">
              <div className="typing-text" id="typing-text">{typingText}</div>
              <span className="typing-cursor">|</span>
            </div>
            
            <a 
              href="https://pdp.uz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pdp-acceptance-banner"
            >
              <i className="fas fa-graduation-cap pdp-banner-icon"></i>
              <div className="pdp-banner-text">
                <span className="pdp-banner-main">{t("PDP University Student")}</span>
                <span className="pdp-banner-sub">{t("Programming & Development")}</span>
              </div>
            </a>

            <p className="hero-description">
              As an 18-year-old developer, I specialize in building robust microservices, scalable APIs, 
              and intelligent AI solutions. Currently working 18/7 on innovative projects using Python, 
              Django, AWS, and cutting-edge technologies.
            </p>
            
            <div className="floating-cards">
              {techStack.map((tech, index) => (
                <div 
                  key={tech.name}
                  className="tech-card" 
                  data-tech={tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')} 
                  title={tech.name}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <img 
                    src={tech.img} 
                    alt={tech.name}
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                </div>
              ))}
            </div>

            <div className="cta-group">
              <a href="#contact" className="cta-primary">
                <i className="fas fa-envelope"></i>
                {t("Get In Touch")}
              </a>
              <a href="#experience" className="cta-secondary">
                <i className="fas fa-briefcase"></i>
                {t("View Experience")}
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-arrow">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;