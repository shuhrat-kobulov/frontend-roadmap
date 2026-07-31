# TypeScript

Learning path and working reference for TypeScript, from first annotation to tsconfig and the type-level end of the language.
Part of the [Frontend Roadmap](../README.md).
See also [JavaScript](JAVASCRIPT.md) for the language underneath, and
[Tooling](TOOLING.md) for the bundlers and linters that compile it.

## Learn

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — The official book on the language, and the thing every other resource assumes you have read.
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) — The five-minute version, for someone who already writes JavaScript. [beginner]
- [Total TypeScript Essentials](https://www.totaltypescript.com/books/total-typescript-essentials) — Free book that teaches the language through exercises you fix in place.
- [Total TypeScript Tutorials](https://www.totaltypescript.com/tutorials) — Free interactive workshops on the beginner path, generics, and type transformations.
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript) — Free book covering the language and the day-to-day gotchas around it.
- [Effective TypeScript](https://effectivetypescript.com/) — Item-by-item advice on writing TypeScript that pulls its weight. [intermediate]

## Reference

### Core concepts

- [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) — What static types are and what the compiler actually checks for you.
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — The handful of types you write on most lines of most files.
- [Unions and Intersections](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html) — Values that are one of several types, and shapes combined out of several types.
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — How control flow turns a wide union into one concrete type.
- [Type Predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) — Writing `x is Foo` guards so narrowing survives a function call.
- [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) — Modelling state as a tagged union so impossible combinations stop compiling.
- [Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Parameters, return types, overloads, and generic signatures.
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) — Optional, readonly, and index-signature members of an object shape.
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) — Functions and types that keep the caller's type instead of widening it away.
- [unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown) — The safe alternative to `any` for a value you have not checked yet.
- [never](https://www.typescriptlang.org/docs/handbook/2/functions.html#never) — The type of a value that cannot exist, and the trick behind exhaustiveness checks.
- [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) — Members, visibility, inheritance, and type parameters on classes.
- [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) — Imports, exports, and what makes TypeScript treat a file as a module at all.

### Type-level techniques

- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) — Built-ins such as `Partial`, `Pick`, `Omit`, and `ReturnType`.
- [keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) — The union of an object type's keys, and the basis of most generic helpers.
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) — Types that branch on `extends`, which is where type-level code starts.
- [infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types) — Capturing a type out of another type from inside a conditional.
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) — Building a new object type by transforming every key of an existing one.
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) — String types built from other string types, plus `Uppercase` and friends.
- [satisfies](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) — Checking a value against a type without throwing away the narrower inferred one.
- [const Assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) — `as const`, which freezes a literal into its narrowest readonly type.

### Project setup

- [TSConfig Reference](https://www.typescriptlang.org/tsconfig/) — Every compiler option, what it does, and what it defaults to.
- [Project Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) — What a tsconfig.json is for, and how the compiler finds and merges it.
- [TSConfig Cheat Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet) — One annotated tsconfig for a modern app, with the reasoning behind each line.
- [TSConfig Bases](https://github.com/tsconfig/bases) — Ready-made configs per runtime and framework, meant to be extended rather than copied.
- [strict](https://www.typescriptlang.org/tsconfig/#strict) — The flag that switches on the checks the type system is worth using for. Turn it on first.
- [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) — Makes `arr[i]` possibly `undefined`, which it always was.
- [moduleResolution](https://www.typescriptlang.org/tsconfig/#moduleResolution) — Set to `"bundler"` for an app built by Vite, webpack, or esbuild.
- [verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax) — Emits imports exactly as written, so a single-file transpiler cannot guess wrong.
- [paths](https://www.typescriptlang.org/tsconfig/#paths) — Import aliases such as `@/components`, which the bundler must be told about too.
- [Type-Only Imports](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export) — `import type`, which is erased at build time instead of pulling in a module.
- [Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) — Reading and writing the `.d.ts` files that put types on untyped JavaScript.
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) — The `@types/*` repository, for libraries that ship no types of their own.

### With React

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) — The canonical answer to "how do I type this React thing".
- [Using TypeScript](https://react.dev/learn/typescript) — React's own guide to typing components, props, and hooks.
- [Typing Components](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example) — Props, children, and the shapes a component is allowed to accept.
- [Typing Hooks](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks) — `useState`, `useReducer`, and the two flavours of `useRef`.
- [Forms and Events](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events) — Which event type belongs on which handler, without reaching for `any`.

## Practice

- [Type Challenges](https://github.com/type-challenges/type-challenges) — Type-level puzzles from warm-up to extreme, solved in the playground.
- [TypeScript Exercises](https://typescript-exercises.github.io/) — Sixteen broken files to repair, each one teaching a single idea.
- [Type-Level TypeScript](https://type-level-typescript.com/) — Free course treating the type system as the functional language it is. [advanced]
- [Exercism](https://exercism.org/tracks/typescript) — TypeScript track with exercises and free human mentoring.

## Tools

- [TypeScript Playground](https://www.typescriptlang.org/play/) — Run, share, and inspect types in the browser, with every compiler flag exposed.
- [TypeScript Cheat Sheets](https://www.typescriptlang.org/cheatsheets/) — Official one-page sheets for types, interfaces, classes, and control flow.
- [tsx](https://tsx.is/) — Runs a TypeScript file directly in Node, with no build step in front of it.
- [typescript-eslint](https://typescript-eslint.io/) — Lint rules that use type information rather than the syntax tree alone.
- [Zod](https://zod.dev/) — Runtime schema validation that infers the static type from the schema.
- [type-fest](https://github.com/sindresorhus/type-fest) — Collection of utility types the standard library leaves out.
- [ts-reset](https://github.com/mattpocock/ts-reset) — Sharpens built-in types, so `JSON.parse` returns `unknown` and `filter(Boolean)` works.

## Deep dives

- [Enums](https://www.typescriptlang.org/docs/handbook/enums.html) — Named constant sets. A union of string literals covers most uses with no emitted code.
- [const Enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums) — Inlined enums, and why `isolatedModules` and single-file transpilers reject them.
- [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) — Legacy: the `experimentalDecorators` design, still what Angular and NestJS are built on.
- [Decorators in TypeScript 5.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators) — The TC39 standard decorators that supersede the legacy ones, and how they differ.
- [Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html) — Legacy: the pre-modules way of grouping code. Do not learn this before ES modules.
- [Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html) — The classic and Node algorithms, kept for codebases predating `"bundler"`.
- [Iterators and Generators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html) — Typing the iterable protocols and generator functions.
- [Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html) — What landed in every version, which is the real changelog of the type system.
- [A 10x Faster TypeScript](https://devblogs.microsoft.com/typescript/typescript-native-port/) — The port of the compiler to Go that becomes TypeScript 7.
