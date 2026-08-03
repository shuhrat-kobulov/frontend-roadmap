# Frameworks

How to choose a frontend framework, and the meta-frameworks, rendering strategies, and ecosystems worth knowing in 2026.
Part of the [Frontend Roadmap](../README.md).
See also [React](REACTJS.md) for React itself — components, hooks, and its library ecosystem —
[Browser APIs](BROWSER-APIS.md) for the platform every framework is built on top of,
[UI Frameworks](UI-FRAMEWORKS.md) for the component layer inside whichever you pick, and
[Tooling](TOOLING.md) for the build tools underneath them all.

Framework choice is the decision everything downstream inherits: your hosting bill,
your hiring pool, how the site behaves on a three-year-old phone, and how much of
the next two years you spend on migrations. It is also the decision most often made
badly, because it is usually made by reading launch posts. Four questions settle it,
roughly in this order.

**Does the page need to exist before JavaScript runs?** If search ranking, link
previews, or first paint on a slow connection matter, you need HTML from the
server — server rendering or a static build — and a purely client-rendered app is
out. If every user signs in first, none of that applies and a SPA is genuinely the
simpler choice.

**Is it content or is it an app?** Content sites want to ship almost no JavaScript
and hydrate only the interactive bits. Apps want a real client runtime, and paying
for it once is fine. Most projects are mostly one or the other, and the ones that
are genuinely both are what meta-frameworks exist for.

**What has the team already shipped?** A framework your team knows beats a better
framework it doesn't, and it isn't close. This outweighs every benchmark you will
read, including the ones linked below.

**Where does it deploy?** A framework that assumes a specific host is cheap until
you have to move. If you can only serve static files, or only run one Node
container, check that the framework's adapters cover it before you start.

| If you're building | Start with | Rendering |
| --- | --- | --- |
| Blog, marketing site, or docs | Astro | Static, with islands |
| Content site with an app inside it | Next.js or Nuxt | Server-rendered, some static |
| Dashboard behind a login | Vite + React + React Router | Client-rendered |
| Store or anything SEO decides | Next.js or Nuxt | Server-rendered, cached |
| Interactivity on a Rails/Django page | htmx or Alpine.js | Server-rendered HTML |
| Mobile app, web skills, one team | Expo and React Native | Native |

If none of that decides it: **React with a meta-framework** is the safe default in
2026 — largest ecosystem, most jobs, most answers — and Vue and Svelte are both
faster to learn and pleasanter to write if you're choosing for yourself rather than
for a hiring plan.

## Learn

### Framework fundamentals

Every framework here solves the same problem: keeping the DOM in sync with state
without you writing the update by hand. They differ in when they do that work — in
the browser, on the server, or at build time — and how much JavaScript the user
downloads for it. Learn the shared vocabulary before picking, because it makes every
comparison below readable.

- [Understanding Client-Side JavaScript Frameworks](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries) — MDN's framework-neutral module: why frameworks exist, then the same app built in React, Vue, Svelte, and Angular. [beginner]
- [Framework Main Features](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Main_features) — The concepts every framework has a version of: components, state, events, styling, routing.
- [Component Party](https://component-party.dev/) — The same twenty tasks written side by side in a dozen frameworks. The fastest way to see how one differs from another.
- [State of JS 2025](https://2025.stateofjs.com/en-US/) — Annual ecosystem survey: usage, retention, and what people are leaving. Read the retention numbers, not the rankings.

### Rendering strategies

The real choice is not React versus Vue, it is where and when your HTML gets built.
Every framework below is an opinion about that question, so these terms are worth
more than any framework tutorial: they let you read a framework's docs and know
immediately what it is optimising for and what it is giving up.

- [Rendering on the Web](https://web.dev/articles/rendering-on-the-web) — The overview that defines the whole vocabulary and compares the strategies by cost. Read this one first.
- [Client-Side Rendering](https://www.patterns.dev/react/client-side-rendering/) — An empty HTML shell plus JavaScript that draws the page. Simplest to build, slowest to first paint.
- [Server-Side Rendering](https://www.patterns.dev/react/server-side-rendering/) — HTML built per request, so the page is complete before hydration. Costs a server and a per-request render.
- [Static Rendering](https://www.patterns.dev/react/static-rendering/) — HTML built once at deploy time and served from a CDN. Fastest and cheapest, until the content changes.
- [Incremental Static Regeneration](https://nextjs.org/docs/app/guides/incremental-static-regeneration) — Static pages that rebuild themselves in the background after a set interval, without a full redeploy.
- [Streaming SSR](https://www.patterns.dev/react/streaming-ssr/) — Sending HTML in chunks as it is ready, so the slowest query stops holding up the whole page.
- [Islands Architecture](https://jasonformat.com/islands-architecture/) — The original post: static HTML with independent interactive regions, each hydrated on its own.
- [Astro Islands](https://docs.astro.build/en/concepts/islands/) — The idea as actually implemented, including `client:visible` and the other hydration directives.
- [Progressive Hydration](https://www.patterns.dev/react/progressive-hydration/) — Hydrating parts of the tree on demand rather than the whole page at once.
- [Hydration is Pure Overhead](https://www.builder.io/blog/hydration-is-pure-overhead) — The argument that hydration re-does the server's work in the browser, and what resumability proposes instead. [advanced]
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) — React Server Components in the framework most people meet them in, and where the boundary between the two goes.

## Reference

### React meta-frameworks

React renders components; it does not route, fetch, or render on a server. A
meta-framework supplies those, and picking one is really picking how much of your
architecture you want decided for you. See [React](REACTJS.md) for the library
itself — everything here assumes it.

- [Next.js Docs](https://nextjs.org/docs) — The default React meta-framework: routing, server rendering, caching, and Server Components in one package.
- [Next.js App Router](https://nextjs.org/docs/app/getting-started) — Getting started with the current router. Powerful and deeply integrated; also the fastest-moving API in this file, so check the date on any tutorial.
- [Learn Next.js](https://nextjs.org/learn) — Official course that builds a dashboard end to end, and the quickest way to judge whether the model suits you. [beginner]
- [React Router](https://reactrouter.com/home) — Routing library and, in framework mode, a full meta-framework. Optimises for staying close to the web platform and deploying anywhere.
- [Picking a Mode](https://reactrouter.com/start/modes) — Declarative, data, or framework mode, and why you would adopt them in that order.
- [React Router v7](https://remix.run/blog/react-router-v7) — The release that merged Remix into React Router, which is why searching for Remix now sends you here.
- [TanStack Start](https://tanstack.com/start/latest) — Full-stack React on Vite, built around end-to-end type safety. Youngest of the three, and the smallest ecosystem.

### Content-first

If the page is mostly words and pictures, shipping a client-side framework to render
it is a cost with no return. These tools build HTML ahead of time and add JavaScript
only where you ask for it — Astro's islands make that granular enough that a mostly
static site can still have a working checkout. The tradeoff is real: state shared
across many islands gets awkward fast, and an app-shaped product outgrows this
category.

- [Why Astro](https://docs.astro.build/en/concepts/why-astro/) — The pitch and the constraints, including where the team says Astro is the wrong choice.
- [Astro Docs](https://docs.astro.build/en/getting-started/) — Content-focused framework that ships zero JavaScript by default and runs React, Vue, or Svelte components as islands.
- [Content Collections](https://docs.astro.build/en/guides/content-collections/) — Type-safe Markdown and MDX with a schema, which is what makes Astro a real CMS-free option.
- [Eleventy](https://www.11ty.dev/) — Static site generator that ships no client JavaScript and no framework at all. Maximum control, and you build every abstraction yourself.
- [Hugo](https://gohugo.io/) — Go-based generator with by far the fastest builds, at the cost of learning Go templates.
- [VitePress](https://vitepress.dev/) — Vue-powered static site generator aimed at documentation, and what many framework docs sites run on.

### Vue

Vue is the gentlest ramp of the major frameworks: single-file components keep
template, logic, and styles together, and it can be added to one page of an existing
site with a script tag before it is ever the whole app. The official router and store
mean one blessed answer per problem instead of a survey. The tradeoff is reach —
fewer jobs in North America, and a thinner long tail of third-party libraries than
React.

- [Vue.js Docs](https://vuejs.org/guide/introduction.html) — Official guide, and among the best-written documentation of any framework.
- [Vue Tutorial](https://vuejs.org/tutorial/) — Interactive walkthrough in the browser, from a first component to a small app. [beginner]
- [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html) — What `setup` and the composition API are for, and when the older Options API is still fine.
- [Ways of Using Vue](https://vuejs.org/guide/extras/ways-of-using-vue.html) — Progressive enhancement, embedded widget, SPA, SSR, or static — the same framework at five different scales.
- [Vue Router](https://router.vuejs.org/) — The official router, including nested routes and navigation guards.
- [Pinia](https://pinia.vuejs.org/) — The official store, and the replacement for Vuex in anything new.
- [Nuxt](https://nuxt.com/docs) — Vue's meta-framework: file-based routing, server rendering, and auto-imports, with a large module ecosystem.

### Svelte

Svelte compiles components away at build time, so there is no framework runtime
shipped and no virtual DOM to reason about; it consistently takes the least code of
any option here to do the same thing. Runes, introduced in Svelte 5, made reactivity
explicit and are a genuine improvement. The tradeoffs are ecosystem size — the
smallest of the four majors, so more things you will build yourself — and that runes
invalidated the mental model in every tutorial written before late 2024.

- [Svelte Docs](https://svelte.dev/docs/svelte/overview) — Official documentation for Svelte 5, the current version.
- [Svelte Tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) — Interactive course covering Svelte and SvelteKit in one path. The best first hour with this framework. [beginner]
- [What Are Runes?](https://svelte.dev/docs/svelte/what-are-runes) — `$state`, `$derived`, and `$effect`: reactivity as explicit signals rather than compiler magic.
- [Svelte 5 Is Alive](https://svelte.dev/blog/svelte-5-is-alive) — Release post explaining what changed and why the rewrite was worth breaking things for.
- [Svelte 5 Migration Guide](https://svelte.dev/docs/svelte/v5-migration-guide) — What Svelte 4 code becomes, which doubles as a map of any older tutorial you find.
- [SvelteKit](https://svelte.dev/docs/kit/introduction) — Svelte's meta-framework, with adapters that target static hosts, Node, and the major serverless platforms.

### Angular

Angular ships the whole application platform in one versioned package — router,
forms, HTTP client, dependency injection, testing, and a CLI that generates and
upgrades code for you. On a large team over many years that consistency is worth
more than elegance, which is why it dominates enterprise work. The tradeoff is the
amount you must learn before the first screen renders, RxJS included, and that it is
heavy machinery for anything small.

- [Angular Overview](https://angular.dev/overview) — What modern Angular is, from the rewritten docs site. Anything on the old angular.io is a different framework in practice.
- [Angular Essentials](https://angular.dev/essentials) — Components, signals, templates, and dependency injection, in the order they matter.
- [Learn Angular](https://angular.dev/tutorials/learn-angular) — Official interactive tutorial that runs in the browser with no setup. [beginner]
- [Signals](https://angular.dev/guide/signals) — Angular's reactive primitive, and the reason new code needs far less RxJS than older tutorials show.
- [Standalone Components](https://angular.dev/reference/migrations/standalone) — Migrating off NgModules, which the framework now treats as the legacy path.
- [RxJS](https://rxjs.dev/) — The observable library Angular's HTTP and router APIs are built on, and the steepest part of the learning curve.

### Solid, Qwik, and smaller ecosystems

Worth knowing about, and worth choosing only with a reason. Solid keeps React's JSX
but replaces re-rendering with fine-grained reactivity, so updates touch only the DOM
nodes that changed; Qwik skips hydration entirely by serialising state into the HTML
and resuming in the browser. Both are genuinely faster than the mainstream options
and both have far smaller communities, which is the whole tradeoff: when you hit a
problem, fewer people have hit it before you. Alpine and htmx are the other
direction — no build step, no client framework, HTML doing more work.

- [SolidJS](https://www.solidjs.com/) — JSX and React-like ergonomics with fine-grained reactivity and no virtual DOM.
- [SolidStart](https://docs.solidjs.com/solid-start) — Solid's meta-framework, with routing, server functions, and the usual rendering modes.
- [Qwik](https://qwik.dev/) — Framework built around resumability, so a page becomes interactive without executing the app on load.
- [Resumability](https://qwik.dev/docs/concepts/resumable/) — The core idea, and the clearest explanation of what it replaces. [advanced]
- [Preact](https://preactjs.com/) — 3KB alternative with the same API as React, for when bundle size is the binding constraint.
- [Alpine.js](https://alpinejs.dev/) — Behaviour declared in HTML attributes, for sprinkling interactivity on server-rendered pages.
- [htmx](https://htmx.org/) — Extends HTML so any element can issue a request and swap in the response, leaving state on the server.

### Cross-platform

Every option here trades native fidelity against how much code you can reuse. React
Native compiles to real native views, so the result feels native and the platform
work is still native work — provisioning, store review, and native-module debugging
do not go away. The desktop and hybrid tools all wrap web technology instead: cheaper
to build, and honest about the fact that what ships is a web app.

- [React Native](https://reactnative.dev/) — React that renders real native components on iOS and Android, sharing logic but not markup with the web.
- [Expo](https://docs.expo.dev/) — The recommended way to start a React Native app: managed builds, over-the-air updates, and native modules without Xcode. [freemium]
- [Expo Router](https://docs.expo.dev/router/introduction/) — File-based routing across native and web, so one route tree serves both.
- [Tauri](https://v2.tauri.app/) — Desktop and mobile apps using the system webview and a Rust backend. Small binaries, at the cost of webview differences per platform.
- [Electron](https://www.electronjs.org/docs/latest/) — Desktop apps that bundle Chromium and Node, so rendering is identical everywhere and the download is large.
- [Capacitor](https://capacitorjs.com/) — Wraps an existing web app in a native shell with plugin access to device APIs. Fastest route to the stores, and it will feel like a web app.
- [Progressive Web Apps](https://web.dev/explore/progressive-web-apps) — Installable, offline-capable apps with no store at all, limited by what iOS chooses to support.

### The web platform

Frameworks come and go on a five-to-ten year cycle; the platform underneath does not.
Custom elements let a component outlive the framework it was written against, which
is why design systems that must serve several teams keep landing on them. The
tradeoff is ergonomics — server rendering, form participation, and styling across the
shadow boundary are all harder than the framework equivalents. Either way, the
platform knowledge in [Browser APIs](BROWSER-APIS.md) is what stays useful when the
framework changes.

- [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) — Custom elements, shadow DOM, and templates: the browser's own component model.
- [Using Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) — Defining and registering an element by hand, with no library involved.
- [Lit](https://lit.dev/) — Small base class that makes web components practical, with reactive properties and declarative templates.
- [Stencil](https://stenciljs.com/) — Compiler that generates web components plus framework wrappers, aimed at design systems consumed by several stacks.
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/) — Live test results for how well each framework passes data to and listens to custom elements.
- [Baseline](https://web.dev/baseline) — Which platform features are safely usable across browsers, which decides how much a framework still has to polyfill.

## Deep dives

Migrations are where framework choice sends the bill. The workable pattern is almost
always incremental: run the new thing alongside the old one, move a route at a time,
and delete the old code as you go. Micro-frontends are the industrial version of
that — separate teams deploying separate parts of one page independently — and they
are usually the wrong answer. They buy deployment independence and pay for it with
duplicated dependencies, slower pages, and a debugging story that spans repositories.
Read them as a solution to an organisational problem, not a technical one, and pick a
modular monolith unless the org chart genuinely makes that impossible.

- [Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html) — The pattern behind every successful rewrite: grow the new system around the old one, then remove it.
- [Framework Components in Astro](https://docs.astro.build/en/guides/framework-components/) — Running React, Vue, Svelte, and Solid components in one page, which is the cheapest way to migrate incrementally.
- [Migrating from Create React App](https://nextjs.org/docs/app/guides/migrating/from-create-react-app) — Step-by-step move off CRA, including what breaks and what to do about it.
- [App Router Incremental Adoption](https://nextjs.org/docs/app/guides/migrating/app-router-migration) — Running the Pages Router and App Router side by side while moving route by route.
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/) — Breaking changes from Vue 2, plus the compatibility build that lets both run at once.
- [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html) — The definitive write-up: integration approaches, and an unusually honest costs section. [advanced]
- [micro-frontends.org](https://micro-frontends.org/) — The techniques in detail, with runnable examples of each integration style.
- [Module Federation](https://module-federation.io/) — Loading code from a separately deployed build at runtime, which is the mechanism most micro-frontend setups use.
- [Migrating Existing SPAs](https://single-spa.js.org/docs/migrating-existing-spas/) — single-spa's guide to putting several framework apps on one page without rewriting them first.
