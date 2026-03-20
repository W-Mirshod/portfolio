"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations";
import { personal } from "@/data/personal";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            className="font-display text-xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors duration-300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            W<span className="text-accent">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {personal.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-px bg-text-primary transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`w-6 h-px bg-text-primary transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-px bg-text-primary transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 glass-strong flex flex-col items-center justify-center gap-8 md:hidden">
          {personal.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-display text-text-primary hover:text-accent transition-colors duration-300"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
