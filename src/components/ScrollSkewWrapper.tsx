import { useEffect, useRef } from "react";
import { getLenis } from "@/hooks/useLenis";

export function ScrollSkewWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentSkew = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    let targetSkew = 0;

    const handler = ({ velocity }: { velocity: number }) => {
      // Cap skew so it is visible but not disorienting.
      targetSkew = Math.max(-4, Math.min(4, velocity * -0.6));
    };

    lenis.on("scroll", handler);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentSkew.current = lerp(currentSkew.current, targetSkew, 0.08);

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `skewY(${currentSkew.current}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      lenis.off("scroll", handler);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        willChange: "transform",
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
}
