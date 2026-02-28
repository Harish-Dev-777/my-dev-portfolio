"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds
    const intervalTime = 20; // 20ms update rate
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setCount(progress);

      if (progress === 100) {
        clearInterval(timer);
        setTimeout(() => setComplete(true), 500); // Small pause at 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-999 flex items-center justify-center bg-bg"
        >
          <div className="relative flex flex-col items-center">
            {/* Massive counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-light tracking-tighter text-white/90 select-none"
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(4rem, 15vw, 12rem)",
              }}
            >
              {count}%
            </motion.div>

            {/* Subtle progress line */}
            <div className="mt-8 overflow-hidden h-px w-32 bg-white/5">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${count}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="mt-6 font-mono text-[8px] tracking-[0.5em] uppercase text-white/20">
              Initializing Experience
            </div>
          </div>

          {/* Corner Decors for Awwwards vibe */}
          <div className="absolute top-10 left-10 font-mono text-[10px] uppercase text-white/10 tracking-widest">
            Selection 2026
          </div>
          <div className="absolute bottom-10 right-10 font-mono text-[10px] uppercase text-white/10 tracking-widest">
            Minimalist Craft
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
