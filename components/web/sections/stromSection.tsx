"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHALLENGES = ["Failure.", "Rejection.", "Mistakes.", "Fear."];

export function StormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = wordRefs.current.filter(Boolean) as HTMLParagraphElement[];

    // ── Set all words invisible before animation ──────────────────────────
    gsap.set(words, { opacity: 0, y: 50, filter: "blur(10px)" });

    // ── Single scrubbed timeline drives all 4 words ───────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        // 4 words × 100vh of scroll each while pinned
        end: `+=${CHALLENGES.length * window.innerHeight}`,
        pin: true, // section pins to top of viewport
        pinSpacing: true, // adds spacer so page length is correct
        scrub: 1, // smooth 1s lag behind scroll
        anticipatePin: 0.5,
      },
    });

    // Each word gets ~25% of the total timeline duration
    words.forEach((word, i) => {
      tl.to(
        word,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1, // 1 "unit" in the timeline
          ease: "power3.out",
        },
        i * 1.2, // stagger by 1.2 units so they don't overlap
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* ── Storm intro section ── */}
      <section className="section flex flex-col justify-center gap-10">
        <h2 className="text-heading max-w-xl">
          The storm doesn't ask if you're ready.
        </h2>
        <p className="text-body opacity-40 max-w-sm">
          Challenges arrive unannounced.
        </p>
        <p className="text-body-large max-w-2xl self-end text-right">
          The wind pushes back.
          <br />
          The world tests your balance.
          <br />
          This is where most turn around.
          <br />
          But storms don't last forever.
          <br />
          <span className="text-accent">Quitters do.</span>
        </p>
      </section>

      {/*
        ── Pinned challenge reveal ───────────────────────────────────────────
        This div PINS at the top. While pinned, the GSAP timeline scrubs
        through 4 words — each fades+rises in and stays visible.
        pinSpacing: true ensures the surrounding page gets the extra
        400vh of room so there's no jump when unpinning.
        Background covers the canvas so the image feel ends here.
      */}
      <div
        ref={sectionRef}
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "#08090c",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(8px, 2vh, 20px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle section label */}
        <p
          style={{
            position: "absolute",
            top: "clamp(24px, 4vh, 48px)",
            left: "clamp(24px, 8vw, 120px)",
            fontFamily: "var(--font-manrope)",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(56,189,248,0.4)",
          }}
        >
          The weight of it all
        </p>

        {/* Challenge words — stacked in a column, animate in sequentially */}
        {CHALLENGES.map((word, i) => (
          <p
            key={word}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className="text-display text-center select-none"
            style={{
              // Alternate white / sky-blue
              color: i % 2 === 0 ? "#f0f4ff" : "#38bdf8",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              // Will-change for GPU compositing
              willChange: "transform, opacity, filter",
            }}
          >
            {word}
          </p>
        ))}

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(24px, 4vh, 48px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            height: "clamp(32px, 5vh, 60px)",
            background:
              "linear-gradient(to bottom, rgba(56,189,248,0.5), transparent)",
          }}
        />
      </div>
    </>
  );
}
