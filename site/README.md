# site

The [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/)
build that publishes this repository to
<https://shuhrat-kobulov.github.io/frontend-roadmap/>.

**If you are here to add or fix a resource, you are in the wrong directory.**
Edit the Markdown in `docs/`, `README.md` or `ROADMAP.md` and the site updates
itself — see [CONTRIBUTING.md](../CONTRIBUTING.md).

## How it reads the Markdown

There is no copy of any document under `site/`. `src/lib/repo.mjs` lists every
page and the file it comes from, and `src/lib/repo-markdown-loader.mjs` reads
those files where they already live. Delete this directory and the repository is
still complete.

Because the files are plain GitHub-readable Markdown with no frontmatter, the
loader derives each page's title from its `#` heading and its description from
the paragraph underneath.

| File | What it does |
| --- | --- |
| `src/lib/repo.mjs` | The page list, the sidebar, and the GitHub URLs. **Adding a `docs/*.md` file to the site means adding one line here.** |
| `src/lib/repo-markdown-loader.mjs` | Reads the Markdown files and hands them to Astro. |
| `src/lib/rehype-repo-links.mjs` | Rewrites links like `docs/CSS.md` to site URLs, so the same link works on GitHub and here. |
| `src/lib/mermaid.mjs` | Renders the ROADMAP diagram to SVG at build time, once per colour scheme. |

## Commands

```sh
npm install     # also downloads a headless browser, used to render the diagram
npm run dev     # local server, picks up edits to ../docs/*.md
npm run build   # writes dist/
npm run preview # serves dist/
```

## Notes

- Pages ship ~6 kB of JavaScript. The search index (Pagefind) loads only when
  someone opens search, and the site is fully readable with JavaScript off.
- `site` and `base` in `astro.config.mjs` are set for a project page served from
  `/frontend-roadmap/`. Both come from `src/lib/repo.mjs`.
- Dependency versions are pinned exactly — a docs site that breaks on a
  background dependency bump is worse than one that is a version behind.
