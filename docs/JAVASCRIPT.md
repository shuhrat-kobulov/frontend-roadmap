# JavaScript

Courses, references, and deep dives for the JavaScript language itself.
Part of the [Frontend Roadmap](../README.md).
See also [Tooling](TOOLING.md) for package managers, bundlers, linters, and the
runtimes that execute it, and [TypeScript](TYPESCRIPT.md) for static types on top
of the language.

## Learn

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) — Walkthrough of the whole language, from grammar and types to modules and iterators.
- [javascript.info](https://javascript.info/) — The Modern JavaScript Tutorial, taken from first script to browser APIs.
- [Learn JS](https://learn.javascript.ru/) — Modern JavaScript tutorial. [ru]
- [MDN Dynamic Scripting](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting) — MDN's JavaScript learning path, from first variable to fetching data. [beginner]
- [JavaScript Algorithms and Data Structures](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8) — Interactive JavaScript certification from freeCodeCamp. [beginner]
- [Eloquent JavaScript](https://eloquentjavascript.net/) — Book that teaches the language, then builds real programs with it.
- [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript) — Full-stack JavaScript path with a project after every lesson.

## Reference

### Language reference

- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) — Every operator, statement, and built-in object in one index.
- [ECMAScript Specification](https://tc39.es/ecma262/) — The language standard itself, the last word on behaviour. [advanced]
- [TC39 Proposals](https://github.com/tc39/proposals) — What is coming to the language, and the stage each proposal has reached.
- [Can I use](https://caniuse.com/) — Browser support tables for HTML, CSS, and JS features.
- [Web Platform Status](https://webstatus.dev/) — Baseline availability of a feature across the major browsers.

### Modern language features

- [Finished Proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md) — Year-by-year list of what actually shipped in the language.
- [ECMAScript Compatibility Table](https://compat-table.github.io/compat-table/es2016plus/) — Which engine supports which ES2016+ feature, feature by feature.
- [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) — Reading through a property chain that may not exist, with `?.`.
- [Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) — Falling back on `null` and `undefined` only, not on every falsy value.
- [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) — Pulling values out of arrays and objects, with defaults and rest patterns.
- [Array.at](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) — Indexing from the end of an array with a negative index.
- [Object.groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy) — Grouping a list by a key function, without reaching for a library.
- [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) — Deep-copying a value, built into the platform.
- [Iterator Helpers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator) — Lazy `map`, `filter`, and `take` on any iterator.
- [Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) — The replacement for `Date`: instants, durations, and time zones.

### Async

- [JS Loupe](https://latentflip.com/loupe/) — How the event loop works.
- [Execution Model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) — Agents, jobs, and the event loop, written out precisely.
- [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) — Chaining, error handling, and composing promises.
- [Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) — Writing asynchronous code that reads like synchronous code.
- [Microtask Guide](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) — What the microtask queue is, and when it drains.
- [Tasks and Microtasks](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) — Why a promise callback runs before a `setTimeout` of zero.
- [Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) — Throwing, catching, and where errors go in asynchronous code.
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) — Cancelling a fetch, an event listener, or your own async work.
- [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) — Waiting for every promise and getting each outcome, failures included.
- [Promise.any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) — Taking the first promise that fulfills, ignoring the ones that reject.
- [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) — The built-in HTTP client: requests, responses, streaming, and aborting.

### Modules

- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) — ES modules end to end: exports, imports, and loading them in a page.
- [Node.js ESM](https://nodejs.org/api/esm.html) — How ESM and CommonJS interoperate in Node, and where they do not.
- [Dynamic Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) — Loading a module only when it is needed, with `import()`.
- [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) — Mapping bare module specifiers to URLs, with no bundler involved.
- [Top-Level Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await) — Awaiting at the top of a module, and what it does to load order.
- [esm.sh](https://esm.sh/) — CDN that serves any npm package as an ES module.

### Debugging

- [Chrome DevTools](https://developer.chrome.com/docs/devtools) — Documentation for every panel in Chrome's developer tools.
- [Debug JavaScript](https://developer.chrome.com/docs/devtools/javascript) — Setting breakpoints, stepping through code, and watching values.
- [JavaScript Errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) — Every built-in error message, with what actually causes it.

## Practice

- [JavaScript30](https://javascript30.com/) — Thirty small projects in vanilla JavaScript, no frameworks or libraries.
- [Exercism](https://exercism.org/tracks/javascript) — JavaScript track with exercises and free human mentoring.
- [Codewars](https://www.codewars.com/) — Katas ranked by difficulty, with other people's solutions after you pass. [freemium]
- [JavaScript Questions](https://github.com/lydiahallie/javascript-questions) — Multiple-choice questions on language behaviour, each one explained.
- [JS Snippets](https://1loc.dev/) — 212 favorite JavaScript utilities.
- [30 Seconds of Code](https://www.30secondsofcode.org/js/p/1) — Short, explained snippets for everyday JavaScript problems.

## Tools

### Playgrounds and services

- [StackBlitz](https://stackblitz.com/) — Run a Node project or a framework starter entirely in the browser. [freemium]
- [JSON Placeholder](https://jsonplaceholder.typicode.com/) — Fake online REST API for testing and prototyping.
- [JSON Editor](https://jsoneditoronline.org/) — JSON online editor.
- [RegExr](https://regexr.com/) — Online tool to learn, build, & test regular expressions.
- [Python Tutor](https://pythontutor.com/) — Step through JavaScript line by line and watch the call stack.
- [Key.js](https://keyjs.dev/) — Shows the `key`, `code`, and legacy `keyCode` for any keypress.
- [CDN JS](https://cdnjs.com/) — Free CDN for script tags, for when a build step is not worth it.
- [Axios](https://github.com/axios/axios) — Promise-based HTTP client; `fetch` covers most cases natively.

### Data visualization

- [Apex Charts](https://apexcharts.com/) — Modern & interactive open-source charts.
- [Chart JS](https://www.chartjs.org/) — Simple yet flexible JavaScript charting.
- [D3](https://d3js.org/) — Low-level toolkit for visualizations no chart library covers.

### JWT

Tokens are an API mechanism. For a browser session, an httpOnly `SameSite` cookie
is usually the right default.

- [JWT](https://www.jwt.io/) — JSON Web Tokens.
- [Parse JWT](https://jwt.ms/) — Parse a JWT.

## Deep dives

- [You Don't Know JS #1](https://github.com/getify/You-Dont-Know-JS) — Series of books about JavaScript.
- [You Don't Know JS #2](https://github.com/getbodya/you-dont-know-js-ru) — Series of books about JavaScript. [ru]
- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) — Why an inner function keeps the scope it was created in.
- [Inheritance and the Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain) — How property lookup really works, under classes and plain objects alike.
- [The this Keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) — What `this` is bound to in every call form, and why.
- [Equality Comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness) — Where `==`, `===`, and `Object.is` differ, and which one to use.
- [JavaScript Equality Table](https://dorey.github.io/JavaScript-Equality-Table/) — Every comparison result in one grid, coercion included.
- [wtfjs](https://github.com/denysdovhan/wtfjs) — List of funny and tricky JavaScript examples, each one explained.
- [You Might Not Need jQuery](https://youmightnotneedjquery.com/) — Vanilla equivalents for jQuery methods, for when you meet it in old code.
- [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management) — How the garbage collector decides what to free, and how leaks happen.
