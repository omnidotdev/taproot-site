import { ArrowRight } from "lucide-react";

import CodeBlock from "@/components/landing/CodeBlock";
import useInView from "@/lib/hooks/useInView";
import cn from "@/lib/utils";

const SQL = `create table "user" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  created_at timestamptz default now()
);`;

const GQL = `query {
  users(
    first: 10
    filter: { name: { includesInsensitive: "al" } }
  ) {
    nodes {
      id
      name
      email
    }
    pageInfo { hasNextPage endCursor }
  }
}`;

/**
 * "From schema to API" showcase: a Postgres table on the left becomes a fully
 * queryable GraphQL API on the right, with no code in between.
 */
const Showcase = () => {
  const { ref, inView } = useInView();

  return (
    <section id="showcase" className="px-4 py-28" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <div
          className={cn(
            "mb-14 text-center transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            From schema to API, instantly
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Point Taproot at a table and it serves filtering, relations,
            pagination, and global IDs. No resolvers, no codegen, no schema to
            hand-write.
          </p>
        </div>

        <div
          className={cn(
            "grid items-stretch gap-4 transition-all delay-150 duration-700 lg:grid-cols-[1fr_auto_1fr]",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <CodeBlock
            lang="sql"
            title="schema.sql"
            code={SQL}
            className="h-full"
          />

          <div
            className="flex items-center justify-center text-primary"
            aria-hidden
          >
            <span className="rounded-full border border-primary/20 bg-primary/10 p-2">
              <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
            </span>
          </div>

          <CodeBlock
            lang="graphql"
            title="query.graphql"
            code={GQL}
            className="h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Showcase;
