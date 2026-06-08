"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/isMobile";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rilwanyusuf",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Rilwan2004",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:rilwanyusuf2004@gmail.com",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default function SocialSidebar() {
  const { isMobile } = useIsMobile();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;
      setVisible(distanceFromBottom > 280);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hidden on mobile — not enough space
  if (isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: "32px",
        top: "60%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        transition: "opacity 0.4s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {socials.map(({ label, href, svg }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{
            width: "36px", height: "36px",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: "8px", border: "1px solid var(--bg-card-border)",
            color: "var(--text-muted)", transition: "all 0.2s ease",
            textDecoration: "none",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--text-accent)";
            (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-card-border)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          {svg}
        </a>
      ))}
      <div style={{ width: "1px", height: "60px", background: "var(--bg-card-border)", marginTop: "4px" }} />
    </div>
  );
}
