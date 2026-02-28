"use client";

import { useRef } from "react";
import { MagicText } from "@/components/ui/magic-text";

const passionText =
  "A passionate full stack developer who believes code is poetry. I love crafting immersive UIs that captivate the user's eye, and architecting robust backends that never miss a beat. Bridging creativity and logic to build the web's future.";

const PassionSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="horizontal-panel w-screen h-screen shrink-0 relative flex items-center justify-center border-l border-border/10 bg-bg px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-2xl w-full flex flex-col justify-center items-center text-center gap-6 md:gap-8">
        {/* Decorative label */}
        <div className="flex items-center gap-3 opacity-60">
          <div className="w-6 h-[1px] bg-accent" />
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
            Drive &amp; Vision
          </p>
          <div className="w-6 h-[1px] bg-accent" />
        </div>

        {/* Magic text reveal — reuses the shared component */}
        <MagicText text={passionText} className="justify-center" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
};

export default PassionSection;
