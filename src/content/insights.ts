import type { InsightPost } from "./types";

/**
 * Auto-collects every post file in src/content/insights/ (eager, resolved at build time —
 * no runtime fetch, no CMS, works the same in dev and in the deployed SSR build). Adding a
 * new post is "add a new file to that folder that default-exports an InsightPost" — nothing
 * here needs editing. _template.ts intentionally has no default export, so it's collected
 * and then dropped by the `Boolean(default)` filter below rather than needing a fragile
 * negative glob pattern.
 */
const modules = import.meta.glob<{ default?: InsightPost }>("./insights/*.ts", { eager: true });

const entries = Object.entries(modules)
  .filter(([, mod]) => Boolean(mod.default))
  .map(([path, mod]) => [path, mod.default as InsightPost] as const);

// Fail loudly at build time on a duplicate slug rather than silently letting two files fight
// over one URL — matches this project's own "flag, don't silently ignore" standing rule.
const seenSlugs = new Map<string, string>();
for (const [path, post] of entries) {
  const existing = seenSlugs.get(post.slug);
  if (existing) {
    throw new Error(
      `Duplicate insight slug "${post.slug}": both ${existing} and ${path} use it. Slugs must be unique.`,
    );
  }
  seenSlugs.set(post.slug, path);
}

const allPosts: InsightPost[] = entries.map(([, post]) => post);

/** All posts, newest first. */
export function getAllInsights(): InsightPost[] {
  return [...allPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Only posts that have a real body — the ones with an actual page to link to. */
export function getPublishedInsights(): InsightPost[] {
  return getAllInsights().filter((p) => Boolean(p.body?.length));
}

export function getInsightBySlug(slug: string): InsightPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
