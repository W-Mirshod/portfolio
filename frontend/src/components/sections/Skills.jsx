import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../../utils/parallax';
import skillCategoriesData from '../../data/skills.json';

const Skills = () => {
  const { t } = useTranslation();
  const skillsGridRef = useRef(null);
  const skillsObserver = useRef(null);
  const revealRef = useScrollReveal();

  useEffect(() => {
    skillsObserver.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentNode.children);
          const index = siblings.indexOf(entry.target);
          const delay = index * 150;

          setTimeout(() => {
            entry.target.classList.add('layered-entrance');
            const skillTags = entry.target.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, tagIndex) => {
              setTimeout(() => {
                tag.classList.add('animate-fadeInUp');
              }, tagIndex * 80 + index * 30);
            });
          }, delay);
          skillsObserver.current.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    });

    const skillCategoriesEls = document.querySelectorAll('.skill-category');
    skillCategoriesEls.forEach(category => {
      skillsObserver.current.observe(category);
    });

    return () => {
      if (skillsObserver.current) {
        skillsObserver.current.disconnect();
      }
    };
  }, []);

  return (
    <section id="skills" className="py-14 px-2 sm:px-4 bg-gradient-to-b from-[#181a24] to-[#23263a] dark:bg-[#181a24] relative overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0 parallax-layer-1"
          style={{
            background: `radial-gradient(ellipse at 30% 10%, rgba(63, 162, 246, 0.06) 0%, transparent 50%),
                         radial-gradient(ellipse at 70% 90%, rgba(37, 99, 235, 0.04) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 parallax-layer-3"
          style={{
            background: `linear-gradient(45deg, rgba(63, 162, 246, 0.03) 0%, rgba(37, 99, 235, 0.02) 100%)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10 sm:mb-12 text-center">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2 layered-entrance">{t("Skills & Expertise")}</h2>
          <p className="text-base sm:text-lg text-gray-400 layered-entrance" style={{ animationDelay: '0.2s' }}>{t("These are the primary technologies I specialize in:")}</p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-items-center items-start"
          ref={skillsGridRef}
        >
          {skillCategoriesData.map((category, index) => (
            <div
              key={index}
              className="skill-category w-full max-w-xs md:max-w-sm card-depth-2 p-5 sm:p-6 md:p-7 rounded-2xl text-center depth-hover-card morphing-glow"
            >
              <h3 className="text-[#3fa2f6] mb-3 sm:mb-4 text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white">
                <i className="fas fa-code text-sm opacity-70"></i>
                {t(category.title)}
              </h3>

              <div className="skill-items flex flex-wrap gap-2 justify-center items-center">
                {Array.isArray(category.skills) && category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="skill-tag bg-[#3fa2f6]/10 text-[#3fa2f6] px-3 py-1 rounded-full text-xs font-medium border border-[#3fa2f6]/20 transition-all duration-300 cursor-default hover:bg-[#3fa2f6] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(63,162,246,0.25)] hover:scale-105"
                  >
                    {t(skill)}
                  </span>
                ))}
              </div>

              {/* Skill level indicators */}
              <div className="mt-4 flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i < 4 ? 'bg-[#3fa2f6]/60' : 'bg-[#3fa2f6]/30'
                    }`}
                    style={{ animationDelay: `${1 + (index * 0.1) + (i * 0.1)}s` }}
                  />
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
