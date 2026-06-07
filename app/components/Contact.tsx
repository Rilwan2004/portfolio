"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/isMobile";

const navLinks = [
  { label: "Home",     id: "home"     },
  { label: "About",    id: "about"    },
  { label: "Skills",   id: "skills"   },
  { label: "Projects", id: "projects" },
  { label: "Contact",  id: "contact"  },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/2349055662928",
    bgColor: "#25D366",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/rilwan__2",
    bgColor: "#000000",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/_r.ilwan",
    bgColor: "#E1306C",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    // On mobile the footer is always visible (static), not fixed
    if (isMobile) { setVisible(true); return; }

    const sentinel = document.getElementById("footer-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <footer
      id="contact"
      style={{
        // Fixed + sliding on desktop, static at page bottom on mobile
        position: isMobile ? "static" : "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: isMobile ? "100%" : "100vw",
        zIndex: 101,
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        boxSizing: "border-box" as const,
        transform: isMobile ? "none" : (visible ? "translateY(0)" : "translateY(100%)"),
        transition: isMobile ? "none" : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "40px 20px 24px" : "48px 60px 28px" }}>

        {/* 3 cols desktop, 1 col mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr 1fr",
          gap: isMobile ? "32px" : "60px",
          paddingBottom: "32px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
              Rilwan<span style={{ color: "var(--text-accent)" }}>.</span>
            </p>
            <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.8, color: "#64748b", maxWidth: "260px" }}>
              Computer Engineering graduate dedicated to building clean,
              scalable web experiences and hardware solutions with
              cutting-edge technology.
            </p>
          </div>

          {/* MIDDLE */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#475569" }}>Navigation</p>
            {navLinks.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                style={{ background: "none", border: "none", padding: 0, textAlign: "left" as const, fontSize: "15px", fontWeight: 500, color: "#f1f5f9", cursor: "pointer", transition: "color 0.2s", width: "fit-content" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#f1f5f9")}
              >{label}</button>
            ))}
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#475569" }}>Connect</p>
            <a href="mailto:rilwanyusuf2004@gmail.com"
              style={{ fontSize: "14px", color: "#f1f5f9", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-accent)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#f1f5f9")}
            >rilwanyusuf2004@gmail.com</a>
            <a href="tel:+2349055662928"
              style={{ fontSize: "14px", color: "#f1f5f9", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-accent)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#f1f5f9")}
            >+234 905 566 2928</a>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              {socials.map(({ label, href, bgColor, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: "38px", height: "38px", borderRadius: "8px", background: bgColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none", transition: "transform 0.2s, opacity 0.2s", flexShrink: 0 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >{icon}</a>
              ))}
            </div>
          </div>

        </div>

        <div style={{ paddingTop: "20px" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#475569" }}>© 2025 Rilwan Yusuf. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
