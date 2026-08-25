import type { InsightPost } from "../types";

// Migrated from the old hardcoded `posts` array in routes/insights.tsx (2026-08-24 SEO/AEO
// pass). `body` deliberately omitted — see why-corporates-sit-on-legacy-metal.ts for why.
export default {
  slug: "aml-for-finance-teams",
  kicker: "Compliance",
  title: "AML for finance teams who have never bought a refiner statement",
  description:
    "A primer for treasurers, controllers, and insolvency practitioners working with precious metals for the first time.",
  date: "2026-04-21",
  readTime: "7 min read",
} satisfies InsightPost;
