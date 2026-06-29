import type { ReactNode } from "react";

export function Section({
  id,
  dark = false,
  tight = false,
  children,
  className = "",
}: {
  id?: string;
  dark?: boolean;
  tight?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${dark ? "bg-ink text-inverse" : ""} ${tight ? "py-12 md:py-16" : "py-16 md:py-24"} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">{children}</div>
    </section>
  );
}

export function RuleGold({ dark = false }: { dark?: boolean }) {
  return <hr className={`mb-6 h-[2px] w-14 border-0 ${dark ? "bg-[var(--accent)]" : "bg-[var(--accent)]"}`} />;
}

export function Overline({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className="font-display m-0 text-[12px] uppercase"
      style={{
        letterSpacing: "var(--tracking-overline)",
        color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)",
      }}
    >
      {children}
    </p>
  );
}

export function Btn({
  href,
  variant = "primary",
  children,
  dark = false,
  type,
  className = "",
}: {
  href?: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  dark?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  const base =
    "font-display inline-flex items-center justify-center gap-2 rounded-sm border px-6 py-3 text-[14px] font-semibold tracking-[0.06em] uppercase transition-colors md:text-[15px]";
  const styles =
    variant === "primary"
      ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--text-on-gold)] hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)]"
      : dark
        ? "bg-transparent border-[var(--line-on-dark)] text-[var(--text-inverse)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        : "bg-transparent border-[var(--line-strong)] text-[var(--text-strong)] hover:border-[var(--accent)] hover:text-[var(--accent-press)]";
  if (href) return <a href={href} className={`${base} ${styles} ${className}`}>{children}</a>;
  return (
    <button type={type ?? "button"} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

export function Chip({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`tvg-chip ${dark ? "tvg-chip-dark" : ""}`}>
      <span className="tvg-dot" />
      {children}
    </span>
  );
}
