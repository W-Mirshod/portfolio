import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import '../../components/styles/SkillsSection.css';

const Skills = () => {
  const { t } = useTranslation();
  const skillsGridRef = useRef(null);
  const skillsObserver = useRef(null);

  const skillCategories = [
    {
      title: "Backend Development",
      skills: ["Python", "Django", "FastAPI", "REST APIs", "Microservices", "PyGame", "WebSocket"]
    },
    {
      title: "Frontend Technologies",
      skills: ["JavaScript", "React", "Vite", "HTML5", "CSS3", "SCSS", "WebRTC"]
    },
    {
      title: "DevOps & Cloud",
      skills: ["AWS", "Docker", "Linux", "Git", "GitHub", "CI/CD", "Pipelines", "Automated Deployment", "GitHub Actions"]
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MySQL", "SQLite", "Redis"]
    },
    {
      title: "AI & Machine Learning",
      skills: ["GPT-Neo", "AI APIs", "ChatGPT Integration", "Text-to-Speech", "PDF Translation"]
    },
    {
      title: "Tools & Utilities",
      skills: ["Postman", "QR Code Generation", "Excel/CSV Analysis", "Movie Downloaders"]
    }
  ];

  // Animate skill categories and tags with staggered timing
  useEffect(() => {
    // Skills section animations with enhanced easing
    skillsObserver.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add professional stagger animation for skill categories
          const siblings = Array.from(entry.target.parentNode.children);
          const index = siblings.indexOf(entry.target);
          const delay = index * 200;
          
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-morph');
            
            // Animate skill tags within the category with cascade effect
            const skillTags = entry.target.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, tagIndex) => {
              tag.style.opacity = '0';
              tag.style.transform = 'translateY(20px) scale(0.8)';
              
              setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                tag.classList.add('animate-cascade');
              }, tagIndex * 100 + index * 50);
            });
          }, delay);
          
          skillsObserver.current.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    });

    // Initialize skill categories for animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
      category.style.opacity = '0';
      category.style.transform = 'translateY(40px) scale(0.9)';
      category.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      skillsObserver.current.observe(category);
    });

    return () => {
      if (skillsObserver.current) {
        skillsObserver.current.disconnect();
      }
    };
  }, []);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("Skills & Expertise")}</h2>
          <p className="section-subtitle">{t("As an 18-year-old developer, these are the primary technologies I work with:")}</p>
        </div>
        
        <div className="skills-grid" ref={skillsGridRef}>
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{t(category.title)}</h3>
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {t(skill)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
