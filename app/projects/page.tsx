// app/projects/page.tsx
// This page is linked from the "View all projects" button on the home page.
// Add all your projects here — not just the 3 featured ones.
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0  },
};

// ─── Full projects list ───
// Copy the same structure as the featured array in Projects.tsx.
// Add as many as you like here.
const allProjects = [
  {
    title: "Smart Calendar System",
    category: "Hardware",
    description: "Raspberry Pi–based interactive calendar with automatic date updating, RTC backup, and PostgreSQL database integration.",
    tags: ["Raspberry Pi", "PostgreSQL", "Python", "RTC", "Linux"],
    image: "",
    github: "https://github.com/Rilwan2004",
    live: "",
  },
  {
    title: "4WD Obstacle-Avoiding Robot",
    category: "Hardware",
    description: "Arduino-based autonomous robot car capable of real-time obstacle detection and avoidance using ultrasonic sensors.",
    tags: ["Arduino", "C++", "Ultrasonic Sensors", "Embedded Systems"],
    image: "",
    github: "https://github.com/Rilwan2004",
    live: "",
  },
  {
    title: "To-Do List Application",
    category: "Web App",
    description: "Responsive task management web app built with React.js featuring local storage persistence, task filtering, and completion tracking.",
    tags: ["React.js", "JavaScript", "CSS", "Local Storage"],
    image: "",
    github: "https://github.com/Rilwan2004",
    live: "",
  },
  {
    title: "Handwriting-to-Text OCR",
    category: "ML / AI",
    description: "Machine learning model that converts handwritten text into machine-readable form using optical character recognition techniques.",
    tags: ["Python", "OCR", "Machine Learning", "Computer Vision"],
    image: "",
    github: "https://github.com/Rilwan2004",
    live: "",
  },
  {
    title: "Weather Application",
    category: "Web App",
    description: "Node.js and Express web app that fetches real-time weather data using a public API with dynamic EJS templates.",
    tags: ["Node.js", "Express", "EJS", "Axios", "REST API"],
    image: "",
    github: "https://github.com/Rilwan2004",
    live: "",
  },
];

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

function ProjectCard({ title, category, description, tags, image, github, live }: {
  title: string; category: string; description: string;
  tags: string[]; image: string; github: string; live: string;
}) {
  const visibleTags   = tags.slice(0, 4);
  const overflowCount = tags.length - 4;

  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--bg-card-border)",
      borderRadius: "16px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s ease, border-color 0.2s ease",
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--text-accent)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-card-border)";
      }}
    >
      {/* Screenshot */}
      <div style={{ width: "100%", height: "180px", background: "var(--accent-glow)", borderBottom: "1px solid var(--bg-card-border)", overflow: "hidden", flexShrink: 0 }}>
        {image ? (
          <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
            <span style={{ fontSize: "11px", color: "var(--text-accent)", fontWeight: 500 }}>Add screenshot</span>
          </div>
        )}
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>{title}</h3>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-accent)", background: "var(--accent-glow)", border: "1px solid var(--text-accent)", padding: "3px 8px", borderRadius: "6px", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
            {category}
          </span>
        </div>

        <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.7, color: "var(--text-muted)", flexGrow: 1 }}>{description}</p>

        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
          {visibleTags.map(tag => (
            <span key={tag} style={{ fontSize: "11px", fontWeight: 500, color: "var(--text-primary)", border: "1px solid var(--bg-card-border)", padding: "3px 10px", borderRadius: "6px" }}>{tag}</span>
          ))}
          {overflowCount > 0 && <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-accent)", padding: "3px 0" }}>+{overflowCount}</span>}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <a href={live || "#"} target={live ? "_blank" : undefined} rel="noopener noreferrer"
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", borderRadius: "8px", background: live ? "var(--text-primary)" : "var(--bg-card)", border: "1px solid var(--bg-card-border)", color: live ? "var(--bg-primary)" : "var(--text-muted)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase" as const, opacity: live ? 1 : 0.4 }}>
            <GlobeIcon /> Live Demo
          </a>
          <a href={github || "#"} target={github ? "_blank" : undefined} rel="noopener noreferrer"
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", borderRadius: "8px", background: "transparent", border: "1px solid var(--bg-card-border)", color: github ? "var(--text-primary)" : "var(--text-muted)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase" as const, opacity: github ? 1 : 0.4 }}>
            <CodeIcon /> Source
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AllProjectsPage() {
  const router = useRouter();

  return (
    <div style={{ padding: "60px 0 100px" }}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        style={{ display: "flex", flexDirection: "column", gap: "40px" }}
      >
        {/* Back button */}
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <button
            onClick={() => router.push("/")}
            style={{ background: "transparent", border: "none", color: "var(--text-accent)", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", padding: 0, fontWeight: 500 }}
          >
            ← Back to home
          </button>
        </motion.div>

        {/* Heading */}
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <p style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--text-accent)", margin: "0 0 12px" }}>
            Everything I've built
          </p>
          <h1 style={{ fontSize: "40px", fontWeight: 700, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.02em" }}>
            All Projects
          </h1>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}
        >
          {allProjects.map(p => <ProjectCard key={p.title} {...p} />)}
        </motion.div>
      </motion.div>
    </div>
  );
}