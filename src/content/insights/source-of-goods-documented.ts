import type { InsightPost } from "../types";

// Migrated from the old hardcoded `posts` array in routes/insights.tsx (2026-08-24 SEO/AEO
// pass). `body` deliberately omitted — see why-corporates-sit-on-legacy-metal.ts for why.
export default {
  slug: "source-of-goods-documented",
  kicker: "Compliance",
  title: "Source of goods: what 'documented' actually means",
  description:
    "A short walk through the evidence pack we ask for, why each document matters, and how to put it together without slowing the trade.",
  date: "2026-05-28",
  readTime: "8 min read",
} satisfies InsightPost;
