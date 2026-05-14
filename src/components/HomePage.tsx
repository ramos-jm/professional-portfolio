import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Code, Cpu, Megaphone, Image, ShieldCheck, Film } from "lucide-react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Terminal as TerminalUI } from "@/components/Terminal";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { getLenis } from "@/hooks/useLenis";

type Project = {
  year: string;
  tag: string;
  title: string;
  copy: string;
  buildLog: string;
  techStack: readonly string[];
  github?: string;
  highlightMetric?: string;
  image?: string;
  imageAlt?: string;
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
    year: "2026",
    tag: "ai transit · route intelligence",
    title: "Komyut-PH",
    copy: "A signboard-first commuting assistant using intelligent routing logic, GTFS-compatible systems, and natural language guidance for commuters in the Philippines. Designed around real commuter pain points with offline-tolerant architecture.",
    buildLog: "// status: actively hacking · nights & weekends · github.com/ramos-jm/komyut-ph",
    github: "https://github.com/ramos-jm/komyut-ph",
    image: "assets/komyutph.png",
    imageAlt: "Preview of Komyut-PH",
    techStack: ["React", "TypeScript", "GTFS", "Node.js", "Routing Logic"],
  },

  {
    year: "2025",
    tag: "computer vision · ai",
    title: "RX Reader",
    copy: "A real-time React & TypeScript application for classifying handwritten medicine names using a CNN with 94.76% accuracy. Model converted to TensorFlow.js for client-side privacy.",
    buildLog: "// 94.76% accuracy · browser-only inference · no backend needed",
    github: "https://github.com/ramos-jm/RxReader",
    highlightMetric: "94.76% accuracy",
    image: "assets/instruction.png",
    imageAlt: "RX Reader - Medicine Recognition",
    techStack: ["React.js", "TensorFlow.js"],
  },
  {
    year: "2024",
    tag: "full stack · ai detection",
    title: "AuthenText AI",
    copy: "A Node.js platform that detects AI-generated or manipulated text in real-time using advanced APIs to protect content integrity.",
    buildLog: "// built before AI slop became mainstream · Node.js backend",
    github: "https://github.com/ramos-jm/AuthenText2024",
    image: "assets/autest.png",
    imageAlt: "AuthenText AI - Text Detection",
    techStack: ["HTML5", "CSS3", "JavaScript", "Node.js", "REST API"],
  },
  {
    year: "2023",
    tag: "e-commerce · full stack",
    title: "EZPC",
    copy: "An e-commerce website for PC parts, featuring real-time inventory management, user authentication, and secure backend powered by PHP and SQL.",
    buildLog: "// e-commerce · inventory management · secure payments",
    github: "https://github.com/ramos-jm/EZPC",
    image: "assets/home-page.png",
    imageAlt: "EZPC - E-commerce Platform",
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "SQL"],
  },
  {
    year: "2023",
    tag: "education · java validation",
    title: "CodeSculptorPro",
    copy: "An educational tool built in React that performs lexical, syntax, and semantic checks for Java code to assist beginner programmers.",
    buildLog: "// java checker · code validation · educational tool",
    github: "https://github.com/ramos-jm/CodeSculptorPro",
    image: "assets/Preview.png",
    imageAlt: "CodeSculptorPro - Java Code Checker",
    techStack: ["HTML5", "CSS3", "JavaScript", "React.js"],
  },
  
] satisfies readonly Project[];

// add non-dev project samples
projects.push(
  {
    year: "2026",
    tag: "social media · brand",
    title: "WheelFix Digital Brand Refresh",
    copy: "Managed content calendar, produced short-form video assets, and grew engagement across Instagram and TikTok.",
    buildLog: "// social · 2025 · content ops",
    image: "assets/wheelfix.jpg",
    imageAlt: "Preview of WheelFix Digital Brand Refresh",
    techStack: ["Instagram", "TikTok", "Canva", "Figma"],
    github: ""
  },
  
);

const timeline = [
  {
    y: "2025",
    r: "Junior Social Media Executive · WheelFix LLC",
    d: "SOCIAL",
    c: "Produced short-form content, managed digital branding, and executed engagement campaigns for audience growth and engagement optimization.",
    l: "Learned: content velocity matters as much as quality",
  },
  {
    y: "2025",
    r: "Contractual Application Developer · CARET Solutions Inc.",
    d: "DEV",
    c: "Delivered inventory modules and automated validation systems that reduced transaction errors by 60% within the first month of deployment.",
    l: "Learned: validation logic saves more time than features",
  },
  {
    y: "2025",
    r: "Admin & Digital Content Specialist · Amphibious Surf School",
    d: "DESIGN",
    c: "Led social media branding and designed promotional materials for digital engagement and booking visibility.",
    l: "Learned: good design is communication, not decoration",
  },
  {
    y: "2024",
    r: "Web Development Team Leader & Intern · Highly Succeed Inc.",
    d: "DEV",
    c: "Led a team of 12 interns, developed React.js features across multiple client systems, and coordinated collaborative deployments in Agile workflows.",
    l: "Learned: shipping beats perfecting, always",
  },
  {
    y: "2021–2025",
    r: "B.S. Computer Science · New Era University",
    d: "DEV",
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

function disciplineFromTag(tag: string) {
  const t = tag.toLowerCase();
  if (/social/.test(t) || /brand/.test(t) || /instagram|tiktok/.test(t)) return "SOCIAL";
  if (/design/.test(t) || /graphic/.test(t)) return "DESIGN";
  if (/qa|validation|test/.test(t)) return "QA";
  return "DEV";
}

export default function HomePage() {
  return (
    <div className="relative">
      <ScrollBackground />
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
              Full-Stack Creative · Developer · Digital Marketer
            </div>

            <CurrentlyDoing />
            <DisciplineFilter />

            <h1 className="font-serif-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] gradient-title glow-accent">
              John Michael <br />
              <span className="italic gradient-title">Ramos.</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl max-w-2xl text-muted-foreground">
              I'm not just a developer. I build products, design brands, make content, and
              ship reliable systems that people can use. Whether it's a polished landing page
              or a browser-based AI, I care about craft and outcomes.
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

      <DynamicTicker />

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
              I'm John Michael C. Ramos — I'm not just a developer. I design brands, create
              short-form content, and ship reliable systems. I like building things people use,
              and I make sure they work in the messy real world.
            </p>
            <p>
              design visual systems that keep a brand consistent across platforms — from
              Instagram grids to booking promo materials.
            </p>
            <p>
              Technically, I build full-stack products and browser AI, design databases and
              validation logic, and own QA workflows so systems are reliable. I lean on
              TensorFlow.js, Node.js, React, and solid testing practices to keep things stable.
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
                <div className="md:col-span-4 font-serif-display text-2xl text-foreground flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-accent/30 text-accent/70">
                    {row.d}
                  </span>
                  <span>{row.r}</span>
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
        id="services"
        data-section="services"
        className="mx-auto max-w-7xl px-6 py-20 scroll-mt-24"
      >
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          what i can do for you
        </div>
        <h3 className="font-serif-display text-4xl mb-8">Services — skills by discipline</h3>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <Code className="h-5 w-5 text-accent" />
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Web & AI</div>
            </div>
            <div className="font-serif-display text-xl mb-2">Web & AI Development</div>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>Full-stack apps (React, Node.js, TypeScript)</li>
              <li>Browser ML & TensorFlow.js</li>
              <li>API design & database modeling</li>
              <li>Computer vision prototypes</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <Megaphone className="h-5 w-5 text-accent" />
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Social</div>
            </div>
            <div className="font-serif-display text-xl mb-2">Social Media Management</div>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>Campaign strategy & planning</li>
              <li>Short-form content production</li>
              <li>Content calendar & operations</li>
              <li>Platform analytics & growth</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <Image className="h-5 w-5 text-accent" />
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Design</div>
            </div>
            <div className="font-serif-display text-xl mb-2">Graphic & Visual Design</div>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>Brand identity & promo assets</li>
              <li>Social templates & layouts</li>
              <li>Figma and Canva production</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">QA</div>
            </div>
            <div className="font-serif-display text-xl mb-2">QA & Software Testing</div>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>Manual & functional testing</li>
              <li>Validation logic & automation</li>
              <li>Test case design & documentation</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <Film className="h-5 w-5 text-accent" />
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Content</div>
            </div>
            <div className="font-serif-display text-xl mb-2">Content Creation</div>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>Short-form video scripting & production</li>
              <li>Campaign messaging & copywriting</li>
              <li>Portfolio & documentation writing</li>
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        id="skills"
        data-section="skills"
        className="mx-auto max-w-7xl px-6 py-12 scroll-mt-24"
      >
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">skills</div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="font-serif-display text-2xl mb-4">Technical</div>
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "React",
                "Node.js",
                "TensorFlow.js",
                "PostgreSQL",
                "OpenCV",
              ].map((s) => (
                <span key={s} className="font-mono text-[11px] uppercase tracking-widest px-2 py-1 border border-accent/30 text-accent/70">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="font-serif-display text-2xl mb-4">Creative & Professional</div>
            <div className="flex flex-wrap gap-2">
              {[
                "Instagram",
                "TikTok",
                "Figma",
                "Canva",
                "QA Methodologies",
                "Content Strategy",
              ].map((s) => (
                <span key={s} className="font-mono text-[11px] uppercase tracking-widest px-2 py-1 border border-accent/30 text-accent/70">
                  {s}
                </span>
              ))}
            </div>
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
            <ScrollTiltCard key={p.title} index={index}>
              <div className="overflow-hidden border border-border/60 bg-background/40">
                <div className="relative aspect-16/10">
                  <img
                    src={p.image}
                    alt={p.imageAlt ?? `${p.title} preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/72 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/90">
                      visual preview
                    </div>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-none border border-accent/50 bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-accent transition hover:bg-accent hover:text-accent-foreground"
                      >
                        GitHub
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-accent/30 text-accent/70">
                    {disciplineFromTag(p.tag)}
                  </span>
                  <span>{p.tag}</span>
                </div>
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
              {p.github && (
                <div className="pt-2">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent hover:text-foreground transition"
                  >
                    View on GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </ScrollTiltCard>
          ))}
        </div>

        <div className="mt-12 max-w-sm glass-card p-8">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            what I'm not
          </div>
          <div className="space-y-3">
            {[
              { label: "10x developer", value: false, note: "I just do not stop" },
              { label: "a framework chaser", value: false },
              { label: "available for \"quick favors\"", value: false },
              { label: "building blockchain anything", value: false },
              { label: "actually reading your job desc", value: true },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-accent font-mono text-sm mt-0.5">
                  {item.value ? "✓" : "✕"}
                </span>
                <div className="flex-1">
                  <div className="text-foreground text-sm">{item.label}</div>
                  {item.note && (
                    <div className="text-muted-foreground text-xs italic mt-1">
                      {item.note}
                    </div>
                  )}
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
          Open to roles and projects across web development, social media management,
          graphic design, QA testing, and digital content creation. Based in Ajman, UAE. Remote-friendly.
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
              <LineKV label="coffee_preference" value="sorry, I don't drink coffee" />
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
    <div className="text-muted-foreground flex justify-between items-center">
      <span className="text-accent font-mono text-[11px]">{label}</span>
      <span className="ml-3 text-foreground font-mono text-[13px]">{value}</span>
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
    "currently: Social Media Strategy · Campaigns",
    "currently: Graphic Design & Brand Systems",
    "currently: QA workflows · validation logic",
    "currently: short-form content production",
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

function DisciplineFilter() {
  const [active, setActive] = useState("All");
  const items = ["All", "Dev & AI", "Social Media", "Design", "QA"];

  const handle = (it: string) => {
    setActive(it);
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mt-4 flex gap-3 flex-wrap">
      {items.map((it) => (
        <button
          key={it}
          onClick={() => handle(it)}
          className={`font-mono text-[11px] uppercase tracking-widest px-3 py-2 border transition ${
            active === it
              ? "text-foreground border-primary/60 bg-primary/15 glow-accent"
              : "text-muted-foreground border-border/40 hover:text-accent hover:border-accent"
          }`}
        >
          {it}
        </button>
      ))}
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
      <div className="mt-2 font-mono text-lg h-8 text-accent">{typed}</div>
    </div>
  );
}

function DynamicTicker() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const durationRef = useRef(40);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const items = [
    "React",
    "Node.js",
    "TensorFlow.js",
    "PostgreSQL",
    "Social Media Strategy",
    "Digital Branding",
    "Short-Form Content",
    "Graphic Design",
    "QA & Testing",
    "Agile Workflows",
    "Campaign Execution",
    "Content Creation",
    "Team Leadership",
  ];

  useEffect(() => {
    const lenis = getLenis();
    let targetDuration = 40;

    const scrollHandler = ({ velocity }: { velocity: number }) => {
      const speed = Math.abs(velocity);
      targetDuration = Math.max(8, 40 - speed * 12);
    };

    if (lenis) lenis.on("scroll", scrollHandler);

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      durationRef.current += (targetDuration - durationRef.current) * 0.05;

      const rate = 100 / (durationRef.current * 1000);
      positionRef.current -= rate * delta;

      if (positionRef.current <= -50) {
        positionRef.current += 50;
      }

      const transform = `translateX(${positionRef.current}%)`;
      if (track1Ref.current) track1Ref.current.style.transform = transform;
      if (track2Ref.current) track2Ref.current.style.transform = transform;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (lenis) lenis.off("scroll", scrollHandler);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const itemList = (
    <div className="flex shrink-0 items-center gap-10 px-6">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );

  return (
    <section className="border-y border-border bg-secondary/10 overflow-hidden py-3 ticker-mask">
      <div
        className="flex font-mono text-xs uppercase tracking-widest text-muted-foreground"
        style={{ width: "200%", willChange: "transform" }}
      >
        <div ref={track1Ref} className="flex w-1/2">
          {itemList}
        </div>
        <div ref={track2Ref} className="flex w-1/2">
          {itemList}
        </div>
      </div>
    </section>
  );
}

// ─── Scroll Velocity Tilt Card ──────────────────────────────────────────────
function ScrollTiltCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const { velocity } = useScrollVelocity();
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Clamp velocity to a subtle tilt range
  const tilt = isVisible ? Math.max(-2.5, Math.min(2.5, velocity * 1.8)) : 0;
  const skew = isVisible ? Math.max(-0.8, Math.min(0.8, velocity * 0.6)) : 0;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="group glass-card elevate-hover p-8 flex flex-col gap-6"
      style={{
        transform: `perspective(1200px) rotateX(${tilt}deg) skewY(${skew}deg)`,
        transition: "transform 0.15s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </motion.article>
  );
}

// ─── Scroll-Linked Section Background ───────────────────────────────────────
function ScrollBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    // Sections and their associated hue shifts
    const sections = [
      { id: "hero", hue: 185, sat: 100 },
      { id: "about", hue: 210, sat: 80 },
      { id: "services", hue: 270, sat: 60 },
      { id: "work", hue: 345, sat: 90 },
      { id: "contact", hue: 160, sat: 70 },
    ];

    const handler = ({ scroll }: { scroll: number }) => {
      if (!bgRef.current) return;

      const winH = window.innerHeight;
      const totalH = document.documentElement.scrollHeight;
      const progress = scroll / (totalH - winH);

      // Find which section we're closest to
      let activeIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= winH * 0.5) activeIndex = i;
      }

      const next = Math.min(activeIndex + 1, sections.length - 1);
      const current = sections[activeIndex];
      const nextSection = sections[next];

      // Calculate blend factor between sections
      const currentEl = document.getElementById(sections[activeIndex].id);
      if (!currentEl) return;
      const rect = currentEl.getBoundingClientRect();
      const factor = Math.max(0, Math.min(1, -rect.top / winH));

      const hue = current.hue + (nextSection.hue - current.hue) * factor;
      const sat = current.sat + (nextSection.sat - current.sat) * factor;
      const opacity = 0.04 + progress * 0.03;

      bgRef.current.style.background = `radial-gradient(
        ellipse 120% 80% at 50% 0%,
        hsla(${hue}, ${sat}%, 50%, ${opacity}),
        transparent 70%
      )`;
    };

    lenis.on("scroll", handler);
    return () => lenis.off("scroll", handler);
  }, []);

  return (
    <div
      ref={bgRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
