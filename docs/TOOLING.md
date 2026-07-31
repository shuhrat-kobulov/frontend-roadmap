# Tooling

Everything around the code: what installs your dependencies, what builds them,
what checks them, and what you run it all on.
Part of the [Frontend Roadmap](../README.md).
See also [Git](GIT.md) for hooks, Dependabot, and monorepo background, and
[TypeScript](TYPESCRIPT.md) for the compiler options the type-checking section assumes.

The short answer, if you only want one: **pnpm** to install, **Vite** to build,
**ESLint** and **Prettier** to check and format, **tsc** in CI, and the current
**Node LTS** underneath. A scaffolder writes most of that for you, and it stays
right for years. Everything else below is for when a real problem sends you
looking further — configuring a build you do not yet have a problem with is the
most reliable way to lose a week.

Tooling ages faster than anything else in this list. Entries that are here
because you will meet them in an existing codebase, rather than because you would
pick them today, say so in the description.

## Tools

### Package managers

All four install the same packages from the same registry, and differ in speed,
disk use, and how strictly they treat a dependency you use but never declared.
**pnpm** is the default here: fast, one copy of a package per machine, and an
error rather than a silent success when you import something that is only in the
tree because something else pulled it in. Use npm when a project or a CI image is
easier left alone, Yarn when you inherit a repo already on it, and Bun when
install speed matters more than ecosystem edge cases. Whichever you pick: commit
the lockfile, and have CI install from it rather than re-resolving every build.

- [pnpm](https://pnpm.io/) — Fast, disk-efficient package manager with a strict `node_modules` layout. The default recommendation here.
- [npm](https://www.npmjs.com/) — Default package registry and package manager for Node.
- [Yarn](https://yarnpkg.com/) — Package manager with Plug'n'Play installs and its own workspace tooling; keep it where a project already uses it.
- [Bun Package Manager](https://bun.com/package-manager) — `bun install`, the fastest of the four, usable even in a project that otherwise runs on Node.
- [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) — Every field the manifest accepts, from `scripts` and `dependencies` to `exports`.
- [package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json) — What a lockfile actually records, and why it belongs in the repository.
- [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci) — Installs strictly from the lockfile, which is what CI should run instead of `npm install`.
- [Corepack](https://github.com/nodejs/corepack) — Pins the package manager version per project; shipped inside Node up to 25, installed separately after that.

### Build tools and bundlers

Three layers get called "the build tool", and mixing them up is why this category
looks confusing. A **transformer** (esbuild, SWC, Babel) turns one file into one
file — TypeScript and JSX out, plain JavaScript in. A **bundler** (Rollup,
Rolldown, webpack) follows the import graph and produces the chunks the browser
downloads. A **dev server and toolkit** (Vite) wires those together with hot
reloading, environment variables, and sensible defaults. **Vite is the default
choice**, and most people never touch the layers underneath it.

- [Vite](https://vite.dev/) — Dev server and build tool, and the right starting point for a new frontend project.
- [Rollup](https://rollupjs.org/) — Bundler behind Vite's production build, and the long-standing default for shipping a library.
- [esbuild](https://esbuild.github.io/) — Go-based transformer and bundler, fast enough that it is usually running inside another tool rather than being called by you.
- [Rolldown](https://rolldown.rs/) — Rust rewrite of Rollup that Vite is moving to, so dev and build finally use one bundler.
- [SWC](https://swc.rs/) — Rust transformer that replaces Babel for transpiling and minifying; what Next.js uses by default.
- [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) — Vercel's Rust bundler, reached through Next.js rather than adopted on its own.
- [tsdown](https://tsdown.dev/) — Rolldown-based library bundler: TypeScript in, ESM plus type declarations out, with little configuration.
- [Rspack](https://rspack.rs/) — Rust bundler that reads webpack's config format, for moving a large webpack build off it incrementally.
- [Babel](https://babeljs.io/) — JavaScript compiler. Still the tool for custom syntax plugins, but a new app gets its transpiling from Vite, esbuild, or SWC.
- [Webpack](https://webpack.js.org/) — Module bundler you will meet in existing codebases; new projects normally start on Vite.
- [Gulp](https://gulpjs.com/) — Task runner from the pre-bundler era, kept here because older projects still use it.
- [Bower](https://bower.io/) — Package manager for the web, deprecated since 2017 and superseded by npm.

### Linting and formatting

A linter catches bugs and enforces rules; a formatter settles whitespace and
never has an opinion worth arguing about. Run both, and let the formatter own
formatting so the linter never reports it. **ESLint plus Prettier is the
default** — the widest rule ecosystem, and what every framework's starter
generates. **Biome** is the alternative worth taking seriously: one Rust binary
doing both jobs, far faster, at the cost of a smaller plugin ecosystem. Two rule
sets sit in neighbouring files: [typescript-eslint](TYPESCRIPT.md#tools) for
type-aware rules, and
[eslint-plugin-react-hooks](REACTJS.md#hooks) for the rules of hooks.

- [ESLint](https://eslint.org/) — Find and fix problems in your JavaScript code.
- [ESLint Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files) — Flat config in `eslint.config.js`, which is the current format; an `.eslintrc` file is the legacy one.
- [Prettier](https://prettier.io/) — Opinionated formatter that reprints your code from its syntax tree, ending every formatting argument.
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) — Switches off the ESLint rules that fight the formatter; the one config every ESLint plus Prettier setup needs.
- [Biome](https://biomejs.dev/) — Linter and formatter in a single Rust binary, as a faster replacement for both ESLint and Prettier.
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) — Rust linter built for speed, designed to run alongside ESLint rather than replace it outright.
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) — Catches the accessibility mistakes visible in JSX, such as a missing `alt` or a click handler on a `div`.
- [Stylelint](https://stylelint.io/) — The equivalent linter for CSS, including invalid values and duplicate properties.

### Type checking

Vite, esbuild, and SWC strip types without checking them, which is what makes
them fast — so nothing in your build fails on a type error unless you make it.
Run `tsc --noEmit` in CI and in a pre-push hook, and keep type errors visible
while you work rather than discovering them at review time.

- [TypeScript](https://www.typescriptlang.org/) — The compiler and language site; `tsc` is the only thing that actually checks your types.
- [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) — Every `tsc` flag, including `--noEmit` for checking without producing output.
- [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) — Runs `tsc` and ESLint in a worker and reports failures in the dev overlay.
- [typescript-go](https://github.com/microsoft/typescript-go) — The native Go port of the compiler that becomes TypeScript 7; preview it now, adopt it when your editor ships it.

### Monorepos

One repository holding several packages, so a change that spans them lands as one
commit. **You probably do not need one.** A monorepo pays for itself when several
deployable things share code and change together; below that, it buys you cache
configuration, task graphs, and a slower CI in exchange for nothing. When you do
need one, start with your package manager's own workspaces and add a task runner
only once builds get slow enough to notice. [monorepo.tools](GIT.md#advanced)
covers the concepts.

- [pnpm Workspaces](https://pnpm.io/workspaces) — Several packages in one repository, linked locally and installed once. Start here.
- [npm Workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces) — The same idea in npm, for a project staying on the bundled tooling.
- [Turborepo](https://turborepo.dev/) — Task runner that caches build output and skips work whose inputs have not changed.
- [Nx](https://nx.dev/) — Heavier monorepo toolkit with generators, a project graph, and affected-only task runs.
- [Changesets](https://github.com/changesets/changesets) — Versioning and changelogs for a multi-package repo, driven by a note written in the pull request.

### Dependency health

Every dependency is code you ship and code you inherit. Before installing one,
check three things: how much it weighs, whether anyone still maintains it, and
what it pulls in behind it. Automate the boring half — let a bot open the upgrade
PRs, and see [Dependabot](GIT.md#github) for the GitHub-native option.

- [Bundlephobia](https://bundlephobia.com/) — Find the cost of adding an npm package to your bundle.
- [npm trends](https://npmtrends.com/) — Download counts side by side, which is the quickest read on whether a package is still alive.
- [npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit) — Known vulnerabilities in your tree, and the honest limits of what the report means.
- [Socket](https://socket.dev/) — Supply-chain review of what a package actually does: install scripts, network access, filesystem writes. [freemium]
- [OpenSSF Scorecard](https://scorecard.dev/) — Scores a repository on maintenance signals such as review, releases, and dependency updates.
- [Renovate](https://docs.renovatebot.com/) — Automated dependency update PRs, with grouping and auto-merge rules you control.
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates) — Upgrades the version ranges in package.json, for the manual sweep a bot cannot make.
- [Knip](https://knip.dev/) — Finds unused files, exports, and dependencies, which is how a project gets smaller instead of larger.

### Node and runtimes

Install the current **LTS** release, not the newest one, and pin the version per
project so your machine and CI agree. A version manager makes switching cheap;
any of the three below is fine, and fnm is the fastest.

- [Node.js](https://nodejs.org/en/) — JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Node.js Learn](https://nodejs.org/learn) — Official guides for the default runtime, and the one every tool targets.
- [Node.js Releases](https://nodejs.org/en/about/previous-releases) — Which versions are LTS, and the date each stops receiving security fixes.
- [fnm](https://github.com/Schniz/fnm) — Fast Rust version manager that reads `.nvmrc` and switches on `cd`.
- [nvm](https://github.com/nvm-sh/nvm) — The original shell version manager; slower to start, and installed nearly everywhere.
- [Volta](https://volta.sh/) — Pins Node and the package manager in package.json, so everyone on the project gets the same versions.
- [Bun](https://bun.com/) — Runtime, bundler, and test runner in one binary; quickest to start a script in.
- [Deno](https://deno.com/) — Runtime with TypeScript, a permissions model, and a standard library built in.

### Editors

**VS Code** is the default: the largest extension ecosystem, and the editor most
frontend tooling is tested against. Install as little as possible — a linter, a
formatter, and whatever your framework ships — because every extension is code
running against your source. WebStorm, Zed, and Neovim are all reasonable
choices; the only setting that really matters is format-on-save, wherever you set it.

- [VS Code](https://code.visualstudio.com/) — Free editor with the deepest JavaScript and TypeScript support out of the box.
- [ESLint for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — Shows lint errors inline as you type, and fixes them on save.
- [Prettier for VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — Formats the file on save using the project's Prettier config.
- [EditorConfig](https://editorconfig.org/) — Helps maintain consistent coding styles.
- [WebStorm](https://www.jetbrains.com/webstorm/) — JetBrains IDE with stronger refactoring and debugging; free for non-commercial use. [freemium]

### Debugging and inspection

What ships is not what you wrote, so debugging a build means mapping back to the
source and looking at what ended up in the bundle. Source maps do the first part
and are on by default in Vite's dev server; a bundle visualizer does the second,
and is the tool to reach for before optimising anything. The Chrome DevTools
panels themselves are in [JavaScript](JAVASCRIPT.md#debugging).

- [Source Maps](https://developer.chrome.com/docs/devtools/javascript/source-maps) — Mapping a stack trace in bundled code back to the source you wrote.
- [Firefox DevTools](https://firefox-source-docs.mozilla.org/devtools-user/) — Documentation for Firefox's debugger, whose CSS and accessibility panels beat Chrome's.
- [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) — Treemap of what is in a Rollup or Vite bundle, and which dependency is responsible.
- [webpack-bundle-analyzer](https://github.com/webpack/webpack-bundle-analyzer) — The same view for a webpack build, which is where most oversized bundles are found.
- [esbuild Bundle Size Analyzer](https://esbuild.github.io/analyze/) — Drop an esbuild metafile in and see where the bytes went.

### Publishing a package

If you want to ship a library rather than an app, the build is the easy part. The
hard part is the package metadata: an `exports` map that resolves correctly for
bundlers, Node, and TypeScript alike, and a decision about whether you ship ESM
only or ESM plus CommonJS. Ship ESM only unless you know a consumer needs
`require`. Publish once with the two checkers below pointed at your tarball, and
you will avoid the bug reports everyone else gets.

- [Contributing Packages to the Registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) — Creating, versioning, and publishing a package to npm, from first `npm publish` onwards.
- [Node.js Packages](https://nodejs.org/api/packages.html) — The `exports` field, conditional exports, and how a dual ESM/CommonJS package resolves.
- [publint](https://publint.dev/) — Lints a published package for broken exports, wrong file extensions, and bad metadata.
- [Are the Types Wrong?](https://arethetypeswrong.github.io/) — Checks that your type declarations resolve under every module setting a consumer might use.
- [npm Provenance](https://docs.npmjs.com/generating-provenance-statements) — Publishing from CI with a signed link back to the commit that built it.

## Deep dives

- [Why Vite](https://vite.dev/guide/why.html) — Why the dev server serves unbundled modules while the production build still bundles them.
- [The Modern Guide to Packaging a JavaScript Library](https://github.com/frehner/modern-guide-to-packaging-js-library) — Field notes on `exports`, dual formats, and the packaging decisions that break consumers.
