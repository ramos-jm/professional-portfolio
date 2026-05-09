import { useEffect, useRef } from "react";

/**
 * Lightweight canvas matrix-style "code rain" rendered in the brand palette.
 * Uses dev-flavored glyphs (operators, hex, brackets) instead of katakana
 * so it reads as "programmer", not "anime hacker".
 */
export function CodeRain({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const glyphs =
      "01{}[]()<>=+-*/&|!?;:.,_$#@abcdefABCDEF0123456789=>=>npmgitssh".split("");

    let raf = 0;
    let cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    const FONT = 14;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / FONT);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
      speeds = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.7);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // soft trail (background tone, brand: deep moss)
      ctx.fillStyle = "rgba(24, 28, 20, 0.10)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT}px "JetBrains Mono", ui-monospace, monospace`;

      for (let i = 0; i < cols; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0];
        const x = i * FONT;
        const y = drops[i] * FONT;

        // bright leading char (bone)
        ctx.fillStyle = "rgba(236, 223, 204, 0.85)";
        ctx.fillText(ch, x, y);

        // muted trail (moss accent)
        ctx.fillStyle = "rgba(105, 117, 101, 0.55)";
        ctx.fillText(ch, x, y - FONT);
        ctx.fillStyle = "rgba(105, 117, 101, 0.25)";
        ctx.fillText(ch, x, y - FONT * 2);

        drops[i] += speeds[i];
        if (y > h + Math.random() * 200) drops[i] = -Math.random() * 20;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
