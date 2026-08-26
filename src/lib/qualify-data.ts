// Segment-branching question data for the "Sell your metal" self-qualifying
// form (/sell-your-metal). Built 2026-08-26 -- H asked for something
// stronger than routing the calculator's "Get a firm offer" straight into
// the general enquiry form: a genuine multi-step, multiple-choice
// qualifying flow, branched by which of TVG's five documented ideal
// customers (see the brand brief) the visitor actually is.
//
// Deliberately data-only, no JSX -- QualifyWizard.tsx is the single
// component that renders whatever segment is picked from this file, so
// adding a sixth segment or rewording a question never touches the
// wizard's own step logic.

export type SegmentKey =
  | "corporate"
  | "insolvency"
  | "industrial"
  | "jeweller"
  | "auction"
  | "other";

export interface ChoiceQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface Segment {
  key: SegmentKey;
  label: string;
  description: string;
  questions: ChoiceQuestion[];
}

export const SEGMENTS: Segment[] = [
  {
    key: "corporate",
    label: "Corporate / treasury",
    description: "Legacy inventory — award programmes, surplus stock, or holdings on the balance sheet.",
    questions: [
      {
        id: "form",
        question: "What form is the metal in?",
        options: ["Service or award pins / medals", "Bullion, bars, or coin", "Mixed jewellery or product stock", "Not sure yet"],
      },
      {
        id: "books",
        question: "Is it currently on your books?",
        options: ["Yes, at historic cost", "Yes, at current market value", "Not currently recorded", "Not sure"],
      },
      {
        id: "signoff",
        question: "Who needs to sign off on a sale?",
        options: ["I can decide directly", "Needs legal or board approval", "Needs procurement sign-off", "Not sure yet"],
      },
    ],
  },
  {
    key: "insolvency",
    label: "Insolvency practitioner",
    description: "Realising precious metal assets for an estate, administration, or liquidation.",
    questions: [
      {
        id: "status",
        question: "What's the status of the asset?",
        options: ["Confirmed on the asset schedule", "Still being valued", "Awaiting court or creditor approval"],
      },
      {
        id: "metal",
        question: "What metal is involved?",
        options: ["Gold", "Silver", "Platinum group metals", "Mixed / jewellery stock", "Not sure"],
      },
      {
        id: "timeline",
        question: "What's your timeline to realise?",
        options: ["Within 5 working days", "Within a month", "No fixed deadline"],
      },
    ],
  },
  {
    key: "industrial",
    label: "Industrial manufacturer",
    description: "Filings, plating sludge, or spent catalyst material from production.",
    questions: [
      {
        id: "material",
        question: "What type of material?",
        options: ["Filings or grindings", "Plating bath waste or sludge", "Spent catalyst material", "Mixed / not sure"],
      },
      {
        id: "handling",
        question: "How is it handled today?",
        options: ["Stockpiled on-site", "Already sent to a refiner", "Sent to a general waste handler", "No process yet"],
      },
      {
        id: "frequency",
        question: "How often would you want collection?",
        options: ["One-off clearance", "Quarterly", "Monthly", "Ad hoc, as it accumulates"],
      },
    ],
  },
  {
    key: "jeweller",
    label: "Jeweller / boutique",
    description: "Trade-ins, broken stock, discontinued designs, or estate pieces.",
    questions: [
      {
        id: "type",
        question: "What are you looking to move?",
        options: ["Customer trade-ins", "Broken or damaged stock", "Discontinued designs", "Estate pieces", "A mix of the above"],
      },
      {
        id: "cadence",
        question: "How often does this come up?",
        options: ["One-off clearance", "Happens regularly", "Want an ongoing arrangement"],
      },
      {
        id: "visit",
        question: "Would you want someone to visit in person?",
        options: ["Yes, prefer an in-person visit", "Happy to ship", "Not sure yet"],
      },
    ],
  },
  {
    key: "auction",
    label: "Auction / government",
    description: "Sourcing through a judicial, government, or estate auction platform.",
    questions: [
      {
        id: "need",
        question: "What are you looking for?",
        options: ["An ongoing bidding partnership", "Help with one specific lot or portfolio", "Pricing intelligence only"],
      },
      {
        id: "platform",
        question: "Which platform(s)?",
        options: ["DNID (France)", "BOE (Spain)", "Another platform", "Multiple platforms"],
      },
    ],
  },
  {
    key: "other",
    label: "Not sure / other",
    description: "Doesn't fit neatly into the above — tell us roughly what you're holding.",
    questions: [
      {
        id: "holding",
        question: "Roughly what are you holding?",
        options: ["Bullion, bars, or coin", "Jewellery or mixed stock", "Industrial or process material", "Not sure yet"],
      },
    ],
  },
];

export const VALUE_QUESTION: ChoiceQuestion = {
  id: "value",
  question: "Roughly what's it worth?",
  options: ["Under £10,000", "£10,000 – £50,000", "£50,000 – £250,000", "Over £250,000", "Not sure"],
};

export const TIMELINE_QUESTION: ChoiceQuestion = {
  id: "timeline_general",
  question: "How soon are you looking to move?",
  options: ["As soon as possible", "Within the next month", "Just exploring for now"],
};

export function segmentByKey(key: SegmentKey): Segment {
  const found = SEGMENTS.find((s) => s.key === key);
  if (!found) throw new Error(`Unknown segment key: ${key}`);
  return found;
}
