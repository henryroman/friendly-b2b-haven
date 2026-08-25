import { useEffect, useMemo, useState } from "react";
import { RuleGold, Overline, Btn } from "./Section";
import {
  PURITY_OPTIONS,
  CURRENCIES,
  CURRENCY_SYMBOLS,
  calculateMeltValue,
  type Currency,
  type PurityOption,
} from "@/lib/melt-calculator-data";
import type { LivePriceData } from "@/lib/metals-price";
import { loadSavedLots, persistSavedLots, totalsByCurrency, newItemId, type SavedLotItem } from "@/lib/melt-list";

// New (2026-08-25). No prior calculator existed on this site -- built
// fresh, matching this repo's own real convention for site-specific form
// fields (hand-rolled native inputs styled directly off the shared TVG CSS
// variables, same pattern as this page's own enquiry form and as
// metauxprecieux.org's calculator; the 49 stock shadcn primitives in this
// repo are unused by any TVG-specific component so far, so reaching for
// shadcn Select here would be the odd one out, not the established
// pattern). Live prices come from the homepage route's loader, which
// fetches them server-side via src/lib/metals-price.ts (originally
// metals-price.server.ts, renamed -- see that file's comment for why).
// See that file's comment for the CORS reasoning on why this can't be a
// client-side fetch.
//
// "Add to list" (same day, second pass) -- a visitor pricing several
// pieces can add each to a running list instead of only ever seeing the
// last one calculated. Client-side only (src/lib/melt-list.ts): no
// account, no backend, nothing sent anywhere until they click through to
// the enquiry form themselves. Each item locks in whatever currency was
// selected at the moment it was added, so the list can span more than one
// currency -- totals are shown per currency, never summed across
// currencies (same discipline tvg-hub's own melt-value.js documents).
// A full account-based version matching tvg-hub's own internal
// saved-lots/lists feature was considered and deliberately not built this
// round -- see the vault's Agent-Activity-Log.md, 2026-08-25 entry.

const inputCls =
  "w-full rounded-sm border border-[var(--line-hairline)] bg-[var(--surface-page)] px-4 py-3 text-[15px] text-[var(--text-body)] outline-none transition-colors focus:border-[var(--accent)]";
const labelCls =
  "font-display block text-[12px] uppercase tracking-[var(--tracking-overline)] text-[var(--text-muted)] mb-2";

function formatCurrency(n: number, currency: string): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
}

export function MeltCalculator({ livePrices }: { livePrices: LivePriceData }) {
  // Default to 18ct/750 -- same mid-purity default weighting as the
  // French site's calculator (its TITRES[2]).
  const [purityKey, setPurityKey] = useState<string>(PURITY_OPTIONS[2].key);
  const [weight, setWeight] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [savedLots, setSavedLots] = useState<SavedLotItem[]>([]);

  useEffect(() => {
    setSavedLots(loadSavedLots());
  }, []);

  const purity = PURITY_OPTIONS.find((p) => p.key === purityKey) as PurityOption;
  const rate = livePrices.fxRates[currency];
  const usdPerGram = livePrices.usdPerGram[purity.metal];
  const pricePerGram = usdPerGram != null && rate != null ? usdPerGram * rate : null;
  const priceAvailable = livePrices.ok && pricePerGram != null;

  const weightValue = parseFloat(weight);
  const value = useMemo(() => {
    if (!isFinite(weightValue) || weightValue <= 0) return null;
    return calculateMeltValue(weightValue, purity.fineness, pricePerGram);
  }, [weightValue, purity, pricePerGram]);

  const formatted = value === null ? "—" : formatCurrency(value, currency);

  function addToList() {
    if (value === null) return;
    const item: SavedLotItem = {
      id: newItemId(),
      label: purity.label,
      formValue: purity.formValue,
      weightGrams: weightValue,
      currency,
      value,
      addedAt: Date.now(),
    };
    const next = [...savedLots, item];
    setSavedLots(next);
    persistSavedLots(next);
    setWeight("");
  }

  function removeFromList(id: string) {
    const next = savedLots.filter((i) => i.id !== id);
    setSavedLots(next);
    persistSavedLots(next);
  }

  function clearList() {
    setSavedLots([]);
    persistSavedLots([]);
  }

  const listTotals = totalsByCurrency(savedLots);
  // Built via Object.keys/index rather than Object.entries(listTotals) --
  // sidesteps an environment-dependent overload-resolution quirk where
  // Object.entries can type its value tuple slot as `unknown` depending on
  // which lib.d.ts is loaded, even though listTotals is a plain
  // Record<string, number>.
  const listTotalsEntries: [string, number][] = Object.keys(listTotals).map((c) => [c, listTotals[c]]);
  const distinctMetals = new Set(savedLots.map((i) => i.formValue));
  const listMetalParam = distinctMetals.size === 1 ? savedLots[0].formValue : "Mixed / not sure";
  const listNote = savedLots.length
    ? `List of ${savedLots.length} item${savedLots.length > 1 ? "s" : ""}: ${savedLots
        .map((i) => `${i.label} (${i.weightGrams}g)`)
        .join(", ")} — indicative total${listTotalsEntries.length > 1 ? "s" : ""}: ${listTotalsEntries
        .map(([c, v]) => formatCurrency(v, c))
        .join(" / ")}`
    : "";

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="text-center">
        <RuleGold />
        <Overline>Estimate</Overline>
        <h2 className="font-display mt-3 text-[32px] sm:text-[36px] md:text-[40px]">
          Melt value calculator
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-[62ch] text-[17px] md:text-[18px]">
          Indicative valuation based on live gold, silver, platinum, and palladium spot prices. Final value confirmed after accredited-laboratory assay.
        </p>
      </div>

      <div
        className="mt-10 bg-[var(--surface-card)] p-6 shadow-sm md:p-10"
        style={{
          border: "1px solid var(--line-hairline)",
          borderTopWidth: "2px",
          borderTopColor: "var(--accent)",
        }}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="mc-purity">Metal &amp; fineness</label>
            <select
              id="mc-purity"
              value={purityKey}
              onChange={(e) => setPurityKey(e.target.value)}
              className={inputCls}
            >
              {PURITY_OPTIONS.map((p) => (
                <option key={p.key} value={p.key}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="mc-weight">Weight (grams)</label>
            <input
              id="mc-weight"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 250"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="mc-currency">Currency</label>
            <select
              id="mc-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className={inputCls}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c} ({CURRENCY_SYMBOLS[c]})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-[var(--line-hairline)] pt-6 md:flex-row md:items-center">
          <div>
            <Overline>Estimated melt value</Overline>
            {priceAvailable ? (
              <p
                className="mt-2 text-[36px] leading-none text-[var(--text-strong)] md:text-[44px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {formatted}
              </p>
            ) : (
              <p className="mt-2 max-w-[38ch] text-[16px] leading-[1.5] text-[var(--text-muted)]">
                Live pricing is temporarily unavailable. Contact us for a valuation.
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn variant="secondary" onClick={addToList} disabled={value === null}>
              Add to list
            </Btn>
            <Btn variant="primary" href={`?metal=${encodeURIComponent(purity.formValue)}#enquire`}>
              Get a firm offer
            </Btn>
          </div>
        </div>

        <p className="mt-6 text-[12.5px] text-[var(--text-muted)]">
          Indicative rates updated continuously, referenced to the LBMA benchmark. Figures shown are indicative and do not constitute an offer. Our purchase price is expressed as a percentage of the LBMA benchmark, confirmed after valuation.
        </p>
      </div>

      {savedLots.length > 0 && (
        <div
          className="mt-6 bg-[var(--surface-card)] p-6 shadow-sm md:p-8"
          style={{ border: "1px solid var(--line-hairline)" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Overline>
              Your list ({savedLots.length} item{savedLots.length > 1 ? "s" : ""})
            </Overline>
            <button
              type="button"
              onClick={clearList}
              className="font-display text-[11px] uppercase tracking-[var(--tracking-overline)] text-[var(--text-muted)] underline transition-colors hover:text-[var(--accent-press)]"
            >
              Clear list
            </button>
          </div>

          <ul className="mt-4 flex flex-col gap-2">
            {savedLots.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 border-b border-[var(--line-hairline)] pb-2 text-[15px]"
              >
                <span className="text-[var(--text-body)]">
                  {item.label} · {item.weightGrams}g
                </span>
                <span className="flex items-center gap-3">
                  <span style={{ fontFamily: "var(--font-body)" }} className="text-[var(--text-strong)]">
                    {formatCurrency(item.value, item.currency)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromList(item.id)}
                    aria-label={`Remove ${item.label} from list`}
                    className="text-[18px] leading-none text-[var(--text-muted)] transition-colors hover:text-[var(--accent-press)]"
                  >
                    ×
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col items-start justify-between gap-4 border-t border-[var(--line-hairline)] pt-5 md:flex-row md:items-center">
            <div>
              {listTotalsEntries.map(([c, v]) => (
                <p key={c} className="font-display text-[20px]" style={{ fontFamily: "var(--font-body)" }}>
                  Indicative total ({c}): {formatCurrency(v, c)}
                </p>
              ))}
            </div>
            <Btn
              variant="primary"
              href={`?metal=${encodeURIComponent(listMetalParam)}&note=${encodeURIComponent(listNote)}#enquire`}
            >
              Get a firm offer on this list
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}
