import { createServerFn } from "@tanstack/react-start";
import type { MetalCode } from "./melt-calculator-data";

// Live spot prices for the homepage melt calculator -- fetched server-side
// from tvg-hub's public GET /api/metals/latest (confirmed live and
// unauthenticated 2026-08-25:
// https://tvg-hub.v-ippolittess.workers.dev/api/metals/latest -- USD/gram
// per metal, refreshed by tvg-hub's own 15-minute cron via Metal Sentinel).
// That route currently sets no Access-Control-Allow-Origin header (checked
// directly against tvg-hub's source), so a browser-side fetch from this
// site would be blocked by CORS -- this must run server-side, this site's
// own Cloudflare Worker calling tvg-hub's Worker directly, a server-to-
// server request not subject to CORS at all.
//
// GBP/EUR rates via Frankfurter (ECB daily reference rates, free, no key)
// -- the same FX source tvg-hub's own melt-value.js uses, one call for
// both currencies at once (Frankfurter accepts a comma-separated `to`
// list), matching that file's own fetchFxRates approach. USD needs no
// conversion -- tvg-hub's prices are already USD/gram.
//
// Returns an empty/ok:false result (never a guessed or stale number) on
// any failure -- the calculator must show "unavailable" rather than a
// wrong price. 5s timeout so a slow/unreachable tvg-hub can never stall
// this site's own homepage render.
//
// NOTE (2026-08-25): originally named metals-price.server.ts. Renamed to
// drop the ".server." middle segment -- TanStack Start's import-protection
// Vite plugin bans importing ANY file matching **/*.server.* into
// client-bundled code, purely by filename pattern, regardless of the
// createServerFn() wrapping below already making this server-only at
// runtime. Confirmed via a real `vite build`: the old filename produced
// "[import-protection] Import denied in client environment -- Denied by
// file pattern: **/*.server.*" the moment any route imported it (this
// file is imported by both index.tsx and MeltCalculator.tsx). Renaming is
// the fix; the createServerFn wrapping is what actually enforces
// server-only execution, not the filename. Same fix already applied on
// metauxprecieux.org's equivalent file.

const METALS_URL = "https://tvg-hub.v-ippolittess.workers.dev/api/metals/latest";
const FX_URL = "https://api.frankfurter.dev/v1/latest?from=USD&to=GBP,EUR";
const FETCH_TIMEOUT_MS = 5000;

const KNOWN_METALS: MetalCode[] = ["XAU", "XAG", "XPT", "XPD"];

export type LivePriceData = {
  usdPerGram: Partial<Record<MetalCode, number>>;
  fxRates: { USD: number; GBP?: number; EUR?: number };
  updatedAt: string | null;
  ok: boolean;
};

export const fetchLiveMeltPrices = createServerFn({ method: "GET" }).handler(
  async (): Promise<LivePriceData> => {
    try {
      const [metalsRes, fxRes] = await Promise.all([
        fetch(METALS_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) }),
        fetch(FX_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) }),
      ]);
      if (!metalsRes.ok) {
        return { usdPerGram: {}, fxRates: { USD: 1 }, updatedAt: null, ok: false };
      }

      const metalsData = (await metalsRes.json()) as {
        metals?: { metal: string; price_gram_usd: number; updated_at: string }[];
      };
      const usdPerGram: LivePriceData["usdPerGram"] = {};
      let updatedAt: string | null = null;
      for (const m of metalsData.metals ?? []) {
        if ((KNOWN_METALS as string[]).includes(m.metal) && typeof m.price_gram_usd === "number") {
          usdPerGram[m.metal as MetalCode] = m.price_gram_usd;
          updatedAt = m.updated_at ?? updatedAt;
        }
      }

      // FX is a nice-to-have (the GBP/EUR toggle) -- a Frankfurter failure
      // shouldn't take down the whole calculator when USD prices are
      // fine; it just falls back to USD-only until the next page load.
      let fxRates: LivePriceData["fxRates"] = { USD: 1 };
      if (fxRes.ok) {
        const fxData = (await fxRes.json()) as { rates?: { GBP?: number; EUR?: number } };
        fxRates = { USD: 1, GBP: fxData.rates?.GBP, EUR: fxData.rates?.EUR };
      }

      return { usdPerGram, fxRates, updatedAt, ok: Object.keys(usdPerGram).length > 0 };
    } catch {
      // Network error, timeout, or unexpected response shape -- never let
      // this throw into the route loader. An unreachable tvg-hub must
      // degrade to "calculator unavailable", not break the homepage.
      return { usdPerGram: {}, fxRates: { USD: 1 }, updatedAt: null, ok: false };
    }
  },
);
