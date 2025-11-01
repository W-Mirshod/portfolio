import React, { useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../utils/parallax';
import { useGitHubRepositories } from '../../hooks/useGitHubRepositories';
import { getLanguageIcon } from '../../services/githubApi';

const Projects = () => {
  const { t } = useTranslation();
  const revealRef = useScrollReveal();
  const observerRef = useRef();
  const { 
    repositories, 
    loading, 
    loadingMore,
    error, 
    hasMore, 
    loadMore, 
    refresh
  } = useGitHubRepositories();

  // Intersection Observer for lazy loading
  const lastRepoRef = useCallback(node => {
    if (loadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loadingMore, hasMore, loadMore]);

  return (
    <section id="projects" className="py-20 px-4 bg-bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-3xl font-light text-white tracking-wide animate-fadeInUp">{t("projects.title")}</h2>
            <button
              onClick={refresh}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh projects data"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto animate-fadeInUp delay-100"></div>
        </header>

        {loading && repositories.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3fa2f6]"></div>
              <p className="text-gray-400 text-lg">Loading amazing projects...</p>
            </div>
          </div>
        ) : repositories.length === 0 && !loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-400 mb-4">No projects available at the moment</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-red-400 text-6xl mb-4">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <button
                onClick={refresh}
                className="px-6 py-3 bg-[#3fa2f6] text-white rounded-full hover:bg-[#2563eb] transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div
            ref={revealRef}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8"
          >
            {repositories.map((project, index) => (
              <div
                key={project.id || project.title}
                ref={index === repositories.length - 1 ? lastRepoRef : null}
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
                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        {project.stars > 0 && (
                          <div className="flex items-center gap-1">
                            <i className="fas fa-star"></i>
                            <span>{project.stars}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1" title="Commits">
                          <i className="fas fa-history"></i>
                          <span>{project.commitCount || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={project.url || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/10 text-white text-xs font-medium border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                  >
                    <i className="fab fa-github"></i>
                    View
                  </a>
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

        {hasMore && !loadingMore && (
          <div className="text-center mb-8">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            >
              <i className="fas fa-plus"></i>
              Load More Projects
            </button>
          </div>
        )}

        {loadingMore && (
          <div className="flex justify-center items-center py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3fa2f6]"></div>
              <p className="text-gray-400 text-sm">Loading more projects...</p>
            </div>
          </div>
        )}

        <div className="text-center">
          <a
            href="https://github.com/W-Mirshod?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-lg bg-transparent hover:bg-white/10 hover:border-white/30 transition-all duration-300"
          >
            <i className="fab fa-github"></i>
            {t("projects.viewAll")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
