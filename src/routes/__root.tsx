import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { Toaster } from "sonner";

import {
  CommandPalette,
  ErrorBoundary,
  Footer,
  Header,
  NotFound,
} from "@/components/layout";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import appCss from "@/lib/styles/globals.css?url";
import createMetaTags from "@/lib/util/createMetaTags";
import ThemeProvider from "@/providers/ThemeProvider";
import { getThemeServerFn } from "@/server/functions/theme";

import type { QueryClient } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

/**
 * Coming soon teaser page for production.
 */
function ComingSoon() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-900 to-sky-800">
      <div className="text-center">
        <h1 className="font-bold text-6xl text-white tracking-tight">
          {app.name}
        </h1>
      </div>
    </div>
  );
}

/**
 * Root route.
 */
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: app.pwa.themeColor,
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "default",
      },
      {
        name: "apple-mobile-web-app-title",
        content: app.name,
      },
      {
        name: "mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "msapplication-TileColor",
        content: app.pwa.themeColor,
      },
      ...createMetaTags(),
    ],
    links: [
      {
        rel: "canonical",
        href: app.url,
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "apple-touch-icon",
        href: "/img/favicon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/img/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/img/favicon-16x16.png",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: app.name,
          url: app.url,
          description: app.description,
        }),
      },
    ],
  }),
  loader: () => getThemeServerFn(),
  errorComponent: ErrorBoundary,
  // Render 404s in-shell: a thrown `notFound()` renders here inside RootDocument
  // (globals + layout), not as a bare unstyled page. Pairs with the router's
  // `defaultNotFoundComponent` for unmatched routes.
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  // Note: Production teaser is intentionally disabled for this app
  // To enable, uncomment the isDevEnv check below
  // if (!isDevEnv) {
  //   return (
  //     <RootDocument>
  //       <ComingSoon />
  //     </RootDocument>
  //   );
  // }

  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

// Suppress unused warnings while teaser is disabled
void isDevEnv;
void ComingSoon;

/**
 * Evict any previously registered service worker.
 *
 * This app no longer ships a service worker: offline precaching bought little
 * and its stale-while-revalidate cache stranded users on old asset bundles
 * after every deploy. On load we unregister any surviving registration and
 * drop its caches directly from the page so stale clients self-heal
 */
const unregisterServiceWorkers = async () => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map((registration) => registration.unregister()),
    );

    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch (error) {
    console.error("SW cleanup failed:", error);
  }
};

/**
 * Root document.
 */
function RootDocument({ children }: PropsWithChildren) {
  const theme = Route.useLoaderData();

  // Evict any service worker left over from when this app shipped one
  useEffect(() => {
    unregisterServiceWorkers();
  }, []);

  return (
    <html suppressHydrationWarning lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>

      <body>
        <ThemeProvider theme={theme}>
          <Header />

          <div className="relative flex h-dvh w-full flex-col gap-0">
            <main className="mt-16.5 flex-1">{children}</main>

            <Footer />
          </div>

          <CommandPalette />

          <Toaster position="top-center" richColors />
        </ThemeProvider>

        <TanStackDevtools
          plugins={[
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
              defaultOpen: true,
            },
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}

export default RootDocument;
