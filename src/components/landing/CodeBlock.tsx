import cn from "@/lib/utils";

import type { ReactNode } from "react";

type Lang = "dockerfile" | "bash" | "json" | "output" | "sql" | "graphql";

interface Rule {
  re: RegExp;
  cls: string;
}

/**
 * Token color classes, kept to a small, restrained palette: orange for the
 * meaningful tokens (instructions, prompts, keys), emerald for strings, muted
 * zinc for comments and punctuation.
 */
const C = {
  kw: "text-primary",
  str: "text-emerald-400",
  com: "text-zinc-500",
  num: "text-amber-300/90",
  punc: "text-zinc-500",
  flag: "text-zinc-500",
  ok: "text-emerald-400",
  def: "text-zinc-300",
};

const rules: Record<Lang, Rule[]> = {
  dockerfile: [
    { re: /#[^\n]*/y, cls: C.com },
    { re: /"(?:[^"\\]|\\.)*"/y, cls: C.str },
    {
      re: /\b(FROM|RUN|COPY|ADD|WORKDIR|ENV|EXPOSE|CMD|ENTRYPOINT|ARG|LABEL|USER|VOLUME|HEALTHCHECK|SHELL|AS)\b/y,
      cls: C.kw,
    },
    { re: /--[\w-]+/y, cls: C.flag },
    { re: /\b\d+\b/y, cls: C.num },
  ],
  bash: [
    { re: /#[^\n]*/y, cls: C.com },
    { re: /"(?:[^"\\]|\\.)*"/y, cls: C.str },
    { re: /\btaproot\b/y, cls: C.kw },
    { re: /--[\w-]+/y, cls: C.flag },
    { re: /\b\d+(?:\.\d+)?\b/y, cls: C.num },
  ],
  json: [
    { re: /"[^"]*"(?=\s*:)/y, cls: C.kw },
    { re: /"[^"]*"/y, cls: C.str },
    { re: /\b(?:true|false|null)\b/y, cls: C.num },
    { re: /\b\d+\b/y, cls: C.num },
    { re: /[{}[\],:]/y, cls: C.punc },
  ],
  output: [
    { re: /\btaproot\b/y, cls: C.kw },
    { re: /--[\w-]+/y, cls: C.flag },
    { re: /\b(?:done|pushed)\b[^\n]*/y, cls: C.ok },
    { re: /\.{2,}/y, cls: C.punc },
    { re: /\b\d+(?:\.\d+)?s?\b/y, cls: C.num },
  ],
  sql: [
    { re: /--[^\n]*/y, cls: C.com },
    { re: /'(?:[^'\\]|\\.)*'/y, cls: C.str },
    {
      re: /\b(create|table|primary|key|references|not|null|default|unique|select|insert|into|values|from|where|and|or|order|by|constraint)\b/iy,
      cls: C.kw,
    },
    {
      re: /\b(uuid|text|timestamptz|boolean|int|integer|bigint|serial|jsonb|numeric|varchar|date)\b/iy,
      cls: C.num,
    },
    { re: /\b\d+\b/y, cls: C.num },
  ],
  graphql: [
    { re: /#[^\n]*/y, cls: C.com },
    { re: /"(?:[^"\\]|\\.)*"/y, cls: C.str },
    { re: /\b(query|mutation|subscription|fragment|on)\b/y, cls: C.kw },
    { re: /@\w+/y, cls: C.flag },
    { re: /\b\d+\b/y, cls: C.num },
    { re: /[{}()[\]:!]/y, cls: C.punc },
  ],
};

/**
 * Split source into colored spans by scanning left to right with sticky
 * per-language rules, falling back to a plain character when nothing matches.
 * Deliberately small: it covers the handful of snippet shapes this site shows,
 * not a general grammar.
 */
const highlight = (code: string, lang: Lang): ReactNode[] => {
  const langRules = rules[lang];
  const nodes: ReactNode[] = [];
  let buffer = "";
  let bufferCls = C.def;
  let i = 0;
  let key = 0;

  const flush = () => {
    if (!buffer) return;
    nodes.push(
      <span key={key++} className={bufferCls}>
        {buffer}
      </span>,
    );
    buffer = "";
  };

  while (i < code.length) {
    let matched = false;
    for (const { re, cls } of langRules) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m.index === i && m[0].length > 0) {
        if (cls !== bufferCls) {
          flush();
          bufferCls = cls;
        }
        buffer += m[0];
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      if (bufferCls !== C.def) {
        flush();
        bufferCls = C.def;
      }
      buffer += code[i];
      i += 1;
    }
  }
  flush();
  return nodes;
};

interface CodeBlockProps {
  code: string;
  lang: Lang;
  /** Filename or command shown in the window title bar. */
  title?: string;
  /** Show a leading `$` prompt (for a single shell command). */
  prompt?: boolean;
  className?: string;
}

/**
 * A minimal terminal window with lightweight syntax highlighting.
 */
const CodeBlock = ({
  code,
  lang,
  title,
  prompt,
  className,
}: CodeBlockProps) => (
  <div
    className={cn(
      "overflow-hidden rounded-xl border border-white/10 bg-zinc-950/90 shadow-sm ring-1 ring-black/5 backdrop-blur",
      className,
    )}
  >
    {title && (
      <div className="flex items-center gap-2 border-white/5 border-b px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-zinc-700" />
        <span className="h-3 w-3 rounded-full bg-zinc-700" />
        <span className="h-3 w-3 rounded-full bg-zinc-700" />
        <span className="ml-2 font-mono text-xs text-zinc-500">{title}</span>
      </div>
    )}
    <pre className="overflow-x-auto px-5 py-4 font-mono text-sm text-zinc-300 leading-relaxed">
      {prompt && <span className="select-none text-primary">$ </span>}
      {highlight(code, lang)}
    </pre>
  </div>
);

export default CodeBlock;
