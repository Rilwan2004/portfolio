"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/isMobile";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0  },
};

export default function Hero() {
  const { isMobile } = useIsMobile();

  return (
    <div style={{
      position: "relative",
      minHeight: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: isMobile ? "40px 0" : "80px 0",
      overflow: "hidden",
    }}>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "48px",
        // Stack photo above text on mobile
        flexDirection: isMobile ? "column-reverse" : "row",
      }}>

        {/* LEFT — text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
          style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-accent)",
              margin: 0,
            }}
          >
            Hey there, I'm
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: isMobile ? "44px" : "64px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Rilwan
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: isMobile ? "20px" : "28px",
              fontWeight: 600,
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            And I am a Fullstack Developer
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--text-muted)",
              margin: 0,
              maxWidth: "480px",
            }}
          >
            "I design and build full-stack applications that solve real problems, not just pass tutorials. I'm passionate about crafting clean, efficient code and intuitive user experiences."
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", gap: "16px", marginTop: "8px", flexWrap: "wrap" as const }}
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "var(--accent)", color: "#ffffff",
                fontWeight: 600, padding: "12px 28px",
                borderRadius: "8px", border: "none",
                fontSize: "14px", cursor: "pointer", transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              View Projects
            </button>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "transparent", color: "var(--text-primary)",
                fontWeight: 500, padding: "12px 28px",
                borderRadius: "8px", border: "1px solid var(--bg-card-border)",
                fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-card)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              Resume
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT — circular photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ flexShrink: 0 }}
        >
          <img
            src="/rilwan.jpg"
            alt="Rilwan"
            style={{
              width: isMobile ? "140px" : "220px",
              height: isMobile ? "140px" : "220px",
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
              border: "5px solid var(--accent-glow)",
            }}
          />
        </motion.div>

      </div>
    </div>
  );
}
