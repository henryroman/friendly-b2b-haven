import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Section, RuleGold, Overline } from "@/components/site/Section";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Tess Van Ghert" },
      { name: "description", content: "Notes from the desk on precious metals trading, compliance, and global settlement." },
      { property: "og:title", content: "Insights — Tess Van Ghert" },
      { property: "og:description", content: "Notes from the desk: trading, compliance, settlement." },
    ],
  }),
  component: InsightsPage,
});

const posts = [
  {
    kicker: "Market note",
    title: "Why corporates sit on legacy metal — and what unlocks it",
    excerpt: "Award programmes, retired product lines, and discontinued inventory build up faster than treasury teams realise. A look at how finance functions are clearing the position.",
    date: "12 June 2026",
    read: "6 min read",
  },
  {
    kicker: "Compliance",
    title: "Source of goods: what 'documented' actually means",
    excerpt: "A short walk through the evidence pack we ask for, why each document matters, and how to put it together without slowing the trade.",
    date: "28 May 2026",
    read: "8 min read",
  },
  {
    kicker: "Operations",
    title: "Settling internationally without taking logistics risk",
    excerpt: "FCA, EXW, and DAP in plain English, and how we structure collection so the seller carries no transit exposure.",
    date: "09 May 2026",
    read: "5 min read",
  },
  {
    kicker: "Compliance",
    title: "AML for finance teams who have never bought a refiner statement",
    excerpt: "A primer for treasurers, controllers, and insolvency practitioners working with precious metals for the first time.",
    date: "21 April 2026",
    read: "7 min read",
  },
];

function InsightsPage() {
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
          {posts.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col border border-[var(--line-hairline)] bg-[var(--surface-card)] p-6 shadow-sm transition-colors hover:border-[var(--accent)] md:p-8"
              style={{ borderTop: "2px solid var(--accent)" }}
            >
              <Overline>{p.kicker}</Overline>
              <h2 className="font-display mt-3 text-[24px] leading-[1.2] md:text-[26px]">{p.title}</h2>
              <p className="text-muted-foreground mt-3 text-[16px] leading-[1.6]">{p.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-[var(--line-hairline)] pt-4 text-[13px] text-[var(--text-muted)]">
                <span>{p.date}</span>
                <span>{p.read}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Footer />
    </>
  );
}
