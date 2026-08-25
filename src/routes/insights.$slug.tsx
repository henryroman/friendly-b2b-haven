import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Section, RuleGold, Overline, Btn, Chip } from "@/components/site/Section";
import { ArticleBlocks, ArticleFaq, ArticleToc, tocFromBlocks } from "@/components/site/Article";
import { getInsightBySlug } from "@/content/insights";
import { buildArticleHead } from "@/lib/article-seo";
import { formatDisplayDate } from "@/lib/dates";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = getInsightBySlug(params.slug);
    // Teaser-only posts (no body — see InsightPost.body in src/content/types.ts) intentionally
    // have no page of their own. Treat "no such slug" and "not yet published" the same way:
    // a real 404, not a page with nothing on it.
    if (!post || !post.body?.length) throw notFound();
    return post;
  },
  // loaderData is typed as possibly undefined (head() can run before the loader has
  // resolved) even though this route's own loader always either returns a post or throws
  // notFound(). Root's defaults cover the brief gap; there is nothing real to fall back to.
  head: ({ loaderData }) => (loaderData ? buildArticleHead(loaderData) : {}),
  component: InsightArticlePage,
});

function InsightArticlePage() {
  const post = Route.useLoaderData();
  const toc = tocFromBlocks(post.body ?? []);
  const byline = [
    post.author ? `${post.author.name}${post.author.title ? `, ${post.author.title}` : ""}` : null,
    formatDisplayDate(post.date),
    post.readTime,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="bg-ink text-inverse py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Overline dark>
            {post.kicker} · {post.readTime}
          </Overline>
          <h1 className="font-display mt-4 text-[40px] leading-[1.06] text-[var(--text-inverse)] sm:text-[52px] md:text-[60px]">
            {post.title}
          </h1>
          {post.heroDek && (
            <p className="font-display mt-6 max-w-[680px] text-[19px] font-normal text-[var(--text-inverse)] md:text-[21px]">
              {post.heroDek}
            </p>
          )}
          {post.chips && post.chips.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {post.chips.map((c) => (
                <Chip key={c} dark>
                  {c}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </section>

      <Section>
        <div className={`grid grid-cols-1 gap-12 lg:gap-16 ${toc.length ? "lg:grid-cols-[260px_1fr]" : ""}`}>
          {toc.length > 0 && <ArticleToc entries={toc} />}

          <article className="max-w-[68ch]">
            <RuleGold />
            <p className="text-[14px] text-[var(--text-muted)]">{byline}</p>

            <ArticleBlocks blocks={post.body ?? []} />

            {post.faq && post.faq.length > 0 && <ArticleFaq items={post.faq} />}

            {/* CTA — same pattern as guides/corporate-liquidation.tsx, deliberately, so every
                article page ends on the same ask and the same internal links. */}
            <div
              className="mt-16 border border-[var(--line-hairline)] bg-[var(--surface-card)] p-6 shadow-sm md:p-8"
              style={{ borderTop: "2px solid var(--accent)" }}
            >
              <Overline>Next step</Overline>
              <h2 className="font-display mt-3 text-[26px] md:text-[30px]">Ready to scope a sale?</h2>
              <p className="text-muted-foreground mt-3 text-[17px] leading-[1.6] md:text-[18px]">
                Share an inventory and we will come back with an indicative valuation, usually the same working day. No obligation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn href="/#enquire" variant="primary">
                  Make an enquiry
                </Btn>
                <Btn href="/#book-a-call" variant="secondary">
                  Book a call
                </Btn>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-[14px]">
                <Link to="/compliance" className="text-[var(--accent-press)] underline">
                  Our compliance approach
                </Link>
                <Link to="/aml-policy" className="text-[var(--accent-press)] underline">
                  AML policy
                </Link>
                <Link to="/insights" className="text-[var(--accent-press)] underline">
                  More insights
                </Link>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <Footer />
    </>
  );
}
