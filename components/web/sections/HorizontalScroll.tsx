"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    let ctx = gsap.context(() => {
      const getScrollAmount = () => {
        // Calculate the maximum possible scroll amount based on the container's true width
        let maxScroll = section.scrollWidth - window.innerWidth;
        return Math.max(0, maxScroll);
      };

      const tween = gsap.to(section, {
        x: () => -1 * getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Ensure ScrollTrigger refreshes whenever the DOM might finish rendering
      // especially important when mounting heavy components like images or fonts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1500);
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={triggerRef}
      className="horizontal-scroll-wrapper relative h-screen w-full overflow-hidden bg-bg"
    >
      <div
        ref={sectionRef}
        className="horizontal-scroll-container h-full flex w-max"
      >
        {children}
      </div>
    </div>
  );
}
