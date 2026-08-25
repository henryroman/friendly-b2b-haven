// Purity/fineness table, currency set, and the pure melt-value formula --
// mirrors tvg-hub's own src/melt-value.js exactly (same keys, same labels,
// same fineness values, same three currencies, same formula). Kept as an
// independent copy here since this site is a separate, independently-
// deployed repo with no shared-package tooling back to tvg-hub -- if
// tvg-hub's table changes, update this to match. Authoritative source: the
// vault's TessPreciousMetals/Auctions/TVG-Melt-Calculation-Reference.md.
//
//   estimated_melt_value = weight_grams x purity_fraction x spot_price_per_gram
//
// Undiscounted, indicative only -- a human makes the real pricing decision
// off the real number, not a system-shaded one.

export type MetalCode = "XAU" | "XAG" | "XPT" | "XPD";

// Must match this page's own FieldSelect "Metal type" options exactly:
// ["Gold", "Silver", "Platinum group", "Mixed / not sure"] (src/routes/
// index.tsx) -- there is no separate Palladium entry on that form,
// platinum and palladium both fall under "Platinum group".
export type EnquiryMetalValue = "Gold" | "Silver" | "Platinum group";

export type PurityOption = {
  key: string;
  label: string;
  metal: MetalCode;
  fineness: number;
  formValue: EnquiryMetalValue;
};

export const PURITY_OPTIONS: PurityOption[] = [
  { key: "gold_999", label: "24ct / 999 / fine gold", metal: "XAU", fineness: 0.999, formValue: "Gold" },
  { key: "gold_916", label: "22ct / 916", metal: "XAU", fineness: 0.916, formValue: "Gold" },
  { key: "gold_750", label: "18ct / 750", metal: "XAU", fineness: 0.75, formValue: "Gold" },
  { key: "gold_585", label: "14ct / 585", metal: "XAU", fineness: 0.585, formValue: "Gold" },
  { key: "gold_375", label: "9ct / 375", metal: "XAU", fineness: 0.375, formValue: "Gold" },
  { key: "silver_925", label: "Sterling silver / 925", metal: "XAG", fineness: 0.925, formValue: "Silver" },
  { key: "silver_900", label: "Coin silver / 900", metal: "XAG", fineness: 0.9, formValue: "Silver" },
  { key: "platinum_950", label: "Platinum 950", metal: "XPT", fineness: 0.95, formValue: "Platinum group" },
  { key: "platinum_900", label: "Platinum 900", metal: "XPT", fineness: 0.9, formValue: "Platinum group" },
  { key: "palladium_950", label: "Palladium 950", metal: "XPD", fineness: 0.95, formValue: "Platinum group" },
];

// The three currencies TVG actually transacts in -- GBP (TVG London), EUR
// (TVG Paris), USD (TVG Americas) -- same set as tvg-hub's own CURRENCIES,
// appropriate for this site specifically since tvg.gold is the
// internationally-facing brand (vs. metauxprecieux.org's EUR-only,
// French-market audience).
export const CURRENCIES = ["GBP", "EUR", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];
export const CURRENCY_SYMBOLS: Record<Currency, string> = { GBP: "£", EUR: "€", USD: "$" };

// Pure function, no I/O. Guards against a zero/negative/missing input
// instead of silently returning a wrong "value" -- matches tvg-hub's own
// calculateMeltValue exactly, same discipline: null means "not
// computable", never 0.
export function calculateMeltValue(
  weightGrams: number | null,
  fineness: number | null,
  pricePerGram: number | null | undefined,
): number | null {
  if (weightGrams == null || fineness == null || pricePerGram == null) return null;
  if (!(weightGrams > 0) || !(fineness > 0) || !(pricePerGram > 0)) return null;
  return weightGrams * fineness * pricePerGram;
}
