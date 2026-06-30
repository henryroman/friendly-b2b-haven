import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LoadingScreen } from "../components/site/LoadingScreen";

function NotFoundComponent() {
  return (
    <div className="bg-cream flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="overline">404</p>
        <h1 className="font-display mt-4 text-4xl font-bold">Page not found</h1>
        <p className="text-muted-foreground mt-3 text-[16px]">
          The page you're looking for has been moved or no longer exists.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="font-display inline-flex items-center justify-center rounded-sm border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-[14px] font-semibold tracking-[0.06em] uppercase text-[var(--text-on-gold)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="bg-cream flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight">This page didn't load</h1>
        <p className="text-muted-foreground mt-2 text-[15px]">
          Something went wrong on our end. You can retry or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="font-display inline-flex items-center justify-center rounded-sm border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-[14px] font-semibold tracking-[0.06em] uppercase text-[var(--text-on-gold)]"
          >
            Try again
          </button>
          <a
            href="/"
            className="font-display inline-flex items-center justify-center rounded-sm border border-[var(--line-strong)] px-6 py-3 text-[14px] font-semibold tracking-[0.06em] uppercase"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tess Van Ghert — We buy precious metal from companies" },
      { name: "description", content: "Compliant acquisition. Global settlement. A family-owned precious metals trading house since 2011." },
      { name: "author", content: "Tess Van Ghert" },
      { property: "og:title", content: "Tess Van Ghert — We buy precious metal from companies" },
      { property: "og:description", content: "Compliant acquisition. Global settlement. A family-owned precious metals trading house since 2011." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Tess Van Ghert — We buy precious metal from companies" },
      { name: "twitter:description", content: "Compliant acquisition. Global settlement. A family-owned precious metals trading house since 2011." },
      { property: "og:url", content: "https://tvg.gold" },
      { property: "og:site_name", content: "Tess Van Ghert" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fdc9fd59-bd7a-4469-a179-1a6bc716a896/id-preview-a0591492--0be0552f-1fac-45af-919e-d090a3db8ce2.lovable.app-1782733438594.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fdc9fd59-bd7a-4469-a179-1a6bc716a896/id-preview-a0591492--0be0552f-1fac-45af-919e-d090a3db8ce2.lovable.app-1782733438594.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://tvg.gold/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
      <Outlet />
    </QueryClientProvider>
  );
}

