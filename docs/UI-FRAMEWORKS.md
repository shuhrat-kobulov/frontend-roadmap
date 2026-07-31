# UI Frameworks

CSS frameworks, component libraries, and headless primitives for building interfaces without starting from scratch.
Part of the [Frontend Roadmap](../README.md).
See also [CSS](CSS.md) for the language underneath all of these,
[React](REACTJS.md) for the component layer, and
[Accessibility](ACCESSIBILITY.md) for the behaviour a primitive library gives you for free.

Three different kinds of thing get called a UI framework, and choosing well starts
with telling them apart: CSS frameworks give you styles, component libraries give
you styled behaviour, and headless primitives give you accessible behaviour with no
styles at all. Reach for a component library when the product can look like the
library and you want screens today. Reach for headless primitives plus utility CSS
when the design is your own, so you write the styling and do not re-implement focus
traps, roving tabindex, and ARIA wiring by hand. Everything below is grouped by
which of the three it is.

## Reference

Design systems worth reading for how a system is built, documented, and versioned,
rather than installed as-is.

- [Material Design 3](https://m3.material.io/) — Google's design system, with tokens, motion, and component specs published in full.
- [Carbon Design System](https://carbondesignsystem.com/) — IBM's system, unusually complete on accessibility and content guidance.
- [Atlassian Design System](https://atlassian.design/) — The system behind Jira and Confluence, strong on writing and content design.
- [Primer](https://primer.style/) — GitHub's design system, documented next to its CSS and React implementations.
- [Clarity Design System](https://clarity.design/) — UX guidelines, an HTML/CSS framework, and Angular components.
- [Polaris](https://shopify.dev/docs/api/app-home/web-components) — Shopify's admin design system, now shipped as web components. The React version is deprecated.

## Tools

### Utility-first CSS

- [Tailwind CSS](https://tailwindcss.com/) — Utility classes composed in markup instead of a stylesheet of your own. The default of the last five years.
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4) — Release post for v4: configuration in CSS, no `tailwind.config.js`, and a far faster engine.
- [Tailwind Plus](https://tailwindcss.com/plus) — Official component and template collection from the Tailwind team, formerly Tailwind UI. [paid]
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) — Resolves conflicting Tailwind classes, so a prop can reliably override a component's own styling.
- [class-variance-authority](https://cva.style/) — Declares a component's variants as class strings and infers the prop types from them.
- [daisyUI](https://daisyui.com/) — Tailwind plugin adding semantic component classes such as `btn` and `card`, plus themes.
- [UnoCSS](https://unocss.dev/) — Atomic CSS engine with no preset baked in; you define the rules, shortcuts, and scanning.
- [Panda CSS](https://panda-css.com/) — Build-time CSS-in-JS with tokens and recipes, and no runtime in the bundle.

### Headless primitives

- [Radix UI](https://www.radix-ui.com/primitives) — Unstyled, accessible React primitives. The de facto standard, and what shadcn/ui is built on.
- [Base UI](https://base-ui.com/) — Successor from the Radix, Floating UI, and Material UI teams, with APIs kept close to Radix for migration.
- [React Aria Components](https://react-aria.adobe.com/) — Adobe's primitives, with the deepest coverage of screen readers, touch, and internationalisation.
- [Headless UI](https://headlessui.com/) — Small set from the Tailwind team, made to be styled with utility classes.
- [Ark UI](https://ark-ui.com/) — State-machine-driven primitives with one API across React, Vue, Solid, and Svelte.
- [TanStack Table](https://tanstack.com/table/latest) — Headless table logic for sorting, filtering, grouping, and pagination, with the markup left to you.
- [Floating UI](https://floating-ui.com/) — Positioning engine for tooltips, popovers, and menus that have to stay on screen.

### Copy-paste components

- [shadcn/ui](https://ui.shadcn.com/) — Components installed by copying their source into your project, built on Radix and Tailwind.
- [shadcn/ui Registry](https://ui.shadcn.com/docs/registry) — How the distribution model works: the CLI copies code in, so you own and edit the files afterwards.
- [shadcn-svelte](https://shadcn-svelte.com/) — The same components and CLI for Svelte, built on Bits UI.
- [shadcn-vue](https://www.shadcn-vue.com/) — The same idea for Vue, with its own registry and CLI.
- [Magic UI](https://magicui.design/) — Animated components in the same copy-in format, made to sit alongside shadcn/ui.

### Styled component libraries

- [Material UI](https://mui.com/material-ui/) — React implementation of Material Design, and the largest of these ecosystems.
- [Mantine](https://mantine.dev/) — 120+ components and a large hooks library, styled with CSS modules rather than a runtime.
- [Chakra UI](https://chakra-ui.com/) — Token-driven components with style props and recipes, from the author of Ark UI and Zag.js.
- [Ant Design](https://ant.design/) — Dense, enterprise-oriented components whose tables and forms are the reason to pick it.

### Classic CSS frameworks

- [Bootstrap](https://getbootstrap.com/) — The most widely deployed CSS framework; v5 dropped jQuery.
- [Bulma](https://bulma.io/) — Flexbox-based CSS framework that ships no JavaScript at all.
- [UIkit](https://getuikit.com/) — Modular CSS and JavaScript framework, and the one framework of this generation still shipping.
- [Pico CSS](https://picocss.com/) — Classless CSS for semantic HTML: style a whole page by writing correct markup.

### Other ecosystems

- [PrimeVue](https://primevue.dev/) — Large Vue suite covering data tables, charts, and the parts other libraries skip.
- [Vuetify](https://vuetifyjs.com/) — Material Design components for Vue, the longest-running of them.
- [Nuxt UI](https://ui.nuxt.com/) — Vue and Nuxt components built on Reka UI and Tailwind CSS.
- [Bits UI](https://bits-ui.com/) — Headless Svelte primitives; the closest equivalent to Radix.
- [Melt UI](https://melt-ui.com/) — Svelte builders that attach behaviour to elements you write yourself.
- [Skeleton](https://www.skeleton.dev/) — Svelte UI toolkit layered on Tailwind CSS.
- [Web Awesome](https://webawesome.com/) — Framework-agnostic web components from the Font Awesome team, successor to Shoelace. [freemium]

### Legacy

Still widely encountered in older codebases and tutorials. None of them is a good
default for something new.

- [Semantic UI](https://semantic-ui.com/) — Unmaintained since late 2024; development continues only in the fork below.
- [Fomantic-UI](https://fomantic-ui.com/) — Actively maintained fork of Semantic UI, and the only reason to keep writing that markup.
- [Foundation](https://get.foundation/) — Dormant since 2024, with no active maintainers.
- [Materialize](https://materializeweb.com/) — Material Design CSS framework; the original was abandoned in 2020 and this community fork continues it.
- [Reactstrap](https://reactstrap.github.io/) — Bootstrap components for React, dormant since September 2024.

## Deep dives

The strongest argument for a primitive library is the part nobody sees in a
screenshot. A modal has to trap focus, return it to the trigger on close, close on
Escape, hide the rest of the page from screen readers, and stay correct when a
second dialog opens on top of it, and that is one component out of thirty. Radix,
Base UI, React Aria, and Ark UI have all of it written and tested against real
assistive technology. See [Accessibility](ACCESSIBILITY.md) for the rules these
libraries are implementing on your behalf.

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — The patterns, roles, and keyboard interactions every primitive library is an implementation of.
- [Use the dialog element (reasonably)](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html) — What a working dialog actually requires, and where the native element still needs help.
- [Inclusive Components](https://inclusive-components.design/) — Rebuilding menus, tabs, and toggles with accessibility as the design constraint.
