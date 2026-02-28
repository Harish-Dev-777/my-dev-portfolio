"use client";

import { useState, useEffect } from "react";
import {
  ArrowUp,
  Instagram,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const [time, setTime] = useState("");

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

  const socialLinks = [
    {
      icon: <Linkedin size={18} />,
      url: "https://www.linkedin.com/in/harishdev777",
    },
    { icon: <Github size={18} />, url: "https://github.com/Harish-Dev-777" },
    {
      icon: <Instagram size={18} />,
      url: "https://www.instagram.com/codecrush_777/",
    },
    { icon: <MessageCircle size={18} />, url: "https://wa.me/919025946625" },
  ];

  return (
    <footer className="w-full bg-[#020406] py-24 px-6 sm:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-12 items-center">
        {/* ── Left Column: Info ─────────────────────────── */}
        <div className="flex flex-col gap-8 items-center text-center lg:items-center">
          <div className="flex flex-col gap-2">
            <h3
              className="font-light text-3xl text-white/90"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              Harish Dev
            </h3>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent/40">
              Full stack developer
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">
              Location
            </span>
            <span
              className="font-light text-white/50 text-xl"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              Chennai, Tamil Nadu, IN
            </span>
          </div>
        </div>

        {/* ── Center Column: Nav & Copyright ────────────────── */}
        <div className="flex flex-col items-center justify-center h-full gap-16 order-first lg:order-0">
          <nav className="flex flex-col items-center justify-center gap-6 ">
            {["Home", "Projects", "Skills", "About"].map((item) => (
              <button
                key={item}
                className="font-mono text-[11px] tracking-[0.5em] uppercase text-white/30 hover:text-accent transition-all hover:translate-x-1"
                onClick={() => {
                  const id = `section-${item.toLowerCase() === "home" ? "home" : item.toLowerCase()}`;
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/10">
              © {new Date().getFullYear()} — All Rights Reserved
            </span>
            
          </div>
        </div>

        {/* ── Right Column: Utility ───────────────────────── */}
        <div className="flex flex-col items-center lg:items-center gap-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex flex-col items-center gap-4 font-mono text-[11px] tracking-[0.5em] uppercase text-white/30 hover:text-accent transition-all"
          >
            <ArrowUp
              size={20}
              className="group-hover:-translate-y-2 transition-transform duration-500"
            />
            Back to top
          </button>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 text-white/50 font-mono text-sm tabular-nums tracking-widest bg-white/3 px-6 py-3 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
              {time} IST
            </div>

            <div className="flex items-center gap-8 mt-2">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.url}
                  target="_blank"
                  className="text-white/10 hover:text-accent transition-all duration-300 hover:scale-125"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
