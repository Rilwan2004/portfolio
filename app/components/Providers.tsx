"use client";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      // disableTransitionOnChange prevents a flash of unstyled content
      // when the theme first loads — which is one of the causes of the
      // hydration mismatch warning you saw.
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}