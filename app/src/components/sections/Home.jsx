import { useEffect, useRef, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import '../styles/Home.css';

const Home = () => {
  const { t } = useTranslation();
  const typingTextRef = useRef(null);
  const typingCursorRef = useRef(null);
  const [typingText, setTypingText] = useState('');

  useEffect(() => {
    const texts = t('hero.typingTexts', { returnObjects: true });
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseDuration = 1500;
    let timer;

    const typeWriter = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        setTypingText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }
      
      if (!isDeleting && charIndex >= currentText.length) {
        isDeleting = true;
        typingSpeed = 50;
        clearTimeout(timer);
        timer = setTimeout(typeWriter, pauseDuration);
        return;
      }
      
      if (isDeleting && charIndex <= 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 100;
      }
      
      timer = setTimeout(typeWriter, typingSpeed);
    };
    
    typeWriter();
    
    return () => {
      clearTimeout(timer);
    };
  }, [t]);

  return (
    <section id="home" className="section hero-section">
      <div className="container">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FontAwesomeIcon icon={faCode} />
              <span>{t('hero.badge')}</span>
            </div>

            <h1>
              <Trans i18nKey="hero.title">
                Hi, I'm <span className="highlight">Mirshod Qayimov</span><br />
                Building Digital Solutions
              </Trans>
            </h1>

            <div className="typing-container">
              <div className="typing-text" ref={typingTextRef}>{typingText}</div>
              <span className="typing-cursor" ref={typingCursorRef}>|</span>
            </div>
            
            <a href="https://pdp.uz" target="_blank" rel="noopener noreferrer" className="pdp-acceptance-banner">
              <FontAwesomeIcon icon={faGraduationCap} className="pdp-banner-icon" />
              <div className="pdp-banner-text">
                <span className="pdp-banner-main">{t('hero.pdpBanner.main')}</span>
                <span className="pdp-banner-sub">{t('hero.pdpBanner.sub')}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
