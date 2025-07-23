import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

const Skills = () => {
  const { t } = useTranslation();
  const skillsGridRef = useRef(null);
  const skillsObserver = useRef(null);

  const skillCategories = [
    {
      title: "Backend Development",
      skills: ["Python", "Django", "Django ORM", "Flask", "FastAPI", "REST APIs", "WebSockets", "WebRTC", "Monolithic/Microservices", "API Integration", "Celery", "Flower", "Performance Optimization", "PyGame"]
    },
    {
      title: "Frontend Technologies",
      skills: ["JavaScript", "React", "React Native", "Vite", "Tailwind", "HTML5", "CSS3", "SCSS"]
    },
    {
      title: "DevOps & Cloud",
      skills: ["AWS (EC2, S3, CodePipeline, CodeDeploy)", "Docker", "Docker Compose", "Linux", "Git", "GitHub", "GitHub Actions", "CI/CD", "Automation", "Nginx", "Apache"]
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MySQL", "SQLite", "Redis", "Caching"]
    },
    {
      title: "AI & Machine Learning",
      skills: ["Azure APIs", "AI APIs", "Personal AI Model (GPT-Neo)"]
    },
    {
      title: "Tools & Utilities",
      skills: ["Swagger/OpenAPI", "Postman", "Pytest", "Excel/CSV Analysis"]
    }
  ];

  useEffect(() => {
    skillsObserver.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentNode.children);
          const index = siblings.indexOf(entry.target);
          const delay = index * 200;
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-morph');
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
    <section id="skills" className="py-20 bg-gradient-to-b from-[#181a24] to-[#23263a] dark:bg-[#181a24]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">{t("Skills & Expertise")}</h2>
          <p className="text-lg text-gray-400">{t("These are the primary technologies I specialize in:")}</p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center items-start"
          ref={skillsGridRef}
        >
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category w-full max-w-xs md:max-w-sm bg-[#23263a]/80 dark:bg-[#23263a]/80 p-6 md:p-7 rounded-2xl border border-[#23263a] dark:border-[#23263a] shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] backdrop-blur-md text-center transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(63,162,246,0.15)]"
              style={{ opacity: 1, transform: 'translateY(0)' }}
            >
              <h3 className="text-[#3fa2f6] mb-4 text-lg font-semibold flex items-center justify-center gap-2">{t(category.title)}</h3>
              <div className="skill-items flex flex-wrap gap-2 justify-center items-center">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="skill-tag bg-[#3fa2f6]/10 text-[#3fa2f6] px-3 py-1 rounded-full text-xs font-medium border border-[#3fa2f6]/20 transition-all duration-200 cursor-default hover:bg-[#3fa2f6] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(63,162,246,0.2)]"
                  >
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
