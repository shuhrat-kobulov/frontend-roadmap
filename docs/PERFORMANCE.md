# Performance

Making pages load and respond quickly, the metrics that say whether they do, and the tools that tell you where the time went.
Part of the [Frontend Roadmap](../README.md).
See also [HTML](HTML.md) for the markup that decides what the browser fetches first,
[CSS](CSS.md) for the render cost of the styles you write,
[Design](DESIGN.md) for Squoosh and the other image compressors, and
[Testing](TESTING.md) for putting a Lighthouse run and a bundle budget in CI.

Performance is a feature, and it is the one every other feature is delivered
through. A slow page is not a slow version of a fast page — it is a page a
proportion of people never see, because they left. That makes speed a product
decision rather than a cleanup task, which is why the first section here is
evidence rather than technique.

The measurement framework worth learning is **Core Web Vitals**: three metrics for
the three things a user notices. **LCP** — how long until the main content is
painted. **INP** — how long the page takes to respond when they interact with it.
**CLS** — how much the layout jumps around while they read. In March 2024, INP
replaced First Input Delay as the responsiveness metric, because FID only measured
the delay before the *first* interaction was handled and almost every real page
passed it. Anything you read that still lists FID as a Core Web Vital predates that
change; treat it accordingly. **TTFB** and **FCP** are not Core Web Vitals — they are
diagnostics that tell you which part of LCP is slow.

**The single most useful distinction in this whole topic is field data versus lab
data,** and nearly every argument about a performance score comes from confusing
them. *Lab* data — Lighthouse, WebPageTest, the DevTools Performance panel — is a
scripted load on a simulated device and network. It is reproducible, it runs before
you ship, and it is excellent at telling you *why* something is slow. *Field* data —
the Chrome UX Report, and RUM you collect yourself — is what actually happened to
real people on real devices. It is the only thing that tells you *whether* you have
a problem, and it is what Google ranks on. Lab numbers that disagree with field
numbers are not wrong; they are answering a different question. Optimise against the
field, diagnose in the lab.

One warning about targets: performance work is judged at the 75th percentile of your
real users, not at your own desk. A laptop on office wifi is not the device the
metric is computed from. Look at the slowest quarter of your traffic first.

## Learn

Start with why it pays, because performance work is usually funded by someone who
has to be convinced. The case studies below are the argument; the two courses after
them are the material.

- [The Business Impact of Core Web Vitals](https://web.dev/case-studies/vitals-business-impact) — Companies that improved specific metrics and the conversion, bounce, and revenue numbers that followed.
- [WPO Stats](https://wpostats.com/) — A running collection of published performance-versus-business case studies, each one a citable sentence with a source.
- [Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/) — The 0.1s, 1s, and 10s thresholds from human-factors research, which is where every responsiveness budget ultimately comes from.
- [The Performance Inequality Gap, 2026](https://infrequently.org/2025/11/performance-inequality-gap-2026/) — Alex Russell's annual reckoning of what the median phone and network can actually afford, and how far that is from a developer's laptop. [advanced]
- [Learn Performance](https://web.dev/learn/performance) — The Chrome team's course, from the critical path through resource hints, images, fonts, and web workers. The best single starting point.
- [MDN Web Performance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance) — MDN's module, covering the same ground with more emphasis on the platform APIs underneath.

## Reference

### Core Web Vitals

The definition pages, each with the current threshold and how the metric is
computed. **Good** is LCP under 2.5s, INP under 200ms, and CLS under 0.1, measured at
the 75th percentile of page loads. Read the metric page before the optimisation
guide — most fixes are obvious once you know exactly what the number counts.

- [Web Vitals](https://web.dev/articles/vitals) — The umbrella page: which metrics are Core Web Vitals today, what the thresholds are, and how the set changes over time.
- [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) — Time until the largest text block or image in the viewport is painted, and which element gets picked as the LCP element.
- [Interaction to Next Paint (INP)](https://web.dev/articles/inp) — The responsiveness metric that replaced FID in 2024: worst-case latency from a click, tap, or keypress to the next frame.
- [Cumulative Layout Shift (CLS)](https://web.dev/articles/cls) — How much visible content moves without the user causing it, and why the score is a product of distance and impact.
- [INP Becomes a Core Web Vital](https://web.dev/blog/inp-cwv-march-12) — The announcement of the March 2024 change, with what FID missed and what INP measures instead. Read it if you have older performance notes to update.
- [Time to First Byte (TTFB)](https://web.dev/articles/ttfb) — Server and network latency before any content arrives. Not a Core Web Vital; the first thing to check when LCP is bad.
- [First Contentful Paint (FCP)](https://web.dev/articles/fcp) — Time until anything at all is painted. The other half of the LCP diagnosis, and where render-blocking resources show up.

### Field data and lab data

- [Why Lab and Field Data Can Be Different](https://web.dev/articles/lab-and-field-data-differences) — The concrete reasons the two disagree — device, network, cache state, interaction, personalisation — and which one to trust for what.
- [RUM vs. Synthetic Monitoring](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Rum-vs-Synthetic) — What each approach can and cannot tell you, and why a serious setup runs both rather than choosing.
- [Best Practices for Measuring Web Vitals in the Field](https://web.dev/articles/vitals-field-measurement-best-practices) — How to collect real-user metrics yourself: what to send, when to send it, and how to slice the results so they are actionable.

### Loading performance

Everything before first paint is a dependency graph, and the browser can only
prioritise what it can see. Most loading wins come from three moves: get the HTML
sooner, stop blocking the parser, and tell the browser what matters. Resource hints
are how you do the third — `preload` for something the parser will not discover in
time, `preconnect` for a third-party origin you know you will hit, `prefetch` for the
next navigation, `modulepreload` for the module graph. Use them sparingly; hinting
everything is the same as hinting nothing.

- [Critical Rendering Path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path) — The sequence from bytes to pixels, and exactly which resources block it. The mental model the rest of this section assumes.
- [Assist the Browser with Resource Hints](https://web.dev/learn/performance/resource-hints) — `preload`, `preconnect`, `dns-prefetch`, `prefetch`, and `modulepreload`, with the case each one is for and the cost of overusing it.
- [Fetch Priority](https://web.dev/articles/fetch-priority) — The `fetchpriority` attribute for promoting the LCP image or demoting a below-the-fold one, and how it interacts with the browser's own priorities.
- [Optimize LCP](https://web.dev/articles/optimize-lcp) — LCP broken into four phases, with the fix for each. The most useful optimisation guide on web.dev.
- [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) — `Cache-Control`, validation, and immutable hashed assets, which is how a repeat visit becomes nearly free.
- [Minify and Compress Network Payloads with Brotli](https://web.dev/articles/codelab-text-compression-brotli) — Text compression measured rather than assumed, and why brotli beats gzip on the files you ship most of.
- [Content Delivery Networks](https://web.dev/articles/content-delivery-networks) — What a CDN actually changes, how caching works at the edge, and when it is the cheapest TTFB fix available.
- [HTTP/3: Past, Present, and Future](https://blog.cloudflare.com/http3-the-past-present-and-future/) — How the protocol got from HTTP/1.1 head-of-line blocking through HTTP/2 multiplexing to QUIC, and what each one fixed.

### JavaScript performance

JavaScript is the most expensive kind of byte you can ship: it has to be downloaded,
parsed, compiled, and executed, and all of that happens on the one thread that also
handles clicks. This is where INP is won or lost. Set a byte budget for the initial
bundle and defend it, split everything not needed for first paint, and treat every
third-party script as a cost centre — an analytics tag or chat widget you did not
write can easily out-weigh your entire application. See
[Tooling](TOOLING.md#debugging-and-inspection) for the bundle visualizers that show
you where the weight is.

- [Reduce JavaScript Payloads with Code Splitting](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting) — Splitting on route and interaction boundaries so the first load carries only what the first screen needs.
- [Reduce JavaScript Payloads with Tree Shaking](https://web.dev/articles/reduce-javascript-payloads-with-tree-shaking) — How dead-code elimination decides what to drop, and the import patterns and side effects that quietly defeat it.
- [Optimize INP](https://web.dev/articles/optimize-inp) — Finding the slow interaction, then fixing it by yielding to the main thread, deferring work, and cutting rendering cost.
- [Optimize Long Tasks](https://web.dev/articles/optimize-long-tasks) — Breaking up any task over 50ms so input can be handled between chunks, including `scheduler.yield` and `isInputPending`.
- [Efficiently Load Third-Party JavaScript](https://web.dev/articles/efficiently-load-third-party-javascript) — Loading tags, widgets, and pixels without letting them block your own critical path.
- [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) — Moving expensive computation off the main thread entirely, and the message-passing constraints that come with it.
- [Partytown](https://partytown.qwik.dev/) — Runs third-party scripts inside a web worker, so an analytics tag stops competing with your UI for the main thread.

### Images and media

Images are usually the largest thing on the page and the LCP element on most of
them, which makes them the highest-leverage bytes you own. Three habits cover the
bulk of it: serve AVIF or WebP with a fallback, serve a size that suits the viewport
via `srcset` and `sizes`, and give every image explicit `width` and `height` (or an
`aspect-ratio`) so the browser reserves the space and CLS stays at zero. Lazy-load
what is below the fold and nothing above it — `loading="lazy"` on the LCP image
reliably makes LCP worse. For the compression tools themselves, see
[Design](DESIGN.md#images--media).

- [Responsive Images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) — `srcset`, `sizes`, and `<picture>`, covering both resolution switching and art direction. The reference to keep open.
- [Image File Type and Format Guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types) — Every web image format including AVIF and WebP, with what each is good at and what it costs.
- [Browser-level Image Lazy Loading](https://web.dev/articles/browser-level-image-lazy-loading) — The `loading="lazy"` attribute, what the browser does with it, and which images must never carry it.
- [aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio) — Reserving an element's shape before its content loads, which is the CSS half of preventing layout shift.
- [Optimize CLS](https://web.dev/articles/optimize-cls) — The four usual causes of layout shift — sized-late images, injected ads, late fonts, animated layout properties — and the fix for each.
- [Video Performance](https://web.dev/learn/performance/video-performance) — Formats, poster images, `preload`, and autoplay, so a video costs what it needs to and not more.

### Fonts

Webfonts are a small download with an outsized effect on perceived speed, because
text is usually the LCP element and a font swap is a classic layout shift. Self-host
rather than pulling from a third-party origin — it removes a connection from the
critical path and a privacy question from your review. Then preload the one font the
first screen needs, subset it to the characters you use, and set `font-display` so
text is never invisible while you wait.

- [Optimize Web Fonts](https://web.dev/learn/performance/optimize-web-fonts) — Self-hosting, subsetting, preloading, and `font-display`, in the order you should apply them.
- [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display) — The block, swap, fallback, and optional strategies, and what each trades between invisible text and a visible reflow.
- [A Comprehensive Guide to Font Loading Strategies](https://www.zachleat.com/web/comprehensive-webfonts/) — Zach Leatherman's survey of every approach with its tradeoffs. Long, definitive, and worth the time before you pick one.
- [Improved Font Fallbacks](https://developer.chrome.com/blog/font-fallbacks) — Tuning `size-adjust` and the other metric overrides so the fallback font occupies the same space as the real one, removing the swap shift entirely.

### Rendering and runtime

Once the page is loaded, cost moves to the frame budget: at 60fps you have about
16ms to produce each frame, and layout, paint, and composite all come out of it.
Two rules cover most of it. Animate only `transform` and `opacity` — they are handled
by the compositor and skip layout and paint entirely; animating `width`, `top`, or
`margin` re-lays-out the page every frame. And never read a geometry property in a
loop that also writes one, which forces a synchronous reflow per iteration. For long
lists, render only the visible rows — see [React](REACTJS.md#performance) for the
virtualization libraries.

- [Avoid Large, Complex Layouts and Layout Thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing) — What triggers layout, why forced synchronous layout is so expensive, and how to batch reads and writes.
- [What Forces Layout / Reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a) — Paul Irish's list of every property and method that forces the browser to lay out immediately. Check yours against it.
- [Using CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Using) — Telling the browser a subtree cannot affect the rest of the page, so it can skip work outside it.
- [content-visibility](https://web.dev/articles/content-visibility) — Skipping rendering work for off-screen sections entirely, with `contain-intrinsic-size` to keep the scrollbar honest.
- [Animations Guide](https://web.dev/articles/animations-guide) — Which properties are cheap to animate and which force layout or paint, with the compositor-only list to design against.

### Framework performance

A framework changes where the cost lands, not whether it exists. The rendering
strategy is the biggest lever and it is chosen once, at the start — see
[Frameworks](FRAMEWORKS.md#rendering-strategies) for static, server, and streaming
tradeoffs, and [React](REACTJS.md#performance) for re-render cost and memoisation
within a React app. What follows is the framework-level machinery aimed specifically
at shipping less JavaScript.

- [React Compiler](https://react.dev/learn/react-compiler) — Automatic memoisation at build time, which removes most of the reason to hand-write `memo` and `useMemo`.
- [Lazy Loading](https://nextjs.org/docs/app/guides/lazy-loading) — Next.js `dynamic` imports and `next/lazy`, for deferring client components until they are needed.
- [Astro Islands](https://docs.astro.build/en/concepts/islands/) — Static HTML with interactivity hydrated only where declared. The clearest implementation of shipping almost no JavaScript.

## Tools

### Measuring

Lighthouse and PageSpeed Insights look similar and are not. PageSpeed Insights shows
you both halves: CrUX field data at the top if your origin has enough traffic, and a
Lighthouse lab run underneath. **The score is a lab number** — a weighted average of
simulated metrics on a throttled mid-tier phone — so treat it as a diagnostic ranked
by opportunity, never as the goal. A page can score 100 and still fail Core Web
Vitals for real users, and vice versa.

- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) — The lab audit built into Chrome DevTools, reporting metrics plus a ranked list of what to fix.
- [PageSpeed Insights](https://pagespeed.web.dev/) — Field data from CrUX and a lab Lighthouse run for any public URL, side by side. Start here for a site you did not build.
- [Chrome UX Report](https://developer.chrome.com/docs/crux) — Google's public dataset of real-user Core Web Vitals, and the field data every ranking and third-party report is derived from.
- [WebPageTest](https://www.webpagetest.org/) — Lab testing from real devices and locations, with the waterfall and filmstrip needed to explain a slow load rather than just score it. [freemium]
- [Performance Panel](https://developer.chrome.com/docs/devtools/performance/) — DevTools' profiler: the flame chart, long tasks, layout shifts, and exactly which function spent the frame budget.
- [web-vitals](https://github.com/GoogleChrome/web-vitals) — Google's library for measuring the metrics in your own analytics, matching how CrUX computes them. The starting point for RUM.
- [Web Vitals Extension](https://github.com/GoogleChrome/web-vitals-extension) — Live LCP, INP, and CLS for the page you are on, with your field data beside your local numbers.

### Auditing what you ship

- [Coverage](https://developer.chrome.com/docs/devtools/coverage) — DevTools view of how much of each JavaScript and CSS file was actually executed on load. The quickest way to find code that did not need to be there.
- [Third Party Web](https://github.com/patrickhulce/third-party-web) — Measured main-thread cost of common third-party scripts, ranked. Look up the tag before you agree to add it.
- [RespImageLint](https://ausi.github.io/respimagelint/) — Bookmarklet that audits every image on a page for wrong `sizes`, missing `srcset`, and oversized downloads.

### Performance in CI

Performance regresses one merged pull request at a time, so the check belongs in the
pull request. [Testing](TESTING.md#performance-testing) covers the two standard
pieces — **Lighthouse CI** for asserting metric thresholds against a deployed
preview, and **Size Limit** for failing the build when the bundle exceeds a byte
budget. The tools below sit either side of them.

- [Unlighthouse](https://unlighthouse.dev/) — Runs Lighthouse across every page of a site rather than one URL, so a regression on a template shows up everywhere it landed.
- [compressed-size-action](https://github.com/preactjs/compressed-size-action) — Comments the gzipped size change of every bundle file on the pull request that caused it.

## Deep dives

- [Defining the Core Web Vitals Metrics Thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds) — How 2.5s, 200ms, and 0.1 were chosen, and why the 75th percentile is the number you are judged on. [advanced]
- [Performance: The Web Almanac](https://almanac.httparchive.org/en/2024/performance) — What millions of real sites actually do, measured annually. Useful for knowing whether your numbers are good or merely typical.
- [Performance Calendar](https://calendar.perfplanet.com/) — A December-long series of posts from working performance engineers, running since 2009. The archive is the field's memory.
- [Designing for Performance](https://designingforperformance.com/) — Lara Hogan's book, free online, on treating speed as a design constraint and building a culture that keeps it. [beginner]
- [CSS Wizardry](https://csswizardry.com/) — Harry Roberts on the loading and network side, with the kind of waterfall analysis consultancies charge for.
- [Tune The Web](https://www.tunetheweb.com/) — Barry Pollard, who works on Core Web Vitals at Google, on HTTP, caching, and the metrics themselves.
