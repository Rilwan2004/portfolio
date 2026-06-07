"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "../hooks/isMobile";

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0  },
};

const featured = [
  {
    title: "Smart Calendar System",
    description: "Raspberry Pi–based interactive calendar with automatic date updating, RTC backup, and PostgreSQL database integration.",
    tags: ["Raspberry Pi", "PostgreSQL", "Python", "RTC", "Linux"],
    image: "",
    github: "https://github.com/Rilwan2004",
    live: "",
  },
  {
    title: "To-Do List Application",
    description: "Responsive task management web app built with React.js featuring local storage persistence, task filtering, and completion tracking.",
    tags: ["React.js", "JavaScript", "CSS", "Local Storage"],
    image: "",
    github: "https://github.com/Rilwan2004",
    live: "",
  },
  {
    title: "Weather Application",
    description: "Node.js and Express web app that fetches real-time weather data using a public API, with dynamic EJS templates and Axios.",
    tags: ["Node.js", "Express", "EJS", "Axios", "REST API"],
    image: "",
    github: "https://github.com/Rilwan2004",
    live: "",
  },
];

const MAX_TAGS = 4;

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

function ProjectCard({ title, description, tags, image, github, live }: {
  title: string; description: string; tags: string[];
  image: string; github: string; live: string;
}) {
  const visibleTags   = tags.slice(0, MAX_TAGS);
  const overflowCount = tags.length - MAX_TAGS;

  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--bg-card-border)",
      borderRadius: "16px", overflow: "hidden", display: "flex",
      flexDirection: "column", transition: "transform 0.2s ease, border-color 0.2s ease",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--text-accent)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-card-border)"; }}
    >
      <div style={{ width: "100%", height: "200px", background: "var(--bg-card)", borderBottom: "1px solid var(--bg-card-border)", overflow: "hidden", position: "relative", flexShrink: 0 }}>
        {image ? (
          <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", background: "var(--accent-glow)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
            <span style={{ fontSize: "12px", color: "var(--text-accent)", fontWeight: 500 }}>Add screenshot</span>
          </div>
        )}
      </div>

      <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
        <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.75, color: "var(--text-muted)", flexGrow: 1 }}>{description}</p>

        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "8px" }}>
          {visibleTags.map(tag => (
            <span key={tag} style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)", background: "transparent", border: "1px solid var(--bg-card-border)", padding: "4px 12px", borderRadius: "6px" }}>{tag}</span>
          ))}
          {overflowCount > 0 && <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-accent)", padding: "4px 4px" }}>+{overflowCount}</span>}
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
          <a href={live || "#"} target={live ? "_blank" : undefined} rel="noopener noreferrer"
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "11px", borderRadius: "10px", background: live ? "var(--text-primary)" : "var(--bg-card)", border: "1px solid var(--bg-card-border)", color: live ? "var(--bg-primary)" : "var(--text-muted)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase" as const, cursor: live ? "pointer" : "default", opacity: live ? 1 : 0.4, transition: "opacity 0.2s" }}
            onMouseEnter={e => { if (live) (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
            onMouseLeave={e => { if (live) (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          ><GlobeIcon /> Live Demo</a>

          <a href={github || "#"} target={github ? "_blank" : undefined} rel="noopener noreferrer"
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "11px", borderRadius: "10px", background: "transparent", border: "1px solid var(--bg-card-border)", color: github ? "var(--text-primary)" : "var(--text-muted)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase" as const, cursor: github ? "pointer" : "default", opacity: github ? 1 : 0.4, transition: "background 0.2s" }}
            onMouseEnter={e => { if (github) (e.currentTarget as HTMLElement).style.background = "var(--bg-card)"; }}
            onMouseLeave={e => { if (github) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          ><CodeIcon /> Source</a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const router   = useRouter();
  const { isMobile, isTablet } = useIsMobile();

  // 1 col on mobile, 2 on tablet, 3 on desktop
  const columns = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <section ref={ref} style={{ padding: "100px 0" }}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.15 }}
        style={{ display: "flex", flexDirection: "column", gap: "40px" }}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--text-accent)", margin: "0 0 12px" }}>What I've built</p>
          <h2 style={{ fontSize: isMobile ? "32px" : "40px", fontWeight: 700, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.02em" }}>Projects</h2>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
          style={{ display: "grid", gridTemplateColumns: columns, gap: "20px" }}
        >
          {featured.map(project => <ProjectCard key={project.title} {...project} />)}
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5 }} style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => router.push("/projects")}
            style={{ padding: "14px 40px", borderRadius: "10px", background: "transparent", border: "1px solid var(--text-accent)", color: "var(--text-accent)", fontWeight: 600, fontSize: "14px", cursor: "pointer", letterSpacing: "0.04em", transition: "background 0.2s ease" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--accent-glow)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            View all projects →
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
