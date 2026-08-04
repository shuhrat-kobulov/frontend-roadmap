# Contributing

Thanks for helping keep this roadmap useful. This is a curated list, not an
exhaustive one — every entry should be something you would genuinely recommend
to someone learning frontend.

## What belongs here

- **Free or freemium** — the core value must be usable without paying.
- **Actively maintained** — the site works, the content is not years out of date.
- **In English**, or clearly labeled otherwise with a language tag, e.g.
  `- [Learn JS](https://learn.javascript.ru/) — Modern JavaScript tutorial. [ru]`.
- **Focused** — one tool, tutorial, reference, game, or cheatsheet per entry.

## What does not

- Paid-only courses, or content behind a paywall after a teaser.
- Link-farm and SEO blogs that just aggregate other people's articles.
- Unmaintained tools, dead projects, sites with expired certificates.
- Anything that requires signup, login, or an email address to view.
- Duplicates of a resource already listed under another name.

## Entry format

The format is defined in one place — [docs/STYLE.md](docs/STYLE.md). Read it
before you open a PR. Every entry is a single-line list item:

```markdown
- [Title](https://example.com/) — Description of what it is.
```

Real examples from [docs/CSS.md](docs/CSS.md):

```markdown
- [CSS Reference #1](https://cssreference.io/) — List of all CSS properties.
- [Flexbox Froggy](https://flexboxfroggy.com/) — Game for learning CSS flexbox.
- [Clippy](https://bennettfeely.com/clippy/) — CSS clip-path maker.
```

The three things people get wrong most often:

1. The separator is ` — `, an **em dash** with a space either side. Not a
   hyphen, not an en dash, not a colon.
2. The description **starts with a capital letter and ends with a full stop**.
   Entries used to end with a semicolon; they no longer do.
3. Tags come after the full stop, and only from the closed vocabulary in the
   style guide: `[freemium]` `[paid]`, `[beginner]` `[intermediate]`
   `[advanced]`, `[ru]` `[uz]`. Free and English are the defaults and are never
   tagged. If you are not sure a tag applies, leave it off.

## Where to add it

- Pick the file that matches the topic: `docs/HTML.md`, `docs/CSS.md`,
  `docs/JAVASCRIPT.md`, `docs/REACTJS.md`, `docs/TYPESCRIPT.md`,
  `docs/DESIGN.md`, `docs/UI-FRAMEWORKS.md`, `docs/GIT.md`, `docs/LEARNING.md`.
- Pick the section inside it. The section names are fixed: `## Learn` for
  tutorials, courses, and videos; `## Reference` for documentation, cheatsheets,
  and galleries; `## Practice` for games, exercises, and templates; `## Tools`
  for generators, converters, and libraries; `## Deep dives` for focused
  long-form reading.
- **Append to the end of the section.** The lists are not alphabetical, and
  reordering them makes diffs unreadable.

## Proposing a new section or file

Open an issue first so we can agree on the shape before you write it. The five
`## ` section names are fixed, so what you are usually proposing is a `### `
subgroup inside `## Tools` — and that needs three or more entries to be worth
having. Otherwise put them in the closest existing section. A whole new
`docs/*.md` file also needs a link added to the Contents list in `README.md`,
under the group it belongs to (Core, Design, Tools, or Additional).

## The website

The Markdown files are the source of truth. The site at
<https://shuhrat-kobulov.github.io/frontend-roadmap/> is generated from them by
the Astro project in `site/`, which reads `README.md`, `ROADMAP.md` and
`docs/*.md` where they are — there is no second copy of any file.

**You never need to touch `site/`.** Edit the Markdown, open your PR, and the
page updates itself when it merges. `site/` only changes if you are changing how
the site is built, and a new `docs/*.md` file needs one line adding to
`site/src/lib/repo.mjs` so it appears in the sidebar.

To preview the site locally: `cd site && npm install && npm run dev`.

## Reporting a dead link

Open a [broken link issue](https://github.com/shuhrat-kobulov/frontend-roadmap/issues/new?template=broken-link.yml). Include
the file, the URL, and what you see when you visit it — a 404, a parked domain,
and a paywall each get handled differently. A suggested replacement is welcome
but not required. Please don't open a PR that only deletes a link without
saying what happened to it.

## Pull request checklist

- [ ] I opened the link in a fresh browser session and it loads.
- [ ] It is free to use and needs no signup.
- [ ] The line matches [docs/STYLE.md](docs/STYLE.md): em dash, capitalized
      description, full stop, tags only from the fixed vocabulary.
- [ ] One resource per line, appended to the end of the right section.
- [ ] I searched the repo and this resource is not already listed.
- [ ] I did not reorder or reformat any unrelated lines.

Small PRs get merged fast. A PR that adds one good link is better than a PR
that adds ten unsorted ones.

By contributing you agree that your contribution is licensed under
[CC BY 4.0](LICENSE), and that you will follow the
[Code of Conduct](CODE_OF_CONDUCT.md).
