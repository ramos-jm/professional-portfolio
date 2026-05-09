import { useEffect, useState } from "react";

const lines = [
  { p: "$", t: "whoami", d: 30 },
  { p: ">", t: "john-michael-ramos", d: 18, dim: true },
  { p: "$", t: "cat stack.json", d: 28 },
  { p: ">", t: '{ "backend": ["node","php","python"],', d: 14, dim: true },
  { p: "", t: '  "frontend": ["react","typescript","tailwind"],', d: 14, dim: true },
  { p: "", t: '  "ai": ["tensorflow.js","opencv"] }', d: 14, dim: true },
  { p: "$", t: "ls ./principles", d: 28 },
  { p: ">", t: "01_build_for_people.md 02_design_for_reliability.md", d: 12, dim: true },
  { p: "$", t: "echo $STATUS", d: 28 },
  { p: ">", t: "available in 2026", d: 22, dim: true, accent: true },
];

export function Terminal() {
  const [done, setDone] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (current >= lines.length) return;
    const line = lines[current];
    if (typed.length < line.t.length) {
      const id = setTimeout(() => setTyped(line.t.slice(0, typed.length + 1)), line.d);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setDone((d) => [...d, current]);
      setCurrent((c) => c + 1);
      setTyped("");
    }, 240);
    return () => clearTimeout(id);
  }, [typed, current]);

  // restart loop
  useEffect(() => {
    if (current >= lines.length) {
      const id = setTimeout(() => {
        setDone([]);
        setCurrent(0);
        setTyped("");
      }, 4000);
      return () => clearTimeout(id);
    }
  }, [current]);

  return (
    <div className="font-mono text-[13px] leading-relaxed border border-border rounded-[10px] bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="ml-3 text-muted-foreground text-xs uppercase tracking-widest">~/jm-ramos — zsh</span>
      </div>
      <div className="p-5 space-y-1 min-h-64">
        {done.map((i) => (
          <Line key={i} line={lines[i]} text={lines[i].t} />
        ))}
        {current < lines.length && (
          <Line line={lines[current]} text={typed} typing />
        )}
      </div>
    </div>
  );
}

function Line({
  line,
  text,
  typing,
}: {
  line: { p: string; dim?: boolean; accent?: boolean };
  text: string;
  typing?: boolean;
}) {
  return (
    <div className="flex gap-2">
      {line.p && <span className="text-muted-foreground select-none w-3">{line.p}</span>}
      {!line.p && <span className="w-3" />}
      <span
        className={`${line.dim ? "text-muted-foreground" : "text-foreground"} ${
          line.accent ? "text-accent" : ""
        } ${typing ? "caret" : ""}`}
      >
        {text}
      </span>
    </div>
  );
}