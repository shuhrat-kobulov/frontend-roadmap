# CSS

References, guides, and tools for modern CSS — layout, the cascade, color, and motion.
Part of the [Frontend Roadmap](../README.md).
See also [Accessibility](ACCESSIBILITY.md) for contrast ratios and reduced motion,
and [Performance](PERFORMANCE.md) for render cost and critical CSS.

## Learn

- [Learn CSS](https://web.dev/learn/css) — Course covering the whole language, from the box model to layout.
- [MDN Styling Basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics) — MDN's CSS learning path, from selectors to layout and text styling. [beginner]
- [Learn Responsive Design](https://web.dev/learn/design) — Course on layouts that hold up at any screen size.
- [Modern CSS Solutions](https://moderncss.dev/) — Series rebuilding common UI patterns with current CSS.
- [Interactive Guide to Flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/) — Flexbox taught through a playable demo of every property.
- [Interactive Guide to Grid](https://www.joshwcomeau.com/css/interactive-guide-to-grid/) — Grid taught the same way, tracks and areas included.

## Reference

### Language reference

- [CSS Reference #1](https://cssreference.io/) — List of all CSS properties.
- [CSS Reference #2](https://tympanus.net/codrops/css_reference/) — Extensive CSS reference with all the important properties.
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) — Every property, selector, function, and at-rule in one index.
- [Can I use](https://caniuse.com/) — Browser support tables for CSS features, version by version.
- [Web Platform Status](https://webstatus.dev/) — Baseline availability of a feature across the major browsers.

### Layout

- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) — Comprehensive guide to CSS flexbox layout.
- [Grid Guide](https://css-tricks.com/complete-guide-css-grid-layout/) — Every grid property and value, with diagrams.
- [Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid) — Letting a nested grid inherit its parent's tracks.
- [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) — Styling an element by the size of its container, not the viewport.
- [Container Queries Guide](https://ishadeed.com/article/css-container-query-guide/) — Worked examples, container units, and the gotchas.
- [Box Sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_sizing) — Intrinsic sizing with `min-content`, `max-content`, and `fit-content`.
- [Aspect Ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio) — Holding a box's proportions without the padding hack.
- [Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning) — Tethering a positioned element to another element.
- [CSS Layout](https://csslayout.io/) — Collection of popular layouts and patterns.

### The cascade

- [The Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction) — How the browser picks a winner when declarations conflict.
- [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity) — The scoring system that decides which selector wins.
- [Inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Inheritance) — Which properties pass down to children, and how to force it.
- [Cascade Layers](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer) — `@layer`, for ordering whole blocks of CSS on purpose.
- [The :has() Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has) — Matching an element by what it contains, parents included.
- [CSS Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using) — Native nesting, and where it differs from a preprocessor's.
- [Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) — Declaring, scoping, inheriting, and falling back on CSS variables.
- [Registered Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property) — `@property`, giving a variable a type so it can animate.

### Responsive and fluid

- [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using) — Range syntax, user-preference queries, and how to combine them.
- [Clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp) — `clamp()` for a value that scales between a floor and a ceiling.
- [Utopia](https://utopia.fyi/) — Calculator for fluid type and space scales built on `clamp()`.
- [Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values) — Block and inline directions instead of top, right, bottom, left.
- [Text Wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap) — `balance` and `pretty`, for headings and paragraphs that break well.
- [Field Sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/field-sizing) — Form controls that grow and shrink to fit their content.
- [Defensive CSS](https://defensivecss.dev/) — Snippets that stop layouts breaking on real content.

### Color and typography

- [OKLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch) — Perceptually uniform color in a wide-gamut space.
- [OKLCH Color Picker](https://oklch.com/) — Pick oklch values and see where they fall out of gamut.
- [Color Mix](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix) — `color-mix()`, blending two colors in a chosen color space.
- [Relative Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Using_relative_colors) — Deriving a new color from an existing one, in CSS.
- [OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) — Why to leave rgb and hsl behind, with the theory made readable.
- [Variable Fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts) — One font file, every weight and width, through variation axes.
- [Modern Font Stacks](https://modernfontstacks.com/) — System font stacks that need no web font download.
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) — Check a foreground and background pair against WCAG ratios.

### Animation and motion

- [Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using) — Animating a property between two states.
- [Keyframe Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using) — `@keyframes`, timing functions, and the animation shorthand.
- [Scroll-Driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) — Timelines driven by scroll position instead of by the clock.
- [Scroll-Driven Demos](https://scroll-driven-animations.style/) — Gallery of scroll and view timeline effects, with source.
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) — Animated transitions between DOM states and across pages.
- [Prefers Reduced Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — Honouring the system setting that asks for less movement.
- [CSS Animation](https://cssanimation.rocks/principles/) — Animation principles for the Web.
- [Motion](https://motion.dev/) — Animation library built on the browser's own animation engine.

### Architecture

- [Tailwind CSS](https://tailwindcss.com/) — Utility-first framework; v4 is configured in CSS, not JavaScript.
- [CSS Modules](https://github.com/css-modules/css-modules) — Class names scoped to a file, resolved at build time.
- [Open Props](https://open-props.style/) — Design tokens shipped as plain custom properties.
- [Style Dictionary](https://styledictionary.com/) — Build one token source into CSS, iOS, and Android output.
- [CUBE CSS](https://cube.fyi/) — Composition, utility, block, exception: a methodology that scales.
- [BEM](https://getbem.com/introduction/) — Block element modifier naming, for codebases without components.
- [Custom CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/) — Modern reset, with the reasoning for every rule.

## Practice

- [Flexbox Froggy](https://flexboxfroggy.com/) — Game for learning CSS flexbox.
- [Grid Garden](https://cssgridgarden.com/) — Game for learning CSS grid.
- [CSS Diner](https://flukeout.github.io/) — Game for learning CSS.
- [CSSBattle](https://cssbattle.dev/) — Code golf: reproduce a target image in as little CSS as possible.

## Tools

- [Specificity Calculator](https://specificity.keegan.st/) — Visual way to understand CSS specificity.
- [Clippy](https://bennettfeely.com/clippy/) — CSS clip-path maker.
- [Animista](https://animista.net/) — Create CSS animation.
- [Shadow Palette Generator](https://www.joshwcomeau.com/shadow-palette/) — Build layered box shadows that behave like real light.
- [Cubic Bezier](https://cubic-bezier.com/) — Draw and preview a custom easing curve.
- [Autoprefixer CSS](https://autoprefixer.github.io/) — Autoprefixer CSS online.
- [Lightning CSS](https://lightningcss.dev/) — Parser, transformer, and minifier for modern CSS syntax.

## Deep dives

- [CSS-Tricks Guides](https://css-tricks.com/guides/) — Long-form guides on layout, typography, and animation topics.
- [Stacking Contexts](https://www.joshwcomeau.com/css/stacking-contexts/) — Why `z-index` sometimes does nothing at all.
- [Breaking Up With CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) — The runtime cost that turned the industry off runtime CSS-in-JS.
