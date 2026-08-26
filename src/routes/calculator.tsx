import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Section, Overline } from "@/components/site/Section";
import { MeltCalculator } from "@/components/site/MeltCalculator";
import { fetchLiveMeltPrices } from "@/lib/metals-price";
import { pageMeta } from "@/lib/seo";

// New dedicated route (2026-08-26) so the melt calculator has its own indexable URL and a
// nav entry point -- previously it was reachable only by scrolling ~30 screens down the
// homepage, with no link to it anywhere in site navigation. The homepage section
// (Section id="calculator" in routes/index.tsx) stays exactly as it was; this route is
// additive, not a replacement. Reuses the same MeltCalculator component and
// fetchLiveMeltPrices() loader the homepage already uses -- neither was changed.

export const Route = createFileRoute("/calculator")({
  loader: () => fetchLiveMeltPrices(),
  head: () =>
    pageMeta({
      title: "Melt Value Calculator",
      description:
        "Estimate the melt value of gold, silver, platinum, or palladium at live spot prices referenced to the LBMA benchmark. Indicative only -- your firm offer follows accredited-laboratory assay.",
      path: "/calculator",
    }),
  component: CalculatorPage,
});

function CalculatorPage() {
  const livePrices = Route.useLoaderData();

  return (
    <>
      <Nav />

      <section className="bg-ink text-inverse py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Overline dark>Melt calculator</Overline>
          <h1 className="font-display mt-4 text-[40px] leading-[1.08] text-[var(--text-inverse)] sm:text-[52px] md:text-[60px]">
            What is your metal worth?
          </h1>
          <p className="font-display mt-6 max-w-[640px] text-[19px] font-normal text-[var(--text-inverse)] md:text-[21px]">
            Live spot prices for gold, silver, platinum, and palladium, referenced to the LBMA benchmark. An indicative starting point -- your firm offer follows accredited-laboratory assay.
          </p>
        </div>
      </section>

      <Section>
        <MeltCalculator livePrices={livePrices} />
      </Section>

      <Footer />
    </>
  );
}
