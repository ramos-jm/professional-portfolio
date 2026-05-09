import { useEffect, useState } from "react";
import { CodeRain } from "./CodeRain";

/**
 * Layered atmospheric backdrop: drifting gold orbs over a faint grid.
 * Pure CSS animation — cheap, soulful, no canvas.
 */
export function HeroBackdrop() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* dev-flavored code rain, low opacity so the foreground stays readable */}
      <CodeRain className="absolute inset-0 h-full w-full opacity-[0.35]" />
      {/* fade the rain into the layout so it doesn't fight the hero copy */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-background via-background/85 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-transparent" />
      <div
        className={`glow-gold absolute h-140 w-140 -left-40 -top-40 ${mounted ? "animate-drift-slow" : ""}`}
      />
      <div
        className={`glow-gold absolute h-105 w-105 -right-30 top-[40%] ${mounted ? "animate-drift" : ""}`}
        style={{ background: "radial-gradient(closest-side, oklch(0.62 0.04 130 / 0.30), transparent 70%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay" />
      <div className="noise absolute inset-0" />
    </div>
  );
}