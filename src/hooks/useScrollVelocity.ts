import { useEffect, useState } from "react";
import { getLenis } from "./useLenis";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const handler = ({
      velocity: v,
      direction: d,
      scroll,
    }: {
      velocity: number;
      direction: 1 | -1;
      scroll: number;
    }) => {
      setVelocity(v);
      setDirection(d);
      setScrollY(scroll);
    };

    lenis.on("scroll", handler);
    return () => {
      lenis.off("scroll", handler);
    };
  }, []);

  return { velocity, direction, scrollY };
}
