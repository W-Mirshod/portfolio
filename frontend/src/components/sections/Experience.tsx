"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".exp-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });

      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 md:py-40"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Professional Experience"
          subtitle="A journey of growth and expertise"
        />

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px">
            <div className="timeline-line w-full h-full bg-gradient-to-b from-accent/50 via-accent/20 to-transparent origin-top" />
          </div>

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`exp-item relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-16`}
              >
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-bg z-10 shadow-[0_0_20px_var(--color-accent-dim)]" />

                <div
                  className={`flex-1 pl-8 md:pl-0 ${
                    index % 2 === 0
                      ? "md:text-right md:pr-16"
                      : "md:text-left md:pl-16"
                  }`}
                >
                  <span
                    className="inline-block text-xs font-mono text-accent tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {exp.period}
                  </span>
                  <h3
                    className="mt-3 text-2xl md:text-3xl font-display font-bold text-text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent/80">
                    {exp.company}{" "}
                    <span className="text-text-muted">· {exp.type}</span>
                  </p>
                  <p className="mt-4 text-text-secondary leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
