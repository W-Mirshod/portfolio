import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects/')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-[#181a24] to-[#23263a] dark:bg-[#181a24]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">{t("Featured Projects")}</h2>
          <p className="text-lg text-gray-400">{t("Some of my recent work")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id || project.title}
              className="group relative flex flex-col bg-[#23263a]/80 dark:bg-[#23263a]/80 rounded-2xl p-7 border border-[#23263a] dark:border-[#23263a] shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(63,162,246,0.15),0_0_40px_rgba(63,162,246,0.10)] cursor-pointer"
              style={{ animationDelay: `${0.4 + (index * 0.1)}s` }}
            >
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#3fa2f6] to-[#23263a] rounded-xl mb-6 text-3xl text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <i className={project.icon}></i>
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{t(project.title)}</h3>
                <p className="text-gray-400 mb-4">{t(project.description)}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(project.technologies) && project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-[#3fa2f6]/10 text-[#3fa2f6] px-3 py-1 rounded-full text-xs font-medium border border-[#3fa2f6]/20 transition-all duration-200 hover:bg-[#3fa2f6] hover:text-white"
                    >
                      {t(tech)}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-3">
                  <a
                    href={project.url || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#3fa2f6] to-[#23263a] text-white font-medium text-sm transition-all duration-200 hover:shadow-[0_4px_15px_rgba(63,162,246,0.25)] hover:-translate-y-0.5"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    {t("View Project")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="https://github.com/W-Mirshod?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#3fa2f6] rounded-full text-[#3fa2f6] font-semibold transition-all duration-200 hover:bg-[#3fa2f6] hover:text-white hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(63,162,246,0.15)]"
          >
            <i className="fab fa-github"></i>
            {t("View All Projects")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
