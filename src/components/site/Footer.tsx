import logo from "@/assets/tvg-primary.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-ink text-inverse pt-16 pb-8">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <img src={logo.url} alt="Tess Van Ghert" className="mb-5 h-12 w-auto brightness-0 invert" />
            <p className="text-inverse-muted max-w-[34ch] text-[15px] leading-[1.6]">
              A family-owned physical precious metals trading house. Compliant acquisition and global settlement since 2011.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["London", "Americas", "Paris"].map((c) => (
                <span key={c} className="tvg-chip tvg-chip-dark text-[13px]">
                  <span className="tvg-dot" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-inverse mb-4 text-[16px]">Offices</h4>
            {[
              { city: "London", lines: ["19 Gunter Grove", "London SW10 0UN"] },
              { city: "Paris", lines: ["76 Rue de Monceau", "75008 Paris"] },
              { city: "Americas", lines: ["7901 4th St N, STE 300", "St. Petersburg, FL 33702"] },
            ].map((o) => (
              <p key={o.city} className="text-inverse-muted mb-4 text-[15px] leading-[1.6]">
                <strong className="font-display text-inverse block font-semibold tracking-[0.02em]">{o.city}</strong>
                {o.lines.map((l, i) => (
                  <span key={i}>
                    {l}
                    <br />
                  </span>
                ))}
              </p>
            ))}
          </div>

          <div>
            <h4 className="text-inverse mb-4 text-[16px]">Company</h4>
            <FooterLink href="/#what-we-buy">What we buy</FooterLink>
            <FooterLink href="/#how-it-works">How it works</FooterLink>
            <FooterLink href="/#enquire">Make an enquiry</FooterLink>
            <FooterLink href="/insights">Insights</FooterLink>
            <span className="text-inverse-muted block py-1 text-[15px]">
              Client Portal <em className="not-italic opacity-70">(soon)</em>
            </span>
          </div>

          <div>
            <h4 className="text-inverse mb-4 text-[16px]">Compliance</h4>
            <FooterLink href="/compliance">Compliance approach</FooterLink>
            <FooterLink href="/aml-policy">AML policy</FooterLink>
            <FooterLink href="/#enquire">Source-of-goods enquiries</FooterLink>
            <FooterLink href="mailto:info@tessvanghert.com">info@tessvanghert.com</FooterLink>
          </div>
        </div>

        <p className="text-inverse-muted mt-6 max-w-[70ch] text-[12.5px] leading-[1.7]">
          Tess Van Ghert is a physical precious metals trading business. Indicative valuations are based on prevailing LBMA benchmark prices and are not an offer or contract. We acquire metal only with documented proof of ownership and source, subject to KYC, sanctions screening and anti-money-laundering checks. Company registration 7728424. VAT 118444126.
        </p>

        <div className="text-inverse-muted mt-12 flex flex-wrap justify-between gap-4 border-t border-[var(--line-on-dark)] pt-6 text-[13px]">
          <span>© 2011–2026 Tess Van Ghert. All rights reserved.</span>
          <span>London · Americas · Paris</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-inverse-muted block py-1 text-[15px] transition-colors hover:text-[var(--accent)]"
    >
      {children}
    </a>
  );
}
