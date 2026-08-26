import type { InsightPost } from "../types";

// Migrated from the old hardcoded `posts` array in routes/insights.tsx (2026-08-24 SEO/AEO
// pass). Full body + faq added 2026-08-26 — see tvg-marketing-sites-melt-calculator-build
// project doc for the content build log.
export default {
  slug: "aml-for-finance-teams",
  kicker: "Compliance",
  title: "AML for finance teams who have never bought a refiner statement",
  description:
    "A primer for treasurers, controllers, and insolvency practitioners working with precious metals for the first time.",
  date: "2026-04-21",
  readTime: "7 min read",

  heroDek: "What a treasurer, controller, or insolvency practitioner should expect to be asked for the first time they sell precious metal to a compliant buyer, and why none of it should be treated as a red flag.",
  chips: ["AML & KYC", "Treasury teams", "Insolvency practitioners"],
  body: [
    { type: "p", text: "A request for a board resolution, a shareholder register, and a written account of where the material came from is not a sign of suspicion, and it is not a delay tactic. It is the standard opening step of any purchase made by a buyer capable of moving precious metal into a compliant chain toward an LBMA-accredited refiner. Most finance teams selling precious metal for the first time expect a price negotiation. What they do not expect is how much of the early conversation is about paperwork rather than price, and that is worth understanding before the first call rather than during it." },
    { type: "h2", text: "Why does a precious metals buyer need to know who you are before it will make an offer?" },
    { type: "p", text: "A precious metals buyer has to establish who it is buying from because the anti-money-laundering obligation in this trade sits with the buyer, not the seller. Under standard AML and KYC practice, a company that purchases physical gold, silver, or platinum group metal and moves it toward export or refining is the regulated party in the transaction, and it cannot lawfully complete a purchase without first identifying its counterparty, screening for sanctions and politically exposed person exposure, and recording why the relationship exists. None of this implies the seller is under suspicion. It means the buyer is doing the work required to hand the material on to an LBMA-accredited refiner with a clean, evidenced chain of custody behind it. A cash buyer that skips these questions is not offering a shortcut. It is a buyer that either cannot place the material into a compliant chain at all, or is choosing not to record how it acquired it, and neither is a position a finance team wants attached to its own transaction history. A credible buyer asks these questions before it asks about price, because it has to be able to answer them itself before it can lawfully close." },
    { type: "h2", text: "What does source of goods actually mean in a corporate precious metals sale?" },
    { type: "p", text: "Source of goods means being able to state, in a short written account, how the company came to hold the material and how long it has held it. It does not mean reconstructing a mine-to-market history of the kind a refiner’s own sourcing policy requires further down the chain, and it is not a request for a certificate the finance team is unlikely to hold. For a corporate seller this is usually a simple internal fact: decommissioned service-award or long-service inventory that has sat in a warehouse for years, accumulated manufacturing filings and plating residue from production, stock carried onto the books through an acquisition, or material sitting on the asset schedule of a business now in administration. Each of those is a normal, answerable question for whoever manages the inventory, not a forensic exercise. Incomplete records for older inventory are normal and do not stop a transaction on their own. What a credible buyer needs is an honest, specific account of the material’s origin within the company, consistent with how it is already described on the company’s own books, not an archival record reaching back decades." },
    { type: "h2", text: "What documents should a finance team expect to be asked for?" },
    { type: "p", text: "A first-time corporate seller should expect to be asked for 4 categories of document: proof that the company is who it says it is, proof that whoever signs is authorised to sell, a description of the material and its source, and the banking details the settlement will be paid to. In practice the request looks like this." },
    { type: "list", items: [
      "Corporate registration details: registered name, registered address, and country of incorporation, with a current registration certificate",
      "Board resolution, or equivalent written authorisation, naming who is permitted to sign the sale on the company’s behalf",
      "Identification for the authorised signatory or signatories",
      "A short written description of the material and how the company came to hold it",
      "Beneficial ownership information, where the corporate structure requires it",
      "Settlement banking details in the company’s own name"
    ] },
    { type: "h2", text: "Why does this protect the seller as much as the buyer?" },
    { type: "p", text: "This documentation protects the seller because it is the same file a CFO, controller, or insolvency practitioner will need to defend the transaction later, not just the file the buyer needs to satisfy its own regulator. A verbal agreement and a bank transfer leave a finance team with nothing to show an auditor, an internal audit committee, or a committee of creditors when the transaction is queried 18 months on. A signed purchase contract, a documented KYC file, and a settlement priced against LBMA spot and paid through a traceable banking channel is evidence a finance team can stand behind without having to reconstruct the reasoning after the fact. For a CFO, that file turns a disposal buried in the accounts into a transaction the board and the auditors can be walked through in 5 minutes. For an insolvency practitioner, the same file demonstrates to creditors that the asset was realised promptly, at a defensible price, and through a proper process, which is the standard the role is held to regardless of which buyer is chosen." },
    { type: "h2", text: "Does the KYC process slow the transaction down?" },
    { type: "p", text: "It does not have to, and at TVG it is structured specifically so that it does not. The compliance file and the commercial terms are built in parallel from the first conversation, rather than KYC sitting as a gate the seller has to clear before pricing even begins. A finance team is not asked to complete an approval process and then start negotiating, and it is not left waiting on compliance sign-off after a price has already been agreed. Both tracks run at the same time and converge at signature, which is the point at which price and paperwork both need to be settled in any case." },
    { type: "steps", items: [
      { title: "Initial assessment", body: "The material is reviewed from a description or photographs and priced indicatively against LBMA spot. In parallel, TVG opens the KYC file and requests standard corporate documentation, so neither step waits on the other." },
      { title: "Documentation and authorisation", body: "Corporate registration details, signatory authorisation, and the source description are gathered alongside contract negotiation rather than as a precondition to it. Most finance teams can assemble this from documents they already hold." },
      { title: "Contract", body: "The purchase contract is signed once price and KYC are both agreed, with the authorisation and source documents forming part of the file behind the signed agreement." },
      { title: "Settlement", body: "Payment follows collection and assay on the agreed terms, with the full documentation trail retained on both sides for as long as either party needs it." }
    ] },
    { type: "p", text: "None of this is unusual once a finance team has been through it once. The paperwork exists because a credible buyer cannot operate without it, and because it is the same record a company needs on its own file long after the metal has left the building and the price has been paid." }
  ],
  faq: [
    { q: "Does TVG need KYC documents before it will give an indicative price?", a: "No. TVG can give an indicative valuation against LBMA spot from a description of the material alone. KYC documentation is requested in parallel once both sides intend to proceed, not as a precondition to pricing." },
    { q: "What if the company cannot locate a board resolution for older inventory?", a: "A board resolution, or equivalent written authorisation confirming who may sign on the company’s behalf, is still required, but it can usually be produced for the current sale even where the original acquisition of the material was never separately documented. The authorisation covers the sale itself, not the material’s full history." },
    { q: "Is the process different for an insolvency practitioner than for an active company?", a: "The underlying requirement is the same: proof of authority to sell, corporate identification, and a description of the material’s source. For an insolvency practitioner, authority typically flows from the appointment itself rather than a board resolution, and TVG’s process is built to accept that directly." },
    { q: "Does TVG trace the metal back to a mine or original manufacturer?", a: "TVG establishes source of goods at the level of the seller: how the company came to hold the material and for how long. Deeper metallurgical and mine-level provenance is handled further down the chain by the LBMA-accredited refiner, consistent with LBMA Responsible Gold and Silver Guidance." },
    { q: "How much time does the KYC process typically add to a transaction?", a: "It should not add time on its own, because the KYC file is built in parallel with pricing and contract negotiation rather than in sequence before them. The pace of a transaction is normally set by how quickly the seller’s own documents and signatories become available, not by the KYC process itself." }
  ],
} satisfies InsightPost;
