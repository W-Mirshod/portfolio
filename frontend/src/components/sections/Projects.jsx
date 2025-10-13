import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../utils/parallax';
import projectsData from '../../data/projects.json';

const Projects = () => {
  const { t } = useTranslation();
  const revealRef = useScrollReveal();

  return (
    <section id="projects" className="py-14 px-2 sm:px-4 bg-gradient-to-b from-[#181a24] to-[#23263a] dark:bg-[#181a24] relative overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute inset-0 parallax-layer-1"
          style={{
            background: `radial-gradient(ellipse at 10% 20%, rgba(63, 162, 246, 0.08) 0%, transparent 50%),
                         radial-gradient(ellipse at 90% 80%, rgba(37, 99, 235, 0.06) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 parallax-layer-2"
          style={{
            background: `radial-gradient(ellipse at 70% 30%, rgba(63, 162, 246, 0.05) 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10 sm:mb-12 text-center">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2 layered-entrance">{t("projects.title")}</h2>
          <p className="text-base sm:text-lg text-gray-400 layered-entrance" style={{ animationDelay: '0.2s' }}>{t("projects.subtitle")}</p>
        </div>

        <div
          ref={revealRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12"
        >
          {projectsData.map((project, index) => (
            <div
              key={project.id || project.title}
              className="group relative flex flex-col card-depth-3 rounded-2xl p-5 sm:p-7 depth-hover-card layered-entrance cursor-pointer"
              style={{ animationDelay: `${0.3 + (index * 0.15)}s` }}
            >
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#3fa2f6] to-[#23263a] rounded-xl mb-4 sm:mb-6 text-2xl sm:text-3xl text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(63,162,246,0.4)]">
                <i className={project.icon}></i>
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-[#3fa2f6] transition-colors duration-300">{t(project.title)}</h3>
                <p className="text-xs sm:text-base text-gray-400 mb-3 sm:mb-4 leading-relaxed">{t(project.description)}</p>

                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {Array.isArray(project.technologies) && project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-[#3fa2f6]/10 text-[#3fa2f6] px-3 py-1 rounded-full text-xs font-medium border border-[#3fa2f6]/20 transition-all duration-300 hover:bg-[#3fa2f6] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(63,162,246,0.3)] layered-entrance"
                      style={{ animationDelay: `${0.5 + (index * 0.1) + (idx * 0.05)}s` }}
                    >
                      {t(tech)}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-2 sm:gap-3">
                  <a
                    href={project.url || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#3fa2f6] to-[#23263a] text-white font-medium text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_8px_25px_rgba(63,162,246,0.3)] hover:-translate-y-1 hover:scale-105 layered-entrance"
                    style={{ animationDelay: `${0.7 + (index * 0.1)}s` }}
                  >
                    <i className="fas fa-external-link-alt transition-transform duration-300 group-hover:scale-110"></i>
                    {t("projects.viewProject")}
                  </a>
                </div>
              </div>

              {/* Depth enhancement overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-rgba(63,162,246,0.02) opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="text-center layered-entrance" style={{ animationDelay: '1s' }}>
          <a
            href="https://github.com/W-Mirshod?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 border-2 border-[#3fa2f6] rounded-full text-[#3fa2f6] font-semibold text-xs sm:text-base transition-all duration-300 hover:bg-[#3fa2f6] hover:text-white hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(63,162,246,0.2)] hover:scale-105"
          >
            <i className="fab fa-github transition-transform duration-300 hover:rotate-12"></i>
            {t("projects.viewAll")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
