"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Fade in left side
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const imgContainer = textRefs.current[0];
      const textContainer = textRefs.current[1];

      if (imgContainer) {
        // Dramatic image reveal (scale + clip path)
        gsap.fromTo(
          imgContainer,
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.05 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.6,
            ease: "power4.out",
            scrollTrigger: {
              trigger: imgContainer,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Zoom out the image inside the container
        const img = imgContainer.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.3 },
            {
              scale: 1,
              duration: 1.6,
              ease: "power4.out",
              scrollTrigger: {
                trigger: imgContainer,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }

      if (textContainer) {
        // Text fades up and in
        gsap.fromTo(
          textContainer,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imgContainer, // relative to the image
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-about"
      ref={sectionRef}
      className="horizontal-panel flex flex-col justify-center border-l border-border relative"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative items-center min-h-[70vh]">
          {/* Left Column: Sticky Label & Heading */}
          <div className="lg:col-span-4 relative self-start pt-12 lg:pt-32">
            <div
              ref={leftColRef}
              className="lg:sticky lg:top-1/3 flex flex-col justify-start"
            >
              <p className="text-label mb-8">Role & Identity</p>
              <h2 className="text-heading">
                Not just building websites.
                <br />
                <span className="text-text-muted">Building experiences.</span>
              </h2>
            </div>
          </div>

          {/* Right Column: Hero Image & Intro */}
          <div className="lg:col-span-8 flex flex-col lg:flex-row justify-center items-center relative pt-8 lg:pt-0">
            {/* Image Container */}
            <div className="relative w-full max-w-[320px] md:max-w-[420px] lg:max-w-[540px]">
              <div
                ref={(el) => {
                  textRefs.current[0] = el;
                }}
                className="relative w-full aspect-4/5 lg:aspect-square overflow-hidden rounded-sm"
                style={{ willChange: "transform, clip-path" }}
              >
                <Image
                  src="/MyImage.jpeg"
                  alt="Harish - Web Developer"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Subtle gradient overlay to ensure text contrast at the bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Title — safe offsets on mobile */}
              <div
                ref={(el) => {
                  textRefs.current[1] = el;
                }}
                className="absolute -bottom-6 left-0 lg:-bottom-12 lg:-left-10 z-10 pointer-events-none drop-shadow-2xl"
              >
                <h3 className="font-display font-medium text-[clamp(48px,10vw,140px)] leading-[0.85] tracking-tighter text-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  I&apos;m Harish.
                </h3>
                <p className="text-body-large text-accent mt-4 ml-2 max-w-sm drop-shadow-md bg-bg/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
                  Web developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
