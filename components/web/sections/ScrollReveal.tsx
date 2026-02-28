"use client";

import React, { useEffect, useRef, useMemo, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    return children.split(" ").map((word, wordIndex, wordsArray) => (
      <span key={wordIndex} className="inline-flex whitespace-nowrap">
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="char inline-block">
            {char}
          </span>
        ))}
        {wordIndex < wordsArray.length - 1 && (
          <span className="char inline-block">&nbsp;</span>
        )}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll(".char");
      if (chars.length === 0) return;

      // Initial state
      gsap.set(chars, {
        opacity: baseOpacity,
        rotate: baseRotation,
        ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
      });

      // Character level reveal
      gsap.to(chars, {
        opacity: 1,
        rotate: 0,
        filter: "blur(0px)",
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "left 90%",
          end: "right 10%",
          scrub: true,
          horizontal: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [baseOpacity, baseRotation, blurStrength, enableBlur]);

  return (
    <div ref={containerRef} className={`${containerClassName}`}>
      <div className={`${textClassName}`}>{splitText}</div>
    </div>
  );
};

export default ScrollReveal;
