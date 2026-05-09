import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — JM Ramos" },
      { name: "description", content: "Selected engineering work by JM Ramos: backend systems, apps, and infrastructure." },
      { property: "og:title", content: "Work — JM Ramos" },
      { property: "og:description", content: "Selected engineering work — backend, apps, infrastructure." },
    ],
  }),
  component: Work,
});

const projects = [
  {
    year: "2025",
    role: "Founder & Lead",
    tag: "AI Transit · Komyut-PH",
    title: "Komyut-PH — AI Transit Intelligence System",
    copy: "A route-first commuting assistant with signboard-first UX, GTFS-compatible routing, and NLP-guided commuter instructions.",
    stack: ["React", "Node.js", "TypeScript", "GTFS", "OSM", "Supabase", "PostgreSQL"],
    metrics: [["—", "In development"]],
    highlights: ["Dual-Layer Database Architecture", "GTFS-Compatible Routing Layer", "Signboard-First UX", "Intent Extraction Engine"],
  },
  {
    year: "2024",
    role: "Solo Engineer",
    tag: "Computer Vision · RX Reader",
    title: "RX Reader — Handwritten Medicine Classifier",
    copy: "Real-time web inference using TensorFlow.js to classify handwritten medicine names with a privacy-first, client-side architecture.",
    stack: ["React", "TypeScript", "TensorFlow.js", "Python", "Keras"],
    metrics: [["94.76%", "classification accuracy"]],
    highlights: ["Real-Time Inference", "Client-Side AI Execution", "Privacy-First Architecture"],
  },
  {
    year: "2023",
    role: "Research Engineer",
    tag: "AI Healthcare",
    title: "Physical Health Monitoring — Multiple AI Solutions",
    copy: "Computer vision solutions for injury detection and skin/nail disease classification using YOLO and TensorFlow-based models.",
    stack: ["Python", "YOLO", "OpenCV", "TensorFlow"],
    metrics: [],
  },
  {
    year: "2023",
    role: "Engineer",
    tag: "AI Detection",
    title: "AuthenText AI",
    copy: "Real-time detection platform for AI-generated or manipulated text built on a Node.js backend.",
    stack: ["Node.js", "Express", "AI Detection"],
    metrics: [],
  },
];

function Work() {
  return (
    <div>
      <section className="border-b border-border grid-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            ✦ work · 2023 — 2026
          </div>
          <h1 className="font-serif-display text-5xl md:text-8xl leading-[0.95]">
            Selected
            <br />
            <span className="italic text-accent">engineering.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 space-y-3">
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="group grid md:grid-cols-12 gap-6 border border-border bg-card p-8 md:p-10 hover:border-foreground transition"
          >
            <div className="md:col-span-3 flex md:flex-col justify-between gap-2">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <div>{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</div>
                <div className="mt-1">{p.year}</div>
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-accent">{p.tag}</div>
            </div>

            <div className="md:col-span-6">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                {p.role}
              </div>
              <h2 className="font-serif-display text-3xl md:text-4xl mb-4 group-hover:text-accent transition">
                {p.title}
              </h2>
              <p className="text-muted-foreground mb-6">{p.copy}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xs px-2 py-1 border border-border bg-secondary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 grid grid-cols-3 md:grid-cols-1 gap-px bg-border border border-border">
              {p.metrics.map(([v, l]) => (
                <div key={l} className="bg-card p-4">
                  <div className="font-mono text-2xl font-semibold">{v}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}

        <div className="pt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-foreground px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition"
          >
            Have a project? Let's talk <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
