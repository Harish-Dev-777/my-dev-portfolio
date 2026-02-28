"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const para = paraRef.current;
    const section = heroRef.current;
    if (!heading || !para || !section) return;

    // ── Parallax: text scales up + fades out as user scrolls away ──────────
    // This runs while the hero is exiting — text zooms toward you
    // then vanishes, like you're "entering" the image world.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(
      heading,
      {
        scale: 1.12,
        y: -30,
        opacity: 0,
        ease: "none",
      },
      0,
    );

    tl.to(
      para,
      {
        scale: 1.06,
        y: -20,
        opacity: 0,
        ease: "none",
      },
      0,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const paragraph = `Before the applause.
Before the recognition.
Before the success.`;

  return (
    <section
      id="section-home"
      ref={heroRef}
      className="section relative flex flex-col justify-center pt-24 sm:pt-28 min-h-screen overflow-hidden"
    >
      <div className="relative z-10">
        <h1
          ref={headingRef}
          className="text-display"
          style={{
            transformOrigin: "left center",
            willChange: "transform, opacity",
          }}
        >
          Every journey begins in silence.
        </h1>
        <p
          ref={paraRef}
          className="text-subheading whitespace-pre-line mt-8 max-w-2xl opacity-70"
          style={{
            transformOrigin: "left center",
            willChange: "transform, opacity",
          }}
        >
          {paragraph}
        </p>
      </div>

      {/* ── Scroll Down Indicator: Absolute bottom of section ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/30 whitespace-nowrap">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-accent/60"
          >
            <ArrowDown size={20} strokeWidth={1} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default hero;
