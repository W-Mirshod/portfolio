"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations";
import { personal } from "@/data/personal";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".hero-name",
          { opacity: 0, y: 80, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 80, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.8"
        )
        .fromTo(
          ".hero-tagline",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-typing",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-stat",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const currentRole = personal.roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(
          () => setDisplayText(currentRole.slice(0, displayText.length + 1)),
          50
        );
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          30
        );
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personal.roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-bg)_70%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-text-secondary mb-8 glass">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {personal.status}
        </div>

        <h1
          className="hero-name font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {personal.name.split(" ")[0]}{" "}
          <span className="text-gradient">{personal.name.split(" ")[1]}</span>
        </h1>

        <p
          className="hero-subtitle mt-4 text-xl md:text-2xl lg:text-3xl font-display font-medium text-text-secondary tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {personal.subtitle}
        </p>

        <p className="hero-tagline mt-6 text-base md:text-lg text-text-muted max-w-xl mx-auto">
          {personal.tagline}
        </p>

        <div className="hero-typing mt-6 h-8 flex items-center justify-center">
          <span
            className="text-accent font-mono text-sm md:text-base"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {displayText}
            <span className="animate-pulse ml-0.5">|</span>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="#projects"
            className="hero-cta group relative px-8 py-3.5 bg-accent text-bg font-semibold text-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="hero-cta px-8 py-3.5 border border-border text-text-primary font-semibold text-sm rounded-lg hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
          >
            Let&apos;s Talk
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 md:gap-16 mt-20">
          {personal.stats.map((stat, i) => (
            <div
              key={i}
              className="hero-stat text-center group cursor-default"
            >
              <div
                className="text-3xl md:text-4xl font-bold font-display text-text-primary group-hover:text-accent transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-text-muted mt-0.5">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        <div className="hero-scroll mt-20 flex flex-col items-center gap-2">
          <span className="text-xs text-text-muted uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent" />
        </div>
      </div>
    </section>
  );
}
