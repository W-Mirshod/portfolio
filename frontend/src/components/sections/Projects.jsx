import React from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../utils/parallax';
import projectsData from '../../data/projects.json';

const Projects = () => {
  const { t } = useTranslation();
  const revealRef = useScrollReveal();
  const projects = projectsData;

  return (
    <section id="projects" className="py-20 px-4 bg-bg-secondary/30">
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
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-400 mb-4">No projects available at the moment</p>
            </div>
          </div>
        ) : (
          <div
            ref={revealRef}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8"
          >
            {projects.map((project) => (
              <div
                key={project.id || project.title}
                className="group bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 transition-all duration-300 hover:bg-white/8 hover:border-white/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center">
                      <i className={`${project.icon} text-white text-base`}></i>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  {project.url && project.url !== '#' && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/10 text-white text-xs font-medium border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      View
                    </a>
                  )}
                </div>
                
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-gray-300 bg-gray-900/50 px-2.5 py-1 rounded border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
