import type { ContentBlock, FaqItem } from "@/content/types";
import { Overline } from "./Section";

/**
 * Renders a post's `body` blocks using the exact same classes guides/corporate-liquidation.tsx
 * already established by hand, so every future post matches it visually without anyone having
 * to remember or copy the styling. Add a case here if a new ContentBlock type is ever added
 * to src/content/types.ts.
 */
export function ArticleBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-muted-foreground mt-4 text-[17px] leading-[1.7] md:text-[18px]">
                {block.text}
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="font-display mt-12 text-[28px] sm:text-[32px] md:text-[36px]"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3 key={i} id={block.id} className="font-display mt-8 text-[20px] md:text-[22px]">
                {block.text}
              </h3>
            );

          case "list":
            return (
              <ul key={i} className="mt-4 space-y-3 text-[17px] leading-[1.7] text-muted-foreground md:text-[18px]">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );

          case "steps":
            return (
              <ol key={i} className="mt-6 space-y-6">
                {block.items.map((s, j) => (
                  <li key={j} className="flex gap-5 border-l-2 border-[var(--accent)] pl-5">
                    <div className="font-display text-[26px] font-bold leading-none text-[var(--accent)]">
                      {String(j + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-display text-[20px] md:text-[22px]">{s.title}</h3>
                      <p className="text-muted-foreground mt-2 text-[16px] leading-[1.65] md:text-[17px]">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            );

          case "callout":
            // The brand kit's own documented gold wash (rgba(196,154,92,0.14) = --accent-quiet)
            // used exactly the way it's specified: sparing, not a large fill.
            return (
              <div
                key={i}
                className="mt-6 border-l-2 border-[var(--accent)] bg-[var(--accent-quiet)] px-5 py-4 md:px-6 md:py-5"
              >
                <p className="font-display text-[12px] uppercase text-[var(--text-muted)]" style={{ letterSpacing: "var(--tracking-overline)" }}>
                  {block.label}
                </p>
                <p className="mt-2 text-[16px] leading-[1.6] text-[var(--text-body)] md:text-[17px]">{block.text}</p>
              </div>
            );

          case "quote":
            return (
              <blockquote key={i} className="mt-6 border-l-2 border-[var(--line-strong)] pl-5">
                <p className="font-display text-[19px] leading-[1.5] text-[var(--text-strong)] md:text-[21px]">
                  “{block.text}”
                </p>
                {block.attribution && (
                  <cite className="text-muted-foreground mt-2 block text-[14px] not-italic">
                    {block.attribution}
                  </cite>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

/** Real, visible FAQ markup — H3 question + paragraph answer. Also feeds FAQPage JSON-LD
 * (see src/lib/article-seo.ts) but the visible version is the part that actually matters for
 * AEO in 2026 (see the build log). */
export function ArticleFaq({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="mt-12">
      <h2 className="font-display text-[28px] sm:text-[32px] md:text-[36px]">FAQ</h2>
      <div className="mt-6 space-y-6">
        {items.map((f, i) => (
          <div key={i}>
            <h3 className="font-display text-[20px] md:text-[22px]">{f.q}</h3>
            <p className="text-muted-foreground mt-2 text-[17px] leading-[1.65] md:text-[18px]">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export interface TocEntry {
  id: string;
  label: string;
}

/** Auto-builds a table of contents from every h2 block that has an id. Posts don't need a
 * hand-maintained toc array the way the original guide page does. */
export function tocFromBlocks(blocks: ContentBlock[]): TocEntry[] {
  return blocks
    .filter((b): b is Extract<ContentBlock, { type: "h2" }> => b.type === "h2" && Boolean(b.id))
    .map((b) => ({ id: b.id as string, label: b.text }));
}

export function ArticleToc({ entries }: { entries: TocEntry[] }) {
  if (!entries.length) return null;
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <Overline>On this page</Overline>
      <nav className="mt-4 flex flex-col gap-2">
        {entries.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="text-[15px] text-[var(--text-strong)] hover:text-[var(--accent-press)]">
            {t.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
