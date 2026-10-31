import { Button } from "@omnidotdev/thornberry/button";
import { ArrowRight, Github } from "lucide-react";

import CodeBlock from "@/components/landing/CodeBlock";
import app from "@/lib/config/app.config";
import useInView from "@/lib/hooks/useInView";
import cn from "@/lib/utils";

/**
 * Call-to-action section before footer.
 */
const Cta = () => {
  const { ref, inView } = useInView();

  return (
    <section className="px-4 py-28" ref={ref}>
      <div
        className={cn(
          "relative mx-auto max-w-3xl overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center transition-all duration-700 md:px-12",
          inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute bottom-[-9rem] left-1/2 h-[22rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />
        </div>

        <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
          A GraphQL API from your database
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Install the server, point it at your Postgres database, and query it
          instantly.
        </p>

        <div className="mx-auto mt-8 max-w-md text-left">
          <CodeBlock
            lang="bash"
            code="brew install omnidotdev/tap/taproot"
            prompt
          />
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="gap-2" asChild>
            <a href={app.docsUrl}>
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href={app.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
