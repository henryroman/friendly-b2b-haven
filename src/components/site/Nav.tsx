import { Link } from "@tanstack/react-router";
import { useState } from "react";
import iconmark from "@/assets/iconMarkReversed.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/compliance", label: "Compliance" },
  { to: "/aml-policy", label: "AML Policy" },
  { to: "/insights", label: "Insights" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--line-hairline)] backdrop-blur-md"
      style={{ background: "rgba(240,237,232,0.92)" }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 md:px-8 md:py-4">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)} aria-label="Tess Van Ghert — Home">
          <img src={iconmark} className="h-10 w-auto md:h-12" />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "text-[var(--accent-press)]" }}
                  className="font-display whitespace-nowrap text-[16px] tracking-[0.02em] text-[var(--text-body)] transition-colors hover:text-[var(--accent-press)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            to="/"
            hash="enquire"
            className="font-display hidden items-center justify-center rounded-sm border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold tracking-[0.06em] uppercase text-[var(--text-on-gold)] transition-colors hover:bg-[var(--accent-hover)] sm:inline-flex"
          >
            Make an enquiry
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="font-display text-2xl leading-none text-[var(--text-strong)] lg:hidden"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--line-hairline)] bg-[var(--surface-page)] lg:hidden">
          <ul className="mx-auto flex max-w-[1200px] flex-col px-5 py-2">
            {links.map((l) => (
              <li key={l.label} className="border-b border-[var(--line-hairline)] last:border-b-0">
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display block py-3 text-[17px] tracking-[0.02em] text-[var(--text-body)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-3">
              <Link
                to="/"
                hash="enquire"
                onClick={() => setOpen(false)}
                className="font-display inline-flex w-full items-center justify-center rounded-sm border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-[14px] font-semibold tracking-[0.06em] uppercase text-[var(--text-on-gold)] sm:hidden"
              >
                Make an enquiry
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
