// Client-side "saved lots" list for the melt calculator (2026-08-25).
// Deliberately no backend, no account, no data leaves the visitor's own
// browser until they choose to click through to the enquiry form
// themselves -- see the marketing-sites melt-calculator build entry in the
// vault's Agent-Activity-Log.md for the fuller reasoning (this was a
// scoped choice among several: a full account-based version matching
// tvg-hub's own saved-lots/lists feature was considered and deliberately
// not built this round).
//
// Persisted to localStorage, which is already scoped to this site's own
// origin by the browser itself -- no key-prefixing needed, and nothing
// here is shared with tvg.gold or any other origin.

export type SavedLotItem = {
  id: string;
  label: string;
  formValue: string;
  weightGrams: number;
  currency: string;
  value: number;
  addedAt: number;
};

const STORAGE_KEY = "tvg-melt-list-v1";

export function loadSavedLots(): SavedLotItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistSavedLots(items: SavedLotItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full, blocked, or private-mode -- the list still works for
    // this page view via React state, it just won't survive a reload.
    // Not worth surfacing an error for a non-critical convenience feature.
  }
}

export function totalsByCurrency(items: SavedLotItem[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const item of items) {
    totals[item.currency] = (totals[item.currency] ?? 0) + item.value;
  }
  return totals;
}

export function newItemId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
