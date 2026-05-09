import { Link } from "@tanstack/react-router";

export function SiteNav() {
  const items = [
    { to: "/", label: "index" },
    { to: "/about", label: "about" },
    { to: "/work", label: "work" },
    { to: "/contact", label: "contact" },
  ] as const;
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-mono text-sm tracking-tight">
          <span className="text-muted-foreground">$</span>{" "}
          <span className="font-semibold">jm.ramos</span>
          <span className="text-accent">_</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="font-mono text-xs uppercase tracking-widest px-3 py-2 text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: it.to === "/" }}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <a
          href="mailto:ramosjohnmichael61@gmail.com"
          className="hidden md:inline-flex font-mono text-xs uppercase tracking-widest border border-foreground px-3 py-2 hover:bg-foreground hover:text-background transition"
        >
          available · 26
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-6 md:grid-cols-3 font-mono text-xs">
        <div>
          <div className="text-muted-foreground">© 2026 John Michael C. Ramos</div>
            <div className="mt-1">Built in the open. Shipped with intent.</div>
        </div>
          <div className="md:text-center text-muted-foreground">
            Al Muaihat 1, Ajman, UAE
          </div>
        <div className="md:text-right flex md:justify-end gap-4">
            <a className="hover:text-accent" href="https://github.com/ramos-jm">github</a>
            <a className="hover:text-accent" href="https://linkedin.com/in/ramos-jm">linkedin</a>
            <a className="hover:text-accent" href="https://x.com/ramos-jm">x</a>
        </div>
      </div>
    </footer>
  );
}
