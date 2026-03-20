"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import { personal } from "@/data/personal";

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const socialLinks = [
  { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
  { icon: LinkedInIcon, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: TelegramIcon, href: personal.social.telegram, label: "Telegram" },
  { icon: InstagramIcon, href: personal.social.instagram, label: "Instagram" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { opacity: 0, y: 80, clipPath: "inset(100% 0% 0% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".social-link",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".social-row",
            start: "top 90%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-40"
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <h2
          className="contact-heading font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let&apos;s{" "}
          <span className="text-gradient">Connect</span>
        </h2>

        <div className="contact-grid mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href={`mailto:${personal.email}`}
            className="contact-item group p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors duration-300">
              <MailIcon />
            </div>
            <p className="mt-4 text-sm text-text-muted">Email</p>
            <p className="mt-1 text-sm text-text-primary">{personal.email}</p>
          </a>

          <div className="contact-item group p-6 rounded-2xl bg-bg-card border border-border text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <PhoneIcon />
            </div>
            <p className="mt-4 text-sm text-text-muted">Phone</p>
            <p className="mt-1 text-sm text-text-primary">{personal.phone}</p>
          </div>

          <div className="contact-item group p-6 rounded-2xl bg-bg-card border border-border text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <LocationIcon />
            </div>
            <p className="mt-4 text-sm text-text-muted">Location</p>
            <p className="mt-1 text-sm text-text-primary">
              {personal.location}
            </p>
          </div>
        </div>

        <div className="social-row mt-12 flex items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link w-12 h-12 rounded-xl border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              aria-label={link.label}
            >
              <link.icon />
            </a>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-border">
          <p className="text-sm text-text-muted">
            © 2023–{year} {personal.name}. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-text-muted/60">
            VERSION 5.0
          </p>
        </div>
      </div>
    </section>
  );
}
