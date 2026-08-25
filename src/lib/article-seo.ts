import type { InsightPost } from "@/content/types";
import { ORG_NAME, SITE_URL, pageMeta } from "./seo";

/**
 * Builds the full head() return value (meta, links, and JSON-LD scripts) for one article
 * page, entirely from its InsightPost data. This is what makes SEO/AEO correctness
 * automatic for every future post instead of something each new article can get wrong —
 * see the canonical/og:url bug that existed on every route except one before this pass.
 */
export function buildArticleHead(post: InsightPost) {
  const path = `/insights/${post.slug}`;
  const url = `${SITE_URL}${path}`;
  const base = pageMeta({
    title: post.title,
    description: post.description,
    path,
    ogType: "article",
    ogImage: post.ogImage,
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: post.author
      ? { "@type": "Person", name: post.author.name, ...(post.author.title ? { jobTitle: post.author.title } : {}) }
      : { "@type": "Organization", name: ORG_NAME },
    publisher: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
    mainEntityOfPage: url,
    ...(post.ogImage ? { image: post.ogImage } : {}),
  };

  const scripts = [{ type: "application/ld+json", children: JSON.stringify(articleJsonLd) }];

  // FAQPage schema: included as basic hygiene when a post has real FAQ content, not because
  // it moves AI citations in 2026 — it doesn't (Google deprecated FAQ rich results May 2026;
  // Ahrefs' 2026 study found zero measurable citation uplift from schema markup generally,
  // since AI retrieval reads visible HTML, not JSON-LD). See the build log for sourcing.
  if (post.faq?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    });
  }

  return { ...base, scripts };
}
