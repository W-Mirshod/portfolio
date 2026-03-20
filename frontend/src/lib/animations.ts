"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function fadeUpOnScroll(
  selector: string | Element | Element[],
  options?: {
    stagger?: number;
    delay?: number;
    duration?: number;
    y?: number;
    trigger?: string | Element;
    start?: string;
  }
) {
  return gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: options?.y ?? 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1,
      stagger: options?.stagger ?? 0.1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: (options?.trigger as string) ?? (selector as string),
        start: options?.start ?? "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function revealText(
  selector: string | Element | Element[],
  options?: {
    stagger?: number;
    delay?: number;
    duration?: number;
    trigger?: string | Element;
  }
) {
  return gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 100,
      clipPath: "inset(100% 0% 0% 0%)",
    },
    {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: options?.duration ?? 1.2,
      stagger: options?.stagger ?? 0.15,
      delay: options?.delay ?? 0,
      ease: "power4.out",
      scrollTrigger: {
        trigger: (options?.trigger as string) ?? (selector as string),
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}
