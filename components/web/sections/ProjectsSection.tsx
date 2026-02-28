"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Project {
  index: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "iPhone 17 Pro Max",
    description:
      "High-end product landing page with immersive scroll animations and cinematic transitions.",
    tags: ["Next.js", "Tailwind CSS", "GSAP"],
    link: "https://iphone-17-pro-max-ruby.vercel.app/",
    image: "/Projects/Iphone-17-pro-max.png",
  },
  {
    index: "02",
    title: "Aether Weather",
    description:
      "Clean modern weather app with dynamic API integration and responsive UI.",
    tags: ["React", "Weather API", "CSS"],
    link: "https://aether-weather-six.vercel.app/",
    image: "/Projects/aether_Weather.png",
  },
  {
    index: "03",
    title: "Agamudaiyar",
    description:
      "Structured community website with smooth animations and clean layout design.",
    tags: ["React", "Tailwind CSS", "GSAP"],
    link: "https://agamudaiyar.vercel.app/",
    image: "/Projects/agamudaiyar.png",
  },
  {
    index: "04",
    title: "Shadow Forge",
    description:
      "Premium agency website built with modern UI, smooth animations, and bold typography.",
    tags: ["Next.js", "Tailwind", "Framer Motion", "GSAP", "Resend", "Convex"],
    link: "https://shadow-forge-uwyd.vercel.app/",
    image: "/Projects/shadowForge.png",
  },
  {
    index: "05",
    title: "Winter Max",
    description:
      "Visually rich landing page focused on strong typography and layered UI design.",
    tags: ["React", "GSAP", "CSS", "Resend"],
    link: "https://winter-max.vercel.app/",
    image: "/Projects/winter_max.png",
  },
  {
    index: "06",
    title: "Trendly",
    description:
      "Futuristic e-commerce web application with advanced UI interactions and live cart/wishlist.",
    tags: ["Next.js", "Convex", "Framer Motion", "Clerk"],
    link: "https://trendly-ecommerce-one.vercel.app/",
    image: "/Projects/trendly.png",
  },
  {
    index: "07",
    title: "Smile Care Clinic",
    description:
      "Professional clinic website with clean UI and user-friendly appointment navigation.",
    tags: ["React", "Tailwind CSS"],
    link: "https://smile-care-clinic.vercel.app/",
    image: "/Projects/smile_care_clinic.png",
  },
  {
    index: "08",
    title: "Spice & Soul",
    description:
      "Premium restaurant website with elegant animations and modern UI to showcase culinary excellence.",
    tags: ["React", "Tailwind", "GSAP"],
    link: "https://spice-soul.vercel.app/",
    image: "/Projects/spice_soul.png",
  },
];

// ─── Custom Cursor Tracker ───────────────────────────────────────────────────
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

// ─── Individual Project Row ──────────────────────────────────────────────────
const ProjectRow = ({
  project,
  i,
  total,
  setHoveredProject,
}: {
  project: Project;
  i: number;
  total: number;
  setHoveredProject: (id: string | null) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
        setHoveredProject(project.index);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setHoveredProject(null);
      }}
      className="relative"
    >
      {/* Top rule */}
      <div className="w-full h-px bg-white/8 transition-colors duration-500 hover:bg-white/20" />

      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative py-12 md:py-16 lg:py-22 overflow-hidden group"
      >
        {/* Hover Background */}
        <motion.div
          className="absolute inset-0 bg-white/2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hovered ? 1 : 0 }}
          style={{ originY: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative grid grid-cols-12 gap-x-4 sm:gap-x-8 gap-y-4 items-center">
          {/* Col 1: Index */}
          <div className="col-span-12 sm:col-span-2 md:col-span-1">
            <span
              className="font-mono text-[11px] tracking-[0.3em] transition-colors duration-300"
              style={{ color: hovered ? "#38bdf8" : "rgba(255,255,255,0.25)" }}
            >
              {project.index}
            </span>
          </div>

          {/* Col 2: Title */}
          <div className="col-span-12 sm:col-span-10 md:col-span-5">
            <motion.h3
              animate={{ x: hovered ? 10 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-medium leading-[1.1] tracking-tight text-text"
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Col 3: Tags (Hidden on mobile) */}
          <div className="hidden md:flex col-span-4 gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-mono tracking-wider border border-white/10 rounded-full text-text-muted transition-colors duration-300 group-hover:border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Col 4: Arrow */}
          <div className="col-span-12 md:col-span-2 flex justify-end">
            <motion.div
              animate={{
                opacity: hovered ? 1 : 0.3,
                scale: hovered ? 1.1 : 1,
                rotate: hovered ? 45 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-10 h-10 sm:w-14 sm:h-14 border border-white/10 rounded-full flex items-center justify-center text-text transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent"
            >
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Bottom rule only on last item */}
      {i === total - 1 && <div className="w-full h-px bg-white/8" />}
    </div>
  );
};

// ─── Floating Image Preview ──────────────────────────────────────────────────
const HoverPreview = ({
  hoveredProject,
}: {
  hoveredProject: string | null;
}) => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 hidden md:block" // Hidden on mobile where hover doesn't make sense
      style={{ opacity: hoveredProject ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <motion.div
        animate={{ x: x - 200, y: y - 150 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
        className="absolute top-0 left-0 w-[400px] h-[300px] rounded-sm overflow-hidden shadow-2xl bg-bg border border-white/10"
      >
        <AnimatePresence mode="popLayout">
          {hoveredProject && (
            <motion.div
              key={hoveredProject}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full relative"
            >
              {(() => {
                const project = PROJECTS.find(
                  (p) => p.index === hoveredProject,
                );
                return project ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                ) : null;
              })()}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 text-center" />
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ─── ProjectsSection ─────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.3"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      id="section-projects"
      ref={sectionRef}
      className="section relative overflow-visible"
      style={{ backgroundColor: "#040507" }}
    >
      <HoverPreview hoveredProject={hoveredProject} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto w-full  py-28 sm:py-40 md:py-48 px-4 sm:px-8 md:px-16 lg:px-24">
        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 sm:mb-32 md:mb-40"
        >
          <div>
            <p className="text-label text-white/40 mb-4 tracking-[0.3em]">
              Selected Work
            </p>
            <h2
              className="font-light leading-none tracking-tight text-white mb-6 md:mb-0"
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(3rem, 8vw, 8rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Featured
              <span className="text-accent italic">Projects.</span>
            </h2>
          </div>

          <p className="text-sm text-white/50 max-w-sm leading-relaxed md:text-right">
            A collection of digital experiences designed to convert, perform,
            and impress. From high-end landing pages to complex full-stack
            applications.
          </p>
        </motion.div>

        {/* ── Projects List ──────────────────────────────────────── */}
        <div className="w-full">
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.index}
              project={project}
              i={i}
              total={PROJECTS.length}
              setHoveredProject={setHoveredProject}
            />
          ))}
        </div>

        {/* ── Footer Link ───────────────────────────────────────── */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <Link
            href="https://github.com/Harish-Dev-777"
            target="_blank"
            className="group inline-flex items-center gap-3 border border-white/10 rounded-full px-8 py-4 hover:bg-white/5 transition-all duration-300"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-white/70 group-hover:text-white">
              View Github Archive
            </span>
            <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
