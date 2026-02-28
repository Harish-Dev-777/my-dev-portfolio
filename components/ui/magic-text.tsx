"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export interface MagicTextProps {
  text: string;
  className?: string;
}

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

/**
 * Layout trick:
 *  1. Invisible spacer `<span>` holds the word's natural width + height
 *  2. Ghost + revealed layers are `absolute inset-0` — no layout impact
 *  3. `marginRight` on the wrapper keeps inter-word spacing
 * This guarantees words ALWAYS have the correct gap regardless of opacity.
 */
const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span
      className="relative inline-block"
      style={{ marginRight: "0.3em", marginBottom: "0.1em" }}
    >
      {/* ① invisible spacer — gives the word its real dimensions */}
      <span aria-hidden className="invisible select-none">
        {children}
      </span>
      {/* ② ghost — faint, always visible */}
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{ opacity: 0.18 }}
      >
        {children}
      </span>
      {/* ③ revealed — animates in on scroll */}
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text, className }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.2"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={container}
      className={[
        "flex flex-wrap",
        "text-[clamp(1.4rem,3.5vw,2.75rem)]",
        "font-semibold leading-normal tracking-tight",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
