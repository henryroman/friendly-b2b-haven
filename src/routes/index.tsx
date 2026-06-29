import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Section, RuleGold, Overline, Btn, Chip } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tess Van Ghert — We buy precious metal from companies" },
      { name: "description", content: "Compliant acquisition. Global settlement. We price at the LBMA benchmark, manage every step from collection to refining, and wire the funds." },
      { property: "og:title", content: "Tess Van Ghert — Precious Metal Trading" },
      { property: "og:description", content: "We buy precious metal from companies. Compliant · Global settlement · FCA/EXW." },
    ],
  }),
  component: Index,
});

const metals = [
  { sym: "Au", name: "Gold" },
  { sym: "Ag", name: "Silver" },
  { sym: "Pt", name: "Platinum" },
  { sym: "Pd", name: "Palladium" },
];

const clients = [
  "Corporates & treasury",
  "Insolvency practitioners",
  "Industrial manufacturers",
  "Jewellers & boutiques",
  "Government agencies",
  "Estates & private holdings",
];

const steps = [
  { n: "01", title: "Enquire", body: "Tell us what you hold and where. We respond with an indicative valuation at the LBMA benchmark." },
  { n: "02", title: "Value & assay", body: "On-site or remote testing, then accredited-laboratory assay. You see exactly how the price is formed." },
  { n: "03", title: "Contract & collect", body: "A clear purchase agreement and full chain of custody. Our network collects across the UK, Europe, and globally." },
  { n: "04", title: "Settle", body: "Metal moves to an LBMA-accredited refiner; funds are wired to you, typically within two days of assay." },
];

function Index() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="bg-ink text-inverse py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
          <div className="max-w-[760px]">
            <Overline dark>Physical precious metals trading · since 2011</Overline>
            <h1 className="font-display mt-6 text-[44px] leading-[1.05] tracking-[0.01em] text-[var(--text-inverse)] sm:text-[56px] md:text-[64px]">
              We buy precious metal from companies.
            </h1>
            <p className="font-display mt-6 max-w-[620px] text-[19px] font-normal text-[var(--text-inverse)] md:text-[21px]">
              Compliant acquisition. Global settlement. No logistics risk for the seller. We price at the LBMA benchmark, manage every step from collection to refining, and wire the funds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="#enquire" variant="primary">Make an enquiry</Btn>
              <Btn href="#book-a-call" variant="secondary" dark>Book a call</Btn>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {["15+ years", "15+ countries", "Family-owned", "LBMA-accredited refiners"].map((c) => (
                <Chip key={c} dark>{c}</Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <Section tight>
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { v: "15+", l: "Years trading" },
            { v: "15+", l: "Countries · import / export" },
            { v: "999.9", l: "Settled to fine gold" },
            { v: "2 days", l: "Typical payment post-assay" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-[34px] leading-none text-[var(--text-strong)] md:text-[46px]" style={{ fontFamily: "var(--font-body)" }}>
                {s.v}
              </div>
              <div className="font-display mt-2 text-[12px] uppercase text-[var(--text-muted)]" style={{ letterSpacing: "var(--tracking-overline)" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <hr className="mx-auto h-px max-w-[1200px] border-0 bg-[var(--line-hairline)]" />

      {/* WHAT WE BUY */}
      <Section id="what-we-buy">
        <RuleGold />
        <h2 className="font-display text-[32px] sm:text-[36px] md:text-[40px]">What we buy</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {metals.map((m) => (
            <div
              key={m.sym}
              className="border-t-2 border-[var(--accent)] bg-[var(--surface-card)] p-6 text-center shadow-sm md:p-8"
              style={{ borderLeft: "1px solid var(--line-hairline)", borderRight: "1px solid var(--line-hairline)", borderBottom: "1px solid var(--line-hairline)" }}
            >
              <div className="font-display text-[44px] font-bold leading-none text-[var(--accent)] md:text-[52px]">{m.sym}</div>
              <h3 className="font-display mt-3 text-[20px] md:text-[24px]">{m.name}</h3>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground mx-auto mt-8 max-w-[60ch] text-center text-[16px] md:text-[18px]">
          In any form: bullion, coin, jewellery stock, award-programme items, scrap, industrial filings, catalyst and process material.
        </p>
      </Section>

      {/* WHO WE WORK WITH */}
      <Section dark>
        <RuleGold dark />
        <h2 className="font-display text-[var(--text-inverse)] text-[32px] sm:text-[36px] md:text-[40px]">Who we work with</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {clients.map((c, i) => (
            <div
              key={c}
              className="flex items-baseline gap-4 border border-[var(--line-on-dark)] bg-[var(--surface-card-dark)] p-5 md:p-6"
            >
              <span className="font-serif text-[22px] text-[var(--accent)]" style={{ fontFamily: "var(--font-body)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[20px] text-[var(--text-inverse)] md:text-[22px]">{c}</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works">
        <RuleGold />
        <h2 className="font-display text-[32px] sm:text-[36px] md:text-[40px]">How it works</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="font-display text-[40px] font-bold leading-none text-[var(--accent)]">{s.n}</div>
              <h3 className="font-display mt-4 mb-2 text-[22px] md:text-[24px]">{s.title}</h3>
              <p className="text-muted-foreground text-[16px] leading-[1.6]">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <hr className="mx-auto h-px max-w-[1200px] border-0 bg-[var(--line-hairline)]" />

      {/* COMPLIANCE STRIP */}
      <Section>
        <div className="border-t-2 border-[var(--accent)] bg-[var(--surface-card)] p-6 shadow-sm md:p-12" style={{ border: "1px solid var(--line-hairline)", borderTopWidth: "2px", borderTopColor: "var(--accent)" }}>
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-[60ch]">
              <Overline>Compliance is the product</Overline>
              <h2 className="font-display mt-3 mb-4 text-[28px] sm:text-[32px] md:text-[36px]">Built for an audit trail</h2>
              <p className="text-muted-foreground text-[17px] md:text-[18px]">
                KYC and KYB, sanctions and PEP screening, documented source of goods, full chain of custody, and settlement through LBMA-accredited refiners. The infrastructure that lets a finance team sell metal without taking on risk.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["KYC / KYB", "Sanctions & PEP screening", "Chain of custody", "LBMA settlement"].map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <Btn href="/compliance" variant="secondary">Our compliance approach</Btn>
              <Btn href="/aml-policy" variant="secondary">Read the AML policy</Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* ENQUIRE / BOOK A CALL */}
      <Section id="enquire" dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <RuleGold dark />
            <h2 className="font-display text-[var(--text-inverse)] text-[32px] sm:text-[36px] md:text-[40px]">Make an enquiry</h2>
            <p className="mt-3 mb-8 text-[18px] text-[var(--text-inverse)]">
              Tell us what you hold. We reply with an indicative valuation, usually the same working day.
            </p>
            <form
              className="grid gap-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Company" placeholder="Legal entity name" />
                <Field label="Your name" placeholder="Full name" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Email" type="email" placeholder="name@company.com" />
                <Field label="Phone" type="tel" placeholder="+44 …" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FieldSelect label="Metal type" options={["Gold", "Silver", "Platinum group", "Mixed / not sure"]} />
                <Field label="Estimated quantity" placeholder="e.g. 40 kg, or unknown" />
              </div>
              <Field label="Location of the metal" placeholder="City, country" />
              <FieldTextarea label="Anything else" placeholder="Form of the metal, timing, context…" />
              <Btn type="submit" variant="primary" className="self-start">Submit enquiry</Btn>
              <p className="text-[13px] text-[var(--text-inverse-muted)]">
                Submitting does not create a contract. All enquiries handled in confidence.
              </p>
            </form>
          </div>

          <div id="book-a-call">
            <RuleGold dark />
            <h2 className="font-display text-[var(--text-inverse)] text-[32px] sm:text-[36px] md:text-[40px]">Prefer to talk?</h2>
            <p className="mt-3 mb-8 text-[18px] text-[var(--text-inverse)]">
              Book a 20-minute call with a member of the desk. No obligation, just a straight conversation about what you hold and how a sale would work.
            </p>
            <div
              className="flex h-[300px] items-center justify-center border border-[var(--line-on-dark)] bg-[var(--tvg-ink-700)] text-center"
              style={{ borderRadius: "var(--radius-md)" }}
            >
              <span className="font-display text-[13px] uppercase tracking-[0.06em] text-[var(--text-inverse-muted)]">
                Scheduler embed (Calendly / Cal.com)
              </span>
            </div>
            <p className="mt-6 text-[15px] text-[var(--text-inverse-muted)]">
              Or email <strong className="text-[var(--text-inverse)]">info@tessvanghert.com</strong>
              <br />
              London +44 7780 663171 · Paris +33 6 17 18 56 91
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-display text-[12px] uppercase text-[var(--text-inverse-muted)]" style={{ letterSpacing: "var(--tracking-overline)" }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-0 border-b border-[var(--line-on-dark)] bg-transparent py-2 text-[17px] text-[var(--text-inverse)] outline-none transition-colors placeholder:text-[var(--text-inverse-muted)] focus:border-[var(--accent)]"
        style={{ fontFamily: "var(--font-body)" }}
      />
    </div>
  );
}

function FieldSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-display text-[12px] uppercase text-[var(--text-inverse-muted)]" style={{ letterSpacing: "var(--tracking-overline)" }}>
        {label}
      </label>
      <select
        className="w-full border-0 border-b border-[var(--line-on-dark)] bg-transparent py-2 text-[17px] text-[var(--text-inverse)] outline-none transition-colors focus:border-[var(--accent)]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[var(--tvg-ink-700)] text-[var(--text-inverse)]">{o}</option>
        ))}
      </select>
    </div>
  );
}

function FieldTextarea({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-display text-[12px] uppercase text-[var(--text-inverse-muted)]" style={{ letterSpacing: "var(--tracking-overline)" }}>
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="min-h-[80px] w-full resize-y border-0 border-b border-[var(--line-on-dark)] bg-transparent py-2 text-[17px] text-[var(--text-inverse)] outline-none transition-colors placeholder:text-[var(--text-inverse-muted)] focus:border-[var(--accent)]"
        style={{ fontFamily: "var(--font-body)" }}
      />
    </div>
  );
}
