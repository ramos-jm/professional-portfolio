import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Cpu, Database, Layers, Sparkles, Terminal as TerminalIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Terminal as TerminalUI } from "@/components/Terminal";

export const Route = createFileRoute("/")({
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Cell({
  className = "",
  children,
  i = 0,
}: {
  className?: string;
  children: React.ReactNode;
  i?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden border border-border bg-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Index() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative border-b border-border overflow-hidden">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-12 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              AI systems engineer
            </motion.div>
            <h1 className="font-serif-display text-[clamp(3rem,9vw,8rem)] leading-[0.9]">
              {"John Michael".split(" ").map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-4"
                >
                  {w}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="italic text-accent inline-block"
              >
                Ramos.
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-8 text-lg md:text-xl max-w-2xl text-muted-foreground"
            >
              I design and build intelligent systems — from AI-powered applications and computer vision tools to scalable web platforms focused on solving real-world problems.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition"
              >
                Selected work
                <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </Link>
              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 border border-foreground/40 px-5 py-3 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition"
              >
                Download CV
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <TerminalUI />
          </motion.div>
        </div>
      </section>

      {/* TICKER */}
      <div className="border-y border-border bg-secondary/40 overflow-hidden py-3">
        <div className="flex w-max animate-ticker font-mono text-xs uppercase tracking-widest">
          {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex shrink-0 items-center gap-10 px-6">
                <span>◐ Real-Time AI Systems</span>
                <span>◑ Computer Vision</span>
                <span>◒ Full Stack Engineering</span>
                <span>◓ Intelligent Interfaces</span>
                <span className="text-accent">● Open to software engineering opportunities · 2026</span>
                <span>◐ TensorFlow.js · React</span>
                <span>◑ GTFS · Route Intelligence</span>
                <span>◒ Human-Centered Technology</span>
            </div>
          ))}
        </div>
      </div>

      {/* BENTO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              01 — what i do
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl">
              A studio of <span className="italic">one.</span>
            </h2>
          </div>
          <div className="hidden md:block font-mono text-xs text-muted-foreground">
            ↓ scroll
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[180px] gap-3">
          {/* Big intro */}
          <Cell i={0} className="md:col-span-4 md:row-span-2 flex flex-col justify-between bg-accent text-accent-foreground">
            <Sparkles className="h-8 w-8 text-accent" />
            <div>
              <div className="font-mono text-xs uppercase tracking-widest opacity-70 mb-3">
                end-to-end product engineering
              </div>
              <p className="font-serif-display text-3xl md:text-5xl leading-tight">
                I design intelligent systems end-to-end — from AI logic and backend architecture to frontend experiences and production deployment.
              </p>
            </div>
          </Cell>

          <Cell i={1} className="md:col-span-2 flex flex-col justify-between">
            <Database className="h-6 w-6 text-accent" />
            <div>
              <div className="text-3xl font-mono font-semibold">94.76%</div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                RX Reader CNN accuracy
              </div>
            </div>
          </Cell>

          <Cell i={2} className="md:col-span-2 flex flex-col justify-between bg-foreground text-background">
            <Zap className="h-6 w-6 text-accent" />
            <div>
              <div className="text-3xl font-mono font-semibold">12</div>
              <div className="font-mono text-xs uppercase tracking-widest text-background/60">
                interns led in agile development
              </div>
            </div>
          </Cell>

          <Cell i={3} className="md:col-span-3 flex flex-col justify-between">
            <Cpu className="h-6 w-6 text-accent" />
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Backend
              </div>
              <div className="text-lg">
                Node.js · Express · PHP · Python · MySQL · REST APIs
              </div>
            </div>
          </Cell>

          <Cell i={4} className="md:col-span-3 flex flex-col justify-between">
            <Layers className="h-6 w-6 text-accent" />
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Frontend
              </div>
              <div className="text-lg">
                React.js · TypeScript · Tailwind CSS · TensorFlow.js · Bootstrap
              </div>
            </div>
          </Cell>

          <Cell i={5} className="md:col-span-2 flex flex-col justify-between">
            <TerminalIcon className="h-6 w-6 text-accent" />
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                AI / Tools
              </div>
              <div className="text-lg">TensorFlow.js · OpenCV · Keras · Scikit-learn · GitHub</div>
            </div>
          </Cell>

          <Cell i={6} className="md:col-span-2 bg-secondary flex flex-col justify-between">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              now playing
            </div>
            <div>
              <div className="text-base">Building Komyut-PH — an AI-assisted signboard-first commuting system focused on intelligent route guidance for commuters in the Philippines.</div>
            </div>
          </Cell>

          <Cell i={7} className="md:col-span-2 flex flex-col justify-between">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              projects built
            </div>
            <div className="text-5xl font-mono font-semibold">
              20<span className="text-accent">+</span>
            </div>
          </Cell>
        </div>
      </section>

      {/* SELECTED WORK PREVIEW */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                02 — selected work
              </div>
              <h2 className="font-serif-display text-4xl md:text-5xl">
                Things I've <span className="italic">shipped.</span>
              </h2>
            </div>
            <Link
              to="/work"
              className="font-mono text-xs uppercase tracking-widest hover:text-accent inline-flex items-center gap-1"
            >
              all work <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                year: "2026",
                tag: "ai · route intelligence",
                title: "Komyut-PH",
                copy: "A signboard-first commuting assistant using intelligent routing logic, GTFS-compatible systems, and natural language guidance for commuters in the Philippines.",
              },
              {
                year: "2025",
                tag: "computer vision · ai",
                title: "RX Reader",
                copy: "Real-time medicine name recognition web application powered by CNN inference and TensorFlow.js running directly in the browser.",
              },
              {
                year: "2025",
                tag: "healthcare · machine learning",
                title: "Physical Health Monitoring",
                copy: "AI-powered injury and skin condition detection system using deep learning and computer vision technologies.",
              },
              {
                year: "2024",
                tag: "full stack · ai detection",
                title: "AuthenText AI",
                copy: "Node.js-based platform designed to detect manipulated and AI-generated text in real-time.",
              },
            ].map((p) => (
              <Link
                key={p.title}
                to="/work"
                className="group border border-border bg-card p-8 hover:border-foreground transition flex flex-col gap-6"
              >
                <div className="flex justify-between items-start font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <span>{p.tag}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif-display group-hover:text-accent transition">
                  {p.title}
                </h3>
                <p className="text-muted-foreground">{p.copy}</p>
                <div className="flex justify-end">
                  <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45 group-hover:text-accent" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-20 grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-background/60 mb-4">
              ✦ let's build something
            </div>
            <h2 className="font-serif-display text-5xl md:text-7xl leading-[0.95]">
              Have an idea, system, or problem worth building?
              <br />
              <span className="italic text-accent">Let's create something intelligent.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-background hover:text-foreground transition"
            >
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
