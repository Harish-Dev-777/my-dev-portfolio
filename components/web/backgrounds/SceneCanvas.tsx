"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Frame manifest ───────────────────────────────────────────────────────────
const SCENES = 4;
const FRAMES_PER_SCENE = 40;
const TOTAL_FRAMES = SCENES * FRAMES_PER_SCENE;

function buildFramePaths(): string[] {
  const paths: string[] = [];
  for (let s = 1; s <= SCENES; s++) {
    for (let f = 1; f <= FRAMES_PER_SCENE; f++) {
      const frame = String(f).padStart(3, "0");
      paths.push(`/bg-scenes/scene-${s}/ezgif-frame-${frame}.jpg`);
    }
  }
  return paths;
}

const FRAME_PATHS = buildFramePaths();

function preloadImages(paths: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    paths.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
          img.src = src;
        }),
    ),
  );
}

export default function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clipWrapperRef = useRef<HTMLDivElement>(null);
  const blackCoverRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const clipWrapper = clipWrapperRef.current;
    const blackCover = blackCoverRef.current;
    if (!canvas || !clipWrapper || !blackCover) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: false,
    });
    if (!ctx) return;

    // ── DPR-aware resize ────────────────────────────────────────────────────
    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const displayW = window.innerWidth;
      const displayH = window.innerHeight;
      canvas.width = Math.round(displayW * dpr);
      canvas.height = Math.round(displayH * dpr);
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    }

    // ── Cover-fit draw with vignette ────────────────────────────────────────
    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      const img = framesRef.current[index];
      if (!img?.naturalWidth) return;

      const displayW = window.innerWidth;
      const displayH = window.innerHeight;
      const canvasAR = displayW / displayH;
      const imgAR = img.naturalWidth / img.naturalHeight;

      let sw = img.naturalWidth;
      let sh = img.naturalHeight;
      let sx = 0;
      let sy = 0;

      if (canvasAR > imgAR) {
        sh = img.naturalWidth / canvasAR;
        sy = (img.naturalHeight - sh) / 2;
      } else {
        sw = img.naturalHeight * canvasAR;
        sx = (img.naturalWidth - sw) / 2;
      }

      // Dynamic scale factor to crop out baked-in black letterboxing bars
      // Mobile needs a significantly higher scale because the sides are cropped
      // leaving top/bottom black bars very visible.
      const scaleFactor = displayW < 768 ? 1.45 : 1.15;

      const scaledSw = sw / scaleFactor;
      const scaledSh = sh / scaleFactor;
      const scaledSx = sx + (sw - scaledSw) / 2;
      const scaledSy = sy + (sh - scaledSh) / 2;

      ctx.globalCompositeOperation = "copy";
      ctx.drawImage(
        img,
        scaledSx,
        scaledSy,
        scaledSw,
        scaledSh,
        0,
        0,
        displayW,
        displayH,
      );

      // Top vignette
      const topGrad = ctx.createLinearGradient(0, 0, 0, displayH * 0.3);
      topGrad.addColorStop(0, "rgba(8,9,12,0.85)");
      topGrad.addColorStop(1, "rgba(8,9,12,0)");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, displayW, displayH * 0.3);

      // Bottom vignette
      const botGrad = ctx.createLinearGradient(0, displayH * 0.7, 0, displayH);
      botGrad.addColorStop(0, "rgba(8,9,12,0)");
      botGrad.addColorStop(1, "rgba(8,9,12,0.9)");
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, displayH * 0.7, displayW, displayH * 0.3);

      // Radial centre shadow
      const midGrad = ctx.createRadialGradient(
        displayW / 2,
        displayH / 2,
        displayH * 0.1,
        displayW / 2,
        displayH / 2,
        displayH * 0.75,
      );
      midGrad.addColorStop(0, "rgba(8,9,12,0)");
      midGrad.addColorStop(1, "rgba(8,9,12,0.35)");
      ctx.fillStyle = midGrad;
      ctx.fillRect(0, 0, displayW, displayH);
    }

    // ── Scroll → frame ──────────────────────────────────────────────────────
    function onProgress(progress: number) {
      const index = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1))),
      );
      if (
        index === currentFrameRef.current &&
        framesRef.current[index]?.complete
      )
        return;
      currentFrameRef.current = index;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(index));
    }

    resize();
    window.addEventListener("resize", resize);
    drawFrame(0);

    // ── Hero reveal: clip-path expands as user scrolls out of hero ──────────
    // Starts near-invisible (tiny dot in center); opens to fullscreen.
    const INITIAL_V = 50; // vertical inset % (leaves only 2% visible height)
    const INITIAL_H = 50; // horizontal inset % (leaves only 2% visible width)
    const INITIAL_R = 50; // border-radius px

    gsap.set(clipWrapper, {
      clipPath: `inset(${INITIAL_V}% ${INITIAL_H}% ${INITIAL_V}% ${INITIAL_H}% round ${INITIAL_R}px)`,
    });

    const heroReveal = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: `+=${window.innerHeight * 0.9}`,
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        const v = (1 - p) * INITIAL_V;
        const h = (1 - p) * INITIAL_H;
        const r = (1 - p) * INITIAL_R;
        if (clipWrapper)
          clipWrapper.style.clipPath = `inset(${v}% ${h}% ${v}% ${h}% round ${r}px)`;
        if (blackCover)
          blackCover.style.opacity = String(Math.max(0, 1 - p * 2));
      },
    });

    // ── Main frame scroll trigger ───────────────────────────────────────────
    preloadImages(FRAME_PATHS).then((imgs) => {
      framesRef.current = imgs;
      drawFrame(currentFrameRef.current);

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => onProgress(self.progress),
      });
    });

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      heroReveal.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/*
        Black cover — fullscreen, starts fully opaque.
        Fades out as the hero clip-path reveal completes.
        Sits below content (z: 0) but above the canvas wrapper,
        so the initial state is pure black.
      */}
      <div
        ref={blackCoverRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundColor: "transparent",
          pointerEvents: "none",
        }}
      />

      {/*
        Clip wrapper — always fullscreen, but clipped to a small
        centered rectangle initially. As user scrolls, clip opens
        to full screen — the "image scaling from center" effect.
      */}
      <div
        ref={clipWrapperRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          willChange: "clip-path",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
}
