import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Section, RuleGold, Overline, Btn, Chip } from "@/components/site/Section";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance — Tess Van Ghert" },
      { name: "description", content: "KYC, KYB, sanctions screening, documented source of goods, and LBMA-accredited settlement. The infrastructure that lets a finance team sell metal without taking on risk." },
      { property: "og:title", content: "Compliance — Tess Van Ghert" },
      { property: "og:description", content: "How we keep the audit trail clean: KYC, KYB, sanctions and PEP screening, chain of custody, LBMA settlement." },
    ],
  }),
  component: CompliancePage,
});

const pillars = [
  { n: "01", title: "Know Your Client", body: "Verified identity, beneficial ownership, and corporate structure on every counterparty, refreshed on a defined cadence." },
  { n: "02", title: "Know Your Business", body: "Trade activity, jurisdictions, and source-of-funds reviewed against our risk framework before the first transaction." },
  { n: "03", title: "Source of goods", body: "Documented provenance for every lot — invoices, scrap manifests, refinery statements, or estate records as applicable." },
  { n: "04", title: "Sanctions & PEP", body: "Continuous screening against global watchlists. Politically exposed persons and adverse media reviewed by a named officer." },
  { n: "05", title: "Chain of custody", body: "Sealed transit, dual-controlled handoffs, and assay performed at an accredited laboratory with a counter-signed report." },
  { n: "06", title: "Settlement & refining", body: "Metal is settled through LBMA-accredited refiners. Funds wired to the verified company account on file." },
];

function CompliancePage() {
  return (
    <>
      <Nav />
      <section className="bg-ink text-inverse py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Overline dark>Compliance approach</Overline>
          <h1 className="font-display mt-4 text-[40px] leading-[1.08] text-[var(--text-inverse)] sm:text-[52px] md:text-[60px]">
            Compliance is the product.
          </h1>
          <p className="font-display mt-6 max-w-[640px] text-[19px] font-normal text-[var(--text-inverse)] md:text-[21px]">
            We acquire precious metal only with a defensible audit trail. Every transaction is documented end-to-end so a finance team can sell metal without taking on regulatory or reputational risk.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["KYC / KYB", "Sanctions & PEP screening", "Chain of custody", "LBMA settlement", "FCA/EXW Incoterms"].map((c) => (
              <Chip key={c} dark>{c}</Chip>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <RuleGold />
        <h2 className="font-display text-[32px] sm:text-[36px] md:text-[40px]">Six pillars</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.n}>
              <div className="font-display text-[36px] font-bold leading-none text-[var(--accent)]">{p.n}</div>
              <h3 className="font-display mt-3 mb-2 text-[22px]">{p.title}</h3>
              <p className="text-muted-foreground text-[16px] leading-[1.6]">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dark>
        <RuleGold dark />
        <h2 className="font-display text-[var(--text-inverse)] text-[32px] sm:text-[36px] md:text-[40px]">
          Quiet, methodical, evidenced.
        </h2>
        <p className="font-display mt-4 max-w-[60ch] text-[19px] font-normal text-[var(--text-inverse)]">
          A documented file accompanies every settlement. Speak to the desk if your counsel, auditor, or MLRO needs the framework reviewed.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn href="/aml-policy" variant="secondary" dark>Read the AML policy</Btn>
          <Btn href="/#enquire" variant="primary">Make an enquiry</Btn>
        </div>
      </Section>

      <Footer />
    </>
  );
}
