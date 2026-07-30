# Contributing

Thanks for helping keep this roadmap useful. This is a curated list, not an
exhaustive one — every entry should be something you would genuinely recommend
to someone learning frontend.

## What belongs here

- **Free or freemium** — the core value must be usable without paying.
- **Actively maintained** — the site works, the content is not years out of date.
- **In English**, or clearly labeled otherwise. Follow the existing convention
  and suffix the title, e.g. `[Flexbox Guide EN](...)`.
- **Focused** — one tool, tutorial, reference, game, or cheatsheet per entry.

## What does not

- Paid-only courses, or content behind a paywall after a teaser.
- Link-farm and SEO blogs that just aggregate other people's articles.
- Unmaintained tools, dead projects, sites with expired certificates.
- Anything that requires signup, login, or an email address to view.
- Duplicates of a resource already listed under another name.

## Entry format

Every entry is a single-line list item, exactly:

```markdown
- [Title](https://example.com/) - lowercase description of what it is;
```

Real examples from [docs/CSS.md](docs/CSS.md):

```markdown
- [CSS Reference #1](https://cssreference.io/) - list of all CSS properties;
- [Flexbox Froggy](https://flexboxfroggy.com/) - game for learning CSS flexbox;
- [Clippy](https://bennettfeely.com/clippy/) - CSS clip-path maker;
```

The rules, precisely:

1. The line starts with `- ` (hyphen, one space).
2. The title is in Title Case, inside `[...]`. If two resources share a name,
   disambiguate with ` #1`, ` #2` — see `CSS Reference #1` above.
3. The URL goes in `(...)`, `https://` where the site supports it, and no
   tracking or referral parameters.
4. The title and the description are separated by ` - ` — a space, a single
   hyphen, a space. Not an en dash, not a colon.
5. The description is short, lowercase (except proper nouns like `CSS`,
   `JavaScript`, `D3`), and describes what the resource *is* — not why you like
   it. No trailing period.
6. **The line ends with a semicolon `;`.** Every entry, including the last one
   in a section.

## Where to add it

- Pick the file that matches the topic: `docs/HTML.md`, `docs/CSS.md`,
  `docs/JAVASCRIPT.md`, `docs/REACTJS.md`, `docs/TYPESCRIPT.md`,
  `docs/DESIGN.md`, `docs/UI-FRAMEWORKS.md`, `docs/GIT.md`, `docs/YOUTUBE.md`.
- Pick the section inside it: `## Main` for references and documentation,
  `## Cheatsheet`, `## Examples` for interactive or hands-on material,
  `## Services` for tools and generators, `## Github repositories`.
- **Append to the end of the section.** The lists are not alphabetical, and
  reordering them makes diffs unreadable.

## Proposing a new section or file

Open an issue first so we can agree on the shape before you write it. A new
`## Section` inside an existing file needs three or more entries to be worth
having — otherwise put them in the closest existing section. A whole new
`docs/*.md` file also needs a link added to the Contents list in `README.md`,
under the group it belongs to (Main, Design, Tools, or Additional).

## Reporting a dead link

Open a [broken link issue](https://github.com/shuhrat-kobulov/frontend-roadmap/issues/new?template=broken-link.yml). Include
the file, the URL, and what you see when you visit it — a 404, a parked domain,
and a paywall each get handled differently. A suggested replacement is welcome
but not required. Please don't open a PR that only deletes a link without
saying what happened to it.

## Pull request checklist

- [ ] I opened the link in a fresh browser session and it loads.
- [ ] It is free to use and needs no signup.
- [ ] The line matches the format above, semicolon included.
- [ ] One resource per line, appended to the end of the right section.
- [ ] I searched the repo and this resource is not already listed.
- [ ] I did not reorder or reformat any unrelated lines.

Small PRs get merged fast. A PR that adds one good link is better than a PR
that adds ten unsorted ones.

By contributing you agree that your contribution is licensed under
[CC BY 4.0](LICENSE), and that you will follow the
[Code of Conduct](CODE_OF_CONDUCT.md).
