/**
 * The blog-post content schema.
 *
 * This is "the template" — the shape every future tvg.gold article fills in. One post =
 * one file in src/content/insights/ (see _template.ts for a copy-paste starting point and
 * README.md in that folder for the workflow). Keeping one file per post, rather than one
 * shared array everyone edits, is deliberate: this codebase's own Agentic-Building-Guidelines
 * (Section 3.2, "small targeted diffs over whole-file rewrites") exists precisely because
 * concurrent edits to one shared file have caused real collisions elsewhere in this project.
 * A content agent shipping several posts a week should never need to touch a file another
 * post is also touching.
 */

export type ContentBlock =
  | { type: "p"; text: string }
  /** Section heading. Give it an id (kebab-case) to get an automatic table-of-contents entry. */
  | { type: "h2"; id?: string; text: string }
  | { type: "h3"; id?: string; text: string }
  | { type: "list"; items: string[] }
  /** Numbered process steps, rendered like the homepage's "How it works" / the guide's "seven-step process". */
  | { type: "steps"; items: { title: string; body: string }[] }
  /** A "What this means" / "Why it matters" pull-box — HubSpot's AEO guidance specifically
   * recommends these: a short, extractable, answer-first summary a reader (or an AI system
   * skimming the page) can lift without reading the surrounding prose. */
  | { type: "callout"; label: string; text: string }
  | { type: "quote"; text: string; attribution?: string };

export interface FaqItem {
  q: string;
  a: string;
}

/** Matches the five pillars in TessPreciousMetals/ContentCreation/TVG-Content-Agent-Build-Plan.md. */
export type InsightPillar =
  | "deal_story"
  | "hidden_value"
  | "market_commentary"
  | "insolvency"
  | "comparison_aeo";

export interface InsightAuthor {
  name: string;
  title?: string;
}

export interface InsightPost {
  /** URL segment. Page is served at /insights/{slug}. Lowercase, hyphenated, no dates. */
  slug: string;
  /** Short category label shown on the card and in the hero, e.g. "Compliance", "Market note". */
  kicker: string;
  /** Optional — which content-strategy pillar this piece serves. Not shown to readers. */
  pillar?: InsightPillar;
  /** The <h1> and (with " — Tess Van Ghert" appended) the <title>. */
  title: string;
  /**
   * ONE sentence-or-two description, 120–160 characters. Used as: the meta description, the
   * og:description, AND the card excerpt on /insights. One field instead of a separate
   * "excerpt" + "meta description" on purpose — two near-duplicate facts are exactly the kind
   * of thing that quietly drift apart; see the SEO/AEO build log's "entity consistency" note.
   */
  description: string;
  /** ISO date, e.g. "2026-06-12". Formatted for display and used as JSON-LD datePublished —
   * store it once, in one format, and format-for-display happens in code (formatDisplayDate). */
  date: string;
  /** e.g. "6 min read". */
  readTime: string;
  /**
   * Optional named byline. Per current AEO/E-E-A-T guidance, a real named author with a real
   * title is a stronger trust signal than an unattributed company post — omit for a pure
   * house/Institutional piece, set it when a real person is the credited author.
   */
  author?: InsightAuthor;
  /** Optional longer sub-headline shown under the H1 in the hero (see the corporate-liquidation guide for the pattern). */
  heroDek?: string;
  /** Optional hero chip tags, e.g. ["Treasury", "Insolvency"]. */
  chips?: string[];
  /**
   * Full article body. Omit this field entirely (leave it undefined) for a teaser-only card —
   * the /insights listing renders those exactly as before (excerpt, not clickable) rather than
   * linking to a page with no real content behind it. This is how the four pre-existing
   * insights posts are represented: their real body copy was never written, so it isn't
   * invented here either.
   */
  body?: ContentBlock[];
  /** Optional. Rendered as real visible H3+paragraph FAQ content (also emits FAQPage JSON-LD —
   * see the build log for why that schema is hygiene now, not a citation lever). */
  faq?: FaqItem[];
  /** Optional per-post social-share image; falls back to the sitewide default. */
  ogImage?: string;
}
