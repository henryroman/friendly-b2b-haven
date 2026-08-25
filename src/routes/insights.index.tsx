import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Section, RuleGold, Overline } from "@/components/site/Section";
import { getAllInsights } from "@/content/insights";
import { formatDisplayDate } from "@/lib/dates";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/insights/")({
  head: () =>
    pageMeta({
      title: "Insights",
      description: "Notes from the desk on precious metals trading, compliance, and global settlement.",
      path: "/insights",
    }),
  component: InsightsPage,
});

function InsightsPage() {
  // Sourced from src/content/insights/*.ts (see that folder's README) instead of a hardcoded
  // array, so a new file dropped in that folder is enough to publish — nothing here changes.
  const posts = getAllInsights();

  return (
    <>
      <Nav />
      <section className="bg-ink text-inverse py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Overline dark>Notes from the desk</Overline>
          <h1 className="font-display mt-4 text-[40px] leading-[1.08] text-[var(--text-inverse)] sm:text-[52px] md:text-[60px]">
            Insights
          </h1>
          <p className="font-display mt-6 max-w-[640px] text-[19px] font-normal text-[var(--text-inverse)] md:text-[21px]">
            Short, practical writing on precious metals trading, compliance, and global settlement. No hype, no forecasts.
          </p>
        </div>
      </section>

      <Section>
        <RuleGold />
        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((p) => {
            // Posts without a body (see InsightPost.body in src/content/types.ts) are teasers
            // only — shown, not clickable — exactly as every post on this page behaved before
            // the article template existed. Publishing is just adding a body to the file.
            const published = Boolean(p.body?.length);

            const card = (
              <article
                className={`group flex h-full flex-col border border-[var(--line-hairline)] bg-[var(--surface-card)] p-6 shadow-sm transition-colors md:p-8 ${
                  published ? "hover:border-[var(--accent)]" : ""
                }`}
                style={{ borderTop: "2px solid var(--accent)" }}
              >
                <Overline>{p.kicker}</Overline>
                <h2
                  className={`font-display mt-3 text-[24px] leading-[1.2] transition-colors md:text-[26px] ${
                    published ? "group-hover:text-[var(--accent-press)]" : ""
                  }`}
                >
                  {p.title}
                </h2>
                <p className="text-muted-foreground mt-3 text-[16px] leading-[1.6]">{p.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--line-hairline)] pt-4 text-[13px] text-[var(--text-muted)]">
                  <span>{formatDisplayDate(p.date)}</span>
                  <span>{p.readTime}</span>
                </div>
              </article>
            );

            return published ? (
              <Link key={p.slug} to="/insights/$slug" params={{ slug: p.slug }} className="block">
                {card}
              </Link>
            ) : (
              <div key={p.slug}>{card}</div>
            );
          })}
        </div>
      </Section>

      <Footer />
    </>
  );
}
