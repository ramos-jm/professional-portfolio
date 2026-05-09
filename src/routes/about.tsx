import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — JM Ramos" },
      { name: "description", content: "About JM Ramos — engineer, systems thinker, builder." },
      { property: "og:title", content: "About — JM Ramos" },
      { property: "og:description", content: "Engineer, systems thinker, builder." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="border-b border-border grid-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            ✦ about · file 01
          </div>
          <h1 className="font-serif-display text-5xl md:text-8xl leading-[0.95]">
            An engineer who
            <br />
            <span className="italic text-accent">ships.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            ➜ origin
          </div>
          <h2 className="font-serif-display text-3xl">From curiosity to craft.</h2>
        </div>
        <div className="md:col-span-8 space-y-6 text-lg text-muted-foreground">
          <p>
            I'm John Michael C. Ramos — an AI-driven full stack developer blending systems engineering, computer vision, and product thinking.
          </p>
          <p>
            My work spans database design, real-time inference pipelines, and polished user experiences — built to be reliable and maintainable.
          </p>
          <p>
            I focus on correctness, latency, and systems that scale while keeping humans and UX at the center of decisions.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10">
            ➜ timeline
          </div>
          <div className="space-y-px">
            {[
              { y: "2025", r: "Junior Social Media Executive · WheelFix LLC", c: "Produced short-form content, managed digital branding, and executed engagement campaigns." },
              { y: "2025", r: "Contractual Application Developer · CARET Solutions Inc.", c: "Delivered inventory modules and automated validation reducing transaction errors by 60%." },
              { y: "2025", r: "Admin & Digital Content Specialist · Amphibious Surf School", c: "Led social media marketing and designed promotional materials." },
              { y: "2024", r: "Web Development Team Leader & Intern · Highly Succeed Inc.", c: "Led 12 interns and shipped React features across multiple client products." },
            ].map((row) => (
              <div
                key={row.r}
                className="grid md:grid-cols-12 gap-4 py-6 border-t border-border first:border-t-0 hover:bg-background transition px-2"
              >
                <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-accent">
                  {row.y}
                </div>
                <div className="md:col-span-4 font-serif-display text-2xl">{row.r}</div>
                <div className="md:col-span-5 text-muted-foreground">{row.c}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10">
          ➜ principles
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { n: "01", t: "Boring is a feature.", c: "Pick the technology your future self will thank you for." },
            { n: "02", t: "Latency is a story.", c: "Every millisecond is a sentence about how much you care." },
            { n: "03", t: "Ship the seam.", c: "The interesting work lives where systems meet humans." },
          ].map((p) => (
            <div key={p.n} className="border border-border p-8 bg-card">
              <div className="font-mono text-xs text-accent mb-6">{p.n}</div>
              <h3 className="font-serif-display text-2xl mb-3">{p.t}</h3>
              <p className="text-muted-foreground">{p.c}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
