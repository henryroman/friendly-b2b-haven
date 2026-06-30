import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Section, RuleGold, Overline, Btn, Chip } from "@/components/site/Section";

export const Route = createFileRoute("/guides/corporate-liquidation")({
  head: () => ({
    meta: [
      { title: "How to Sell Precious Metals: Corporate Liquidation Guide — Tess Van Ghert" },
      {
        name: "description",
        content:
          "A practical B2B guide to selling precious metals at scale: valuation at LBMA benchmark, documented source of goods, chain of custody, AML/KYB, and settlement. Written for treasury teams and insolvency practitioners.",
      },
      { property: "og:title", content: "How to Sell Precious Metals: Corporate Liquidation Guide" },
      {
        property: "og:description",
        content:
          "Risk-mitigated, audit-trail-first guide to liquidating corporate precious metal holdings. For treasury, finance, and insolvency teams.",
      },
      { property: "og:url", content: "https://friendly-b2b-haven.lovable.app/guides/corporate-liquidation" },
      { property: "og:type", content: "article" },
    ],
    links: [
      { rel: "canonical", href: "https://friendly-b2b-haven.lovable.app/guides/corporate-liquidation" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Sell Precious Metals: Corporate Liquidation Guide",
          description:
            "A practical B2B guide to selling precious metals at scale: valuation, documented source of goods, chain of custody, AML/KYB, and settlement.",
          author: { "@type": "Organization", name: "Tess Van Ghert" },
          publisher: { "@type": "Organization", name: "Tess Van Ghert" },
          mainEntityOfPage: "https://friendly-b2b-haven.lovable.app/guides/corporate-liquidation",
        }),
      },
    ],
  }),
  component: GuidePage,
});

const toc = [
  { id: "who", label: "Who this guide is for" },
  { id: "why-different", label: "Why corporate liquidation is different" },
  { id: "process", label: "The seven-step process" },
  { id: "source-of-goods", label: "Documented source of goods" },
  { id: "valuation", label: "How price is formed (LBMA benchmark)" },
  { id: "logistics", label: "Logistics, insurance, and chain of custody" },
  { id: "settlement", label: "Settlement and tax considerations" },
  { id: "pitfalls", label: "Common pitfalls" },
  { id: "checklist", label: "Pre-sale checklist" },
  { id: "faq", label: "FAQ" },
];

function GuidePage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="bg-ink text-inverse py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Overline dark>Guide · 12 min read</Overline>
          <h1 className="font-display mt-4 text-[40px] leading-[1.06] text-[var(--text-inverse)] sm:text-[52px] md:text-[60px]">
            How to sell precious metals: a corporate liquidation guide
          </h1>
          <p className="font-display mt-6 max-w-[680px] text-[19px] font-normal text-[var(--text-inverse)] md:text-[21px]">
            For treasury teams, finance directors, and insolvency practitioners disposing of bulk or industrial precious metal. Risk-mitigated, audit-trail first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Treasury", "Insolvency", "Industrial", "Estates"].map((c) => (
              <Chip key={c} dark>{c}</Chip>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Overline>On this page</Overline>
            <nav className="mt-4 flex flex-col gap-2">
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="text-[15px] text-[var(--text-strong)] hover:text-[var(--accent-press)]"
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* BODY */}
          <article className="max-w-[68ch]">
            <RuleGold />

            <section id="who">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">Who this guide is for</h2>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                Corporates and institutions holding precious metal as an operational asset, balance-sheet item, or recovered estate. Typical readers run treasury at a manufacturer with platinum-group catalyst stock, sit on the finance team of a jeweller winding down a product line, or manage an insolvent estate that includes bullion, scrap, or industrial filings.
              </p>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                The retail playbook — courier the bar to a refiner, accept the spot less a margin — does not survive contact with corporate procurement, audit, or AML obligations. This guide covers the version that does.
              </p>
            </section>

            <section id="why-different" className="mt-12">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">Why corporate liquidation is different</h2>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                Four things change once the seller is a company rather than an individual:
              </p>
              <ul className="mt-4 space-y-3 text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                <li><strong className="text-[var(--text-strong)]">Audit trail.</strong> Every step of the sale will be reviewed by finance, audit, and potentially counsel. The price, the assay, the counterparty, and the funds movement all need documentary support.</li>
                <li><strong className="text-[var(--text-strong)]">AML and sanctions.</strong> The buyer must run KYB on the seller, screen directors and UBOs, and document source of goods. A sale that cannot survive an MLRO review is not a sale.</li>
                <li><strong className="text-[var(--text-strong)]">Logistics risk.</strong> Five kilos can fit in a pocket. Five hundred kilos cannot. Insurance, secure transport, and chain of custody are real cost lines, not afterthoughts.</li>
                <li><strong className="text-[var(--text-strong)]">Tax treatment.</strong> VAT, capital allowances, and recovery treatment all turn on form and counterparty. The sale needs to be structured before the metal moves.</li>
              </ul>
            </section>

            <section id="process" className="mt-12">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">The seven-step process</h2>
              <ol className="mt-6 space-y-6">
                {[
                  { n: "01", t: "Inventory", b: "List what you hold: metal, form (bullion, coin, jewellery stock, scrap, catalyst, filings), estimated gross weight, location, and any existing assay or refiner statements." },
                  { n: "02", t: "Enquiry and indicative valuation", b: "Share the inventory with a buyer. Expect an indicative price at the prevailing LBMA benchmark less a clearly stated refining and handling margin." },
                  { n: "03", t: "KYB and source-of-goods pack", b: "Provide entity documents, UBO information, and evidence of how the metal came to be on your balance sheet (invoices, manufacturing records, court orders for insolvency cases)." },
                  { n: "04", t: "Sampling and assay", b: "On-site or at an accredited laboratory. For mixed material, sampling protocol matters more than the headline number — agree it in writing first." },
                  { n: "05", t: "Purchase agreement", b: "A signed contract covers price formula, assay tolerance, settlement timing, Incoterms (FCA or EXW are the typical seller-friendly options), and dispute resolution." },
                  { n: "06", t: "Collection and refining", b: "Insured secure transport under the agreed Incoterm, lodged with an LBMA-accredited refiner. You should receive a refiner statement showing fine weight." },
                  { n: "07", t: "Settlement", b: "Funds wire to the entity bank account on file, typically within two business days of the final refiner statement. Reconcile against the contract price formula." },
                ].map((s) => (
                  <li key={s.n} className="flex gap-5 border-l-2 border-[var(--accent)] pl-5">
                    <div className="font-display text-[26px] font-bold leading-none text-[var(--accent)]">{s.n}</div>
                    <div>
                      <h3 className="font-display text-[20px] md:text-[22px]">{s.t}</h3>
                      <p className="text-muted-foreground mt-2 text-[16px] leading-[1.65] md:text-[17px]">{s.b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="source-of-goods" className="mt-12">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">Documented source of goods</h2>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                This is the single biggest differentiator between a retail and a corporate sale. A compliant buyer cannot take title to metal whose origin is not documented; an auditor cannot sign off on a disposal that lacks the same evidence on the other side of the trade.
              </p>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                A workable source-of-goods pack normally includes:
              </p>
              <ul className="mt-4 space-y-3 text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                <li><strong className="text-[var(--text-strong)]">Acquisition evidence.</strong> Invoices from the original supplier or refiner, internal manufacturing records, or — for recovered estates — the court order or appointment.</li>
                <li><strong className="text-[var(--text-strong)]">Custody history.</strong> Where the metal has been held since acquisition: own vault, third-party depository, or operational site.</li>
                <li><strong className="text-[var(--text-strong)]">Prior assays or refiner statements.</strong> If the metal has been refined before, the statement evidences fine weight and prior chain of custody.</li>
                <li><strong className="text-[var(--text-strong)]">Beneficial-ownership confirmation.</strong> A board minute or equivalent confirming the entity owns the metal free of third-party claims.</li>
              </ul>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                If any of these are weak — a common situation for legacy holdings or estates — say so up front. A buyer with a serious compliance function will help you reconstruct what is missing rather than walking away; one that does not ask is the buyer to be worried about.
              </p>
            </section>

            <section id="valuation" className="mt-12">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">How price is formed</h2>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                The price of physical metal is built up from a public benchmark. For gold and silver this is the LBMA Gold Price and LBMA Silver Price, fixed in London twice and once daily respectively; for platinum and palladium, the LBMA PM fix.
              </p>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                From the benchmark, deduct:
              </p>
              <ul className="mt-4 space-y-3 text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                <li><strong className="text-[var(--text-strong)]">Refining charge.</strong> A per-kilo cost set by the refiner, depending on form and contamination. Bullion settles thinner than catalyst.</li>
                <li><strong className="text-[var(--text-strong)]">Handling and assay.</strong> Sampling, laboratory testing, and administration. For large lots this should be a flat fee, not a percentage.</li>
                <li><strong className="text-[var(--text-strong)]">Counterparty margin.</strong> The buyer's spread for taking price risk between purchase and refining.</li>
              </ul>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                Insist on seeing the formula, not just the net number. "LBMA AM minus refining at £X/kg minus margin of Y%" is a structure you can take to audit; "we'll give you Z" is not.
              </p>
            </section>

            <section id="logistics" className="mt-12">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">Logistics, insurance, and chain of custody</h2>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                Three Incoterms cover most corporate sales:
              </p>
              <ul className="mt-4 space-y-3 text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                <li><strong className="text-[var(--text-strong)]">EXW (Ex Works).</strong> Buyer collects from your site. Risk transfers at the door. Simplest for the seller; the buyer carries transit exposure.</li>
                <li><strong className="text-[var(--text-strong)]">FCA (Free Carrier).</strong> You hand the metal to a named carrier at a named place. Common for shipments going through an airport or secure-transport hub.</li>
                <li><strong className="text-[var(--text-strong)]">DAP (Delivered at Place).</strong> Seller delivers to the refiner. Rare for corporate sellers; only sensible if you already run a logistics function.</li>
              </ul>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                Whichever Incoterm applies, the metal should never leave a documented chain of custody. Sealed and numbered containers, signed handover at each transfer, and a single insurance certificate covering door-to-refiner are the baseline.
              </p>
            </section>

            <section id="settlement" className="mt-12">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">Settlement and tax considerations</h2>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                Investment gold is VAT-exempt in the UK and EU under the Gold Directive; silver, platinum, and palladium are generally standard-rated. Industrial and scrap material can fall under domestic reverse-charge rules — your finance team or VAT advisor should confirm before the contract is signed, not after.
              </p>
              <p className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                Funds settle by SWIFT or SEPA wire to the entity's bank account on file with the buyer. Cash settlement of corporate sales is not standard practice; if a buyer offers it, treat that as a red flag rather than a convenience.
              </p>
            </section>

            <section id="pitfalls" className="mt-12">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">Common pitfalls</h2>
              <ul className="mt-4 space-y-3 text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                <li><strong className="text-[var(--text-strong)]">Accepting a single net quote.</strong> Without the formula you cannot reconcile, audit, or compare offers.</li>
                <li><strong className="text-[var(--text-strong)]">Moving metal before contracts are signed.</strong> Transit without a contract leaves the seller carrying risk for material no one has yet agreed to buy.</li>
                <li><strong className="text-[var(--text-strong)]">Skipping the sampling protocol on mixed material.</strong> The argument is always about the sample, never about the spot price.</li>
                <li><strong className="text-[var(--text-strong)]">Working with a buyer who does not ask for source of goods.</strong> If they do not ask, their compliance function does not exist, and the trade will not survive your audit.</li>
                <li><strong className="text-[var(--text-strong)]">Confusing scrap price with refined price.</strong> A jeweller quoting "scrap" against an LBMA-benchmark buyer is comparing different things.</li>
              </ul>
            </section>

            <section id="checklist" className="mt-12">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">Pre-sale checklist</h2>
              <div
                className="mt-6 border border-[var(--line-hairline)] bg-[var(--surface-card)] p-6 shadow-sm md:p-8"
                style={{ borderTop: "2px solid var(--accent)" }}
              >
                <ul className="space-y-3 text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                  <li>☐ Inventory complete: metal, form, gross weight, location.</li>
                  <li>☐ Source-of-goods pack assembled.</li>
                  <li>☐ KYB pack ready: certificate of incorporation, UBOs, directors' IDs.</li>
                  <li>☐ Internal authority confirmed: board minute or delegated authority to sell.</li>
                  <li>☐ VAT treatment confirmed with finance or VAT advisor.</li>
                  <li>☐ Bank account for settlement on file with buyer.</li>
                  <li>☐ Price formula agreed in writing — not a net number.</li>
                  <li>☐ Incoterm and insurance arrangements documented.</li>
                  <li>☐ Sampling and assay protocol agreed for mixed material.</li>
                </ul>
              </div>
            </section>

            <section id="faq" className="mt-12">
              <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">FAQ</h2>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-display text-[20px] md:text-[22px]">How long does a corporate sale usually take?</h3>
                  <p className="text-muted-foreground mt-2 text-[17px] leading-[1.65] md:text-[18px]">
                    From first enquiry to funds on account: typically two to four weeks for documented bullion, four to eight for mixed or industrial material that needs sampling and refining. The compliance work tends to dominate the timeline, not the metal movement.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-[20px] md:text-[22px]">Can we sell without disclosing the source?</h3>
                  <p className="text-muted-foreground mt-2 text-[17px] leading-[1.65] md:text-[18px]">
                    Not with a compliant counterparty. A buyer that does not ask is not a buyer your audit committee will be comfortable with.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-[20px] md:text-[22px]">What if the metal is held abroad?</h3>
                  <p className="text-muted-foreground mt-2 text-[17px] leading-[1.65] md:text-[18px]">
                    Cross-border sales are routine. The buyer handles import or export licensing, and the Incoterm sets where seller risk ends. Plan an extra few days for customs clearance.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-[20px] md:text-[22px]">Is there a minimum size?</h3>
                  <p className="text-muted-foreground mt-2 text-[17px] leading-[1.65] md:text-[18px]">
                    For us, no formal minimum, but the compliance and logistics overhead means the economics work best from a few kilos of fine gold equivalent upwards.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
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
                <Btn href="/#enquire" variant="primary">Make an enquiry</Btn>
                <Btn href="/#book-a-call" variant="secondary">Book a call</Btn>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-[14px]">
                <Link to="/compliance" className="text-[var(--accent-press)] underline">Our compliance approach</Link>
                <Link to="/aml-policy" className="text-[var(--accent-press)] underline">AML policy</Link>
                <Link to="/insights" className="text-[var(--accent-press)] underline">More insights</Link>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <Footer />
    </>
  );
}
