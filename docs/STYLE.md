# Style Guide

The single source of truth for how files and entries in this roadmap are written.
Part of the [Frontend Roadmap](../README.md).

Everything below is enforced by review, and partly by
[markdownlint](../.markdownlint-cli2.jsonc). If a rule here and a rule there
disagree, this file wins and the lint config is the thing that needs fixing.

## Entry format

Every resource is a single list item, on a single line, in exactly this shape:

```markdown
- [Name](https://example.com/) — Description of what it is. [tag] [tag]
```

Real examples:

```markdown
- [Flexbox Froggy](https://flexboxfroggy.com/) — Game for learning CSS flexbox.
- [Figma](https://www.figma.com/) — Cloud-based design tool. [freemium]
- [Learn JS](https://learn.javascript.ru/) — Modern JavaScript tutorial. [ru]
```

The rules, precisely:

1. The line starts with `- ` — one hyphen, one space. Never `-   `.
2. The name goes in `[...]`. Use the resource's own name, styled the way it
   styles itself (`pattern.css`, `unDraw`, `GRAF1X`); otherwise Title Case. If
   two resources share a name, disambiguate with ` #1`, ` #2`.
3. The URL goes in `(...)`, with `https://` where the site supports it, and no
   tracking or referral parameters.
4. The name and the description are separated by ` — ` — a space, an **em dash**,
   a space. Not a hyphen, not an en dash, not a colon.
5. The description is one short line. It **starts with a capital letter** and
   **ends with a full stop**. No trailing semicolon. It says what the resource
   *is*, not why you like it. A description may of course open with a numeral
   (`81 best free fonts…`), a quotation mark, or a literal lowercase identifier
   (`tsconfig.json options…`) — the rule is that it must not open with an
   ordinary lowercase word.
6. Tags, if any, come last, after the full stop, separated by spaces.
7. Do not encode the language in the name (no `Flexbox Guide EN`) — that is what
   the language tag is for.

## Tags

A closed vocabulary. Nothing outside this list, and no per-file variants.

### Cost

| Tag | Meaning |
| --- | --- |
| `[free]` | Free to use in full. **The default — never written.** |
| `[freemium]` | A genuinely usable free tier, with more behind payment. |
| `[paid]` | Payment required. A time-limited trial does not make it free. |

`[free]` is the default because this is a list of free resources: an untagged
entry is free. Only `[freemium]` and `[paid]` ever appear, and they appear
precisely so the exceptions are visible.

### Level

`[beginner]`, `[intermediate]`, `[advanced]`.

Optional, and only where the resource states or obviously fixes its own
audience. **Omit rather than guess.** Most of this list is general-purpose
references and tools that have no single level, so most entries carry no level
tag; that is correct, not an omission to be filled in.

### Language

`[ru]` for Russian, `[uz]` for Uzbek.

Only for resources that are *not* in English. English is the default and is
never tagged. Do not put the language in the entry name.

### Combining tags

Cost, then level, then language:

```markdown
- [Name](https://example.com/) — Description. [freemium] [beginner] [ru]
```

## Sections

Top-level sections come from this fixed set, and appear in this order wherever
they are present:

1. `## Learn` — tutorials, courses, books, and videos: material you work
   through from start to finish.
2. `## Reference` — documentation, references, cheatsheets, and galleries:
   material you look things up in.
3. `## Practice` — games, exercises, and examples or templates you build from.
4. `## Tools` — generators, converters, validators, libraries, and editors:
   things you use while building.
5. `## Deep dives` — focused long-form material on a single topic.

A file uses only the sections it needs. A section is chosen by the dominant kind
of resource it holds, and an entry that would arguably fit a different section
stays where it is rather than being moved — see [Ordering](#ordering).

`README.md` and this file are not resource lists, so the vocabulary above does
not apply to them. The README is the entry point: it keeps its four navigation
groups (`## Core`, `## Design`, `## Tools`, `## Additional`), which group *files*
rather than resources, and its entries are bare links with no description.

### Old section names

The list used ad-hoc section names for its first five years. They map like this:

| Was | Now |
| --- | --- |
| `Main` | `Learn` or `Reference`, whichever matches the content |
| `Cheatsheet` | `Reference` |
| `Design systems` | `Reference` |
| `Examples` | `Practice` |
| `Services` | `Tools` |
| `Github repositories` | `Tools` |
| `IDE` | `Tools` (as `### Editors`) |
| `Node & NPM`, `Charts`, `JWT` | `Tools` (as `###` subgroups) |
| `Colors & Gradients`, `Fonts`, `Icons`, `Images & Illustrations`, `Figma templates` | `Tools` (as `###` subgroups) |
| `Misc` | `Deep dives` |
| `Most important topics` | `Learn` |
| `Recomended topics` | `Deep dives` |

## Headings

- One `# Title` per file, in Title Case, naming the topic.
- `## ` for the sections listed above, and nothing else.
- `### ` **only** to break a long `## ` section — roughly a dozen entries or
  more — into groups that are already obvious in the content, named with a plain
  descriptive noun (`### Icons`, `### Charts`). A long but homogeneous section
  stays flat. Never `####`.

## File preamble

Every file in `docs/` opens like this — heading, one sentence on what it covers,
and a back-link:

```markdown
# Topic

One sentence saying what this file is for.
Part of the [Frontend Roadmap](../README.md).
```

## Ordering

Entries inside a section are in curation order, not alphabetical order. **Append
new entries to the end of their section.** Do not reorder, re-file, or reformat
existing entries as part of a change that is about something else — it turns a
one-line diff into an unreviewable one.
