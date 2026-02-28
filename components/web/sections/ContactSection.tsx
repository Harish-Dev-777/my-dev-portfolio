"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Linkedin, Github, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";

const EMAIL = "harishmkdev@gmail.com";

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/harishdev777",
    icon: <Linkedin size={24} color="#0077b5" />,
    color: "#0077b5",
  },
  {
    name: "GitHub",
    url: "https://github.com/Harish-Dev-777",
    icon: <Github size={24} color="#ffffff" />,
    color: "#ffffff",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/codecrush_777/",
    icon: <Instagram size={24} color="#e4405f" />,
    color: "#e4405f",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/919025946625",
    icon: <MessageCircle size={24} color="#25d366" />,
    color: "#25d366",
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");
  const [emailHovered, setEmailHovered] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: false,
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="section-contact"
      ref={sectionRef}
      className="relative z-10 bg-[#040507] overflow-hidden min-h-screen flex flex-col items-center justify-center py-20"
    >
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-20 lg:gap-0 px-6 sm:px-12 lg:px-0">
        {/* ── Left Column: Connect (50%) ─────────────────────────── */}
        <div className="flex-1 lg:basis-1/2 flex flex-col items-center justify-center text-center py-20 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/5">
          <div className="flex flex-col gap-12 items-center">
            <motion.div style={{ y: headingY, opacity: headingOpacity }}>
              <h2
                className="font-light leading-[0.9] tracking-tighter text-white"
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(3.5rem, 12vw, 9rem)",
                }}
              >
                LET&apos;S <br />
                <span className="text-accent italic">CONNECT.</span>
              </h2>
            </motion.div>

            <div className="flex flex-col gap-6 items-center">
              <Link
                href={`mailto:${EMAIL}`}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
                className="group relative inline-block w-fit"
              >
                <span
                  className="font-light tracking-tighter transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    fontSize: "clamp(1.5rem, 4vw, 3rem)",
                    color: emailHovered
                      ? "var(--color-accent)"
                      : "rgba(255,255,255,0.8)",
                  }}
                >
                  {EMAIL}
                </span>
                <motion.div
                  className="h-px bg-accent absolute bottom-0 left-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: emailHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", originX: 0 }}
                />
              </Link>

              <div className="flex items-center gap-4 mt-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">
                  Ready to collaborate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Socials (50%) ────────────────────────── */}
        <div className="flex-1 lg:basis-1/2 flex flex-col items-center justify-center text-center py-20 lg:py-0">
          <div className="flex flex-col gap-10">
            {SOCIAL_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                className="group flex items-center justify-center gap-6"
              >
                <div className="flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  {link.icon}
                </div>
                <span
                  className="font-light text-2xl sm:text-3xl xl:text-5xl tracking-tight text-white/20 group-hover:text-accent transition-all duration-300 group-hover:translate-x-2"
                  style={{ fontFamily: "var(--font-satoshi)" }}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
