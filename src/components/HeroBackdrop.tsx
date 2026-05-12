import { useEffect, useRef, useState } from "react";
import { CodeRain } from "./CodeRain";
import { getLenis } from "@/hooks/useLenis";

export function HeroBackdrop() {
  const [mounted, setMounted] = useState(false);
  const codeRainRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const handler = ({ scroll }: { scroll: number }) => {
      // Each layer moves at a different rate — this creates depth
      if (codeRainRef.current) {
        codeRainRef.current.style.transform = `translateY(${scroll * 0.18}px)`;
      }
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translateY(${scroll * 0.3}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translateY(${scroll * 0.12}px) translateX(${scroll * 0.05}px)`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translateY(${scroll * 0.22}px)`;
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${scroll * 0.06}px)`;
      }
    };

    lenis.on("scroll", handler);
    return () => lenis.off("scroll", handler);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Code rain at its own parallax depth */}
      <div ref={codeRainRef} className="absolute inset-0 will-change-transform">
        <CodeRain className="absolute inset-0 h-full w-full opacity-[0.32]" />
      </div>

      {/* Left fade */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-transparent" />

      {/* Orb 1 — slowest, biggest */}
      <div
        ref={orb1Ref}
        className={`glow-gold absolute h-140 w-140 -left-40 -top-40 will-change-transform ${mounted ? "animate-drift-slow" : ""}`}
      />

      {/* Orb 2 — medium speed */}
      <div
        ref={orb2Ref}
        className={`backlight-indigo absolute h-96 w-96 left-[-8%] top-1/4 will-change-transform ${mounted ? "animate-drift-slow" : ""}`}
        style={{ opacity: 0.22 }}
      />

      {/* Orb 3 — fastest */}
      <div
        ref={orb3Ref}
        className={`glow-gold absolute h-105 w-105 -right-30 top-[40%] will-change-transform ${mounted ? "animate-drift" : ""}`}
        style={{ background: "radial-gradient(closest-side, rgb(215 38 61 / 0.32), transparent 70%)" }}
      />

      <div className="backlight-cyan absolute h-80 w-80 right-[-6%] top-[10%]" style={{ opacity: 0.16 }} />

      {/* Grid at its own depth */}
      <div ref={gridRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 grid-paper opacity-25" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay" />
      <div className="noise absolute inset-0" />
    </div>
  );
}