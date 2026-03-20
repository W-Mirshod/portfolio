"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { certificate, githubAchievements } from "@/data/proof";

export default function Proof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proof-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".proof-card",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".achievement-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".achievements-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="proof" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Proof" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="proof-card relative p-8 md:p-10 rounded-2xl bg-bg-card border border-border group hover:border-accent/30 transition-all duration-500">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <span
                className="text-xs font-mono text-accent tracking-wider uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Professional Certification
              </span>

              <h3
                className="mt-4 text-2xl md:text-3xl font-display font-bold text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {certificate.course}
              </h3>

              <p className="mt-2 text-text-secondary">
                {certificate.institution} · {certificate.location}
              </p>

              <p className="mt-1 text-sm text-text-muted">
                {certificate.duration}
              </p>

              <p className="mt-6 text-sm text-text-secondary leading-relaxed">
                {certificate.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {certificate.skillsCovered.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs rounded-lg bg-surface border border-border text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {certificate.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-accent/30 text-accent bg-accent/5"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-accent text-bg hover:shadow-[0_0_30px_var(--color-accent-glow)] transition-all duration-300"
                >
                  Verify Certificate
                </a>
                <a
                  href={certificate.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-sm font-semibold rounded-lg border border-border text-text-primary hover:border-accent/50 transition-all duration-300"
                >
                  Visit Institution
                </a>
              </div>
            </div>
          </div>

          <div className="proof-card relative p-8 md:p-10 rounded-2xl bg-bg-card border border-border group hover:border-accent/30 transition-all duration-500">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <span
                className="text-xs font-mono text-accent-secondary tracking-wider uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                GitHub Achievements
              </span>

              <h3
                className="mt-4 text-2xl md:text-3xl font-display font-bold text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Highlights
              </h3>

              <div className="achievements-grid mt-8 space-y-4">
                {githubAchievements.map((achievement) => (
                  <div
                    key={achievement.label}
                    className="achievement-item flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-border-subtle hover:border-accent-secondary/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent-secondary/10 flex items-center justify-center text-accent-secondary text-sm font-bold shrink-0">
                      {achievement.count || "★"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {achievement.label}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
