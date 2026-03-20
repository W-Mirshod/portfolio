"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll(".sh-anim"),
        { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-16 md:mb-24 ${align === "center" ? "text-center" : ""}`}
    >
      <h2
        className="sh-anim font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="sh-anim mt-4 text-lg md:text-xl text-text-secondary max-w-2xl"
          style={align === "center" ? { margin: "1rem auto 0" } : {}}
        >
          {subtitle}
        </p>
      )}
      <div
        className="sh-anim mt-6 h-px w-20 line-gradient"
        style={align === "center" ? { margin: "1.5rem auto 0" } : {}}
      />
    </div>
  );
}
