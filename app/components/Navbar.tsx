"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useIsMobile } from "../hooks/isMobile";

const navLinks = [
  { label: "Home",     id: "home"     },
  { label: "About",    id: "about"    },
  { label: "Skills",   id: "skills"   },
  { label: "Projects", id: "projects" },
  { label: "Contact",  id: "contact"  },
];

export default function Navbar() {
  const [active, setActive]     = useState("home");
  const [mounted, setMounted]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme }     = useTheme();
  const { isMobile }            = useIsMobile();

  useEffect(() => setMounted(true), []);
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          backgroundColor: "var(--nav-bg)",
          borderBottom: "1px solid var(--nav-border)",
          transition: "background-color 0.3s ease",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: isMobile ? "12px 20px" : "16px 40px",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          maxWidth: "960px",
          margin: "0 auto",
        }}>

          {/* Name */}
          <p style={{
            margin: 0,
            fontSize: isMobile ? "18px" : "25px",
            fontWeight: 700,
            fontFamily: "'Gugi', sans-serif",
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
            flexShrink: 0,
          }}>
            Rilwan Yusuf
          </p>

          {/* Desktop — nav pill */}
          {!isMobile && (
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "var(--nav-tray)",
              border: "1px solid var(--nav-border)",
              borderRadius: "12px",
              padding: "4px 6px",
            }}>
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: active === id ? 500 : 400,
                    border: active === id ? "1px solid var(--nav-border)" : "1px solid transparent",
                    background: active === id ? "var(--nav-active-bg)" : "transparent",
                    color: active === id ? "var(--text-primary)" : "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {label}
                </button>
              ))}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  style={{
                    marginLeft: "4px", padding: "5px 8px",
                    borderRadius: "8px", border: "none",
                    background: "transparent", color: "var(--text-muted)",
                    cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    transition: "color 0.2s ease",
                  }}
                >
                  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                </button>
              )}
            </div>
          )}

          {/* Mobile — theme + hamburger */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  style={{
                    padding: "6px", borderRadius: "8px", border: "none",
                    background: "transparent", color: "var(--text-muted)",
                    cursor: "pointer", display: "flex", alignItems: "center",
                  }}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              )}
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
                style={{
                  padding: "6px", borderRadius: "8px", border: "none",
                  background: "transparent", color: "var(--text-primary)",
                  cursor: "pointer", display: "flex", alignItems: "center",
                }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          )}

        </div>
      </header>

      {/* Mobile dropdown */}
      {isMobile && (
        <div style={{
          position: "fixed",
          top: "54px", left: 0, right: 0,
          zIndex: 49,
          background: "var(--nav-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--nav-border)",
          display: "flex",
          flexDirection: "column",
          padding: menuOpen ? "12px 20px 16px" : "0 20px",
          gap: "4px",
          maxHeight: menuOpen ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease, padding 0.3s ease",
        }}>
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: active === id ? 600 : 400,
                background: active === id ? "var(--nav-active-bg)" : "transparent",
                color: active === id ? "var(--text-primary)" : "var(--text-muted)",
                border: "none",
                cursor: "pointer",
                textAlign: "left" as const,
                transition: "all 0.2s ease",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
