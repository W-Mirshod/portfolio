"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

const categoryIcons: Record<string, string> = {
  "Backend Development": "⚡",
  "DevOps & Cloud": "☁️",
  "Data & Frontend": "🗄️",
  "AI & Machine Learning": "🤖",
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skill-grid",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".skill-tag",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".skill-grid",
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies I use"
        />

        <div className="skill-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="skill-card group relative p-8 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_var(--color-accent-glow)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">
                    {categoryIcons[category.title] || "💻"}
                  </span>
                  <h3
                    className="text-xl font-display font-semibold text-text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
