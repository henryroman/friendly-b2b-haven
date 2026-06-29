import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Section, RuleGold, Overline } from "@/components/site/Section";

export const Route = createFileRoute("/aml-policy")({
  head: () => ({
    meta: [
      { title: "AML Policy — Tess Van Ghert" },
      { name: "description", content: "Our anti-money-laundering policy: risk-based assessment, customer due diligence, ongoing monitoring, record keeping, and reporting." },
      { property: "og:title", content: "AML Policy — Tess Van Ghert" },
      { property: "og:description", content: "Policy summary: risk-based AML/CFT framework operated by Tess Van Ghert." },
    ],
  }),
  component: AmlPage,
});

const sections = [
  {
    h: "1. Purpose",
    p: "This policy sets out how Tess Van Ghert (TVG) prevents the firm from being used, knowingly or unknowingly, for money laundering, terrorist financing, or the evasion of financial sanctions.",
  },
  {
    h: "2. Scope",
    p: "It applies to every director, employee, agent, and contractor of TVG and to every transaction in which TVG acquires precious metal from a counterparty.",
  },
  {
    h: "3. Risk-based approach",
    p: "TVG maintains a written firm-wide risk assessment that addresses customer, product, geographic, channel, and transaction risk. Mitigations and controls are calibrated to the assessed risk.",
  },
  {
    h: "4. Customer due diligence (CDD)",
    p: "Standard CDD is performed on every counterparty before establishing a relationship: identification, verification, beneficial ownership to applicable thresholds, and an understanding of the nature and purpose of the business relationship. Enhanced due diligence is applied to higher-risk relationships and to politically exposed persons.",
  },
  {
    h: "5. Sanctions screening",
    p: "Counterparties, beneficial owners, and connected parties are screened against applicable consolidated sanctions and watchlists at onboarding and on an ongoing basis. Any positive or potential match is escalated to the MLRO before further activity.",
  },
  {
    h: "6. Source of funds and source of goods",
    p: "TVG documents the source of goods for every lot acquired and, where the risk profile requires it, the source of funds of the counterparty. Evidence is retained in the transaction file.",
  },
  {
    h: "7. Ongoing monitoring",
    p: "Activity is reviewed against the expected profile of the counterparty. Unusual activity is escalated and, where appropriate, reported to the relevant authority by the MLRO.",
  },
  {
    h: "8. Record keeping",
    p: "Records of CDD, transactions, and screening results are retained for the period required by applicable law and made available to regulators on request.",
  },
  {
    h: "9. Training",
    p: "All relevant staff receive AML/CFT training on appointment and at least annually. Records of training are retained.",
  },
  {
    h: "10. Governance",
    p: "The MLRO is responsible for the day-to-day operation of this policy and reports to the board. The policy is reviewed at least annually and updated to reflect changes in law, regulation, or the firm's risk profile.",
  },
];

function AmlPage() {
  return (
    <>
      <Nav />
      <section className="bg-ink text-inverse py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Overline dark>Policy summary · v1.2</Overline>
          <h1 className="font-display mt-4 text-[40px] leading-[1.08] text-[var(--text-inverse)] sm:text-[52px] md:text-[60px]">
            Anti-Money-Laundering Policy
          </h1>
          <p className="font-display mt-6 max-w-[640px] text-[19px] font-normal text-[var(--text-inverse)] md:text-[21px]">
            A plain-English summary of the AML/CFT framework operated by Tess Van Ghert. The full policy is held on file and provided to counterparties on request.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-[760px]">
          <RuleGold />
          <div className="space-y-10">
            {sections.map((s) => (
              <article key={s.h}>
                <h2 className="font-display mb-3 text-[22px] md:text-[24px]">{s.h}</h2>
                <p className="text-[17px] leading-[1.7] text-[var(--text-body)]">{s.p}</p>
              </article>
            ))}
          </div>

          <hr className="my-12 h-px border-0 bg-[var(--line-hairline)]" />
          <p className="text-muted-foreground text-[14px] leading-[1.7]">
            This is a summary and does not constitute legal advice. For specific questions about a contemplated transaction, contact the desk at{" "}
            <a className="text-[var(--accent-press)] underline" href="mailto:info@tessvanghert.com">info@tessvanghert.com</a>.
          </p>
        </div>
      </Section>

      <Footer />
    </>
  );
}
