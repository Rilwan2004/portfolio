import type { Metadata } from "next";
import Providers from "@/app/components/Providers";
import ParticleBackground from "@/app/components/Particlebackground";
import Navbar from "@/app/components/Navbar";
import SocialSidebar from "@/app/components/SocialSidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rilwan | Portfolio",
  description: "Frontend developer portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <ParticleBackground />
          <Navbar />
          <SocialSidebar />
          {/*
            Switched from inline style to className="main-content".
            The responsive padding is now handled by media queries in globals.css.
            This is the only change from your original layout.tsx.
          */}
          <main className="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
