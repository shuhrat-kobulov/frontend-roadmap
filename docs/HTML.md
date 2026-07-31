# HTML

References, guides, and validators for writing modern, semantic HTML.
Part of the [Frontend Roadmap](../README.md).
See also [Accessibility](ACCESSIBILITY.md) for WCAG and screen readers, and
[Performance](PERFORMANCE.md) for image formats and loading budgets.

## Learn

- [MDN Structuring Content](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content) — MDN's HTML learning path, from first element to forms and multimedia. [beginner]
- [Learn HTML #1](https://web.dev/learn/html) — Course covering the whole language, one module per topic.
- [Responsive Web Design](https://www.freecodecamp.org/learn/2022/responsive-web-design) — Interactive HTML and CSS certification from freeCodeCamp. [beginner]
- [HTML Dog](https://htmldog.com/guides/html/) — Beginner, intermediate, and advanced HTML guides.
- [Interneting Is Hard](https://internetingishard.netlify.app/html-and-css/) — Friendly HTML and CSS tutorial for absolute beginners. [beginner]
- [MarkSheet](https://marksheet.io/) — Free HTML and CSS tutorials.

## Reference

### Language reference

- [HTML Reference](https://htmlreference.io/) — List of all HTML tags.
- [MDN HTML Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements) — Every element, with syntax, attributes, and browser support.
- [MDN Global Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes) — Attributes that can go on any element.
- [HTML Standard](https://html.spec.whatwg.org/multipage/) — WHATWG living specification, the last word on behaviour. [advanced]
- [Can I use](https://caniuse.com/) — Browser support tables for HTML, CSS, and JS features.

### Semantics

- [MDN Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) — What "semantic" means in markup, and why it matters.
- [Semantic HTML](https://web.dev/learn/html/semantic-html) — Picking the element that describes the content.
- [Heading Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements) — Levels h1 to h6, document outline, and heading order.
- [Page Structure](https://www.w3.org/WAI/tutorials/page-structure/) — W3C tutorial on landmarks, regions, and labelling them.
- [Article vs Section](https://www.smashingmagazine.com/2020/01/html5-article-section/) — When to reach for article, section, or a plain div.
- [HTMHell](https://www.htmhell.dev/) — Bad markup found in the wild, with the fix explained.

### Forms

- [MDN Web Forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms) — Full guide to building, styling, and validating forms.
- [Learn Forms](https://web.dev/learn/forms) — Course on form design, controls, and validation.
- [Input Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input) — Every input type and attribute on one page.
- [Constraint Validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation) — Native validation with `required`, `pattern`, and friends.
- [Autocomplete Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete) — Values that let browsers autofill a field correctly.
- [Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) — W3C tutorial on labels, grouping, and accessible errors.

### Modern elements

- [Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) — Native modal and non-modal dialogs.
- [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — Declarative popovers, tooltips, and menus without JavaScript.
- [Details Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) — Built-in disclosure widget and accordion.
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) — Explains `srcset`, `sizes`, and `picture` end to end.
- [Lazy Loading](https://web.dev/articles/browser-level-image-lazy-loading) — Browser-level image loading with `loading="lazy"`.
- [Inert Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert) — Takes a subtree out of focus order and the accessibility tree.
- [Templates and Slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots) — The template and slot elements behind web components.

### Metadata and SEO

- [HTML Head](https://htmlhead.dev/) — Checklist of everything that can go in the head.
- [Metadata](https://web.dev/learn/html/metadata) — Head elements, social cards, and theme colour.
- [Open Graph Protocol](https://ogp.me/) — Spec for the `og:` tags behind link previews.
- [Schema.org](https://schema.org/) — Shared vocabulary for structured data.
- [Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) — How Google reads schema markup for rich results.

## Practice

- [HTML Tips and Tricks](https://yoksel.github.io/bad-practices/) — "Bad practices" of HTML. [ru]
- [HTML Rules](https://yoksel.github.io/easy-markup/) — Simple markup rules. [ru]
- [HTML Template](https://tpverstak.ru/seo-html-template/) — Basic SEO HTML template. [ru]
- [HTML Academy Style](https://codeguide.academy/html-css.html) — HTML Academy code style. [ru]
- [Email Framework](https://emailframe.work/) — Build responsive HTML email templates.
- [Learn HTML #2](https://learn-html.org/) — Interactive exercises with an editor in the browser. [beginner]
- [HTML5 Boilerplate](https://html5boilerplate.com/) — Front-end template to start a real project from.

## Tools

- [W3C Validator](https://validator.w3.org/) — Markup validation service.
- [html-validate](https://html-validate.org/) — Offline HTML linter for CI and editors.
- [HTMLHint](https://htmlhint.com/) — Static analysis tool for HTML.
- [Meta Tags](https://metatags.io/) — Preview and generate meta and social tags.
- [Rich Results Test](https://search.google.com/test/rich-results) — Check structured data the way Google sees it.
- [RealFaviconGenerator](https://realfavicongenerator.net/) — Generate favicons and the head markup they need.

## Deep dives

- [BEM](https://getbem.com/introduction/) — Block Element Modifier naming, which earns its keep in codebases without components.
- [HTML Boilerplate](https://www.matuzo.at/blog/html-boilerplate/) — Line-by-line walkthrough of a sane starting document.
- [HTMHell Advent Calendar](https://www.htmhell.dev/adventcalendar/) — Yearly series of deep articles on HTML details.
- [Content Categories](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories) — Rules for which elements may nest inside which. [advanced]
- [Priority of Methods for Labeling](https://adrianroselli.com/2020/01/my-priority-of-methods-for-labeling-a-control.html) — Ranked ways to give a control an accessible name.
