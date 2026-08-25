/**
 * Shared SEO/meta helpers.
 *
 * Why this file exists: every route on this site was independently hand-writing its own
 * `head()` meta array, and four of the five existing routes (compliance, aml-policy,
 * insights, and the homepage) never set their own `canonical` link or `og:url` tag — they
 * silently inherited __root.tsx's homepage values instead. `guides/corporate-liquidation`
 * DID set its own, but to the wrong domain (the Lovable preview host, not tvg.gold).
 *
 * `pageMeta()` below is the fix: every route calls this one function instead of hand-typing
 * title, description, canonical, OG, and Twitter tags separately, so the "forgot to set
 * canonical on this page" bug class can't recur. See TessPreciousMetals/ContentCreation and
 * the 2026-08-24 SEO/AEO build log in the Claude Project for the full audit this responds to.
 */

export const SITE_URL = "https://tvg.gold";
export const ORG_NAME = "Tess Van Ghert";
export const ORG_FULL_DESCRIPTION =
  "A family-owned physical precious metals trading house. Compliant acquisition and global settlement since 2011.";
// Default social-share image. Replaces the Lovable preview-screenshot URL that was
// previously hardcoded in __root.tsx (see build log) — this file lives in /public and is
// on-brand (ink/cream/gold, Cormorant Garamond), not an auto-generated app screenshot.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface PageMetaInput {
  /** Page title WITHOUT the site suffix — pageMeta appends " — Tess Van Ghert" for you. */
  title: string;
  /** 120–160 characters. Used verbatim for <meta name="description"> and og:description. */
  description: string;
  /** Site-relative path starting with "/", e.g. "/compliance" or "/insights/some-slug". */
  path: string;
  /** Defaults to "website"; article pages should pass "article". */
  ogType?: "website" | "article";
  /** Overrides DEFAULT_OG_IMAGE for this page. */
  ogImage?: string;
}

/**
 * Builds the meta + links arrays for a TanStack Router route's `head()`. Every route should
 * spread or return this rather than hand-typing title/description/canonical/OG/Twitter tags,
 * so canonical and og:url can never again be silently wrong or missing.
 */
export function pageMeta({ title, description, path, ogType = "website", ogImage }: PageMetaInput) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(ORG_NAME) ? title : `${title} — ${ORG_NAME}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Sitewide Organization JSON-LD. Rendered once, in __root.tsx, so it's present on every page.
 * Every fact here is already public elsewhere on the site (Footer.tsx, index.tsx) — nothing
 * new is asserted. Deliberately does NOT include a `sameAs` array: this session could not
 * independently verify TVG's real social-profile URLs against the live site, and a wrong or
 * unverified sameAs link is worse than none (see the project's own "never fabricate" rule).
 * Add sameAs once someone confirms the actual LinkedIn/X profile URLs are correct and live. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description: ORG_FULL_DESCRIPTION,
    email: "info@tessvanghert.com",
    foundingDate: "2011",
    address: {
      "@type": "PostalAddress",
      streetAddress: "19 Gunter Grove",
      addressLocality: "London",
      postalCode: "SW10 0UN",
      addressCountry: "GB",
    },
    areaServed: ["GB", "FR", "US"],
  };
}
