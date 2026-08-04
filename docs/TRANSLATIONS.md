# Translations

The repo is maintained in English, with a few files translated: which those are,
why the set is deliberately small, and what to do if you want to add a language.
Part of the [Frontend Roadmap](../README.md).

## What is translated

| Language | Files | Source |
| --- | --- | --- |
| Uzbek (`uz`) | [README.uz.md](../README.uz.md), [ROADMAP.uz.md](../ROADMAP.uz.md) | [README.md](../README.md), [ROADMAP.md](../ROADMAP.md) |

Everything in `docs/` is English only, including this file.

## The policy: entry points only

**Only the two entry-point files get translated. Topic files do not.**

The entry points are the parts where language actually blocks comprehension. They
explain what to do, in what order, when to stop, and what to build — that is
argument and instruction, and a reader who cannot follow it is stuck before they
start.

The topic files are different. They are lists of English resource names with a
one-line description each, and every link on them leads to English material. A
reader who cannot read `— Game for learning CSS flexbox.` cannot read Flexbox
Froggy either, so translating that line buys nothing and costs a permanent second
copy to maintain.

The rule this produces is worth stating plainly, because it is the whole reason
the translation is sustainable: **a normal contribution — adding a link to a topic
file — never touches a translated file.** Only edits to the roadmap's structure or
argument do, and those are rare.

## English is the source of truth

Translations follow English; English never waits for a translation.

- Change English first, then update the translations. A pull request that changes
  only `README.md` is fine and is not blocked on anyone.
- If a translation falls behind, that is a bug in the translation, not in the
  English file. Open an issue rather than reverting the English change.
- Never fix a factual error only in a translation. Fix `README.md` or `ROADMAP.md`,
  then carry it across.

Translated files keep the same headings, ordering, and Markdown structure as their
source. That is not cosmetic — it is what lets you diff the two side by side and
see what a translation is missing.

There are two intentional exceptions, both present in the Uzbek files:

1. A language-switcher line near the top of every file that has a translation,
   English and translated alike: `[English](README.md) · [O'zbekcha](README.uz.md)`.
2. A one-line note in the translated file saying the topic files are in English.

## Link conventions

- **Topic-file links stay relative and point at the English file.** In
  `README.uz.md`, `docs/CSS.md` stays `docs/CSS.md`. There is no `docs/CSS.uz.md`
  to point at.
- **Anchors on English files are never translated.** `docs/HTML.md#reference` keeps
  `#reference`, because that anchor is generated from the English heading.
- **Entry points cross-link within their own language.** `README.uz.md` links to
  `ROADMAP.uz.md`, not `ROADMAP.md`. Anchors into a translated file must match that
  file's own translated headings — `README.uz.md#mundarija`, not `#contents`.
- **Repo-meta files stay English.** `CONTRIBUTING.md`, `docs/STYLE.md`,
  `CODE_OF_CONDUCT.md`, and `LICENSE` are linked as-is from translations. Say so in
  the surrounding sentence so the reader is not surprised.

CI checks every relative link in every `*.md` file, translations included — see
`.github/workflows/link-check.yml`. It does not check anchor fragments, so verify
those by hand.

## Translation conventions

- **Translate meaning, not words.** These files have a voice and make arguments.
  Reading naturally in the target language beats matching the English sentence
  shape.
- **Keep technical terms in the form developers in that language actually use.**
  The Uzbek files keep `framework`, `bundler`, `deploy`, `commit`, `pull request`,
  `layout`, `state`, and similar in English, because that is what Uzbek developers
  say. Do not invent calques nobody uses. Where a term does have a settled native
  form, use it.
- **Do not translate** file names, code, code spans, URLs, product names, badge
  alt text, or GitHub alert markers (`> [!TIP]`, `> [!WARNING]`, `> [!NOTE]` — the
  marker is syntax; the text after it is not).
- **Uzbek specifically:** Latin script, and the apostrophe in `o'` / `g'` is the
  plain ASCII `'` (U+0027) throughout — matching `O'zbekcha` in the switcher.
  Mixing `'` and `ʻ` breaks text search across the file, so pick the one and keep
  it.

## Adding a language

1. Open an issue first. A translation is a standing commitment, not a one-off pull
   request — say who will keep it current.
2. Copy `README.md` to `README.<code>.md` and `ROADMAP.md` to
   `ROADMAP.<code>.md`, using the ISO 639-1 code. Translate in place so the
   structure survives.
3. Add the language-switcher line to the new files **and** to `README.md` and
   `ROADMAP.md`, so it is reachable from both directions. Separator is ` · `.
4. Add the one-line note that the topic files are in English.
5. Add a row to the table at the top of this file.
6. Check every relative link resolves and that anchors into your own translated
   files match your translated headings.

Do not translate `docs/*.md` topic files. If that ever becomes worth doing, it is a
separate decision that changes the maintenance cost of every future pull request —
open an issue and make the case.
