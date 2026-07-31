# React

Learning path, reference, and ecosystem for React — components, hooks, React 19, and the libraries you reach for around them.
Part of the [Frontend Roadmap](../README.md).
See also [TypeScript](TYPESCRIPT.md) for typing components and props,
[Frameworks](FRAMEWORKS.md) for Next.js and the meta-framework layer,
[Testing](TESTING.md) for testing what you build, and [Security](SECURITY.md) for auth and XSS.

## Learn

- [React Docs](https://react.dev/learn) — Official documentation, rewritten around hooks and function components. Start here; everything else assumes it.
- [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe) — Build a small game in the browser in an afternoon, with no setup. [beginner]
- [Thinking in React](https://react.dev/learn/thinking-in-react) — Going from a design mockup to a component tree, and deciding where state belongs.
- [Learn React](https://scrimba.com/learn-react-c0e) — Interactive course taught inside an editor you type into, by Bob Ziroll. [freemium]
- [Full Stack Open](https://fullstackopen.com/en/part1) — University of Helsinki course; part 1 is React from first principles.

## Reference

### Getting started

- [Creating a React App](https://react.dev/learn/creating-a-react-app) — Official picks for a new app: Next.js, React Router, or Expo. Use one when you need routing and server rendering.
- [Build a React App from Scratch](https://react.dev/learn/build-a-react-app-from-scratch) — Vite and React for a client-rendered SPA, when a framework is more than the project needs.
- [Vite Guide](https://vite.dev/guide/) — Scaffolding with `npm create vite@latest`, the toolchain under most React SPAs today.
- [Sunsetting Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) — Deprecation notice from February 2025. CRA is archived, so skip any tutorial that starts with it.

### Core concepts

- [Your First Component](https://react.dev/learn/your-first-component) — Defining, exporting, and nesting the unit everything else is built from.
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) — Handing data down, default values, and the props spread.
- [Passing JSX as Children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) — Composition through `children`, which is React's answer to inheritance.
- [Conditional Rendering](https://react.dev/learn/conditional-rendering) — Rendering different markup per branch, without leaking a stray `0` into the page.
- [Rendering Lists](https://react.dev/learn/rendering-lists) — Mapping data to elements, and why a key must be stable and not the array index.
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) — What `useState` holds, and what makes a value state rather than a plain variable.
- [Render and Commit](https://react.dev/learn/render-and-commit) — The three steps of every update: trigger, render, commit to the DOM.
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) — Why a state variable does not change until the next render.
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state) — Replacing instead of mutating, which is the rule rendering depends on.
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) — Lifting state to the nearest common parent and passing it back down.
- [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state) — How position in the tree decides what survives a re-render, and how `key` resets it.

### Hooks

- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks) — Top level only, from React functions only. Both rules, and the reason each exists.
- [useState](https://react.dev/reference/react/useState) — Full reference: updater functions, lazy initialisers, and resetting by key.
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) — What an Effect is actually for: syncing with a system outside React, and cleaning up after it.
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — The highest-value page in the docs. Read it before writing another `useEffect`.
- [Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies) — Fixing a dependency array by changing the code, never by deleting the dependency.
- [useRef](https://react.dev/reference/react/useRef) — A value that survives re-renders without causing one, plus refs to DOM nodes.
- [useMemo](https://react.dev/reference/react/useMemo) — Caching an expensive calculation between renders. The React Compiler removes most hand-written cases.
- [useCallback](https://react.dev/reference/react/useCallback) — The same idea for a function identity, usually paired with `memo`.
- [useContext](https://react.dev/reference/react/useContext) — Reading a value from the nearest provider above in the tree.
- [useReducer](https://react.dev/reference/react/useReducer) — Moving state transitions into one function once `useState` calls start multiplying.
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) — Extracting stateful logic into a hook of your own.
- [useHooks](https://usehooks.com/) — Collection of ready-made, server-safe hooks to read or copy.
- [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks) — Lint rules from the React team that enforce everything above.

### React 19

- [React 19](https://react.dev/blog/2024/12/05/react-19) — Release post: Actions, the `use` API, ref as a prop, and document metadata.
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) — Breaking changes and codemods for moving an existing app across.
- [Actions](https://react.dev/blog/2024/12/05/react-19#actions) — Async transitions that handle pending state, errors, and optimistic updates for you.
- [useActionState](https://react.dev/reference/react/useActionState) — State, pending flag, and form action from a single hook.
- [useOptimistic](https://react.dev/reference/react/useOptimistic) — Showing the expected result while the request is still in flight.
- [use](https://react.dev/reference/react/use) — Reading a promise or a context during render, conditionally and in a loop.
- [ref as a Prop](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop) — Function components accept `ref` directly, and `forwardRef` is on its way out.
- [React Compiler](https://react.dev/learn/react-compiler) — Build-time memoisation that replaces most `useMemo`, `useCallback`, and `memo`.
- [React 19.2](https://react.dev/blog/2025/10/01/react-19-2) — `<Activity>`, `useEffectEvent`, partial pre-rendering, and Performance Tracks.

### Server Components

- [Server Components](https://react.dev/reference/rsc/server-components) — Components rendered on the server or at build time, shipping no JavaScript to the client.
- [Server Functions](https://react.dev/reference/rsc/server-functions) — Calling a server-side function from the client without writing an API route.
- [Directives](https://react.dev/reference/rsc/directives) — `'use client'` and `'use server'`, the markers between the two worlds.
- [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/) — The mental model, built from the ground up before any framework syntax.

## Practice

- [Bulletproof React](https://github.com/alan2207/bulletproof-react) — Reference architecture for a real application, with the reasoning behind each decision written down.
- [reactpractice.dev](https://reactpractice.dev/) — Small, focused exercises with worked solutions to check yourself against. [freemium]

## Tools

### Data fetching

- [TanStack Query](https://tanstack.com/query/latest) — Caching, revalidation, and request dedupe for server state. The default choice.
- [SWR](https://swr.vercel.app/) — Lighter take on the same stale-while-revalidate idea. Pick it if Query is more than you need.
- [Fetching Data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects) — Race conditions, waterfalls, and no caching: why hand-rolled fetching in an Effect goes wrong.

### State management

- [Managing State](https://react.dev/learn/managing-state) — Structuring, lifting, and sharing state with the built-ins. Usually enough on its own.
- [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context) — `useReducer` plus context, the built-in answer to app-wide state.
- [Zustand](https://github.com/pmndrs/zustand) — Small hook-based store with no provider and no boilerplate. The default once the built-ins run out.
- [Redux Toolkit](https://redux-toolkit.js.org/) — Official Redux with batteries included. Pick it for a large team that wants one enforced pattern.
- [Jotai](https://jotai.org/) — Bottom-up atoms. Pick it when state is many small independent pieces rather than one tree.

### Forms

- [React Hook Form](https://react-hook-form.com/) — Uncontrolled inputs and subscriptions, so typing does not re-render the whole form. The default.
- [Zod](https://zod.dev/) — Schema validation that infers the TypeScript type, wired in through `@hookform/resolvers`.
- [TanStack Form](https://tanstack.com/form/latest) — Type-safe alternative. Pick it for the same form API across frameworks.
- [Form Actions](https://react.dev/reference/react-dom/components/form) — Passing a function to `<form action>`, the React 19 way to submit without a library.

### Routing

- [React Router](https://reactrouter.com/) — The default router; framework mode adds data loading and server rendering on top.
- [TanStack Router](https://tanstack.com/router/latest) — Type-safe routes and search params. Pick it when you want the URL fully typed.

### Component tooling

- [React Developer Tools](https://react.dev/learn/react-developer-tools) — Browser extension for inspecting the component tree, its props, and the Profiler.
- [Storybook](https://storybook.js.org/) — Develop and document components in isolation, one state per story.

## Deep dives

### Performance

- [Why React Re-Renders](https://www.joshwcomeau.com/react/why-react-re-renders/) — What actually triggers a re-render, and why most of them cost nothing.
- [Before You memo()](https://overreacted.io/before-you-memo/) — Two restructurings that beat memoisation, from a React team member.
- [memo](https://react.dev/reference/react/memo) — Skipping a re-render when props are unchanged, and when that is worth doing.
- [lazy](https://react.dev/reference/react/lazy) — Loading a component's code the first time it renders.
- [Suspense](https://react.dev/reference/react/Suspense) — Declaring a fallback while children load, for code splitting and data alike.
- [TanStack Virtual](https://tanstack.com/virtual/latest) — Rendering only the visible rows of a long list. The default for virtualization.
- [react-window](https://github.com/bvaughn/react-window) — Lighter alternative for fixed-size lists and grids.
- [why-did-you-render](https://github.com/welldone-software/why-did-you-render) — Development-only logging of avoidable re-renders and the prop behind each one.

### Patterns

- [React Patterns](https://www.patterns.dev/react/) — Compound components, render props, higher-order components, and the rendering patterns around them.
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) — Catching a render-time crash in one subtree instead of blanking the page.
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) — Error boundary as a component and a hook, so you never write the class yourself.
- [createPortal](https://react.dev/reference/react-dom/createPortal) — Rendering children into a different DOM node, for modals and tooltips.
- [React for Two Computers](https://overreacted.io/react-for-two-computers/) — What Server Components are really solving, from first principles. [advanced]
- [Legacy React Docs](https://legacy.reactjs.org/) — Class components and lifecycle methods, for maintaining pre-hooks code.
- [Awesome React](https://github.com/enaqx/awesome-react) — Collection of awesome things regarding the React ecosystem.
