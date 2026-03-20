"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
    >
      <path
        d="M3 13L13 3M13 3H5M13 3V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const featured = sectionRef.current!.querySelectorAll(".project-featured");
      featured.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".project-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 md:py-40"
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Projects" subtitle="Some of my work" />

        {featuredProjects.length > 0 && (
          <div className="space-y-8 mb-16">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="project-featured group relative p-8 md:p-12 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_60px_var(--color-accent-glow)]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span
                        className="text-xs font-mono text-accent tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Featured Project
                      </span>
                      <h3
                        className="mt-3 text-3xl md:text-4xl font-display font-bold text-text-primary group-hover:text-gradient transition-all duration-300"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex gap-3 shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group w-10 h-10 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/50 transition-all duration-300"
                        >
                          <GithubIcon />
                        </a>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group w-10 h-10 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/50 transition-all duration-300"
                        >
                          <ArrowIcon />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mt-6 text-text-secondary leading-relaxed max-w-2xl text-base md:text-lg">
                    {project.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-border text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_var(--color-accent-glow)] flex flex-col"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3
                    className="text-lg font-display font-semibold text-text-primary group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-primary transition-colors duration-300"
                      >
                        <GithubIcon />
                      </a>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-primary transition-colors duration-300"
                      >
                        <ArrowIcon />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-[11px] rounded-md bg-surface/50 text-text-muted border border-border-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-[11px] rounded-md text-text-muted">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
