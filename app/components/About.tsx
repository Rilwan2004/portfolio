"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "../hooks/isMobile";

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0  },
};

// Reusable card style — keeps all 3 cards identical
function cardStyle(isMobile: boolean): React.CSSProperties {
  return {
    width: isMobile ? "100%" : "320px",
    background: "var(--bg-card)",
    border: "1px solid var(--text-accent)",
    borderRadius: "16px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flexShrink: 0,
    transition: "transform 0.2s ease",
    boxSizing: "border-box",
  };
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { isMobile } = useIsMobile();

  return (
    <section ref={ref} style={{ padding: "100px 0" }}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.15 }}
        style={{ display: "flex", flexDirection: "column", gap: "48px" }}
      >

        {/* Heading */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--text-accent)", margin: "0 0 12px" }}>
            Get to know me
          </p>
          <h2 style={{ fontSize: isMobile ? "32px" : "40px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            About Me
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--text-muted)", margin: "0 0 12px", maxWidth: "580px" }}>
            A motivated Computer Engineering graduate with hands-on experience in frontend development,
            backend technologies, networking, and embedded systems.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", display: "block", flexShrink: 0 }} />
            <span style={{ fontSize: "13px", color: "#4ade80", fontWeight: 500 }}>Open to opportunities</span>
          </div>
        </motion.div>

        {/* Cards — stack vertically on mobile, row on desktop */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            flexDirection: isMobile ? "column" : "row",
          }}
        >

          {/* Card 1 — Education */}
          <div
            style={cardStyle(isMobile)}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--accent-glow)", border: "1px solid var(--text-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🎓</div>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>Education</h3>
              <p style={{ margin: "0 0 2px", fontSize: "13px", color: "var(--text-accent)", fontWeight: 500 }}>Elizade University · Ondo State</p>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>Graduating Sep 2025</p>
            </div>
            <div style={{ height: "1px", background: "var(--bg-card-border)" }} />
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "B.Eng. in Computer Engineering",
                "GMNSE — Graduate Member, Nigerian Society of Engineers",
                "Microsoft Professional Cyber-Security Certification (Ongoing)",
              ].map((point, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--text-accent)", fontWeight: 700, fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>›</span>
                  <span style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--text-muted)" }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 — JIT Solutions */}
          <div
            style={cardStyle(isMobile)}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--accent-glow)", border: "1px solid var(--text-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🎓</div>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>Experience</h3>
              <p style={{ margin: "0 0 2px", fontSize: "13px", color: "var(--text-accent)", fontWeight: 500 }}>JIT Solutions. Frontend Development Intern</p>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>APR 2023 - NOV 2023 Intern</p>
            </div>
            <div style={{ height: "1px", background: "var(--bg-card-border)" }} />
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Built responsive web interfaces using HTML, CSS, and JavaScript, improving usability across multiple screen sizes",
                "Developed features including authentication forms and task management apps with persistent local storage",
                "Structured frontend components with React.js, enhancing code organization and UI responsiveness",
              ].map((point, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--text-accent)", fontWeight: 700, fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>›</span>
                  <span style={{ fontSize: "12px", lineHeight: 1.65, color: "var(--text-muted)" }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 — EMDI */}
          <div
            style={cardStyle(isMobile)}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--accent-glow)", border: "1px solid var(--text-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🎓</div>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>Experience</h3>
              <p style={{ margin: "0 0 2px", fontSize: "13px", color: "var(--text-accent)", fontWeight: 500 }}>EMDI. IT Support Intern</p>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>APR 2024 - SEPT 2024</p>
            </div>
            <div style={{ height: "1px", background: "var(--bg-card-border)" }} />
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Resolved hardware, software, and network issues across departments, maintaining consistent system availability",
                "Installed and configured IT systems (routers, OS, and network devices), improving infrastructure reliability and uptime",
                "Supported backend development by building and testing REST APIs with Node.js, Express, and Postman",
              ].map((point, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--text-accent)", fontWeight: 700, fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>›</span>
                  <span style={{ fontSize: "12px", lineHeight: 1.65, color: "var(--text-muted)" }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
}
