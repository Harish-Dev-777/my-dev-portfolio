import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import SceneCanvas from "@/components/web/backgrounds/SceneCanvas";
import VideoBackground from "@/components/web/backgrounds/VideoBackground";
import Preloader from "@/components/web/ux/Preloader";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/satoshi/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

const manrope = localFont({
  src: [
    {
      path: "../public/fonts/Manrope/Manrope-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/Manrope-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/Manrope-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/Manrope-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/Manrope-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/Manrope-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/Manrope-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "From Curiosity to Systems — Developer Journey",
  description:
    "A 9-month developer transformation documented as a cinematic scroll-driven experience. HTML, CSS, JavaScript, React, GSAP, Next.js, AI, and 3D web.",
  keywords: [
    "developer journey",
    "portfolio",
    "full-stack developer",
    "web development",
    "GSAP",
    "Next.js",
    "React",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${manrope.variable}`}>
        {/* Spline viewer loaded after page becomes interactive */}
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.58/build/spline-viewer.js"
          strategy="lazyOnload"
        />

        {/* ── Premium Preloader (z-index: 999) ── */}
        <Preloader />

        {/* ── Fixed Video Background: sequential playback ── */}
        <VideoBackground />

        {/* ── Cinematic scroll-driven background (z-index: 0) ── */}
        <SceneCanvas />

        {/* Dark overlay for readability sits between Scene and Content (z-index: 1) */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-1 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,9,12,0.6) 0%, rgba(8,9,12,0.1) 40%, rgba(8,9,12,0.1) 60%, rgba(8,9,12,0.7) 100%)",
          }}
        />
        {/* ── Page content sits above background ── */}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </body>
    </html>
  );
}
