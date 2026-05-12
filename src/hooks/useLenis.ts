import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Singleton so SiteNav can call lenis.scrollTo without prop drilling
let globalLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return globalLenis;
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
      prevent: (node: HTMLElement) => node.classList.contains("lenis-prevent"),
    });

    globalLenis = lenis;
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
