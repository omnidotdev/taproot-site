import { Button } from "@omnidotdev/thornberry/button";
import { ArrowRight, Gauge } from "lucide-react";

import app from "@/lib/config/app.config";
import useInView from "@/lib/hooks/useInView";
import cn from "@/lib/utils";

interface Stat {
  value: string;
  unit: string;
  label: string;
}

const stats: Stat[] = [
  { value: "8,200", unit: "req/s", label: "point-lookup throughput" },
  { value: "6", unit: "ms", label: "p99 read latency" },
  { value: "0", unit: "", label: "N+1 queries" },
  { value: "1", unit: "binary", label: "no runtime, no codegen" },
];

/**
 * "Fast by design" section: Taproot's own throughput and latency, with a
 * pointer to the reproducible benchmark rather than a headline comparison.
 */
const Performance = () => {
  const { ref, inView } = useInView();

  return (
    <section id="performance" className="px-4 py-28" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <div
          className={cn(
            "mb-14 text-center transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary text-sm">
            <Gauge className="h-4 w-4" />
            Fast by design
          </div>
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Low, flat latency on the paths you actually hit
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Every query runs only the SQL it selects, relations are batched
            instead of fanned out, and the whole thing ships as one native
            binary with no runtime to warm up.
          </p>
        </div>

        <div
          className={cn(
            "grid gap-4 transition-all delay-150 duration-700 sm:grid-cols-2 lg:grid-cols-4",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          {stats.map(({ value, unit, label }) => (
            <div
              key={label}
              className="rounded-2xl border bg-card/60 p-6 text-center backdrop-blur-sm"
            >
              <div className="font-bold text-4xl tracking-tight">
                {value}
                {unit && (
                  <span className="ml-1 font-medium text-lg text-muted-foreground">
                    {unit}
                  </span>
                )}
              </div>
              <div className="mt-2 text-muted-foreground text-sm">{label}</div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col items-center gap-3 text-center transition-all delay-300 duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <p className="max-w-md text-muted-foreground text-sm">
            Measured on a commodity machine over hundreds of thousands of rows.
            The harness is in the repo, so you can run it against your own
            database and your current stack.
          </p>
          <Button variant="outline" className="gap-2" asChild>
            <a
              href={`${app.repoUrl}/tree/master/benchmark`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Benchmark it yourself <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Performance;
