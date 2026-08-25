import type { InsightPost } from "../types";

// Migrated from the old hardcoded `posts` array in routes/insights.tsx (2026-08-24 SEO/AEO
// pass). `body` is deliberately omitted: no full article text was ever written for this
// piece, so none is invented here. It renders on /insights exactly as before — a teaser
// card, not clickable — until someone (a human or the content agent) adds a `body`.
export default {
  slug: "why-corporates-sit-on-legacy-metal",
  kicker: "Market note",
  title: "Why corporates sit on legacy metal — and what unlocks it",
  description:
    "Award programmes, retired product lines, and discontinued inventory build up faster than treasury teams realise. A look at how finance functions are clearing the position.",
  date: "2026-06-12",
  readTime: "6 min read",
} satisfies InsightPost;
