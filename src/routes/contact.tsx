import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BASE_PATH } from "@/lib/base-path";

export const Route = createFileRoute('/contact')({
  loader: () => {
    if (typeof window !== 'undefined') {
      window.location.replace(`${BASE_PATH}/#contact`)
    }
  },
  component: () => null,
})

function Contact() {
  const channels = [
    { label: "email", value: "ramosjohnmichael61@gmail.com", href: "mailto:ramosjohnmichael61@gmail.com" },
    { label: "github", value: "ramos-jm", href: "https://github.com/ramos-jm" },
    { label: "linkedin", value: "ramos-jm", href: "https://linkedin.com/in/ramos-jm" },
    { label: "x / twitter", value: "@ramos_jm", href: "https://x.com/ramos-jm" },
  ];

  return (
    <div>
      <section className="border-b border-border grid-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            ✦ contact · open inbox
          </div>
          <h1 className="font-serif-display text-5xl md:text-8xl leading-[0.95]">
            Let's build
            <br />
            <span className="italic text-accent">something good.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Currently taking on staff-level and architect engagements — backend
            systems, AI infrastructure, and 0→1 products. Reply usually
            within 24 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            ➜ direct channels
          </div>
          <ul className="space-y-px border-t border-border">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="group flex items-center justify-between py-5 border-b border-border hover:px-2 transition-all"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="flex items-center gap-2 font-serif-display text-xl group-hover:text-accent transition">
                    {c.value} <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="md:col-span-7 border border-border bg-card p-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent(`Project inquiry — ${data.get("name")}`);
            const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
            window.location.href = `mailto:ramosjohnmichael61@gmail.com?subject=${subject}&body=${body}`;
          }}
        >
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            ➜ send a brief
          </div>

          {[
            { name: "name", label: "your name", type: "text" },
            { name: "email", label: "email", type: "email" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                {f.label}
              </label>
              <input
                required
                name={f.name}
                type={f.type}
                className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-lg"
              />
            </div>
          ))}

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              what are you building?
            </label>
            <textarea
              required
              name="message"
              rows={5}
              className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-lg resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition"
          >
            Send brief <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </section>
    </div>
  );
}
