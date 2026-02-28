"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

// ─── Nav Items (Adcker Inspired) ──────────────────────────────────────────
const NAV_ITEMS = [
  { main: "INDEX", sub: "Home", id: "section-home" },
  { main: "SERVICES", sub: "What I do", id: "section-services" },
  { main: "PROJECTS", sub: "Our work", id: "section-projects" },
  { main: "ABOUT", sub: "Who I am", id: "section-about" },
  { main: "CONTACT", sub: "Get in touch", id: "section-contact" },
];

// ─── Hamburger Component (Trigger) ──────────────────────────────────────────
const Hamburger = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-8 h-6 flex flex-col justify-between overflow-hidden">
    <motion.span
      animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 11 : 0 }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="block w-full h-[1.5px] bg-white rounded-full origin-center"
    />
    <motion.span
      animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 20 : 0 }}
      transition={{ duration: 0.3 }}
      className="block w-full h-[1.5px] bg-white rounded-full origin-center"
    />
    <motion.span
      animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -11 : 0 }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="block w-full h-[1.5px] bg-white rounded-full origin-center"
    />
  </div>
);

// ─── Navbar Overlay ───────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* ── Fixed Trigger Bar ───────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-500 transition-colors duration-500 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <button
            onClick={() => navigate("section-about")}
            className="text-white hover:text-accent transition-colors font-light tracking-tight text-xl absolute left-6 sm:left-10 top-8"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            harish
          </button>
        </div>

        {/* Minimalist Trigger: MENU / CLOSE (Text Only) */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-accent transition-colors font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase absolute right-6 sm:right-10 top-9"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-400 overflow-hidden flex flex-col"
          >
            {/* Center: Links */}
            <div className="flex-1 flex flex-col justify-center items-center px-6">
              <nav className="flex flex-col items-center gap-2 sm:gap-4 md:gap-6">
                {/* 1. INDEX / Home */}
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative group flex items-baseline gap-3"
                >
                  <span className="font-serif italic text-sm sm:text-base opacity-20 mt-3 lg:mt-4 text-white">
                    01
                  </span>
                  <button
                    onClick={() => navigate("section-home")}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-none hover:text-accent transition-colors duration-400 text-white"
                  >
                    INDEX
                  </button>
                </motion.div>

                {/* 2. SERVICES / What I do */}
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative group flex items-baseline gap-3"
                >
                  <button
                    onClick={() => navigate("section-services")}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-none hover:text-accent transition-colors duration-400 text-white"
                  >
                    SERVICES
                  </button>
                  <span className="font-serif italic text-sm sm:text-base opacity-20 mt-3 lg:mt-4 text-white">
                    What I do
                  </span>
                </motion.div>

                {/* 3. OUR WORK / Projects */}
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative group flex items-baseline gap-3"
                >
                  <span className="font-serif italic text-sm sm:text-base opacity-20 mt-3 lg:mt-4 text-white">
                    Projects
                  </span>
                  <button
                    onClick={() => navigate("section-projects")}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-none hover:text-accent transition-colors duration-400 text-white"
                  >
                    OUR WORK
                  </button>
                </motion.div>

                {/* 4. * ( Image ) Portrait */}
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-4 sm:gap-6 my-4 sm:my-6"
                >
                  <span className="text-2xl sm:text-4xl font-light opacity-20 text-white">
                    *
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-4xl font-light opacity-20 text-white">
                      (
                    </span>
                    <button
                      onClick={() => navigate("section-about")}
                      className="relative w-10 h-14 sm:w-16 sm:h-24 md:w-20 md:h-28 overflow-hidden rounded-md transition-all duration-500 hover:scale-105 active:scale-95 group/img"
                    >
                      <Image
                        src="/MyImage.jpeg"
                        alt="Harish"
                        fill
                        className="object-cover object-top"
                      />
                    </button>
                    <span className="text-2xl sm:text-4xl font-light opacity-20 text-white">
                      )
                    </span>
                  </div>
                  <span className="font-serif italic text-sm sm:text-base opacity-20 text-white">
                    Harish
                  </span>
                </motion.div>

                {/* 5. ABOUT / Who we are */}
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative group flex items-baseline gap-3"
                >
                  <span className="font-serif italic text-sm sm:text-base opacity-20 mt-3 lg:mt-4 text-white">
                    Who I am
                  </span>
                  <button
                    onClick={() => navigate("section-about")}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-none hover:text-accent transition-colors duration-400 text-white"
                  >
                    ABOUT
                  </button>
                </motion.div>

                {/* 6. CONTACT / Get in touch */}
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative group flex items-baseline gap-3"
                >
                  <button
                    onClick={() => navigate("section-contact")}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-none hover:text-accent transition-colors duration-400 text-white"
                  >
                    CONTACT
                  </button>
                  <span className="font-serif italic text-sm sm:text-base opacity-20 mt-3 lg:mt-4 text-white">
                    Get in touch
                  </span>
                </motion.div>
              </nav>
            </div>

            {/* Bottom: Minimal Branding */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <span className="font-mono text-[8px] tracking-[0.6em] uppercase text-white/5">
                Selection 2026 — Portfolio Edition
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
