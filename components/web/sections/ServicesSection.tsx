"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  ShoppingCart,
  Layers3,
  Sparkles,
} from "lucide-react";

interface Service {
  index: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  deliverables: string[];
}

const SERVICES: Service[] = [
  {
    index: "01",
    icon: <Sparkles size={16} strokeWidth={1.5} />,
    title: "Landing Page Development",
    description:
      "High-converting pages built from scratch — performance, animations, and modern UI. For startups, product launches, and personal brands.",
    deliverables: [
      "Custom UI design",
      "GSAP animations",
      "SEO structure",
      "Fully responsive",
    ],
  },
  {
    index: "02",
    icon: <ShoppingCart size={16} strokeWidth={1.5} />,
    title: "E-Commerce Development",
    description:
      "Scalable shopping experiences with smooth UX. From product listing to payment integration — every interaction feels intentional.",
    deliverables: [
      "Cart & wishlist",
      "Secure auth",
      "Payment gateway",
      "Admin dashboard",
    ],
  },
  {
    index: "03",
    icon: <Code2 size={16} strokeWidth={1.5} />,
    title: "Full Stack Applications",
    description:
      "Complete web applications — pixel-perfect frontend to scalable backend and database. One developer, full ownership.",
    deliverables: [
      "React / Next.js",
      "Node.js / Convex",
      "TypeScript",
      "DB architecture",
    ],
  },
  {
    index: "04",
    icon: <Layers3 size={16} strokeWidth={1.5} />,
    title: "UI/UX Design & Animation",
    description:
      "Premium interfaces with scroll-based animations, micro-interactions, and 3D elements. The kind of UI that stops people mid-scroll.",
    deliverables: [
      "Scroll animations",
      "Micro-interactions",
      "Custom cursor",
      "3D / R3F",
    ],
  },
];

// ─── Row ─────────────────────────────────────────────────────────────────────
const ServiceRow = ({
  service,
  i,
  total,
}: {
  service: Service;
  i: number;
  total: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      {/* Top rule */}
      <div className="w-full h-px bg-white/8" />

      <div className="relative py-12 md:py-16 lg:py-20 overflow-hidden cursor-default">
        {/* Hover background — slides in from the left */}
        <motion.div
          className="absolute inset-0 bg-white/2.5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Content grid */}
        <div className="relative grid grid-cols-12 gap-x-4 sm:gap-x-8 gap-y-4 items-start">
          {/* — Col 1: Index + Icon — */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-2 pt-1">
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/25">
              {service.index}
            </span>
            <motion.span
              animate={{ color: hovered ? "#38bdf8" : "rgba(240,244,255,0.2)" }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              {service.icon}
            </motion.span>
          </div>

          {/* — Col 2: Title — massive typography */}
          <div className="col-span-10 sm:col-span-7 lg:col-span-7">
            <motion.h3
              animate={{ x: hovered ? 6 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light leading-normal tracking-tight text-text"
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(1.6rem, 4vw, 3.5rem)",
              }}
            >
              {service.title}
            </motion.h3>

            {/* Description — visible on mobile always, on desktop show on hover */}
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: hovered ? "auto" : 0,
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden text-sm sm:text-base text-text-muted leading-relaxed mt-3 max-w-lg hidden sm:block"
            >
              {service.description}
            </motion.p>
            {/* Always visible on mobile */}
            <p className="text-sm text-text-muted leading-relaxed mt-3 sm:hidden">
              {service.description}
            </p>
          </div>

          {/* — Col 3: Deliverables + Arrow — desktop only */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-4 flex justify-between items-start gap-4">
            <motion.ul
              animate={{ opacity: hovered ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
              className="hidden sm:flex flex-col gap-1.5"
            >
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-text-muted"
                >
                  <span className="w-3 h-px bg-accent/50 shrink-0" />
                  {d}
                </li>
              ))}
            </motion.ul>

            {/* Arrow */}
            <motion.div
              animate={{
                opacity: hovered ? 1 : 0,
                y: hovered ? 0 : 8,
                rotate: hovered ? 0 : 15,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="ml-auto shrink-0 w-10 h-10 sm:w-12 sm:h-12 border border-accent/30 rounded-full flex items-center justify-center text-accent"
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom rule only on last item */}
      {i === total - 1 && <div className="w-full h-px bg-white/8" />}
    </div>
  );
};

// ─── ServicesSection ─────────────────────────────────────────────────────────
const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.3"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      id="section-services"
      ref={sectionRef}
      className="section relative bg-bg overflow-visible"
      style={{ backgroundColor: "#060709" }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto w-full py-28 sm:py-40 md:py-48 px-4 sm:px-8 md:px-16 lg:px-24">
        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-24 sm:mb-32 md:mb-40"
        >
          <div>
            <p className="text-label text-accent mb-4 tracking-[0.3em]">
              What I offer
            </p>
            <h2
              className="font-light leading-none tracking-tight text-text "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(3rem, 8vw, 8rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Services
            </h2>
          </div>

          <p className="text-sm text-text-muted max-w-xs leading-relaxed sm:text-right mb-1">
            Four specialisations.
            <br />
            One developer who gives a damn.
          </p>
        </motion.div>

        {/* ── Service List ────────────────────────────────────────── */}
        <div>
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.index}
              service={service}
              i={i}
              total={SERVICES.length}
            />
          ))}
        </div>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <div className="flex items-center gap-6 mt-14 sm:mt-20 opacity-30">
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
            Open for projects
          </span>
          <div className="h-px flex-1 bg-white/8" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
