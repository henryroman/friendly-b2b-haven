import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Overline, RuleGold } from "@/components/site/Section";
import { QualifyWizard } from "@/components/site/QualifyWizard";
import { pageMeta } from "@/lib/seo";

// New indexable page (2026-08-26), replacing the melt calculator's "Get a
// firm offer" CTA, which previously just scrolled to the homepage's
// general enquiry form. This is its own route specifically so it can be
// linked and indexed independently of the homepage -- added to
// generate-seo-files.ts's sitemap accordingly.

export const Route = createFileRoute("/sell-your-metal")({
  head: () =>
    pageMeta({
      title: "Sell Your Precious Metal",
      description:
        "Answer a few quick questions about what you hold and we'll come back with a firm offer at the LBMA benchmark — usually within one working day. No obligation.",
      path: "/sell-your-metal",
    }),
  component: SellYourMetalPage,
});

function SellYourMetalPage() {
  // Preselected metal/list context from the calculator's CTA, same
  // ?metal=/?note= mechanism the homepage's own enquiry form already
  // reads -- see MeltCalculator.tsx.
  const [initialMetal, setInitialMetal] = useState("");
  const [initialNote, setInitialNote] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setInitialMetal(params.get("metal") ?? "");
    setInitialNote(params.get("note") ?? "");
  }, []);

  return (
    <>
      <Nav />

      <section className="bg-ink text-inverse py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Overline dark>Sell your metal</Overline>
          <h1 className="font-display mt-4 text-[40px] leading-[1.08] text-[var(--text-inverse)] sm:text-[52px] md:text-[60px]">
            A few quick questions, then a firm offer.
          </h1>
          <p className="font-display mt-6 max-w-[640px] text-[19px] font-normal text-[var(--text-inverse)] md:text-[21px]">
            Answer a short set of questions about what you hold. We come back with an indicative valuation at the LBMA benchmark, usually within one working day.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-5 md:px-8">
          <RuleGold />
          <QualifyWizard initialMetal={initialMetal} initialNote={initialNote} />
        </div>
      </section>

      <Footer />
    </>
  );
}
