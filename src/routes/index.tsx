import { Button } from "@omnidotdev/thornberry/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Copy,
  FileCode,
  Github,
  Layers,
  Package,
  Scale,
  Wand2,
  Zap,
} from "lucide-react";
import { useState } from "react";

import Cta from "@/components/landing/Cta";
import Showcase from "@/components/landing/Showcase";
import app from "@/lib/config/app.config";
import useInView from "@/lib/hooks/useInView";
import createMetaTags from "@/lib/util/createMetaTags";
import cn from "@/lib/utils";

import type { ComponentType } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: createMetaTags({
      title: "The most direct path from Postgres to GraphQL",
      description: app.description,
      keywords:
        "graphql, postgresql, postgres, api, database, rust, zero codegen, introspection, subscriptions, row-level security, taproot",
    }),
  }),
  component: HomePage,
});

/**
 * Home page / Landing.
 */
function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Showcase />
      <FeaturesSection />
      <Cta />
    </div>
  );
}

function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const command = "brew install omnidotdev/tap/taproot";

  const copy = () => {
    navigator.clipboard
      ?.writeText(command)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy install command"
      className="group flex items-center gap-3 rounded-xl border bg-card/60 px-4 py-3 font-mono text-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-card"
    >
      <span className="select-none text-primary">$</span>
      <span className="text-foreground">{command}</span>
      <span className="ml-1 text-muted-foreground transition-colors group-hover:text-primary">
        {copied ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </span>
    </button>
  );
}

function HeroSection() {
  const { ref, inView } = useInView({ margin: "0px" });

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center gap-8 overflow-hidden px-4 pt-24 pb-16 text-center md:pt-32"
    >
      {/* forge glow: a warm halo behind the mark, embers pooled at the base */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-9rem] left-1/2 h-[38rem] w-[52rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-[-4rem] left-1/2 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-secondary/15 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div
        className={cn(
          "flex max-w-3xl flex-col items-center gap-6 transition-all duration-700",
          inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_0_50px_-12px] shadow-primary/50">
          <img
            src="/img/taproot-mark.svg"
            alt=""
            aria-hidden
            className="h-9 w-9"
          />
        </div>

        <h1 className="font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          <span className="block">The most direct path</span>
          <span className="block bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
            from Postgres to GraphQL
          </span>
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
          Point Taproot at your PostgreSQL database and it serves a full GraphQL
          API — queries, filtering, pagination, mutations, subscriptions, and
          row-level security — with zero codegen.
        </p>
      </div>

      <div
        className={cn(
          "flex flex-col items-center gap-4 transition-all delay-150 duration-700",
          inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="gap-2" asChild>
            <a href={app.docsUrl}>
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href={app.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>
        <InstallCommand />
      </div>
    </section>
  );
}

interface Feature {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Wand2,
    title: "Zero codegen",
    description:
      "Introspects your tables, columns, relationships, and enums at startup and serves a live, queryable schema — no generated files to maintain.",
  },
  {
    icon: FileCode,
    title: "Full CRUD and relations",
    description:
      "Filtering, ordering, and Relay pagination; create / update / delete plus nested mutations; relationships wired automatically from your foreign keys.",
  },
  {
    icon: Zap,
    title: "Real-time subscriptions",
    description:
      "Change notifications pushed to clients over Postgres LISTEN/NOTIFY, served as GraphQL subscriptions.",
  },
  {
    icon: Scale,
    title: "Row-level security",
    description:
      "JWT-based auth with RLS passthrough, so Postgres enforces access per request. Apollo Federation ready.",
  },
  {
    icon: Package,
    title: "Fast and self-contained",
    description:
      "A single Rust binary with no runtime dependencies, with batched relationship loading to avoid N+1 queries.",
  },
  {
    icon: Layers,
    title: "Embeddable and open source",
    description:
      "Apache-2.0. Run the server, or embed the generator as a Rust library via taproot-core.",
  },
];

function FeaturesSection() {
  const { ref, inView } = useInView();

  return (
    <section id="features" className="px-4 py-28" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <div
          className={cn(
            "mb-16 text-center transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Built to get out of your way
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Everything you need to serve your database over GraphQL, and nothing
            to babysit.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className={cn(
                "flex flex-col items-start gap-3 transition-all duration-500",
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
