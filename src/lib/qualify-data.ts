// Rebuilt 2026-08-26 per H's direct redesign request. Was a 6-segment
// picker (corporate/insolvency/industrial/jeweller/auction/other) with
// 2-3 tailored follow-up questions per segment. Now a flat, much shorter
// model: audience (individual/company) x intent (sell/buy), then a single
// self-identify step whose OPTIONS depend on audience only -- intent is
// still captured and emailed, it just doesn't change which identify
// options are shown, to avoid needing four separate option sets.

export type Audience = "individual" | "company";
export type Intent = "sell" | "buy";

export interface IdentifyOption {
  key: string;
  label: string;
}

export const AUDIENCE_OPTIONS: { key: Audience; label: string }[] = [
  { key: "individual", label: "An individual" },
  { key: "company", label: "A company" },
];

export const INTENT_OPTIONS: { key: Intent; label: string }[] = [
  { key: "sell", label: "Sell metal" },
  { key: "buy", label: "Buy metal" },
];

// Company self-identify options are the same five ideal-customer types
// from TVG's own brand brief that drove the original segment picker.
export const COMPANY_IDENTIFY: IdentifyOption[] = [
  { key: "corporate", label: "Corporate / treasury" },
  { key: "insolvency", label: "Insolvency practitioner" },
  { key: "industrial", label: "Industrial manufacturer" },
  { key: "jeweller", label: "Jeweller / boutique" },
  { key: "auction", label: "Auction / government" },
  { key: "other", label: "Other / not sure" },
];

// Individual self-identify options are new -- the original six segments
// were all institutional/B2B, with no path for a private seller or buyer.
export const INDIVIDUAL_IDENTIFY: IdentifyOption[] = [
  { key: "jewellery", label: "Jewellery or watches" },
  { key: "coins_bullion", label: "Coins or bullion" },
  { key: "estate", label: "Inherited or estate pieces" },
  { key: "other", label: "Other / not sure" },
];

export function identifyOptionsFor(audience: Audience): IdentifyOption[] {
  return audience === "company" ? COMPANY_IDENTIFY : INDIVIDUAL_IDENTIFY;
}
