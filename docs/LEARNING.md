# Learning

Where to learn frontend, organised by medium rather than by topic: curricula,
documentation, channels, courses, books, and the rooms where questions get answered.
Part of the [Frontend Roadmap](../README.md).
See also [ROADMAP.md](../ROADMAP.md) for the order to work through it in, and the
topic files for what to read on a specific subject.

Individual videos and "best of" listicles rot within a year or two. The people and
institutions that publish them mostly do not, which is why this file lists sources
rather than artefacts — a channel instead of a video, a curriculum instead of a
lesson, a blog instead of a post. Pick one per section. The failure mode here is
collecting resources instead of using them.

## Learn

### Free structured curricula

- [freeCodeCamp](https://www.freecodecamp.org/) — Certification tracks built from thousands of small in-browser exercises; best for momentum when you are starting from nothing. [beginner]
- [The Odin Project](https://www.theodinproject.com/) — Full-stack curriculum that assigns primary sources and makes you build every project yourself; best for learning the way a working developer actually works.
- [Full Stack Open](https://fullstackopen.com/en/) — University of Helsinki course on React, Node, GraphQL, and testing; best once JavaScript itself is no longer the hard part. [intermediate]
- [web.dev Learn](https://web.dev/learn) — Google's course series on HTML, CSS, accessibility, performance, and privacy; best for filling one specific platform gap at a time.
- [MDN Curriculum](https://developer.mozilla.org/en-US/curriculum/) — Ordered path through the platform written by the people who write the reference; best as a syllabus you can trust.
- [roadmap.sh Frontend](https://roadmap.sh/frontend) — Dependency graph of everything a frontend role touches; best as a map to check yourself against, not a checklist to complete.
- [CS50x](https://cs50.harvard.edu/x/) — Harvard's introduction to computer science, ending in web development; best for the fundamentals sitting underneath the frontend.
- [JavaScript30](https://javascript30.com/) — Thirty small vanilla-JavaScript builds with no frameworks and no boilerplate; best for breaking the habit of following along. [beginner]

### YouTube channels

Channels, not videos. A single tutorial is stale in eighteen months, but a channel
that has published well for five years will still be worth watching in five more.
Levels are rough — most of these publish across a range.

- [Kevin Powell](https://www.youtube.com/@KevinPowell) — CSS in depth, from the cascade to container queries, explained without shortcuts. [beginner]
- [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified) — One JavaScript or React concept per video, scoped tightly enough to finish. [beginner]
- [Traversy Media](https://www.youtube.com/@TraversyMedia) — Long project-based crash courses across the whole stack. [beginner]
- [Net Ninja](https://www.youtube.com/@NetNinja) — Ordered playlists that work as free courses on a single framework or tool. [beginner]
- [freeCodeCamp.org](https://www.youtube.com/@freecodecamp) — Multi-hour full courses donated by working developers. [beginner]
- [Fireship](https://www.youtube.com/@Fireship) — Very short, very fast surveys of a tool or concept; good for deciding what to learn properly later. [intermediate]
- [Chrome for Developers](https://www.youtube.com/@ChromeDevs) — Platform features, devtools, and conference talks straight from the browser team. [intermediate]
- [Jack Herrington](https://www.youtube.com/@jherr) — React architecture, TypeScript, and build tooling for people already shipping. [advanced]
- [Theo - t3.gg](https://www.youtube.com/@t3dotgg) — Opinionated commentary on where the React and TypeScript ecosystem is heading. [advanced]
- [ThePrimeagen](https://www.youtube.com/@ThePrimeagen) — Data structures, editors, and unfiltered reactions to industry news. [advanced]

### Courses & platforms

- [Frontend Masters](https://frontendmasters.com/) — Workshop recordings from well-known practitioners, strongest on JavaScript and CSS fundamentals. [paid]
- [Scrimba](https://scrimba.com/) — Lessons recorded as editable code rather than video, so you type inside the lesson itself. [freemium]
- [egghead.io](https://egghead.io/) — Short, dense lessons for developers who want the technique without the preamble. [freemium]
- [Total TypeScript](https://www.totaltypescript.com/) — Exercise-driven TypeScript from Matt Pocock; the essentials book and beginner tutorials are free, the pro workshops are not. [freemium]
- [Epic React](https://www.epicreact.dev/) — Kent C. Dodds' full React workshop series, taught as broken exercises you fix locally. [paid]
- [Epic Web](https://www.epicweb.dev/) — The full-stack sequel to Epic React, with a set of free standalone tutorials alongside the paid workshops. [freemium]
- [Wes Bos](https://wesbos.com/courses) — Project-based courses; JavaScript30, CSS Grid, and What The Flexbox are free, the rest are not. [freemium]
- [CSS for JS Developers](https://css-for-js.dev/) — Josh Comeau's course on the CSS mental model, written for people who arrived through JavaScript. [paid]
- [The Joy of React](https://www.joyofreact.com/) — Interactive React course from the same author, built around the rendering model rather than the API surface. [paid]
- [Execute Program](https://www.executeprogram.com/) — JavaScript, TypeScript, and SQL drilled with spaced repetition so the material survives the week. [paid]
- [Codecademy](https://www.codecademy.com/) — In-browser interactive lessons; the introductory courses are free and the career paths are not. [freemium]

### Books

Design books live in [Design](DESIGN.md); the rest of the canon is here. Five of
the eight are free to read online in full.

- [Eloquent JavaScript](https://eloquentjavascript.net/) — The best single book on the language, free online, and it builds real programs rather than toy examples.
- [You Don't Know JS Yet](https://github.com/getify/You-Dont-Know-JS) — Kyle Simpson's series on the parts of JavaScript everyone skips, free on GitHub.
- [Learning JavaScript Design Patterns](https://www.patterns.dev/book/) — Addy Osmani's second edition, covering the classic patterns and the React-era ones, free online.
- [Resilient Web Design](https://resilientwebdesign.com/) — Jeremy Keith on why the web works the way it does; free online and short enough for one sitting.
- [High Performance Browser Networking](https://hpbn.co/) — Ilya Grigorik on what happens between the click and the pixels, free online and still the reference on the subject.
- [Inclusive Components](https://inclusive-components.design/) — Heydon Pickering rebuilding common UI patterns so they are accessible by construction, chapter by chapter online.
- [CSS in Depth](https://www.manning.com/books/css-in-depth-second-edition) — Second edition, which is the one that covers grid, custom properties, and container queries properly. [paid]
- [Practical Accessibility](https://practical-accessibility.today/) — Sara Soueidan's course-book on building accessible interfaces, written for developers rather than auditors. [paid]

## Reference

### Documentation worth reading front to back

Reading documentation is a skill, and it is the one that still pays after every
framework named in this file has been replaced. The habit is going to the
reference *first* — before the search box, before the chatbot — and reading the
whole page instead of the paragraph you came for. Everything below is written well
enough to read in order, not only to look things up in.

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web) — The reference for HTML, CSS, JavaScript, and every browser API, and the only one worth treating as authoritative.
- [react.dev](https://react.dev/learn) — React's own guide, rewritten around hooks and readable end to end in a weekend.
- [web.dev](https://web.dev/) — The Chrome team on performance, accessibility, and new platform features, with the reasoning left in.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — The language explained in order, which is the fastest route out of copying types off Stack Overflow.
- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools) — Every panel of the debugger you already have open, including the ones you have never clicked.
- [HTML Living Standard](https://html.spec.whatwg.org/multipage/) — The spec itself, for when you need what a browser is *required* to do rather than what it happens to do. [advanced]

### Newsletters & blogs

One newsletter is enough. The point of the last three entries is to track the
platform directly rather than through commentary about it.

- [JavaScript Weekly](https://javascriptweekly.com/) — The long-running Friday roundup of language and ecosystem news.
- [Frontend Focus](https://frontendfoc.us/) — Its sibling, for HTML, CSS, and browser news.
- [Bytes](https://bytes.dev/) — JavaScript newsletter that is genuinely funny, which is the reason people finish it.
- [Smashing Magazine](https://www.smashingmagazine.com/) — Long-form frontend and design articles, edited rather than published raw.
- [Josh W Comeau](https://www.joshwcomeau.com/) — Interactive explanations of CSS and React that do not exist in this form anywhere else.
- [Chrome Release Notes](https://developer.chrome.com/release-notes) — What actually shipped in each Chrome version, which is how you follow the platform instead of the discourse.
- [WebKit Blog](https://webkit.org/blog/) — The same for Safari, and where its release notes are announced.
- [Web Platform Status](https://webstatus.dev/) — Baseline support data for every feature, for answering "can I use this yet" with a date.

### Podcasts

- [Syntax](https://syntax.fm/) — Twice-weekly frontend show, equal parts practical and current.
- [ShopTalk Show](https://shoptalkshow.com/) — Chris Coyier and Dave Rupert on the working reality of building websites.
- [JS Party](https://changelog.com/jsparty) — Panel show on JavaScript and the web, with a rotating cast of guests.
- [PodRocket](https://podrocket.logrocket.com/) — Short interviews with the maintainers of the tools you already depend on.
- [The Changelog](https://changelog.com/podcast) — Software beyond the frontend, for context on the industry you are working in.

### Communities

- [Stack Overflow](https://stackoverflow.com/) — Still the archive of answered questions; search it before asking, and read how a good question is written.
- [Reactiflux](https://www.reactiflux.com/) — Large React Discord with help channels staffed by people who write React for a living.
- [The Odin Project Community](https://www.theodinproject.com/guides/community) — Discord for learners working through the curriculum, and the friendliest room on this list. [beginner]
- [freeCodeCamp Forum](https://forum.freecodecamp.org/) — Threaded forum where "please review my code" posts actually get reviewed. [beginner]
- [r/Frontend](https://www.reddit.com/r/Frontend/) — Career questions, portfolio critique, and the recurring framework argument.
- [Frontend Mentor](https://www.frontendmentor.io/) — Real design briefs to build against, with community feedback on the solution you submit. [freemium]
- [DEV Community](https://dev.to/) — Developer blogging platform; quality varies enormously, so follow people rather than tags.

## How to learn effectively

- **Build the thing the tutorial did not ask for.** Finishing a course teaches you
  that the instructor knows the material. Changing the project afterwards — a
  different data source, one more feature, a constraint they never mentioned — is
  the first point at which you find out whether you do.
- **Escape tutorial hell by lowering the stakes, not by finding a better course.**
  The trap is believing you need one more prerequisite before you are allowed to
  build. You do not. Build something small and bad, on purpose, and ship it.
- **Read source code.** Pick a library you already use and read one file of it a
  week. It is the fastest way to stop treating your dependencies as magic, and the
  only reliable way to learn what production-grade code in your language looks like.
- **Revisit the fundamentals on a schedule.** The cascade, the event loop, `this`,
  and how HTTP caching works will each feel learned and then quietly rot. Re-reading
  a chapter you already know every few months costs an hour and repays it for years.
- **Learn one new thing at a time.** A new framework *and* a new language *and* a
  new build tool in one project means that when it breaks — and it will — you
  cannot tell which of the three you misunderstood.
- **Judge a resource in five minutes, before spending six hours on it.** Good signs:
  a date on the article, a named author with other work, code you can run, and
  admissions of trade-offs. Filler signs: "Top 10 X You Must Know in 2026", no
  publication date, an intro explaining what JavaScript is, code that never
  handles an error, and three ads before the first sentence.
- **Explain it to someone.** Writing the answer down, replying to a question in one
  of the communities above, or teaching a colleague will expose the parts you had
  only pattern-matched. It is uncomfortable for exactly the reason it works.
