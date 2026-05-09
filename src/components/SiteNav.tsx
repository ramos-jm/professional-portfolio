import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const items = [
  { id: "hero", label: "index" },
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "contact", label: "contact" },
] as const;

export function SiteNav() {
  const [active, setActive] = useState<string>("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (best?.isIntersecting && best.target instanceof HTMLElement) {
          const id = best.target.getAttribute("id");
          if (id) setActive(id);
        }
      },
      { threshold: [0.3, 0.45, 0.6, 0.8] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => handleScrollTo("hero")}
          className="font-mono text-sm tracking-tight text-foreground hover:text-accent transition"
          aria-label="Scroll to hero section"
        >
          <span className="text-muted-foreground">$</span> <span className="font-semibold">jm.ramos</span>
          <span className="text-accent">_</span>
        </button>

        <nav className="hidden md:flex gap-1 items-center">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => handleScrollTo(it.id)}
              className={`font-mono text-xs uppercase tracking-widest px-3 py-2 border transition ${
                active === it.id
                  ? "text-foreground border-accent/60 bg-accent/15 shadow-[0_0_16px_rgba(18,52,88,0.35)] glow-accent neon-border"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
              }`}
            >
              {it.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="mailto:ramosjohnmichael61@gmail.com"
            className="premium-button font-mono text-xs uppercase tracking-widest px-3 py-2 text-foreground"
          >
            available · 26
          </a>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-9 w-9 border border-border text-muted-foreground hover:text-foreground"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden border-t border-border bg-background"
      >
        <div className="px-4 py-4 space-y-3">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => handleScrollTo(it.id)}
              className={`w-full text-left font-mono text-xs uppercase tracking-widest px-3 py-2 border transition ${
                active === it.id
                  ? "text-foreground border-accent/60 bg-accent/15 glow-accent"
                  : "text-muted-foreground border-border/40"
              }`}
            >
              {it.label}
            </button>
          ))}
          <a
            href="mailto:ramosjohnmichael61@gmail.com"
            className="block premium-button font-mono text-xs uppercase tracking-widest px-3 py-2 text-center text-foreground"
          >
            available · 26
          </a>
        </div>
      </motion.div>
    </header>
  );
}

export function SiteFooter() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-6 md:grid-cols-3 font-mono text-xs">
        <div>
          <div className="text-muted-foreground">© 2026 John Michael C. Ramos</div>
          <div className="mt-1">Built in the open. Shipped with intent.</div>
        </div>

        <div className="md:text-center text-muted-foreground">
          <div>Al Muaihat 1, Ajman, UAE</div>
          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            <button className="hover:text-accent" onClick={() => scrollTo("hero")}>index</button>
            <button className="hover:text-accent" onClick={() => scrollTo("about")}>about</button>
            <button className="hover:text-accent" onClick={() => scrollTo("work")}>work</button>
            <button className="hover:text-accent" onClick={() => scrollTo("contact")}>contact</button>
          </div>
        </div>

        <div className="md:text-right flex md:justify-end gap-4">
          <a className="hover:text-accent" href="https://github.com/ramos-jm">github</a>
          <a className="hover:text-accent" href="https://linkedin.com/in/ramos-jm">linkedin</a>
          <a className="hover:text-accent" href="https://x.com/ramos_jm">x</a>
        </div>
      </div>

      <div className="text-center font-mono text-[10px] text-muted-foreground/40 pb-6">
        made with coffee, spite, and too many terminal tabs · v2026.1
      </div>
    </footer>
  );
}
