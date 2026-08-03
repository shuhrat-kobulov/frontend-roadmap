# Testing

What to test, which tools to reach for, and how to run the whole suite in CI without it becoming the thing everyone ignores.
Part of the [Frontend Roadmap](../README.md).
See also [Accessibility](ACCESSIBILITY.md) for the manual half of a11y work that no tool can automate,
[Performance](PERFORMANCE.md) for the metrics the budgets below enforce,
[TypeScript](TYPESCRIPT.md) for the static layer underneath every test here, and
[Tooling](TOOLING.md) for the build and CI setup the suite runs inside.

Tests exist so you can change code without fear. That is the entire return, and
every testing decision answers to it: a test that fails only when a user would
have noticed is doing its job, and a test that fails when you rename a function
is charging you rent.

The shape most frontend teams land on is the testing trophy rather than the
classic pyramid. Static checks sit at the base and cost nothing per test:
TypeScript and a linter catch a whole class of bug before you write an assertion.
Most of the deliberate effort goes into **component tests**: render the real
markup, click it the way a person would, assert on what they would see. That layer
buys the most confidence per line of test code, because it exercises the wiring
between components, which is where frontend bugs actually live. Above it, a thin
set of end-to-end tests covers the few flows the business genuinely depends on —
sign-up, checkout, the one report everybody exports. Unit tests stay for logic
that is tricky on its own: date maths, parsers, pricing rules.

The failure mode worth naming is **testing implementation details** — asserting on
state, props, or CSS class names instead of rendered output. Those tests break on
refactors that changed nothing a user could see, and sail past bugs a user would
hit on the first click. Query what a screen reader would announce, interact the
way a person would, assert on what they would see.

**A default stack.** For anything new: **Vitest** for unit and component tests, because
it shares Vite's config and transform pipeline so there is no second build setup to
keep in sync, and it is fast enough to leave running in watch mode. **Testing
Library** for driving the DOM, because it makes the accessible query the easiest one
to write, so tests and accessibility improve together. **Playwright** for end-to-end,
because it parallelises by default, runs real Chromium, Firefox, and WebKit, and its
trace viewer turns a red CI run into something you can actually debug. Jest and
Cypress are the alternatives, and you will meet both in existing codebases — neither
is a mistake, and neither is what you would pick starting fresh in 2026.

## Learn

The canonical essays, in the order they build on each other. They are short, they
are the source of the vocabulary every testing tool now uses, and reading them
first will save you from writing a suite you later delete.

- [Write Tests. Not Too Many. Mostly Integration.](https://kentcdodds.com/blog/write-tests) — The sentence the modern frontend consensus is built on, and the cost-benefit reasoning behind it.
- [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) — Static, unit, integration, and end-to-end, and why the trophy replaces the pyramid for UI work.
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details) — Why tests coupled to internals both break too often and catch too little. The most useful thing on this page.
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) — Long, thorough, and language-agnostic: what each layer is for and how to avoid duplicating coverage across them.
- [Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html) — Google's account of what happens when the top of the pyramid grows: slow suites, flaky results, and teams that stop trusting them.
- [Canon TDD](https://tidyfirst.substack.com/p/canon-tdd) — Kent Beck restating what test-driven development actually is, after two decades of people describing something else.

## Reference

### Unit and component testing

Vitest is the default for new projects: it reads your existing Vite config, so
aliases, plugins, and environment variables work in tests without a parallel build
setup, and its watch mode is fast enough to keep open. Jest still runs an enormous
share of existing codebases and is worth knowing for that reason alone — the APIs
overlap almost completely, so what you learn transfers either direction.

- [Vitest](https://vitest.dev/) — The default test runner for anything built on Vite. Jest-compatible API, native ESM and TypeScript, instant watch mode.
- [Why Vitest](https://vitest.dev/guide/why.html) — The case for it over Jest, including the config-duplication problem it exists to solve.
- [Vitest Browser Mode](https://vitest.dev/guide/browser/) — Running component tests in a real browser instead of jsdom, for when the simulated DOM stops being close enough.
- [Jest](https://jestjs.io/docs/getting-started) — The incumbent runner, and the one most existing projects use. Also the source of the `describe`/`it`/`expect` vocabulary everything else copied.
- [Node.js Test Runner](https://nodejs.org/api/test.html) — The runner built into Node, with no dependency to install. Enough for library and utility code that never touches the DOM.

### Testing UI

One idea powers this whole family of libraries: *the more your tests resemble the
way your software is used, the more confidence they can give you*. In practice that
means finding elements by their accessible role and name rather than by test IDs or
CSS selectors, which is also why a suite written this way keeps catching
accessibility regressions as a side effect.

- [Testing Library](https://testing-library.com/) — The hub for the whole family, with adapters for React, Vue, Svelte, Angular, and plain DOM.
- [Guiding Principles](https://testing-library.com/docs/guiding-principles/) — The short page that explains every API decision in the library. Read it before the API docs.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — Rendering React components and asserting on output rather than internals. The standard way to test React in 2026.
- [About Queries](https://testing-library.com/docs/queries/about/) — The query priority list: `getByRole` first, `getByTestId` last, and the reasoning for that order.
- [user-event](https://testing-library.com/docs/user-event/intro/) — Simulates real interaction — focus, key sequences, pointer events — instead of firing a single synthetic event.
- [jest-dom](https://github.com/testing-library/jest-dom) — DOM matchers such as `toBeVisible` and `toHaveAccessibleName`, which turn assertion failures into readable sentences.
- [Testing Playground](https://testing-playground.com/) — Paste markup, click an element, get the query you should be using. The fastest way to learn the priority order.

### End-to-end

End-to-end tests are the only ones that prove the whole system works, and the most
expensive to keep green — so cover the few flows that would cost real money if they
broke, and stop. Playwright is the default: parallel by default, one API across
Chromium, Firefox, and WebKit, and auto-waiting locators that remove the sleep-and-retry
code that makes suites flaky. Cypress has the friendlier debugging experience and a
large body of existing tests, but runs in-browser, which constrains multi-tab and
cross-origin work.

- [Playwright](https://playwright.dev/) — Cross-browser end-to-end testing with auto-waiting, parallel execution, and a code generator to bootstrap the first test.
- [Playwright Best Practices](https://playwright.dev/docs/best-practices) — What to test, what to isolate, and which habits produce flaky suites. Short and worth re-reading later.
- [Locators](https://playwright.dev/docs/locators) — Playwright's selector model, built around accessible roles and labels rather than CSS paths.
- [Fixtures](https://playwright.dev/docs/test-fixtures) — Setup and teardown as injectable values, so authentication and seeded data are declared per test rather than in shared hooks.
- [Parameterised Tests](https://playwright.dev/docs/test-parameterize) — Running one test body across a table of test data, including reading cases from a CSV.
- [Trace Viewer](https://playwright.dev/docs/trace-viewer-intro) — A recording of a failed run — DOM snapshots, network, console — which is what makes CI failures debuggable without reproducing them.
- [Why Cypress?](https://docs.cypress.io/app/get-started/why-cypress) — The alternative, and its architecture: tests run inside the browser, with time-travel debugging.
- [Cypress Best Practices](https://docs.cypress.io/app/core-concepts/best-practices) — The official anti-pattern list. Useful even on Playwright, since most entries are about test design, not Cypress.

### Mocking and test data

Mock at the network boundary, not inside your code. Stubbing `fetch` couples the
test to how the request is made, so swapping to a different client breaks tests
without breaking behaviour; intercepting at the network layer leaves your code
untouched and lets the same handlers serve unit tests, end-to-end tests, and local
development. And prefer not to mock at all where the real thing is fast and
deterministic — every mock is a copy of an interface that can drift from it.

- [Mock Service Worker](https://mswjs.io/) — Intercepts requests at the network level, so application code makes real calls and never knows it is being tested.
- [MSW Philosophy](https://mswjs.io/docs/philosophy) — The argument for intercepting instead of stubbing, and what mocking the client costs you. This is the "why" page.
- [Mock APIs](https://playwright.dev/docs/mock) — Intercepting and stubbing network traffic in end-to-end tests, plus recording real responses to replay later.
- [Mocking](https://vitest.dev/guide/mocking.html) — Vitest on mocking modules, timers, and globals, and which of those you should reach for last.
- [Faker](https://fakerjs.dev/) — Generates realistic names, addresses, and dates, so fixtures stop being `"test1"` and start surfacing layout bugs.
- [Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html) — The vocabulary — stub, mock, fake, spy — and the classicist argument for using far fewer of them. [advanced]

### Type-level testing

Types catch a different class of error than tests do, and neither substitutes for
the other: a fully typed function can still compute the wrong answer, and 100% type
coverage says nothing about behaviour. What type-level tests are genuinely for is
library work — asserting that a generic signature still infers what you promised
after you refactor it. See [TypeScript](TYPESCRIPT.md) for the type system itself.

- [Testing Types](https://vitest.dev/guide/testing-types.html) — Vitest's `expectTypeOf` and `assertType`, running type assertions alongside the rest of the suite.
- [expect-type](https://github.com/mmkal/expect-type) — Compile-time assertions about inferred types, and the library Vitest's type testing is built on.
- [type-coverage](https://github.com/plantain-00/type-coverage) — Reports what percentage of your code is actually typed rather than silently `any`. A different number from test coverage, and a useful one.

## Tools

### Visual and regression testing

Screenshot testing catches the things assertions cannot describe — a broken grid, a
z-index regression, a font that failed to load. Be honest about the cost before
adopting it: snapshots go stale on every intentional design change, and they fail
across operating systems, browser versions, and font rendering differences, so a
suite without a stable container and a review workflow becomes a queue of diffs
nobody approves. Start with the two or three screens that matter most.

- [Visual Comparisons](https://playwright.dev/docs/test-snapshots) — Playwright's built-in screenshot assertions, with per-platform baselines and a configurable diff threshold. Free, and enough to start with.
- [Storybook Test Runner](https://storybook.js.org/docs/writing-tests/integrations/test-runner) — Turns every story into an executable test, so the component catalogue doubles as the smoke suite.
- [Chromatic](https://www.chromatic.com/) — Hosted visual review for Storybook: renders on their infrastructure and turns diffs into a per-PR approval step. [freemium]
- [Argos](https://argos-ci.com/) — Open-source visual review that ingests screenshots from Playwright or Cypress, so the tests stay in your repo. [freemium]

### Accessibility testing

Put a bound on what this buys you: automated checks find some of the real
accessibility problems, never most of them. The figure usually quoted is 20–30% of
issues; Deque's own study of axe-based testing argues for around 57%, and even that
leaves nearly half undetected. Contrast ratios and missing labels are detectable;
whether the focus order makes sense, whether an error message actually explains the
error, and whether the page is usable by keyboard alone are not. **Automated a11y
tests are a floor, not a pass — manual keyboard and screen reader testing is still
required.** See [Accessibility](ACCESSIBILITY.md) for how to do that half.

- [axe-core](https://github.com/dequelabs/axe-core) — The rules engine behind nearly every accessibility checker, browser extensions included. The tools below all wrap it.
- [jest-axe](https://github.com/nickcolley/jest-axe) — The axe engine as a single matcher in Jest or Vitest, so a component test can also assert the component has no obvious violations.
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing) — Running axe over real pages in end-to-end tests, including how to scope scans and handle known issues.
- [Accessibility Tests](https://storybook.js.org/docs/writing-tests/accessibility-testing) — Checking every story as you build it, which is the cheapest place to catch a violation.
- [Automated Accessibility Testing Coverage](https://www.deque.com/automated-accessibility-testing-coverage/) — The measured numbers behind the caveat above, from the people who wrote the engine.

### Performance testing

Performance regressions arrive one dependency at a time, which is exactly what CI is
good at catching. Two checks cover most of it: a Lighthouse run against a deployed
preview, and a hard byte budget on the bundle that fails the build when someone
imports a date library to format one timestamp. See [Performance](PERFORMANCE.md)
for what the numbers mean.

- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) — Runs Lighthouse on every commit and asserts against thresholds, so a score drop blocks the PR instead of being noticed a quarter later.
- [Size Limit](https://github.com/ai/size-limit) — Fails CI when the bundle exceeds a byte budget you set, and reports the download and execution time that budget implies.
- [Performance Budgets 101](https://web.dev/articles/performance-budgets-101) — How to pick numbers that are defensible rather than arbitrary, and where to enforce them.

### Testing in CI

A suite only pays off when it runs on every pull request, and it only keeps paying
off if it stays trustworthy — one test that fails at random teaches the whole team
to re-run the job instead of reading it, and from then on the suite catches nothing.
Quarantine flaky tests immediately and fix them properly. On coverage: use it to find
untested areas, never as a target. 100% coverage is achievable with tests that assert
nothing, and chasing it produces exactly those tests.

- [Building and Testing Node.js](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs) — The GitHub Actions workflow to copy: install, cache, matrix across Node versions, run the suite.
- [Playwright on CI](https://playwright.dev/docs/ci-intro) — Running browsers in CI, plus uploading the HTML report and traces so failures are diagnosable after the fact.
- [Sharding](https://playwright.dev/docs/test-sharding) — Splitting one suite across parallel machines and merging the reports, which is how a long end-to-end run stays under ten minutes.
- [Coverage](https://vitest.dev/guide/coverage.html) — Vitest coverage via V8 or Istanbul, including how to report it per PR and where a threshold is genuinely warranted.

## Practice

- [JavaScript & Node.js Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices) — Around fifty bullet-pointed practices with code for each. The best single review checklist for your own tests.
- [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app) — A full payment application with the test suite a real product would have. Read the tests before you write your own.
- [Testing Library Examples](https://testing-library.com/docs/example-codesandbox/) — Runnable sandboxes for the common cases, so you can break a passing test and see what it says.
- [Playwright TodoMVC Demo](https://demo.playwright.dev/todomvc) — The app Playwright's own example suite drives. A safe target for a first end-to-end test against something you did not build.
- [Kata-Log](https://kata-log.rocks/) — Small, repeatable exercises for practising test-driven development on problems that fit in one sitting.

## Deep dives

- [Test Coverage](https://martinfowler.com/bliki/TestCoverage.html) — Why coverage is a useful diagnostic and a terrible target, in about four hundred words.
- [Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html) — The systematic causes of flakiness — shared state, async, time, resource leaks — and the fix for each. [advanced]
- [Flaky Tests at Google](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html) — What flakiness costs at scale, with the numbers, and how they keep a suite of that size credible.
- [UnitTest](https://martinfowler.com/bliki/UnitTest.html) — Why nobody agrees on what a unit test is, and the solitary-versus-sociable distinction that makes the argument tractable.
