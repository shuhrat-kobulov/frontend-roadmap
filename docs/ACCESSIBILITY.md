# Accessibility

Building interfaces that work with a keyboard, a screen reader, or 400% zoom, and the tools that tell you whether yours does.
Part of the [Frontend Roadmap](../README.md).
See also [HTML](HTML.md) for the semantics most of this is built on,
[UI Frameworks](UI-FRAMEWORKS.md) for primitives that implement these patterns for you,
[Design](DESIGN.md) for the color decisions that get audited first, and
[Testing](TESTING.md) for putting the automated half in CI.

Accessibility is a craft skill, not a compliance exercise. It is the same skill as
writing markup that means something, keeping focus where the user left it, and
naming controls so the name matches what the button does — which is why the
developers who are good at it also tend to write the components everyone else
copies. Nothing here requires a specialist.

The evidence says the entry cost is low. WebAIM audits the top million home pages
every year, and six error types — low-contrast text, missing `alt`, missing form
labels, empty links, empty buttons, and a missing `lang` attribute — account for
96% of everything detected, seven years running. All six are fixable in an
afternoon, and none of them needs a redesign. That is the 20% worth doing first.

What is left after that is behaviour rather than markup: focus that goes somewhere
sensible when a dialog opens, a widget that responds to arrow keys, a change that
gets announced instead of appearing silently. This is the part worth not writing
yourself — the ARIA Authoring Practices Guide below specifies it, and the headless
libraries in [UI Frameworks](UI-FRAMEWORKS.md) have already implemented it. Reach
for a native element first, a tested primitive second, and hand-rolled ARIA last.

## Learn

- [Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/) — W3C's orientation: what accessibility covers, who it affects, and where it overlaps with usability and SEO. [beginner]
- [Web Accessibility Perspectives](https://www.w3.org/WAI/perspective-videos/) — Ten one-minute videos showing the same feature helping someone with a disability and then everyone else. The fastest way to see who you are building for.
- [Dos and Don'ts on Designing for Accessibility](https://accessibility.blog.gov.uk/2016/09/02/dos-and-donts-on-designing-for-accessibility/) — GOV.UK's poster set, one page each for low vision, dyslexia, autism, and screen reader users, written as rules you can apply today. [beginner]
- [The WebAIM Million](https://webaim.org/projects/million/) — Annual audit of a million home pages, and the six-error shortlist behind almost every failure. Check your own site against it first.
- [Learn Accessibility](https://web.dev/learn/accessibility) — Course from the Chrome team on the accessibility tree, focus, ARIA, forms, and testing, one module per topic.
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility) — MDN's module, treating HTML, CSS, JavaScript, and WAI-ARIA each as an accessibility tool, with exercises to work through.

## Reference

### Standards and guidelines

WCAG is the standard every audit, procurement questionnaire, and accessibility law
quotes, and **AA is the level to build to** — A is too weak to be useful and AAA is
not achievable for a whole site. The spec itself is written for testers rather than
readers, so start with the overview, keep the quick reference open while you work,
and treat the checklist as the version you can act on.

- [WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/) — What the standard is, how levels A, AA, and AAA differ, and which one to target, in plain language.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — The standard itself, current since December 2024, and the exact wording anyone auditing you will quote.
- [How to Meet WCAG](https://www.w3.org/WAI/WCAG22/quickref/) — Filterable list of every success criterion with the techniques and failures for each. This is the version of WCAG you will actually use.
- [The A11Y Project Checklist](https://www.a11yproject.com/checklist/) — WCAG restated as plain-English tasks grouped by content, controls, and forms, so you can work through it in a morning.
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) — Every role, state, and property, with the semantics each is defined to produce. Reach for it when the APG does not cover your case. [advanced]
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — Keyboard behaviour and ARIA wiring for each common widget, with working examples. The most useful page in this file.
- [WCAG 3.0](https://www.w3.org/TR/wcag-3.0/) — The next standard, still a Working Draft: outcomes and scoring rather than pass/fail. Worth watching, years from finished, and no reason to delay building to 2.2.

### Semantic HTML first

Assistive technology never sees your markup — it sees the accessibility tree the
browser builds from it, where every node has a role, a name, and a state. Native
elements populate that tree correctly and for free, which is why the first rule of
ARIA is to use one instead. ARIA only relabels nodes in that tree; it adds no
behaviour, so `role="button"` on a `<div>` still needs keyboard handling, focus
order, and an activation event you now have to write. See [HTML](HTML.md) for the
elements themselves.

- [Accessibility Tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree) — What the browser hands to assistive technology, and therefore what your markup is really producing.
- [Using ARIA](https://www.w3.org/TR/using-aria/) — The five rules of ARIA, starting with the first: if a native element does the job, use it.
- [Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) — Why no ARIA beats bad ARIA, and precisely what adding a role does and does not change.
- [a11ysupport.io](https://a11ysupport.io/) — Which browser and screen reader pairs actually support a given attribute, tested rather than promised. Check before shipping anything exotic.

### Keyboard and focus

Everything must work from the keyboard, because keyboard support is what screen
readers, switch devices, and voice control are built on top of. The test takes a
minute: put the mouse down, press Tab through the page, and watch for three things —
that you can always see where you are, that the order matches the visual layout, and
that focus never escapes an open dialog or gets stuck. Never remove an outline
without drawing a better one.

- [Keyboard Accessibility](https://webaim.org/techniques/keyboard/) — Tab order, focus, and why every control has to be reachable without a pointer. The first test to run on anything you build.
- [Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) — Which keys a composite widget must handle, and roving `tabindex` versus `aria-activedescendant` for moving focus inside one.
- [Designing Accessible Focus Indicators](https://www.sarasoueidan.com/blog/focus-indicators/) — How to draw a focus ring that passes contrast, survives any background, and shows only for keyboard users via `:focus-visible`.
- [Skip Navigation Links](https://webaim.org/techniques/skipnav/) — The link that lets keyboard users past your header, and how to keep it hidden until it is focused.
- [inert](https://web.dev/articles/inert) — Takes a subtree out of focus order and the accessibility tree in one attribute, which is how a modal stops leaking to the page behind it.

### Screen readers

Install one and use it — twenty minutes with a screen reader teaches more than any
article here. NVDA is free on Windows and VoiceOver ships on every Mac, and both are
what a real user is likely to be running. Listen for what a control is announced as,
not just whether it can be reached: a button announced as "link, image, IMG_0421" is
technically reachable and practically useless.

- [Designing for Screen Reader Compatibility](https://webaim.org/techniques/screenreader/) — How a screen reader reads a page, what the user hears, and which markup decisions change it.
- [Using NVDA to Evaluate Web Accessibility](https://webaim.org/articles/nvda/) — Getting the free Windows screen reader installed and driving it well enough to test your own pages.
- [Using VoiceOver to Evaluate Web Accessibility](https://webaim.org/articles/voiceover/) — The same for the screen reader already on every Mac and iPhone, including the rotor for browsing by heading or landmark.
- [Accessible Name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name) — What a control is announced as, where that string is computed from, and why `aria-label` silently overrides visible text.

### Forms

Forms are where accessibility work pays off most, because they are where it fails
most: missing input labels appear on roughly half of all home pages. Four habits fix
nearly all of it — every input gets a real `<label>`, related controls get a
`fieldset` and `legend`, errors say what to do rather than that something is wrong,
and the error message is tied to its field with `aria-describedby` so it is announced
on focus. A placeholder is not a label; it disappears exactly when the user needs it.

- [Creating Accessible Forms](https://webaim.org/techniques/forms/) — Labels, required fields, grouping, and error handling with the markup for each. Read this one end to end.
- [Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/) — When `<label>` is right, when `aria-label` is acceptable, and how to label search fields and control groups.
- [Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/) — `fieldset` and `legend` for radios, checkboxes, and multi-part fields such as dates and addresses.
- [Validating Input](https://www.w3.org/WAI/tutorials/forms/validation/) — Native constraint validation, when to validate, and how to word an error so it explains the fix.
- [User Notification](https://www.w3.org/WAI/tutorials/forms/notifications/) — Error summaries, moving focus to them, linking each message to its field, and confirming success without a page reload.
- [Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) — The `autocomplete` values that let the browser fill a form for someone who finds typing slow or painful.

### Color and contrast

Low-contrast text is the single most common failure on the web, and the cheapest to
avoid: check the pair before it reaches a component. Color also cannot be the only
carrier of meaning — a red border, a green dot, or a colored line on a chart needs a
label, icon, or pattern beside it. Contrast applies to more than text: input borders,
icons, and focus rings need 3:1 against their surroundings. Palettes and tokens are
in [Design](DESIGN.md).

- [Contrast and Color Accessibility](https://webaim.org/articles/contrast/) — What a contrast ratio measures, which text sizes move the threshold, and how to choose a passing pair.
- [Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — The 4.5:1 requirement for body text and 3:1 for large text, with the exceptions spelled out.
- [Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) — Why a red outline alone does not communicate an error, and what to add so that it does.
- [Dark Mode](https://www.nngroup.com/articles/dark-mode/) — Nielsen Norman on who reads better in dark mode and who reads worse, which is the argument for offering both rather than switching.

### Motion and preferences

The operating system already knows what the user wants — less motion, more contrast,
a specific color scheme — and CSS media queries hand you those answers for free.
Honouring `prefers-reduced-motion` is a two-line change with a real payoff: parallax,
zoom, and large-area movement trigger nausea and dizziness in people with vestibular
disorders. Reduce the motion rather than deleting the feedback — cross-fade instead
of slide, and keep the state change visible.

- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — Detecting that the user has asked their system for less animation, and scoping your transitions to that answer.
- [prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-contrast) — Responding to a request for more contrast, and what it means alongside forced-colors mode.
- [Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/) — Which effects actually trigger vestibular symptoms, and the substitutions that keep the interface feeling alive.
- [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) — The rule for carousels, autoplaying video, and anything else that moves for more than five seconds.

### Component patterns

Every widget below has a specified role, keyboard contract, and set of states, and
the APG documents all three with a working example. Read the pattern before you
build — then, in most cases, install a primitive library from
[UI Frameworks](UI-FRAMEWORKS.md) instead. A modal alone has to trap focus, restore
it on close, close on Escape, and hide the rest of the page from screen readers;
Radix, Base UI, React Aria, and Ark UI have that written and tested against real
assistive technology, and you have thirty other components to ship.

- [APG Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) — Around thirty widgets with roles, states, and keyboard behaviour, each linked to a runnable example.
- [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) — Focus into the dialog, focus kept inside while it is open, focus returned to the trigger on close, Escape working throughout.
- [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) — The autocomplete and dropdown pattern: which key does what, and how the active option gets announced while you type.
- [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) — Arrow-key navigation, `aria-selected`, and the choice between activating a tab on focus or on Enter.
- [Disclosure (Show/Hide) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) — The accordion reduced to a button plus `aria-expanded`. Reach for `<details>` before writing any of it.
- [Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/) — Header cells, `scope`, captions, and multi-level headers, so a data table stays readable one cell at a time.
- [Tooltips and Toggletips](https://inclusive-components.design/tooltips-toggletips/) — The difference between labelling a control and revealing extra content, and why most tooltips should be neither.

## Practice

- [Before and After Demonstration](https://www.w3.org/WAI/demos/bad/) — The same site built badly and then properly, with every fix annotated. Read the two versions side by side.
- [Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/) — A dozen checks you can run on any page in ten minutes, with what to look for and what each result means. Run them on something you built.
- [APG Example Index](https://www.w3.org/WAI/ARIA/apg/example-index/) — Every pattern as a working page with source. Open one with a screen reader running and copy what it does.

## Tools

Automated checkers find the machine-detectable subset of accessibility problems and
nothing else. The figure usually quoted is around a third of real issues; even
Deque's own study of axe-based testing, the most generous number available, leaves
close to half undetected. Contrast ratios, missing labels, and invalid ARIA are
detectable. Whether the focus order makes sense, whether an error message explains
the error, whether a control's name matches its visible text, and whether the page is
usable by keyboard alone are not. **A clean automated report is a floor, not a pass —
manual keyboard and screen reader testing is required.** See [Testing](TESTING.md)
for wiring the automated part into CI.

- [axe DevTools](https://www.deque.com/axe/devtools/) — Browser extension that flags violations with the failing element and the fix. Its engine powers most of the other checkers here. [freemium]
- [WAVE](https://wave.webaim.org/) — Overlays icons for every error, alert, and structural element on the rendered page, so you see each problem where it lives.
- [Accessibility Insights](https://accessibilityinsights.io/) — A free automated pass plus a guided manual assessment that walks you through the checks no tool can automate.
- [Lighthouse Accessibility Scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring) — What the DevTools score counts and what it ignores. Read this before treating a 100 as finished.
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) — Catches the mistakes visible in JSX, such as a missing `alt` or a click handler on a `div`, while you type.
- [Pa11y](https://pa11y.org/) — Runs accessibility checks from the command line or CI against a list of URLs, so a regression fails the build instead of the audit.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Two colors in, pass or fail per WCAG level out, with sliders that find the nearest passing shade.
- [Who Can Use](https://www.whocanuse.com/) — Shows a color pair as a dozen kinds of color vision and low vision perceive it, turning a ratio into something you can look at.
- [Silktide Toolbar](https://silktide.com/toolbar/) — Free extension with a screen reader simulator plus color blindness and dyslexia views, for a first sense of how your page is announced.

## Deep dives

- [Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) — Announcing content that changes without a page load: toasts, validation messages, loading and search results.
- [Why Are My Live Regions Not Working?](https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/) — The reasons a live region stays silent, in the order worth checking them.
- [User Testing Accessible Client-Side Routing](https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/) — Research on what a single-page app should do when the route changes, and where to send focus afterwards.
- [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang) — One attribute that picks the voice a screen reader reads with, and how to mark a phrase in another language mid-page.
- [Adrian Roselli](https://adrianroselli.com/) — Long-running blog of tested, opinionated posts on tables, custom controls, and ARIA gone wrong.
- [Scott O'Hara](https://www.scottohara.me/) — Posts from an ARIA spec editor on native elements, `dialog`, and the details other write-ups skip.
