import type { InsightPost } from "../types";

// Migrated from the old hardcoded `posts` array in routes/insights.tsx (2026-08-24 SEO/AEO
// pass). `body` deliberately omitted — see why-corporates-sit-on-legacy-metal.ts for why.
export default {
  slug: "settling-internationally-without-logistics-risk",
  kicker: "Operations",
  title: "Settling internationally without taking logistics risk",
  description:
    "FCA, EXW, and DAP in plain English, and how we structure collection so the seller carries no transit exposure.",
  date: "2026-05-09",
  readTime: "5 min read",
} satisfies InsightPost;
