"use client";

import { useEffect, useState } from "react";

// Single source of truth for breakpoints.
// Import this hook in any component that needs responsive behaviour.
// Usage: const { isMobile, isTablet } = useIsMobile();
export function useIsMobile() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update(); // set on mount
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    isMobile:  width < 768,   // phones
    isTablet:  width < 1024,  // tablets
    isDesktop: width >= 1024, // desktops
    width,
  };
}