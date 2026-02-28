"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";

const SKILLS = [
  { name: "React", src: "/skills_logos/React.png", colSpan: 2, rowSpan: 2 },
  { name: "Next.js", src: "/skills_logos/NextJs.png", colSpan: 1, rowSpan: 1 },
  { name: "TypeScript", src: "/skills_logos/TS.png", colSpan: 1, rowSpan: 1 },
  { name: "NestJS", src: "/skills_logos/NestJs.png", colSpan: 1, rowSpan: 1 },
  {
    name: "PostgreSQL",
    src: "/skills_logos/PostgresSQL.png",
    colSpan: 1,
    rowSpan: 1,
  },
  { name: "Spring", src: "/skills_logos/Spring.png", colSpan: 1, rowSpan: 1 },
  { name: "Java", src: "/skills_logos/Java.png", colSpan: 1, rowSpan: 1 },
  { name: "JavaScript", src: "/skills_logos/JS.png", colSpan: 1, rowSpan: 1 },
  {
    name: "Tailwind CSS",
    src: "/skills_logos/Tailwindcss.png",
    colSpan: 1,
    rowSpan: 1,
  },
  { name: "MySQL", src: "/skills_logos/MySql.png", colSpan: 1, rowSpan: 1 },
];

const SkillsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const largeTitleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let tl: gsap.core.Timeline;

    const ctx = gsap.context(() => {
      // Set initial hidden states
      gsap.set(largeTitleRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)",
      });
      gsap.set(titleContainerRef.current, {
        x: -100,
        opacity: 0,
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
      });
      gsap.set(cardRefs.current.filter(Boolean), {
        y: (i) => (i % 2 === 0 ? 100 : -100),
        opacity: 0,
        scale: 0.5,
        rotationX: 45,
        filter: "blur(10px)",
      });

      tl = gsap.timeline({ paused: true });

      // Background title pulls back
      tl.to(largeTitleRef.current, {
        scale: 1,
        opacity: 0.05,
        filter: "blur(0px)",
        duration: 2,
        ease: "power4.out",
      });

      // Intro text sweeps in
      tl.to(
        titleContainerRef.current,
        {
          x: 0,
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "expo.out",
        },
        "-=1.5",
      );

      // Cards erupt into view with sophisticated 3D-like stagger
      tl.to(
        cardRefs.current.filter(Boolean),
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: "random",
            ease: "power2.inOut",
          },
          ease: "back.out(1.5)",
          onComplete: () => {
            // Continuous subtle floating animation for cards
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              gsap.to(card, {
                y: i % 2 === 0 ? "-=15" : "+=15",
                duration: 2 + Math.random(),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 2,
              });
            });
          },
        },
        "-=1.2",
      );
    }, containerRef);

    // Foolproof visibility check using requestAnimationFrame
    // This perfectly tracks the horizontal layout regardless of GSAP's pin/translate hacks
    let rafId: number;
    let hasTriggered = false;

    const checkVisibility = () => {
      if (hasTriggered) return;

      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        // Fire when the left edge of the section passes 75% of the screen width
        if (rect.left < window.innerWidth * 0.75 && rect.right > 0) {
          hasTriggered = true;
          tl.play();
        }
      }
      if (!hasTriggered) {
        rafId = requestAnimationFrame(checkVisibility);
      }
    };

    rafId = requestAnimationFrame(checkVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="section-skills"
      ref={containerRef}
      className="horizontal-panel w-screen h-screen shrink-0 relative flex items-center justify-center overflow-hidden border-l border-border/10 bg-[#040507]"
    >
      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full p-6 sm:p-10 md:p-16 lg:p-24 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 sm:gap-16 lg:gap-32">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent uppercase tracking-[0.3em] font-mono text-[10px]">
                Technologies
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white font-light leading-[0.9] tracking-tighter mb-8"
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              }}
            >
              The Engine
              <br />
              <span className="text-accent italic">Room.</span>
            </motion.h2>

            <p className="text-body text-text-muted text-sm md:text-base max-w-sm">
              I don't just write code. I build scalable, high-performance
              systems using the best modern tools available. Every tool has its
              purpose.
            </p>
          </div>

          {/* Right Bento Grid */}
          <div className="w-full flex-1 flex items-center justify-center lg:justify-start">
            {/* Bento grid */}
            <div className="grid grid-cols-4 grid-rows-3 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-xl aspect-square">
              {SKILLS.map((skill, index) => {
                // Map specific classes to avoid dynamic string interpolation that purgecss removes
                let spanClasses = "col-span-1 row-span-1";
                if (skill.colSpan === 2 && skill.rowSpan === 2)
                  spanClasses = "col-span-2 row-span-2";
                else if (skill.colSpan === 2 && skill.rowSpan === 1)
                  spanClasses = "col-span-2 row-span-1";

                return (
                  <div
                    key={skill.name}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-linear-to-br from-white/3 to-white/1 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-accent/40 hover:bg-white/5 ${spanClasses}`}
                    style={{ willChange: "transform, opacity, filter" }}
                  >
                    {/* Glow effect that follows hover concept implicitly via group hover */}
                    <div className="absolute inset-0 bg-linear-to-tr from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/10 transition-colors duration-700 pointer-events-none" />

                    <div
                      className={`relative ${skill.colSpan > 1 ? "w-16 h-16 md:w-20 md:h-20" : "w-10 h-10 md:w-14 md:h-14"} transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]`}
                    >
                      <Image
                        src={skill.src}
                        alt={skill.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 128px, 256px"
                      />
                    </div>

                    {/* Only label big cards, keep small cards fully iconic for cleaner look, or label on hover */}
                    <span className="absolute bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 text-sm font-medium tracking-wide text-text transition-all duration-500 pointer-events-none">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
