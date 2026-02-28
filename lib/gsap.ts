"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger defaults
ScrollTrigger.defaults({
  scrub: 1.5,
});

export { gsap, ScrollTrigger };
