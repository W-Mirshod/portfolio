import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../utils/parallax';
import projectsData from '../../data/projects.json';
import SpotlightCard from '../ui/SpotlightCard';

const Projects = () => {
  const { t } = useTranslation();
  const revealRef = useScrollReveal();
  const projects = projectsData;
  const [globalMousePos, setGlobalMousePos] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          setGlobalMousePos({ x: e.clientX, y: e.clientY });
        } else {
          setGlobalMousePos(null);
        }
      }
    };

    const handleMouseLeave = () => {
      setGlobalMousePos(null);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 bg-bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-3xl font-light text-white tracking-wide animate-fadeInUp">{t("projects.title")}</h2>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto animate-fadeInUp delay-100"></div>
        </header>

        {projects.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t('projects.noProjects')}</h3>
              <p className="text-gray-400 mb-4">{t('projects.noProjectsSubtitle')}</p>
            </div>
          </div>
        ) : (
          <div
            ref={revealRef}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8"
          >
            {projects.map((project) => {
              return (
                <SpotlightCard
                  key={project.id || project.title}
                  className="group bg-white/5 glass-blur-strong rounded-lg p-5 glass-border transition-all duration-300 hover:bg-white/8 hover:border-white/20 flex flex-col h-full"
                  globalMousePos={globalMousePos}
                >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center">
                    <i className={`${project.icon} text-white text-base`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">
                      {t(`projects.data.${project.id}.title`, { defaultValue: project.title })}
                    </h3>
                  </div>
                </div>
                
                <p className="text-xs text-gray-300 mb-4 leading-relaxed flex-grow">
                  {t(`projects.data.${project.id}.description`, { defaultValue: project.description })}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.map((tech, idx) => {
                    const techKey = `projects.data.${project.id}.technologies.${idx}`;
                    const translatedTech = t(techKey, { defaultValue: tech });
                    return (
                      <span
                        key={idx}
                        className="text-[10px] text-gray-300 bg-gray-900/50 px-2.5 py-1 rounded border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-200"
                      >
                        {translatedTech}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center justify-end gap-2 mt-auto pt-3 border-t border-white/10">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      <i className="fab fa-github text-sm"></i>
                      <span>{t('projects.viewInGithub')}</span>
                    </a>
                  )}
                  {project.url && project.url !== '#' && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      <i className="fas fa-external-link-alt text-xs"></i>
                      <span>{t('projects.viewWebsite')}</span>
                    </a>
                  )}
                </div>
                </SpotlightCard>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
