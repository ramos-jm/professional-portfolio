import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Terminal as TerminalUI } from "@/components/Terminal";

type Project = {
  year: string;
  tag: string;
  title: string;
  copy: string;
  buildLog: string;
  techStack: readonly string[];
  github?: string;
  highlightMetric?: string;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const projects = [
  {
    year: "2025",
    tag: "ai transit · route intelligence",
    title: "Komyut-PH",
    copy: "A signboard-first commuting assistant using intelligent routing logic, GTFS-compatible systems, and natural language guidance for commuters in the Philippines. Designed around real commuter pain points with offline-tolerant architecture.",
    buildLog: "// status: actively hacking · nights & weekends · github.com/ramos-jm/komyut-ph",
    github: "https://github.com/ramos-jm/komyut-ph",
    techStack: ["React", "TypeScript", "GTFS", "Node.js", "Routing Logic"],
  },
  {
    year: "2025",
    tag: "computer vision · ai",
    title: "RX Reader",
    copy: "Real-time medicine name recognition web app powered by TensorFlow.js CNN inference running directly in the browser — no server, no latency. Thesis project transformed into a real-world AI application.",
    buildLog: "// 94.76% accuracy · browser-only inference · no backend needed",
    github: "https://github.com/ramos-jm/rx-reader",
    highlightMetric: "94.76% accuracy",
    techStack: ["TensorFlow.js", "React", "Computer Vision", "CNN", "TypeScript"],
  },
  {
    year: "2023",
    tag: "healthcare · machine learning",
    title: "Physical Health Monitoring",
    copy: "AI-powered injury and skin condition detection system using deep learning and computer vision. Designed for environments where fast health assessment and intelligent detection matter.",
    buildLog: "// computer vision · health AI · multi-condition detection",
    techStack: ["YOLO", "TensorFlow", "Python", "Computer Vision", "Deep Learning"],
  },
  {
    year: "2024",
    tag: "full stack · ai detection",
    title: "AuthenText AI",
    copy: "Real-time AI-generated text detection platform built on a Node.js backend with fast-response architecture and intelligent classification systems.",
    buildLog: "// built before AI slop became mainstream · Node.js backend",
    techStack: ["Node.js", "NLP", "AI Detection", "JavaScript", "Express"],
  },
] satisfies readonly Project[];

const timeline = [
  {
    y: "2025",
    r: "Junior Social Media Executive · WheelFix LLC",
    c: "Produced short-form content, managed digital branding, and executed engagement campaigns for audience growth and engagement optimization.",
    l: "Learned: content velocity matters as much as quality",
  },
  {
    y: "2025",
    r: "Contractual Application Developer · CARET Solutions Inc.",
    c: "Delivered inventory modules and automated validation systems that reduced transaction errors by 60% within the first month of deployment.",
    l: "Learned: validation logic saves more time than features",
  },
  {
    y: "2025",
    r: "Admin & Digital Content Specialist · Amphibious Surf School",
    c: "Led social media branding and designed promotional materials for digital engagement and booking visibility.",
    l: "Learned: good design is communication, not decoration",
  },
  {
    y: "2024",
    r: "Web Development Team Leader & Intern · Highly Succeed Inc.",
    c: "Led a team of 12 interns, developed React.js features across multiple client systems, and coordinated collaborative deployments in Agile workflows.",
    l: "Learned: shipping beats perfecting, always",
  },
  {
    y: "2021–2025",
    r: "B.S. Computer Science · New Era University",
    c: "President's Lister (2023–2025). Thesis: RX Reader — browser-based medicine recognition using TensorFlow.js CNN inference.",
    l: "Learned: academic constraints are just shipping constraints with citations",
  },
] as const;

const RAW_FACTS = [
  "taught myself to code before finishing college",
  "can debug faster with lo-fi playing",
  "believes side projects > certifications",
  "built an AI that reads doctor handwriting for a thesis",
  "favorite stack: React · Node.js · TensorFlow.js · PostgreSQL",
] as const;

export default function HomePage() {
  return (
    <div className="relative">
      <section
        id="hero"
        data-section="hero"
        className="relative border-b border-border overflow-hidden scroll-mt-24"
      >
        <HeroBackdrop />
        <div className="absolute inset-0 bg-linear-to-b from-accent/8 via-transparent to-background/95" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-12 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              AI systems engineer
            </div>

            <CurrentlyDoing />

            <h1 className="font-serif-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] gradient-title glow-accent">
              John Michael <br />
              <span className="italic gradient-title">Ramos.</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl max-w-2xl text-muted-foreground">
              I design and build intelligent systems, from AI-powered applications and
              computer vision tools to scalable web platforms focused on solving
              real-world problems.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="premium-button inline-flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-widest text-foreground"
              >
                Selected work
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-accent/60 transition"
              >
                Download CV
              </a>
            </div>

            <div className="mt-4 font-mono text-xs text-muted-foreground flex flex-wrap gap-6">
              <div>runs on indomitable will + spite</div>
              <div>ajman to anywhere</div>
              <div>GMT+4</div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="glass-card">
              <TerminalUI />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/10 overflow-hidden py-3 ticker-mask">
        <div className="flex w-max animate-ticker font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-10 px-6">
              <span>◐ Real-Time AI Systems</span>
              <span>◑ Computer Vision</span>
              <span>◒ Scalable Full Stack Engineering</span>
              <span>◓ Intelligent Interfaces</span>
              <span className="text-accent">● Open to software engineering opportunities · 2026</span>
              <span>◐ TensorFlow.js · React · Node.js · PostgreSQL</span>
              <span>◑ GTFS · Route Intelligence · TypeScript</span>
            </div>
          ))}
        </div>
      </section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        id="about"
        data-section="about"
        className="mx-auto max-w-7xl px-6 py-20 scroll-mt-24"
      >
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          about · file 01
        </div>
        <h2 className="font-serif-display text-5xl md:text-8xl leading-[0.95] mb-8">
          An engineer who <span className="italic text-accent">ships.</span>
        </h2>

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-serif-display text-3xl">From curiosity to craft.</div>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg text-muted-foreground">
            <p>
              I'm John Michael C. Ramos — an AI-driven full stack developer blending
              systems engineering, computer vision, and product thinking.
            </p>
            <p>
              Computer Science graduate from New Era University, where I built AI-powered thesis
              projects using TensorFlow.js and realized that the best software happens at the
              intersection of intelligent systems and real-world constraints.
            </p>
            <p>
              My work spans database design, real-time inference pipelines, and polished user experiences
              built to be reliable and maintainable. I focus on correctness, latency, and systems that scale
              while keeping humans and UX at the center of decisions.
            </p>
            <RawFacts />
          </div>
        </div>

        <div className="border-t border-border bg-secondary/10 mt-12 p-6 md:p-8 grid-paper">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10">
            timeline
          </div>
          <div className="space-y-px">
            {timeline.map((row) => (
              <div
                key={row.r}
                className="grid md:grid-cols-12 gap-4 py-6 border-t border-border first:border-t-0 hover:bg-background/30 transition px-2"
              >
                <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-accent">
                  {row.y}
                </div>
                <div className="md:col-span-4 font-serif-display text-2xl text-foreground">
                  {row.r}
                </div>
                <div className="md:col-span-5 text-muted-foreground">
                  {row.c}
                  <div className="italic text-muted-foreground/70 text-sm mt-2">{row.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        id="work"
        data-section="work"
        className="border-t border-border mx-auto max-w-7xl px-6 py-16 scroll-mt-24"
      >
        <div className="border-l-2 border-accent pl-6 mb-12 max-w-2xl">
          <p className="font-serif-display text-2xl italic text-muted-foreground">
            I do not build demos. I build things I would use myself.
          </p>
          <p className="font-mono text-xs text-muted-foreground/60 mt-2">
            the engineering philosophy
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, index) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="group glass-card elevate-hover p-8 flex flex-col gap-6"
            >
              <div className="flex justify-between items-start font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span>{p.tag}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif-display group-hover:text-accent transition">
                {p.title}
              </h3>
              <p className="text-muted-foreground">{p.copy}</p>
              <div className="font-mono text-xs text-accent/80">{p.buildLog}</div>
              {p.highlightMetric && (
                <div className="font-mono text-xs text-secondary font-semibold">
                  → {p.highlightMetric}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {p.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-accent/30 text-accent/70 rounded-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 p-6 max-w-sm border border-border bg-card/70 font-mono text-sm">
          <pre className="whitespace-pre-wrap text-muted-foreground">{
            `┌─────────────────────────────────────────┐
│  what I'm not                           │
│  ─────────────────────────────────────  │
│  x 10x developer (I just do not stop)  │
│  x a framework chaser                  │
│  x available for "quick favors"        │
│  x building blockchain anything        │
│  v actually reading your job desc      │
└─────────────────────────────────────────┘`
          }</pre>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        id="contact"
        data-section="contact"
        className="mx-auto max-w-7xl px-6 py-20 scroll-mt-24"
      >
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          contact · open inbox
        </div>
        <h2 className="font-serif-display text-5xl md:text-8xl leading-[0.95] mb-6">
          Let us build <span className="italic text-accent">something good.</span>
        </h2>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          Currently taking on staff-level and architect engagements, backend systems,
          AI infrastructure, and 0 to 1 products. Reply usually within 24 hours.
        </p>

        <div className="grid gap-12 md:grid-cols-12 mt-10">
          <div className="md:col-span-5">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              direct channels
            </div>

            <div className="font-mono text-xs bg-secondary/15 border border-border p-4 mb-4 space-y-1">
              <LineKV label="expected_response_time" value="< 24h" />
              <LineKV label="preferred_opener" value='"hey, I am building X and need..."' />
              <LineKV label="will_ignore" value='"quick question" with 15 follow-up questions' />
              <LineKV label="timezone" value="GMT+4 (UAE)" />
              <LineKV label="coffee_preference" value="black, no sugar, while reading your brief" />
            </div>

            <ul className="space-y-px border-t border-border">
              <ContactRow
                label="email"
                value="ramosjohnmichael61@gmail.com"
                href="mailto:ramosjohnmichael61@gmail.com"
              />
              <ContactRow
                label="github"
                value="ramos-jm"
                href="https://github.com/ramos-jm"
              />
              <ContactRow
                label="linkedin"
                value="ramos-jm"
                href="https://linkedin.com/in/ramos-jm"
              />
              <ContactRow
                label="x / twitter"
                value="@ramos_jm"
                href="https://x.com/ramos_jm"
              />
            </ul>
          </div>

          <form
            className="md:col-span-7 glass-card p-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const subject = encodeURIComponent(`Project inquiry — ${data.get("name")}`);
              const body = encodeURIComponent(
                `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
              );
              window.location.href = `mailto:ramosjohnmichael61@gmail.com?subject=${subject}&body=${body}`;
            }}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              send a brief
            </div>

            {[{ name: "name", label: "your name", type: "text" }, { name: "email", label: "email", type: "email" }].map((f) => (
              <div key={f.name}>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  {f.label}
                </label>
                <input
                  required
                  name={f.name}
                  type={f.type}
                  className="w-full bg-transparent border-b border-border focus:border-accent py-2 outline-none text-lg"
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
                className="w-full bg-transparent border-b border-border focus:border-accent py-2 outline-none text-lg resize-none"
              />
            </div>

            <button
              type="submit"
              className="premium-button inline-flex items-center gap-2 px-6 py-4 font-mono text-xs uppercase tracking-widest text-foreground"
            >
              Send brief
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}

function LineKV({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-muted-foreground">
      <span className="text-accent">{label}</span>
      <span>: {value}</span>
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a
        className="group flex items-center justify-between py-5 border-b border-border hover:px-2 transition-all"
        href={href}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="flex items-center gap-2 font-serif-display text-xl group-hover:text-accent transition">
          {value} <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>
    </li>
  );
}

function CurrentlyDoing() {
  const items = [
    "currently: debugging Komyut-PH at 2am",
    "currently: making computers see handwriting",
    "currently: available for hire · ajman, uae",
    "currently: React · Node.js · TensorFlow.js",
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((s) => (s + 1) % items.length), 3000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="mb-6">
      <div className="inline-flex items-center gap-3 font-mono text-xs">
        <div className="border border-accent/40 px-3 py-1 rounded-none text-accent flex items-center gap-3 bg-accent/5">
          <span className="border-l-2 border-accent animate-pulse pl-2" />
          <span>{items[i]}</span>
        </div>
      </div>
    </div>
  );
}

function RawFacts() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.45 });

  useEffect(() => {
    const rotateId = setInterval(() => {
      setIdx((s) => (s + 1) % RAW_FACTS.length);
    }, 4000);
    return () => clearInterval(rotateId);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    setTyped("");
    let cursor = 0;
    const text = RAW_FACTS[idx];
    const typeId = setInterval(() => {
      cursor += 1;
      setTyped(text.slice(0, cursor));
      if (cursor >= text.length) clearInterval(typeId);
    }, 26);
    return () => clearInterval(typeId);
  }, [idx, isInView]);

  return (
    <div ref={ref} className="mt-6 border border-border p-4 bg-card/60">
      <div className="font-mono text-xs text-accent">// raw_facts.txt</div>
      <div className="mt-2 font-mono text-lg text-secondary h-8">{typed}</div>
    </div>
  );
}
