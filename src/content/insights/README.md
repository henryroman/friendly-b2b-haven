# Blog posts

One file = one post. Each file in this folder default-exports an `InsightPost` (the type is
in `../types.ts`). The site auto-collects every file here (via `src/content/insights.ts`)
and builds `/insights/{slug}` for any post that has a `body`; posts without a `body` show up
only as an unlinked teaser card on `/insights`, same as before this system existed.

**To publish a new post:** copy `_template.ts`, fill it in, save it under a new filename.
That's the whole operation — no other file needs editing. `_template.ts` itself is never
collected (it has no `default` export) and is safe to leave in place as a reference.

**Do not** add posts to a shared array or edit another post's file to add yours — the
one-file-per-post structure exists specifically so two posts being written at once (a
person and the content agent, or two content-agent runs) never touch the same file. See
`Agentic-Building-Guidelines.md` Section 3.2 in the vault for why that matters here.

After adding or editing a post, run `bun run sitemap` (or `bun run build`, which runs it
automatically first) to regenerate `public/sitemap.xml` so the new URL is included.
