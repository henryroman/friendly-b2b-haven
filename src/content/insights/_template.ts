import type { InsightPost } from "../types";

/**
 * ============================================================================
 * BLOG POST TEMPLATE — copy this file, don't edit it.
 * ============================================================================
 *
 * How to publish a new tvg.gold article:
 *
 *   1. Copy this file to a new name in this same folder, e.g.
 *      src/content/insights/the-corporate-award-programme-in-your-storeroom.ts
 *      The filename doesn't matter to the site (the `slug` field below controls
 *      the URL) but keep it matching the slug so the two are easy to find together.
 *   2. Change the `export default {...}` object below to the real post — every
 *      field is explained inline. Delete this whole comment block.
 *   3. Run `bun run sitemap` (or just `bun run build`, which runs it for you) —
 *      the new page is picked up automatically. Nothing else needs editing:
 *      not routes/insights.tsx, not sitemap.xml, not __root.tsx. One new file
 *      is the entire "publish a post" operation.
 *   4. The post appears at https://tvg.gold/insights/{slug} with correct
 *      title/description/canonical/OG/Twitter meta and Article JSON-LD
 *      generated automatically from the fields below — see
 *      src/routes/insights.$slug.tsx and src/lib/seo.ts if you want to see how.
 *
 * Voice reminder (see TessPreciousMetals/ContentCreation/TVG-Content-Agent-Build-Plan.md
 * and the brand kit): blog is Institutional voice. Declarative, trade-precise. No hype
 * words ("revolutionary", "best-in-class", "cutting-edge"), no exclamation marks ever,
 * no em dashes, no emoji. Purity is always "999.9". Figures, not spelled-out numbers.
 *
 * AEO reminder (see the 2026-08-24 SEO/AEO build log): the thing that actually gets a
 * page cited by AI answer engines in 2026 is VISIBLE, extractable HTML — an answer-first
 * paragraph right under each heading, specific numbers, real sourcing — not hidden
 * structured data. Write every section so the first sentence under the heading could be
 * lifted on its own and still make sense as a direct answer to that heading's question.
 */
export const TEMPLATE = {
  // URL-safe, lowercase, hyphenated, no dates. Page will live at /insights/{slug}.
  slug: "example-slug-goes-here",

  // Short category label, shown on the /insights card and in the article hero.
  // Existing values in use: "Market note", "Compliance", "Operations". Reuse one of
  // these where it genuinely fits rather than inventing a new taxonomy per post.
  kicker: "Compliance",

  // Optional. Which of the five content pillars this serves (see the build plan).
  // Purely internal bookkeeping — never shown to a reader.
  pillar: "hidden_value",

  // The <h1> and, with " — Tess Van Ghert" appended automatically, the <title>.
  title: "The corporate award programme sitting in your storeroom",

  // ONE field, used as the meta description, the og:description, AND the excerpt
  // shown on the /insights card. 120-160 characters. Write it as a real, specific
  // sentence a reader (or an AI system) could act on, not a vague teaser.
  description:
    "Twenty-year gold service-award programmes leave real, sellable metal on a balance sheet at historic cost or off it entirely. Here is how finance teams find and realise it.",

  // ISO date. Formatted for display automatically (formatDisplayDate in src/lib/dates.ts).
  date: "2026-08-24",

  readTime: "6 min read",

  // Optional. A named byline is a real, current E-E-A-T signal (see the build log's
  // HubSpot research summary) — stronger than an unattributed company post. Omit
  // entirely for a pure house-voice piece; the article then reads as authored by
  // Tess Van Ghert with no byline shown, exactly like the four pre-existing posts.
  author: { name: "Henry Romanstov", title: "Founder" },

  // Optional longer sub-headline under the H1 in the hero. Omit if the title alone
  // is enough.
  heroDek:
    "A practical look at dormant incentive inventory: what it is, why it is worth more than most finance teams assume, and how to realise it without an internal project.",

  // Optional hero chip tags — short audience/topic labels.
  chips: ["Treasury", "Legacy inventory"],

  // The article body: an ordered array of typed blocks. Every block type below is
  // demonstrated once. You do not need to use every type in a real post — most
  // posts will mostly be `p` and `h2`, with a `callout` or `steps` block where it
  // genuinely helps, and `faq` (a separate top-level field, see below) at the end.
  body: [
    {
      type: "p",
      text:
        "A direct-answer opening paragraph goes here: state the article's core claim in one or two plain sentences before any scene-setting. This is the paragraph an AI system skimming the page is most likely to lift as a citation, so it should stand alone and answer the implied question in the title without needing the rest of the article for context.",
    },
    {
      type: "h2",
      id: "why-it-happens",
      // Prefer a question-phrased heading where it reads naturally — HubSpot's current
      // guidance and voice-search structure both favour natural-language questions
      // over keyword phrases. Give every h2 you want in the table of contents an id
      // (kebab-case); h2 blocks without an id still render, they just have no ToC entry.
      text: "Why does legacy inventory build up in the first place?",
    },
    {
      type: "p",
      text:
        "Body paragraphs follow the section heading directly. Keep paragraphs tight — this codebase's existing guide page (guides/corporate-liquidation.tsx) is the visual reference for spacing, size, and tone; ArticleBlocks renders every `p`/`h2`/`h3` block with the exact same classes that page uses by hand, so a new post matches it automatically.",
    },
    {
      type: "callout",
      label: "What this means",
      // A short, extractable pull-box. HubSpot's current AEO guidance specifically
      // recommends these: a compact "what this means" / "why it matters" summary an
      // AI system (or a skimming reader) can lift on its own.
      text: "One or two sentences stating the practical takeaway of the section above, phrased as a direct, standalone answer.",
    },
    {
      type: "h2",
      id: "the-process",
      text: "How does a company actually realise the value?",
    },
    {
      type: "steps",
      items: [
        { title: "Inventory", body: "What the first step involves, in one or two sentences." },
        { title: "Valuation", body: "What the second step involves." },
        { title: "Settlement", body: "What the final step involves." },
      ],
    },
    {
      type: "list",
      items: [
        "A specific, concrete point — not a vague generality.",
        "Another specific point.",
        "A third, if genuinely needed. Bullet lists work well for scannable specifics; don't pad one out to look thorough.",
      ],
    },
    {
      type: "quote",
      text: "A short, real quotation goes here if one is genuinely being used — never a fabricated or paraphrased-as-verbatim line.",
      attribution: "Attribution, if applicable",
    },
    {
      type: "h3",
      text: "A minor subsection heading (no id — not promoted to the table of contents).",
    },
    {
      type: "p",
      text: "Closing paragraphs, ending on a concrete, specific note rather than a vague call to action — the CTA block at the end of the page (rendered automatically, not part of `body`) already handles the actual ask.",
    },
  ],

  // Optional. Real, visible FAQ content — rendered as real H3+paragraph pairs (not
  // hidden), which is what actually helps in 2026 (see the build log). Also emits
  // FAQPage JSON-LD automatically, which is basic hygiene but, per the same research,
  // is no longer itself a citation lever (Google deprecated FAQ rich results in May
  // 2026; Ahrefs' 2026 study found schema produces no measurable AI-citation uplift).
  faq: [
    {
      q: "A real question a reader would actually ask, phrased the way they'd ask it.",
      a: "A direct, specific answer in one or two sentences, followed by elaboration only if needed.",
    },
    {
      q: "A second question.",
      a: "A second answer.",
    },
  ],

  // Optional. Overrides the sitewide default OG image for this one post. Omit unless
  // a real, on-brand image exists for this specific article — the sitewide default
  // (public/og-image.png) is deliberately generic-but-correct precisely so posts
  // don't need a bespoke image to still look right when shared.
  // ogImage: "https://tvg.gold/insights/example-slug-goes-here/og.png",
} satisfies InsightPost;
