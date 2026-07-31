# Design

Color, type, imagery, icons, and the tools for putting them together.
Part of the [Frontend Roadmap](../README.md).
See also [CSS](CSS.md) for color spaces, fluid type, and tokens in the browser, and
[UI Frameworks](UI-FRAMEWORKS.md) for design systems you can install.

Most of what separates a designed interface from an undesigned one is a handful of
learnable rules — spacing taken from one scale, type sizes taken from another, few
colors used consistently, deliberate alignment — rather than taste. The Learn
section is that material, and it is the part of this file worth reading start to
finish. The tools below it only help once you know what you are reaching for.

## Learn

- [Refactoring UI](https://refactoringui.com/) — Book of concrete design tactics for developers, covering hierarchy, spacing, color, and depth as rules you can apply directly. [paid]
- [7 Rules for Creating Gorgeous UI](https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-1.html) — Erik Kennedy's rules for making an interface look designed, written for people who cannot draw.
- [Web Design in 4 Minutes](https://jgthms.com/web-design-in-4-minutes/) — An unstyled HTML page improved one decision at a time, in the order the decisions actually matter.
- [Building Your Color Palette](https://refactoringui.com/previews/building-your-color-palette) — Free Refactoring UI chapter on why a UI needs shade scales rather than a handful of hex codes.
- [Practical Typography](https://practicaltypography.com/) — Butterick's book on type, from measure and line height down to which fonts to stop using.
- [Space in Design Systems](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62) — Spacing treated as a named, numbered scale instead of a value picked per component.
- [Every Layout](https://every-layout.dev/) — Layout as a small set of composable primitives that respond without media queries. [paid]
- [Laws of UX](https://lawsofux.com/) — Usability and psychology principles such as Fitts's law and Hick's law, one page each, with the design consequence spelled out.

## Reference

Design systems you can actually install are in [UI Frameworks](UI-FRAMEWORKS.md).
What follows is for looking at: how other teams named, documented, and solved the
same problems before you got there.

- [Design Systems Repo](https://designsystemsrepo.com/design-systems/) — Index of published design systems, useful for reading how a real one is documented before writing your own.
- [The Component Gallery](https://component.gallery/) — The same component across dozens of systems, showing what everyone does and does not agree a card or a toast is.
- [Call To Idea](https://www.calltoidea.com/) — Gallery of real screens grouped by pattern, from pricing tables to empty states.
- [Daily Design](https://www.uidesigndaily.com/) — Daily UI design components and pages, published as free Figma files.

## Tools

### Color

Contrast checking, oklch pickers, and `color-mix()` are in [CSS](CSS.md); these
three are for choosing the palette in the first place. Two generators is enough —
the previous six were the same tool six times.

- [Coolors](https://coolors.co/) — Palette generator, kept over the alternatives for how fast it is to lock one hue and re-roll the rest. [freemium]
- [Color Hunt](https://colorhunt.co/) — Curated four-color palettes, for when generating your own is not working.
- [Realtime Colors](https://www.realtimecolors.com/) — Applies a palette and a font pairing to a real landing page, so you judge them in context instead of as swatches.

### Typography

Variable font syntax, system font stacks, and fluid type scales are in
[CSS](CSS.md).

- [Google Fonts](https://fonts.google.com/) — Google fonts.
- [Fontsource](https://fontsource.org/) — Open-source fonts as npm packages, for self-hosting instead of loading from Google's servers.
- [Font Squirrel](https://www.fontsquirrel.com/) — Hand-checked fonts that are free for commercial use, plus a generator that converts a licensed font into web formats.
- [Type Scale](https://typescale.com/) — Visual type scale calculator.
- [Fontjoy](https://fontjoy.com/) — Font pairing generator that proposes contrasting families for headings and body text.

### Icons & illustrations

Licensing is the thing that catches people out. Lucide, Heroicons, Phosphor, and
Ionicons are MIT and need no attribution; Font Awesome's free set is CC BY 4.0;
Flaticon's free tier requires a visible credit link.

- [Lucide](https://lucide.dev/) — MIT icon set forked from Feather, with packages for every framework. The default for a new project.
- [Heroicons](https://heroicons.com/) — Small MIT set from the Tailwind team, in outline, solid, mini, and micro variants.
- [Phosphor](https://phosphoricons.com/) — MIT set of 9,000+ icons in six weights, duotone included.
- [Iconify](https://iconify.design/) — 200,000+ icons from 150+ sets behind one component and one API, Font Awesome and Ionicons among them.
- [Font Awesome](https://fontawesome.com/) — Vector icons and social logos. [freemium]
- [Flaticon](https://www.flaticon.com/) — The largest database of free icons. [freemium]
- [Ionicons](https://ionic.io/ionicons) — Beautifully crafted open source icons.
- [unDraw](https://undraw.co/) — Open-source illustrations, recolored to your brand before download and free of attribution.

### Images & media

- [Unsplash](https://unsplash.com/) — Internet source of freely usable images.
- [Pexels](https://www.pexels.com/) — The best free stock photos & videos.
- [Pixabay](https://pixabay.com/) — Over 1 million high-quality stock images and videos.
- [Coverr](https://coverr.co/) — Beautiful free stock video footage.
- [placehold.co](https://placehold.co/) — Placeholder images from a URL, kept over the alternatives because it serves WebP, AVIF, and SVG as well as PNG.
- [Squoosh](https://squoosh.app/) — Compresses and converts to WebP and AVIF in the browser, with a side-by-side quality comparison. The one compressor worth keeping, since the others only shrink PNG and JPEG.
- [RealFaviconGenerator](https://realfavicongenerator.net/) — Builds the whole favicon set from one image, ICO and web manifest included, and checks the result per platform.

### Editors

- [Figma](https://www.figma.com/) — Cloud-based design tool. [freemium]
- [Penpot](https://penpot.app/) — Open-source, self-hostable design tool that runs in the browser and stores files as SVG.
- [Photopea](https://www.photopea.com/) — Free online editor supporting PSD, XCF, Sketch, XD, and CDR formats. [freemium]
- [Responsively App](https://responsively.app/) — Browser that renders one page at many viewport sizes at once, with mirrored scrolling and input.

### Figma resources

- [Figma Community](https://www.figma.com/community) — Official source of UI kits, templates, and plugins, and the first place to look.
- [Figma Crush](https://www.figmacrush.com/) — The biggest collection of free resources for Figma.

### AI-assisted design

Treat the output as a first draft. These tools produce a plausible-looking screen
in seconds and get semantics, focus order, and contrast wrong just as fast; the
Learn section above is what tells you which parts to throw away.

- [v0](https://v0.app/) — Generates React, Tailwind, and shadcn/ui screens from a prompt or a screenshot. [freemium]
- [Lovable](https://lovable.dev/) — Prompts a whole app scaffold, front end and back end, and lets you edit the result. [freemium]
- [Recraft](https://www.recraft.ai/) — Generates illustrations, icons, and vectors in a consistent style, with SVG export. [freemium]

## Deep dives

A design token is a name for a value — `color.text.muted` rather than `#6b7280` —
kept in one place so that changing it reaches every component, and every platform,
at once. It is what turns theming and dark mode into a data change instead of a
rewrite. The CSS side of this (custom properties, `color-scheme`, Open Props,
Style Dictionary) is in [CSS](CSS.md); what follows is the concept and the spec.

- [What Are Design Tokens?](https://css-tricks.com/what-are-design-tokens/) — The idea in one article: named values as the single source of truth for color, spacing, and type.
- [Design Tokens Format Module](https://tr.designtokens.org/format/) — The DTCG specification that Figma variables, Style Dictionary, and Tokens Studio are all converging on.
- [Hello Darkness, My Old Friend](https://web.dev/articles/prefers-color-scheme) — Dark mode end to end: `prefers-color-scheme`, a manual override, images, and avoiding a flash of the wrong theme.
