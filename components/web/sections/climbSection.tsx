"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "Your legs burn.",
  "Your confidence shakes.",
  "Your progress feels invisible.",
];

export function ClimbSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const linesRef = useRef<(HTMLLIElement | null)[]>([]);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Heading slides up from below
      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out" },
        0,
      );

      // Sub fades + rises slightly after heading
      tl.fromTo(
        subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out" },
        0.15,
      );

      // Each pain-point line staggers in
      linesRef.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out" },
          0.3 + i * 0.12,
        );
      });

      // Closing paragraph
      tl.fromTo(
        closingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out" },
        0.7,
      );

      // Accent word pops in last
      tl.fromTo(
        accentRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, ease: "back.out(1.7)" },
        0.9,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden min-h-screen py-32 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#08090c" }}
    >
      <div className="w-full h-full flex flex-col lg:flex-row items-stretch justify-center px-6 sm:px-12 lg:px-0">
        {/* ── Left Half: Display Quote (50%) ─────────────────────── */}
        <div className="flex-1 lg:flex-basis-1/2 flex flex-col items-center justify-center text-center py-20 lg:py-0 lg:border-r border-white/5">
          <div className="flex flex-col gap-10 max-w-[600px]">
            <h2
              ref={headingRef}
              className="font-light leading-[0.95] tracking-tighter text-white"
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(3rem, 10vw, 7.5rem)",
                willChange: "transform, opacity",
              }}
            >
              Growth is <br />
              <span className="italic text-accent">uncomfortable.</span>
            </h2>

            <p
              ref={subRef}
              className="font-mono text-[10px] sm:text-xs tracking-[0.5em] uppercase text-white/40 max-w-sm mx-auto leading-loose"
              style={{ willChange: "transform, opacity" }}
            >
              The higher you go, <br />
              the harder it becomes.
            </p>
          </div>
        </div>

        {/* ── Right Half: Procedural List (50%) ───────────────────── */}
        <div className="flex-1 lg:flex-basis-1/2 flex flex-col items-center justify-center text-center py-20 lg:py-0">
          <div className="flex flex-col gap-12 max-w-[500px]">
            {/* Numbered Procedural List */}
            <ul className="flex flex-col gap-10">
              {LINES.map((line, i) => (
                <li
                  key={i}
                  ref={(el) => {
                    linesRef.current[i] = el;
                  }}
                  className="flex flex-col items-center gap-4 group"
                  style={{ willChange: "transform, opacity" }}
                >
                  <span
                    className="font-light text-xl sm:text-2xl tracking-tight text-white/60 group-hover:text-white transition-colors duration-400"
                    style={{ fontFamily: "var(--font-satoshi)" }}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            {/* Transformative Quote */}
            <div className="flex flex-col gap-4 mt-8">
              <p
                ref={closingRef}
                className="font-light text-2xl sm:text-3xl text-white/30 tracking-tight leading-snug"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                But something is changing. <br />
                <span className="text-white/10">Not the mountain.</span> <br />
                <span
                  ref={accentRef}
                  className="text-white text-5xl sm:text-6xl font-black italic tracking-tighter mt-4 inline-block"
                  style={{ fontFamily: "var(--font-satoshi)" }}
                >
                  You.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
