# Practice & Getting Hired

What to build once you have read enough, where to get it reviewed, and how the
whole thing turns into a job.
Part of the [Frontend Roadmap](../README.md).
See also [ROADMAP.md](../ROADMAP.md) for the ordered path this file supplies the
projects for, [Git](GIT.md#pull-requests-and-code-review) for the workflow every
contribution goes through, [Deployment](DEPLOYMENT.md#static-hosting) for getting
your work onto a URL, and [Learning](LEARNING.md#communities) for the rooms where
people answer questions.

Every other file in this roadmap points at something to read. This one points at
things to make, and it is the only file here that touches employment. The fifteen
project specifications below are the core of it — briefs with acceptance criteria
you can check rather than feel.

**The acceptance criteria are the whole point.** Anyone can build a weather app.
The difference between the version that teaches you something and the version that
teaches you nothing is whether you decided in advance what "done" meant and then
held yourself to it. Criteria like "handles a 5,000-row list at 60fps" or "passes
axe with zero violations" are checkable by someone who is not you, which is exactly
why they are worth writing down before you start.

**Tags follow [the style guide](STYLE.md#cost): an untagged entry is free**,
`[freemium]` means a genuinely usable free tier exists, and `[paid]` means payment
is required. Interview preparation is the corner of this list with the most
commercial products in it, so the tags matter more here than anywhere else in the
roadmap.

**The hiring sections are dated, not evergreen.** Job boards close, résumé advice
turns over, and the market for juniors has moved twice in the last three years.
What is written below was checked in **August 2026** and describes conditions then;
the links are chosen to be ones that keep reporting rather than ones that made a
prediction.

## Learn

### Why building beats reading

Reading is recognition; building is recall. A tutorial hands you the decisions
already made — the file layout, the state shape, the moment to reach for a
library — so you finish it having watched someone else think. You feel fluent
because the material was fluent. Then you open an empty directory and discover
that none of it transferred, and the usual conclusion is that you need another
tutorial. You do not. You need the part that was skipped: choosing wrong, noticing,
and choosing again.

A project teaches you something when it contains at least one problem you cannot
currently solve, and not more than about three. Zero, and you are typing from
memory. Ten, and you will spend the whole time stuck on plumbing and learn nothing
about any of them. So pick the shape deliberately: take something you have built
before and add one constraint that breaks your usual approach — make it work
offline, make it usable without a mouse, make it survive 5,000 rows, make it load
in under a second on a throttled connection. The constraint is the curriculum. The
app is just where it lives.

### Your first open-source contribution

The first contribution is a paperwork problem, not a programming one. Fork, branch,
change, push, open a pull request, respond to review — none of it is hard, all of
it is unfamiliar, and being unfamiliar is what makes people stall for months. Do
one deliberately bad-value contribution first, purely to learn the mechanics: a
typo in a README of a project you use, submitted properly. Then the second one can
be about the code.

A good first real contribution is small, self-contained, and verifiable — a
failing edge case with a test, a documented behaviour the code does not have, a
missing `aria-label`. It is not a refactor, a dependency bump nobody asked for, or
a rewrite of something you found ugly. Before you write anything, read
`CONTRIBUTING.md`, check whether an issue already exists, and say in the issue that
you are picking it up so two people do not do the same work.

Reading the codebase is the skill underneath all of this, and it is the one that
transfers directly to your first week in a job. Do not start at the top. Start at
the thing you want to change, find it with a search for a string the user sees,
then read outwards until you understand the call that reaches it. Run the tests
before you touch anything, so you know which failures you caused.

Etiquette is short: match the surrounding code style rather than your preferred
one, keep the pull request to one idea, write the description for someone who has
not read the issue, and accept that maintainers are volunteers whose silence is
usually a queue and not a judgment.

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/) — GitHub's guide to finding a project, sizing a first contribution, and what maintainers expect from one.
- [First Contributions](https://github.com/firstcontributions/first-contributions) — A repository whose only purpose is to accept a trivial pull request, so the mechanics are learned somewhere harmless.
- [Good First Issue](https://goodfirstissue.dev/) — Beginner-labelled issues from well-known repositories, grouped by language and refreshed continuously.
- [CodeTriage](https://www.codetriage.com/) — Subscribe to a repository and receive one open issue by email a day, which turns contributing into a habit rather than a search.
- [Contributing to Complex Projects](https://mitchellh.com/writing/contributing-to-complex-projects) — Mitchell Hashimoto on getting oriented in a large unfamiliar codebase, from building it first to reading only the path you need.

### Building a portfolio

Employers look at less than you think, in a fixed order: whether the deployed link
works, whether the interface looks considered, whether the code is legible, and
whether the README explains what the thing is. Most junior portfolios lose at step
one, on a link that 404s or a project that only runs locally. Get everything onto a
public URL before you polish anything — see [Deployment](DEPLOYMENT.md#static-hosting).

Three finished projects beat ten started ones, and the third one exists mainly to
show the first two were not luck. Make them different from each other: one that
proves you can build an interface faithfully, one that proves you can handle real
data and its failure modes, one that goes deep on something specific. A single
project with a hard, well-executed constraint is worth more than four CRUD apps
with different colour schemes.

Your README is the part reviewers actually read. It needs, in this order: one
sentence on what the project is, a live link, a screenshot, why you built it, what
you would do differently, and how to run it locally. What it does not need is a
tutorial's worth of setup instructions or a features list written like marketing.

Writing about what you built is the cheapest way to make the work legible. One post
per project — the constraint you chose, the thing that turned out to be harder than
expected, the approach you rejected — demonstrates judgment in a way a repository
cannot, and it is also a reusable answer to the interview question about a
challenging problem.

- [About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) — GitHub on what a README is for, how it renders, and where it is displayed.
- [Awesome README](https://github.com/matiassingers/awesome-readme) — A collection of READMEs worth imitating, which is faster than reading advice about them.
- [Learn In Public](https://www.swyx.io/learn-in-public) — The argument for publishing what you learn while you learn it, and the compounding reason it works.
- [Hashnode](https://hashnode.com/) — Developer blogging platform that publishes to your own domain, with a Markdown editor and no algorithmic feed.

## Reference

### Interview question collections

Frontend interviews are made of four things, roughly in this order of frequency:
JavaScript language trivia, a build-this-component exercise, questions about how
the browser works, and a conversation about something you shipped. The collections
below cover the first and third. They are best used as a diagnostic — read the
question, answer it out loud, and only then check — because recognising an answer
is not the same as producing one under observation.

- [Front End Interview Handbook](https://www.frontendinterviewhandbook.com/) — Free companion to the questions below, covering formats, quizzes, coding rounds, and what each is actually testing.
- [Front-End Developer Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions) — The long-running list organised by topic, deliberately unanswered so it works as a self-test.
- [JavaScript Interview Questions](https://github.com/sudheerj/javascript-interview-questions) — Very large answered set covering the language, the DOM, and the browser APIs around them.
- [ReactJS Interview Questions](https://github.com/sudheerj/reactjs-interview-questions) — The same treatment for React, hooks and rendering behaviour included.
- [BFE.dev Quiz](https://bigfrontend.dev/quiz) — Multiple-choice questions on JavaScript, TypeScript, and React semantics, scored against everyone else's attempts. [freemium]
- [Tech Interview Handbook](https://www.techinterviewhandbook.org/) — Yangshun Tay's broader guide to the process — behavioural rounds, negotiation, and a ranked algorithm study plan.

### Frontend system design

The frontend system design round is newer than its backend cousin and asks
different questions: component API boundaries, rendering and data-fetching
strategy, caching and invalidation, state ownership, accessibility, and how the
thing degrades on a bad connection. Databases and sharding are largely not the
point. It appears mostly at mid-level and above, so it is worth knowing the format
exists before your first senior interview rather than after it.

- [GreatFrontEnd System Design](https://www.greatfrontend.com/system-design) — A worked framework for the round, with case studies on feeds, autocomplete, chat, and e-commerce. [freemium]
- [Awesome Front End System Design](https://github.com/greatfrontend/awesome-front-end-system-design) — Curated engineering write-ups from companies that built the systems the round asks you to design.
- [Frontend System Design](https://frontendmasters.com/courses/frontend-system-design/) — Course-length treatment of the same material, useful if you prefer being walked through it. [paid]

### Take-homes and live coding

The take-home is the format most worth optimising for, because it is the one where
preparation actually helps. Fix a time budget before you start, tell them what it
was, and spend the last quarter of it on a README rather than a feature: what you
built, what you deliberately left out, what you would do with another day. A
submission that is 80% complete and honest about the missing 20% reads far better
than one that quietly does not handle errors. Write tests for the part that matters
most, not for everything. If the brief has no time limit, four to six hours is a
reasonable ceiling to declare, and an employer who expects more than a day is
telling you something useful about the job.

Live coding rewards narration over speed. Say what you are about to do before you
do it, state your assumptions out loud, and ask about the edge cases rather than
guessing — the interviewer is scoring how you approach an unfamiliar problem, and a
silent candidate who arrives at the right answer scores worse than a talkative one
who does not quite finish. Start with the ugliest thing that works and improve it in
front of them. When you get stuck, say what you have ruled out.

- [Hiring Without Whiteboards](https://github.com/poteto/hiring-without-whiteboards) — A maintained list of companies that interview with take-homes or pairing instead of whiteboard algorithms.
- [Pramp](https://www.pramp.com/) — Free peer-to-peer mock interviews, where you are interviewed and then interview someone else; now hosted on Exponent.
- [interviewing.io](https://interviewing.io/) — Anonymous mock interviews with working engineers, plus a large body of free company-specific written guides. [freemium]

### Where frontend roles are posted

The listings below are where remote and startup roles concentrate. Local roles
mostly do not appear on any of them: for those, the country-specific board and
company career pages beat the aggregators, and applying directly beats both.

Read a job description as a wish list, not a specification. The required-skills
block is typically written by combining three engineers' preferences and is rarely
enforced; the responsibilities paragraph is a better description of the actual job.
Years-of-experience numbers are the least reliable line in the whole document. What
is worth reading closely is the team size, who you would report to, and whether the
posting describes work or describes culture — a listing that spends four paragraphs
on ping-pong and one on engineering is telling you the ratio.

- [HN Hiring](https://hnhiring.com/) — Searchable index of Hacker News "Who is hiring?" threads, which is where a lot of small-company roles are posted and nowhere else.
- [We Work Remotely](https://weworkremotely.com/) — Long-running remote-only board with a programming category and no recruiter spam.
- [Remote OK](https://remoteok.com/) — Remote listings with salary ranges shown on most posts and filtering by stack.
- [Wellfound](https://wellfound.com/) — Startup-focused listings that show salary and equity ranges up front, formerly AngelList Talent.

### What the market actually looks like

Observations, without encouragement attached. The junior frontend market tightened
from 2023 onward and has not returned to its 2021 shape. Roles that would once have
been advertised as junior are now routinely posted as mid-level with two or three
years required; on any board that publishes an applicant count you can watch an
entry-level listing pass several hundred within days of going up; and referrals
take a share of the resulting interviews well out of proportion to their share of
applications. Time-to-first-job for a self-taught developer is commonly measured in
months of applying rather than weeks, and past a certain threshold that number
stops being a function of how good your portfolio is.

What that means practically: applying to more listings has a poor return compared
to any path that skips the queue. Contract and agency work, internal transfers,
contributing publicly in a community where employers read, and open-source
contributions to something a company depends on all convert better per hour spent
than volume applications. Geography still dominates — a fully remote first job is
significantly harder to get than a local one, because remote roles compete
globally.

None of this says do not try, and none of it is a prediction. It says budget for
a longer search than the "learn to code in six months" material implies, keep the
skills accumulating during it, and check the numbers yourself rather than trusting
anyone's vibe, including this file's.

- [Occupational Outlook Handbook: Web Developers](https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm) — US Bureau of Labor Statistics projections for the occupation, updated on a fixed schedule and free of vendor incentive.
- [Stack Overflow Developer Survey](https://survey.stackoverflow.co/2025/) — Annual self-reported data on pay, experience, tools, and how developers found their jobs, with the raw dataset downloadable.
- [Indeed Hiring Lab](https://www.hiringlab.org/) — Indeed's economists publishing job-posting trends by occupation and country, which is the closest thing to a live index of demand.
- [levels.fyi](https://www.levels.fyi/) — Crowd-sourced compensation by company and level, which is the number to have before a salary conversation. [freemium]
- [Layoffs.fyi](https://layoffs.fyi/) — Running tracker of tech layoffs since 2020, useful as a check on whether a sector's hiring claims match its behaviour.

### Where to get your code reviewed

Reviewing is the fastest feedback loop available to someone learning alone, and
almost nobody uses it. The trick to getting a useful review is to ask a narrow
question — "is this the right place for this state?" gets an answer, "please review
my project" gets silence. Reciprocate: reviewing someone else's code teaches you
more than receiving a review, because it forces you to articulate why something
bothers you.

- [Code Review Stack Exchange](https://codereview.stackexchange.com/) — Question-and-answer site for working code that needs improving, with the strictest and most useful reviewers on this list.
- [r/webdev](https://www.reddit.com/r/webdev/) — General web development subreddit with a weekly showcase thread where portfolio and project critique actually happens.
- [#100DaysOfCode](https://www.100daysofcode.com/) — Public commitment to code and post about it daily, which is the accountability structure most likely to survive contact with a full-time job.

## Practice

Fifteen briefs, five per level, each written the same way: **what you build**, what
it **teaches** you, when it is **done**, and one **stretch** goal for when it is.

Read the criteria before you start and treat them as the contract. They are written
to be checkable by someone else, which means most of them name a tool, a number, or
a reproducible action — throttle the network and try it, run the audit, open the
Performance panel. A brief whose criteria you have quietly relaxed is a brief you
did not finish, and the relaxing is always the interesting part, so write down what
you changed and why.

These are deliberately not the projects in [ROADMAP.md](../ROADMAP.md) — that file
sequences the ones that gate a stage, and these are the ones to build alongside
them.

### Beginner projects

No framework, no build step, no backend. Everything here is HTML, CSS, and
JavaScript in files you can open directly, and the difficulty lives entirely in the
constraints.

- **A recipe page that prints properly.** One recipe, rendered for the screen and
  for paper. **Teaches:** semantic document structure, print stylesheets, `@media
  print`, typographic scale. **Done when:** it prints to a single sheet in both
  Chrome and Firefox with nothing clipped and no URLs dumped into the margins;
  ingredients are a `<ul>` and steps an `<ol>`, with no `<div>` doing either job;
  the W3C validator reports zero errors ([HTML](HTML.md#reference)); it is readable
  at 200% browser zoom with no horizontal scrollbar; total page weight is under
  100KB including the photograph. **Stretch:** a checkbox per ingredient whose
  checked state survives a reload.

- **A bill splitter that gets the money right.** Tip and split calculator for an
  arbitrary number of people. **Teaches:** form controls, constraint validation,
  `Intl.NumberFormat`, and why floating point is the wrong type for currency.
  **Done when:** every calculation happens in integer minor units, with no
  arithmetic on decimal amounts anywhere in the source; the rounding remainder is
  assigned to specific people so the split sums to the bill exactly, and there is a
  test proving it for a £10 bill split three ways; invalid input produces an inline
  message associated with its field via `aria-describedby`; the whole thing is
  operable from the keyboard alone; totals format correctly in at least three
  locales. **Stretch:** the current split is encoded in the URL so it can be sent to
  the table.

- **A gallery whose lightbox behaves.** Twelve images, one overlay, keyboard first.
  **Teaches:** focus management, the `<dialog>` element, `srcset` and responsive
  images, lazy loading. **Done when:** the overlay opens with `Enter`, closes with
  `Escape`, and returns focus to the thumbnail that opened it; `Tab` cannot reach
  anything behind an open overlay; arrow keys move between images without scrolling
  the page underneath; every image has either meaningful `alt` text or an empty one
  with a comment justifying it; no image downloaded is more than twice the CSS
  pixels it occupies at any breakpoint; axe reports zero violations
  ([Accessibility](ACCESSIBILITY.md#tools)). **Stretch:** touch swipe navigation
  that leaves every keyboard behaviour intact.

- **A pixel-faithful rebuild with no measurements.** Take a screenshot of a real
  marketing page and reproduce it from the image alone. **Teaches:** reading a
  design, spacing systems, flexbox and grid under pressure, deciding your own
  breakpoints. **Done when:** side-by-side comparisons at 1440px, 768px and 375px
  are indistinguishable at a glance; there is no absolute positioning outside
  overlays and no fixed pixel height on any container; the entire layout uses at
  most eight distinct spacing values, defined as custom properties; nothing
  overflows horizontally at 320px. **Stretch:** rebuild the same screen a second
  time using the other layout method, and write down which one fought you less and
  where.

- **A four-step form that never loses your work.** A multi-step form with no
  backend. **Teaches:** native validation, `localStorage`, history and routing
  without a router, error messaging. **Done when:** closing the tab mid-form and
  reopening restores every value and returns you to the step you were on; the
  browser back button moves back exactly one step and forward returns you; native
  constraint validation is the baseline, so the form is still usable with your
  validation script removed; no error is shown for a field the user has not yet
  touched; each error names the field and says how to fix it, and is announced to a
  screen reader. **Stretch:** a final review step listing every answer, where each
  edit link returns you to the review rather than to the end.

### Intermediate projects

A framework, a real API you do not control, and the failure modes that come with
both. Everything here assumes the network is slow and sometimes lying.

- **A search UI built for a hostile network.** Type-ahead search over any public
  dataset. **Teaches:** debouncing, `AbortController`, race conditions, cache
  invalidation, and the four states every async UI has. **Done when:** typing a long
  query on a Slow 3G throttle never renders results belonging to an earlier
  keystroke; superseded requests are visibly cancelled in the Network panel rather
  than merely ignored; loading, empty, error and success are four distinct renders,
  and the empty state distinguishes "no query" from "no results"; a failed request
  offers a retry that does not clear the input; the result count is announced via
  `aria-live`. **Stretch:** results render instantly from cache on revisit and
  revalidate in the background.

- **A table that stays fast at 5,000 rows.** Sortable, filterable, resizable
  columns. **Teaches:** virtualisation, memoisation, profiling, locale-aware
  sorting. **Done when:** scrolling top to bottom holds above 55fps in the
  Performance panel with a 4× CPU throttle applied; sorting all 5,000 rows blocks
  the main thread for under 100ms, measured, not estimated; the DOM never contains
  more than roughly three times the visible row count; a screen reader announces it
  as a table with correct row and column headers; sort and filter state round-trips
  through the URL. **Stretch:** column reordering and resizing that persist across
  sessions, with the persisted state validated before it is trusted.

- **Notes that work with the network unplugged.** A Markdown notes app, offline
  first. **Teaches:** service workers, IndexedDB, cache strategies, conflict
  resolution. **Done when:** with devtools set to Offline you can create, edit and
  read notes, and they survive a hard refresh; the app shell renders in under one
  second on a cold start against a throttled connection; an edit conflict between
  two tabs produces a visible choice rather than a silent overwrite; Lighthouse's
  installability audit passes; deploying a new version updates the service worker
  without the user having to clear site data — verify this by shipping twice.
  **Stretch:** full-text search across 1,000 notes returning in under 50ms.

- **One combobox, built from nothing.** A single autocomplete component in
  isolation. **Teaches:** the WAI-ARIA authoring practices, controlled versus
  uncontrolled APIs, focus, component testing. **Done when:** it implements the APG
  combobox keyboard contract exactly — `↓`, `↑`, `Home`, `End`, `Escape`, `Enter`,
  and typeahead — with a test per key; the same test suite passes against both the
  controlled and the uncontrolled usage; every state has a story, including loading
  and error ([React](REACTJS.md#component-tooling)); it is announced correctly by at
  least one real screen reader, not just axe; axe reports zero violations.
  **Stretch:** asynchronously loaded options with a loading state that never moves
  focus out from under the user.

- **A dashboard with authentication that survives reality.** Login, protected
  routes, token refresh. **Teaches:** auth flows, route guards, token storage,
  error boundaries. **Done when:** a hard refresh on a protected route keeps you
  signed in and lands on that route rather than the home page; three requests
  failing simultaneously on an expired token trigger exactly one refresh, proven by
  a test; signing out in one tab signs out the others; wherever the token is stored,
  the repository contains a written justification measured against
  [Security](SECURITY.md#authentication-and-sessions); a 500 from the API renders an
  error boundary rather than a blank screen. **Stretch:** role-based rendering where
  the same route differs by role, with the guard covered by tests rather than
  inspection.

### Advanced projects

Each of these has one genuinely hard problem in it. Expect the first attempt to be
wrong, and budget for the second.

- **A document two people can edit at once.** Real-time collaborative text editing.
  **Teaches:** CRDTs or operational transformation, WebSockets, presence, merge
  semantics. **Done when:** two windows typing at the same cursor position converge
  to an identical document; disconnecting one client for 30 seconds and reconnecting
  converges without dropping characters; remote cursors are visible and never move
  your own caret; the document survives a server restart; an automated test types
  1,000 characters from each of two clients concurrently and asserts the two
  documents are equal. **Stretch:** five minutes of fully offline editing that
  merges cleanly on reconnect.

- **A performance budget that blocks the merge.** Take an app you already have and
  hold it to numbers. **Teaches:** bundle analysis, code splitting, Lighthouse CI,
  preventing regressions rather than fixing them. **Done when:** a written budget
  exists with specific figures — for example 170KB of gzipped JavaScript, LCP under
  2.5s and CLS under 0.1 on a mid-tier mobile profile; a pull request that exceeds
  any of them fails CI and the failure message names what grew and by how much
  ([Performance](PERFORMANCE.md#performance-in-ci)); at least one route is
  code-split with before-and-after numbers recorded; a note records the largest win
  you took and one you deliberately did not, with the reason. **Stretch:** a bot
  comment on every pull request showing the bundle delta.

- **Fifty thousand points, interactive.** A visualisation that cannot use the DOM.
  **Teaches:** canvas or WebGL, `requestAnimationFrame`, spatial indexing, Web
  Workers. **Done when:** pan and zoom hold 60fps with 50,000 points on a mid-range
  laptop, shown in a captured trace; hover hit-testing resolves in under a
  millisecond via a spatial index rather than a linear scan; parsing and preparing
  the dataset never blocks the main thread for more than 50ms, because it happens in
  a worker; there is a non-visual equivalent — a table or a text summary — that
  conveys the same finding; no meaning is encoded in colour alone. **Stretch:** a
  time slider that plays 60 frames of data without allocating inside the render
  loop.

- **Server rendering with caching you can defend.** A meta-framework app where the
  cache is the feature. **Teaches:** SSR and streaming, cache invalidation, the
  server–client boundary, hydration. **Done when:** the first bytes of HTML arrive
  before data fetching finishes, visible as a streamed response in the Network
  panel; a mutation invalidates exactly the affected cached routes and demonstrably
  no others, proven by a test rather than by inspection; read-only pages remain
  usable with JavaScript disabled; hydration produces zero mismatch warnings in the
  console; dates and formatted numbers agree between server and client render.
  **Stretch:** per-user cached fragments, plus the test that would fail if one
  user's fragment were ever served to another.

- **A package other people can install.** One small, focused library, published.
  **Teaches:** API design, bundling, published types, semantic versioning, release
  automation. **Done when:** it ships ESM and CJS with a correct `exports` map and
  hand-written types that survive `tsc --strict` in a consuming project; `npm pack
  --dry-run` shows exactly the files you intended and nothing else; tree-shaking is
  verified by measuring a consumer bundle that imports one export
  ([Tooling](TOOLING.md#publishing-a-package)); a changelog exists and the first
  breaking change ships as a major version; the README's example was copied out,
  run unmodified, and worked. **Stretch:** a CI matrix that tests the published
  artefact in both Node and a browser, rather than testing the source.

### Guided project platforms

For when you want the design decided for you. All of these hand you a target so the
work is implementation rather than invention, which makes them a good complement to
the briefs above rather than a replacement.

- [Frontend Mentor](https://www.frontendmentor.io/) — Professional designs to build from, with a community that reviews the solutions people submit. [freemium]
- [devChallenges](https://devchallenges.io/) — Challenges grouped into responsive, JavaScript, and framework paths, each with a design and a checklist. [freemium]
- [Frontend Practice](https://www.frontendpractice.com/) — Real company websites to reproduce, graded across three levels, with no rules about the tools you use.
- [iCodeThis](https://icodethis.com/) — A daily UI challenge with an in-browser editor, aimed at building the habit rather than the portfolio. [freemium]
- [roadmap.sh Projects](https://roadmap.sh/projects) — Project briefs with requirements attached, sorted by difficulty and by the skill they exercise.
- [App Ideas Collection](https://github.com/florinpop17/app-ideas) — A large tiered list of application ideas with user stories, for when the constraint you need is simply a subject.

### Coding practice and katas

Language drills live in [JavaScript](JAVASCRIPT.md#practice) and
[TypeScript](TYPESCRIPT.md#practice) — Exercism, Codewars, and Type Challenges are
all there. What follows is the rest.

On algorithms, honestly: for most frontend roles they are the least useful thing
you can practise per hour, and for a specific minority of employers they are the
entire first round. Large product companies and anyone copying their process will
ask; agencies, startups, and most mid-sized companies will give you a component to
build instead. So do not grind by default — find out what your actual targets ask,
and if they ask, prepare for it as a named, time-boxed task rather than as an
open-ended background activity. Arrays, hash maps, recursion, and complexity
analysis cover most of what appears in frontend rounds.

- [JSchallenger](https://www.jschallenger.com/) — Small JavaScript exercises with immediate checking, arranged from beginner upward.
- [LeetCode](https://leetcode.com/) — The standard algorithm problem set, worth using only against a company list that demonstrably asks for it. [freemium]

### Frontend challenge sites

Problems written for frontend interviews specifically: implement `debounce`,
build a carousel, explain what this snippet logs. This is the closest available
proxy for the coding round at most frontend employers.

- [GreatFrontEnd](https://www.greatfrontend.com/) — Frontend interview questions with worked solutions by ex-FAANG engineers, spanning JavaScript utilities, UI components, and quizzes. [freemium]
- [BFE.dev](https://bigfrontend.dev/) — Several hundred coding questions and quizzes on JavaScript, React, CSS, and TypeScript, with an integrated editor. [freemium]
- [frontendeval](https://frontendeval.com/) — Realistic build-this-in-an-hour exercises, explicitly positioned against algorithm puzzles.
- [CodePen Challenges](https://codepen.io/challenges) — A weekly prompt on a monthly theme, built in the browser and shown to everyone else who entered. [freemium]
- [TypeHero](https://typehero.dev/) — Interactive TypeScript type-system exercises, checked in the browser as you write them.

CSS-only golf lives in [CSS](CSS.md#practice), and accessibility-specific practice
in [Accessibility](ACCESSIBILITY.md#practice).

## Tools

- [Reactive Resume](https://rxresu.me/) — Free and open-source résumé builder that exports a clean PDF and can be self-hosted.
- [FlowCV](https://flowcv.com/) — Résumé builder producing machine-readable output for applicant tracking systems, with unlimited downloads on the free tier. [freemium]
- [Make a README](https://www.makeareadme.com/) — A template and an explanation of each section, which is faster than deciding the structure yourself.
