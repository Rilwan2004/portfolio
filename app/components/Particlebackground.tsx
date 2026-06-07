"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [engineReady, setEngineReady] = useState(false);
  const { resolvedTheme } = useTheme();

  // Load the tsParticles engine once on mount.
  // loadSlim keeps the bundle small — no physics or extra plugins.
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  // Don't render until engine is ready AND theme is resolved.
  // resolvedTheme can be undefined on first server render.
  if (!engineReady || !resolvedTheme) return null;

  const isDark    = resolvedTheme === "dark";
  const bgColor   = isDark ? "#000000" : "#f8fafc";  // matches --bg-primary
  const dotColor  = isDark ? "#ffffff" : "#000000";   // contrast against bg
  const dotOpacity = isDark ? 0.45 : 0.45;            // subtler in light mode

  return (
    <Particles
      // key re-mounts the canvas on theme change so bgColor updates instantly
      key={resolvedTheme}
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0, // behind everything — navbar is z-50, content is z-1
        },
        fpsLimit: 60,
        background: {
          // This is the background color — no body background needed.
          // Switching theme re-renders this component with the new color.
          color: { value: bgColor },
        },
        particles: {
          number: {
            value: 300,
            density: { enable: true, area: 900 },
          },
          color: { value: dotColor },
          opacity: {
            value: dotOpacity,
            animation: {
              enable: true,
              speed: 0.6,
              minimumValue: isDark ? 0.04 : 0.02,
              sync: false, // each dot pulses independently
            },
          },
          size: {
            value: { min: 1, max: 2 }, // tiny — not distracting
          },
          move: {
            enable: true,
            speed: 0.35,       // very slow drift
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
          },
          links: { enable: false }, // no connecting lines between dots
        },
        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },
        detectRetina: true,
      }}
    />
  );
}