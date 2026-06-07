"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "next-themes";

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0  },
};

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

type Skill = {
  name: string;
  icon: string | null;
  invertOnDark?: boolean;
};

const frontend: Skill[] = [
  { name: "React",      icon: `${D}/react/react-original.svg`                                           },
  { name: "Next.js",    icon: `${D}/nextjs/nextjs-original.svg`,      invertOnDark: true                },
  { name: "HTML",       icon: `${D}/html5/html5-original.svg`                                           },
  { name: "CSS",        icon: `${D}/css3/css3-original.svg`                                             },
  // Using Wikipedia CDN — most reliable source for the Tailwind logo
  { name: "Tailwind",   icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "Bootstrap",  icon: `${D}/bootstrap/bootstrap-original.svg`                                   },
  { name: "JavaScript", icon: `${D}/javascript/javascript-original.svg`                                 },
  { name: "TypeScript", icon: `${D}/typescript/typescript-original.svg`                                 },
  { name: "EJS",        icon: null                                                                       },
];

const backend: Skill[] = [
  { name: "Node.js",    icon: `${D}/nodejs/nodejs-original.svg`                                },
  { name: "Express",    icon: `${D}/express/express-original.svg`,     invertOnDark: true      },
  { name: "PostgreSQL", icon: `${D}/postgresql/postgresql-original.svg`                        },
  { name: "MySQL",      icon: `${D}/mysql/mysql-original.svg`                                  },
  { name: "Postman",    icon: `${D}/postman/postman-original.svg`                              },
];

const hardware: Skill[] = [
  { name: "Arduino",            icon: `${D}/arduino/arduino-original.svg`         },
  { name: "Raspberry Pi",       icon: `${D}/raspberrypi/raspberrypi-original.svg` },
  { name: "Sensor Interfacing", icon: null },
  { name: "Circuit Design",     icon: null },
  { name: "HW Diagnostics",     icon: null },
  { name: "Microcontrollers",   icon: null },
];

function TextBadge({ name }: { name: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: "32px", height: "32px", borderRadius: "6px",
      background: "var(--accent-glow)", border: "1px solid var(--text-accent)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "11px", fontWeight: 700, color: "var(--text-accent)", flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function SkillCard({ skill, isDark }: { skill: Skill; isDark: boolean }) {
  const initials = skill.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const imgFilter = skill.invertOnDark && isDark ? "invert(1)" : "none";

  return (
    <div
      style={{
        minWidth: "155px",
        background: "var(--bg-card)",
        border: "1px solid var(--bg-card-border)",
        borderRadius: "12px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexShrink: 0,
        transition: "border-color 0.2s ease, transform 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--text-accent)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-card-border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ width: "32px", height: "32px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            width={32}
            height={32}
            style={{ objectFit: "contain", display: "block", filter: imgFilter }}
            onError={e => {
              const wrapper = (e.currentTarget as HTMLElement).parentElement!;
              wrapper.innerHTML = `<div style="width:32px;height:32px;border-radius:6px;background:var(--accent-glow);border:1px solid var(--text-accent);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-accent)">${initials}</div>`;
            }}
          />
        ) : (
          <TextBadge name={skill.name} />
        )}
      </div>

      <p style={{
        margin: 0, fontSize: "13px", fontWeight: 700,
        color: "var(--text-primary)", textTransform: "uppercase" as const,
        letterSpacing: "0.04em", whiteSpace: "nowrap" as const,
      }}>
        {skill.name}
      </p>
    </div>
  );
}

function MarqueeRow({ skills, direction = "left", duration = 30, isDark }: {
  skills: Skill[];
  direction?: "left" | "right";
  duration?: number;
  isDark: boolean;
}) {
  const doubled = [...skills, ...skills];
  const animationStyle = direction === "left"
    ? `scroll-left ${duration}s linear infinite`
    : `scroll-right ${duration}s linear infinite`;

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
      onMouseEnter={e => {
        const track = e.currentTarget.querySelector(".marquee-track") as HTMLElement;
        if (track) track.style.animationPlayState = "paused";
      }}
      onMouseLeave={e => {
        const track = e.currentTarget.querySelector(".marquee-track") as HTMLElement;
        if (track) track.style.animationPlayState = "running";
      }}
    >
      <div
        className="marquee-track"
        style={{ display: "flex", gap: "12px", width: "max-content", animation: animationStyle }}
      >
        {doubled.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

function RowLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
      <div style={{ width: "40px", height: "1px", background: "var(--bg-card-border)" }} />
      <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: "var(--text-accent)", textTransform: "uppercase" as const }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: "var(--bg-card-border)" }} />
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section ref={ref} style={{ padding: "100px 0", overflow: "hidden" }}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.15 }}
        style={{ display: "flex", flexDirection: "column", gap: "48px" }}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }} style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ width: "40px", height: "1px", background: "var(--bg-card-border)" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", color: "var(--text-muted)", textTransform: "uppercase" as const }}>
              Inventory
            </span>
            <div style={{ width: "40px", height: "1px", background: "var(--bg-card-border)" }} />
          </div>
          <h2 style={{ fontSize: "48px", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            Skills & <span style={{ color: "var(--text-accent)" }}>Tech Stack</span>
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <RowLabel label="Frontend" />
          <MarqueeRow skills={frontend} direction="left" duration={30} isDark={isDark} />
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <RowLabel label="Backend" />
          <MarqueeRow skills={backend} direction="right" duration={20} isDark={isDark} />
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <RowLabel label="Miscellaneous" />
          <MarqueeRow skills={hardware} direction="left" duration={28} isDark={isDark} />
        </motion.div>

      </motion.div>
    </section>
  );
}