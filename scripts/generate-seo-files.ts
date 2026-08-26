#!/usr/bin/env bun
/**
 * Regenerates public/sitemap.xml and public/llms.txt from the real route list and whatever
 * is actually in src/content/insights/*.ts. Run via `bun run sitemap`, or automatically as
 * the first step of `bun run build` (see package.json). Don't hand-edit sitemap.xml or
 * llms.txt directly -- whatever this script produces from the current content is what should
 * ship. That is the same "the file is the source of truth, nothing else needs editing"
 * principle the one-file-per-post system in src/content/insights/ already runs on.
 *
 * This does NOT reuse src/content/insights.ts's collector -- that module's import.meta.glob
 * call is a Vite build-time macro and only works inside the Vite pipeline. This script
 * re-implements the same "one file per post, a default export is a post" logic standalone
 * so it can run as a plain Bun script before Vite ever starts.
 */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { InsightPost } from "../src/content/types";

const ROOT = path.resolve(import.meta.dir, "..");
const INSIGHTS_DIR = path.join(ROOT, "src/content/insights");
const SITE_URL = "https://tvg.gold";

async function loadPosts(): Promise<InsightPost[]> {
  const files = (await readdir(INSIGHTS_DIR)).filter((f) => f.endsWith(".ts"));
  const posts: InsightPost[] = [];
  const seenSlugs = new Map<string, string>();

  for (const file of files) {
    const mod = await import(path.join(INSIGHTS_DIR, file));
    const post = mod.default as InsightPost | undefined;
    if (!post) continue; // _template.ts and any other non-post file has no default export

    const existing = seenSlugs.get(post.slug);
    if (existing) {
      throw new Error(`Duplicate insight slug "${post.slug}": both ${existing} and ${file} use it.`);
    }
    seenSlugs.set(post.slug, file);
    posts.push(post);
  }
  return posts;
}

async function writeSitemap(posts: InsightPost[]) {
  const staticPages = [
    { loc: "/", changefreq: "weekly", priority: "1.0" },
    { loc: "/sell-your-metal", changefreq: "monthly", priority: "0.9" },
    { loc: "/compliance", changefreq: "monthly", priority: "0.8" },
    { loc: "/aml-policy", changefreq: "monthly", priority: "0.8" },
    { loc: "/insights", changefreq: "weekly", priority: "0.7" },
    { loc: "/guides/corporate-liquidation", changefreq: "monthly", priority: "0.7" },
  ];

  // Only posts with a real page (see InsightPost.body in src/content/types.ts) -- a teaser
  // card with no body has no route to submit to search engines.
  const published = posts.filter((p) => p.body?.length);

  const urls = [
    ...staticPages.map(
      (p) =>
        `  <url>\n    <loc>${SITE_URL}${p.loc}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
    ),
    ...published.map(
      (p) =>
        `  <url>\n    <loc>${SITE_URL}/insights/${p.slug}</loc>\n    <lastmod>${p.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    ),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(ROOT, "public/sitemap.xml"), xml);
  console.log(`sitemap.xml: ${staticPages.length} static page(s) + ${published.length} article(s)`);
}

async function writeLlmsTxt(posts: InsightPost[]) {
  const published = posts.filter((p) => p.body?.length).sort((a, b) => (a.date < b.date ? 1 : -1));

  const lines = [
    "# Tess Van Ghert",
    "",
    "> A physical precious metals trading house. We buy gold, silver, and platinum group " +
      "metals from corporations, governments, estates, and industrial operators, and settle " +
      "at LBMA benchmark prices through a compliant, documented chain to accredited refiners.",
    "",
    "Compliant acquisition. Global settlement. No logistics risk for the seller. Family-owned, " +
      "trading physical precious metal since 2011.",
    "",
    "## Core pages",
    "",
    `- [Home](${SITE_URL}/): what we buy, who we work with, how a sale works.`,
    `- [Sell Your Metal](${SITE_URL}/sell-your-metal): a short qualifying questionnaire that ends in a firm offer at the LBMA benchmark.`,
    `- [Compliance](${SITE_URL}/compliance): KYC/KYB, sanctions and PEP screening, documented source of goods, chain of custody.`,
    `- [AML Policy](${SITE_URL}/aml-policy): the anti-money-laundering framework we operate under.`,
    `- [Corporate Liquidation Guide](${SITE_URL}/guides/corporate-liquidation): how to sell precious metals at scale — valuation, source of goods, logistics, settlement.`,
    `- [Insights](${SITE_URL}/insights): all articles.`,
  ];

  if (published.length) {
    lines.push("", "## Insights", "");
    for (const p of published) {
      lines.push(`- [${p.title}](${SITE_URL}/insights/${p.slug}): ${p.description}`);
    }
  }

  lines.push("");
  await writeFile(path.join(ROOT, "public/llms.txt"), lines.join("\n"));
  console.log(`llms.txt: ${published.length} article entry/entries`);
}

const posts = await loadPosts();
await writeSitemap(posts);
await writeLlmsTxt(posts);
