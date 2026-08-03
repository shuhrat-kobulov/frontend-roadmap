# Browser APIs

The platform your framework is built on — the DOM, storage, workers, service workers, and the several hundred APIs the browser hands you directly.
Part of the [Frontend Roadmap](../README.md).
See also [JavaScript](JAVASCRIPT.md) for the language these APIs are called from,
[HTML](HTML.md) for the elements they operate on,
[Performance](PERFORMANCE.md#javascript-performance) for what running them costs, and
[Security](SECURITY.md#browser-security-model) for the origin rules every one of them
is subject to.

A framework is a way of using the browser, not a replacement for it. React gives you
components and state; it does not give you a clipboard, a database, a background
thread, or a way to know that an element has scrolled into view. Those come from the
platform, and a developer who knows only the framework hits a ceiling the first time
a requirement falls outside it. This is also the knowledge with the longest shelf
life in frontend: `addEventListener` has worked the same way since before most
current frameworks existed, and will still work after they are replaced.

**Most of these APIs are gated, and the gates are the part people skip.** Three
mechanisms do nearly all of it. *Secure context* — almost everything below requires
HTTPS or `localhost`, so an API that "doesn't exist" is often just an API you are
calling over `http://`. *Permission* — geolocation, camera, notifications, and
clipboard reads prompt the user, and the user can refuse, which is a code path you
have to write. *User activation* — fullscreen, clipboard writes, and file pickers
only work inside a real click or keypress, so they cannot be triggered on load or
from a timer. When a call silently fails, check those three before debugging your
own logic.

**On availability:** entries below marked *limited availability* work in one engine
or one platform today, and shipping on them means shipping a feature some of your
users will not get. That is a legitimate choice when paired with a fallback and a
deliberate one either way — it is never a detail to discover in production. The
labels here follow Baseline as of mid-2026; the
[compatibility section](#compatibility-and-feature-detection) is how you check them
yourself rather than trusting a list.

## Learn

Start with how a browser turns bytes into pixels. Every performance rule, every
layout bug, and every "why did my script run before the DOM existed" question comes
back to this pipeline, and it is worth understanding once, properly, rather than
absorbing in fragments.

- [Populating the Page: How Browsers Work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) — Navigation, fetch, parsing, render, and interactivity, in order, with what blocks at each step. The clearest short version.
- [How Browsers Work](https://web.dev/articles/howbrowserswork) — Tali Garsiel's long-form study of browser internals: parsing, the render tree, layout, and painting, engine by engine. Old in its details, still the canonical explanation. [advanced]
- [Inside Look at Modern Web Browser](https://developer.chrome.com/blog/inside-browser-part1) — Four-part Chrome series on the multi-process architecture, from typing a URL to compositing frames and routing input events.
- [Browser: Document, Events, Interfaces](https://javascript.info/ui) — The javascript.info tutorial for the platform half of the language: the DOM tree, events, forms, and loading. The best free course on this material.
- [The Script Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script) — `async`, `defer`, `type="module"`, and the execution order each one produces. The reference that settles most script-ordering arguments.

## Reference

### The DOM

The DOM is the browser's live object model of the document — not the HTML you wrote,
but the tree the parser produced and that every script since has been mutating. Two
things are worth internalising early. **Events travel**: an event captures down from
the root to the target, then bubbles back up, which is what makes it possible to
handle a click on a thousand rows with one listener on the table. And **listeners are
a leak waiting to happen**: pass an `AbortController` signal to `addEventListener` and
one `abort()` call removes every listener you registered with it, which beats
matching each `removeEventListener` to its `addEventListener` by hand.

- [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) — The index: what the tree is, and every interface — `Node`, `Element`, `Document`, `Range` — hanging off it.
- [Selection and Traversal on the DOM Tree](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Selection_and_traversal_on_the_DOM_tree) — Finding nodes with `querySelector` and friends, then walking between them by parent, child, and sibling.
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) — Every option that matters: `capture`, `once`, `passive`, and the `signal` that makes listener cleanup a single `abort()` call.
- [Event Bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling) — Capture and bubble phases, `stopPropagation`, and why delegation works. Read before you debug a handler that fires twice.
- [Event Delegation](https://javascript.info/event-delegation) — One listener on a container instead of one per child, including the pattern for lists that change while the page is open.
- [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) — Dispatching your own events with a `detail` payload, which is how a component talks to code that does not import it.

### Observers

Four APIs that replace polling and scroll handlers with callbacks the browser fires
when something actually changes. Each solves a problem that used to be answered by
measuring on every frame, and each is cheaper than the code it replaces.

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) — Knowing when an element enters or leaves the viewport, without a scroll listener that runs on every frame. Lazy loading, infinite scroll, and impression tracking.
- [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API) — Reacting to the size of one element rather than the whole window, which is the thing media queries cannot tell you.
- [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) — Watching for DOM changes made by code you do not control, such as a third-party widget rewriting your markup.
- [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) — Subscribing to performance entries as the browser records them, including layout shifts and long tasks. The mechanism every Web Vitals library is built on.

### Storage

The browser gives you five or six places to put data and they are not
interchangeable. `localStorage` is synchronous, capped around 5MB, string-only, and
blocks the main thread — fine for a theme preference, wrong for anything you would
call a dataset. IndexedDB is the real client-side database: asynchronous, large, and
capable of storing structured values and blobs, at the cost of an API unpleasant
enough that most people reach for a wrapper. Cookies are the only storage that
travels with every request, which is what makes them right for sessions and wrong
for everything else — see [Security](SECURITY.md#authentication-and-sessions) for
the attributes that keep them safe. And none of it is permanent: browsers evict
under storage pressure, and Safari clears script-written storage after seven days of
no interaction with the site.

- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) — `localStorage` and `sessionStorage`, their synchronous string-only interface, and the quota and lifetime of each.
- [Using HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) — How cookies are set, scoped, and sent, with the `Secure`, `HttpOnly`, `SameSite`, and expiry attributes that decide who can read them.
- [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB) — The transactional client-side database end to end: object stores, indexes, cursors, and versioned schema upgrades.
- [idb](https://github.com/jakearchibald/idb) — Tiny promise wrapper over IndexedDB that removes the event-callback ceremony without hiding the model. The usual first dependency for real offline data.
- [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) — The request-and-response store service workers read from, and the reason an offline page can still be served.
- [Origin Private File System](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) — A private, origin-scoped filesystem with synchronous access from workers, for anything file-shaped and large. Invisible to the user, unlike the File System Access API.
- [Storage Quotas and Eviction Criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) — How much you actually get per origin, when the browser deletes it, and how to request persistence.

### Networking

`fetch` is the floor, not the ceiling. The rest of this section is what to reach for
when a single request-response is the wrong shape: streams when the response is
large enough that waiting for the last byte is unacceptable, WebSocket when both
sides need to talk, Server-Sent Events when only the server does — which is most
"live" features, and is far simpler than the WebSocket most teams reach for by
reflex. See [JavaScript](JAVASCRIPT.md#async) for promises, `AbortController`, and
the basics of `fetch` itself.

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) — The `Request`, `Response`, and `Headers` objects behind `fetch`, plus modes, credentials, and streaming bodies.
- [Using Readable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams) — Consuming a response chunk by chunk instead of waiting for all of it, and piping through transforms. What makes token-by-token UI possible.
- [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) — The cancellation token itself, including `AbortSignal.timeout()` and `AbortSignal.any()` for combining deadlines with user cancellation.
- [Writing WebSocket Client Applications](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications) — Opening a two-way connection, sending and receiving frames, and handling the close and error cases that decide whether reconnection works.
- [Using Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) — One-way server push over plain HTTP, with automatic reconnection built in. The right answer for feeds, progress, and notifications.
- [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) — Peer-to-peer audio, video, and data between browsers. Powerful and genuinely hard: you still need signalling, STUN, and usually TURN servers. [advanced]
- [sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) — Queueing a small POST that survives the page being closed, which is the only reliable way to send analytics on unload.

### Web Components

The browser's own component model: define an element, attach a shadow root, and get
style and DOM encapsulation no framework can leak into. They are a good fit for
design systems shared across teams and frameworks, for widgets embedded in pages you
do not own, and for anything that must outlive a framework migration. They are a
poor fit as a general application architecture — state management, server rendering,
form participation, and accessibility across a shadow boundary all cost more effort
than the framework equivalent. See
[Frameworks](FRAMEWORKS.md#the-web-platform) for the custom elements primer.

- [Using Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) — Attaching a shadow root, what the boundary blocks in each direction, and how styles get in and out of it.
- [Custom Element Best Practices](https://web.dev/articles/custom-elements-best-practices) — The checklist for an element that behaves like a built-in: property and attribute reflection, lifecycle discipline, and not breaking the page it lands in.
- [Declarative Shadow DOM](https://web.dev/articles/declarative-shadow-dom) — Serialising a shadow root into HTML so components render on the server and survive before JavaScript loads. Baseline since 2024.
- [More Capable Form Controls](https://web.dev/articles/more-capable-form-controls) — `ElementInternals` and form-associated custom elements, which is how a component participates in submission, validation, and the accessibility tree.
- [Lit](https://lit.dev/) — Small base class that makes web components practical, with reactive properties and declarative templates.
- [Web Components Will Outlive Your JavaScript Framework](https://jakelazaroff.com/words/web-components-will-outlive-your-javascript-framework/) — Jake Lazaroff's argument for the platform's component model, honest about what it costs and what it does not do.

### Service Workers and PWAs

A service worker is a proxy that sits between your page and the network, runs on its
own thread, and outlives the tab. That is what makes offline, precaching, and push
notifications possible — and what makes it the easiest way to break a site, because
a bad worker can be cached on a user's machine for as long as it takes them to come
back. Learn the lifecycle before you write one: install, wait, activate, and the
update rules that decide when your new code actually takes over. Use Workbox rather
than hand-rolling cache logic; the strategies are well understood and the edge cases
are not worth rediscovering.

- [Learn PWA](https://web.dev/learn/pwa) — The Chrome team's full course, from the manifest and installability through service workers, caching, and offline data.
- [The Service Worker Lifecycle](https://web.dev/articles/service-worker-lifecycle) — Jake Archibald on install, activate, waiting, and update. The single most important thing to read before shipping a service worker.
- [Strategies for Service Worker Caching](https://developer.chrome.com/docs/workbox/caching-strategies-overview/) — Cache-first, network-first, stale-while-revalidate, and which one each kind of asset actually wants.
- [Workbox](https://developer.chrome.com/docs/workbox/) — Google's library for service worker caching, precaching, and routing, with build-tool plugins for generating the worker.
- [Making PWAs Installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) — The web app manifest fields, icon requirements, and the criteria each browser applies before offering to install.
- [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) — Messages delivered to a service worker while the site is closed. Needs a push service, a subscription, and explicit permission; on iOS only for installed apps.
- [Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API) — Deferring a request until connectivity returns. Limited availability: Chromium only, so treat it as an enhancement over a retry queue you wrote yourself.

### Workers and Offloading

The main thread renders your UI and handles every click. Anything expensive that
runs there is a frame you dropped or an interaction you delayed, and no amount of
optimisation changes the fact that there is only one of it. Workers are the escape
hatch: a separate thread, no DOM access, communicating by message passing. The
usual blocker is that the message-passing API is tedious enough to discourage the
refactor, which is exactly the problem Comlink removes.

- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) — The full worker model: dedicated, shared, and module workers, what they can access, and what crosses the message boundary.
- [Comlink](https://github.com/GoogleChromeLabs/comlink) — Makes a worker look like an imported module by wrapping `postMessage` in proxies. Turns "should this be a worker" into a small decision.
- [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) — Memory shared between threads with no copying, for the rare case where message passing is the bottleneck. Requires the page to be cross-origin isolated with COOP and COEP headers. [advanced]
- [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly) — Compiled code running at near-native speed in the browser, for codecs, simulations, and porting existing C++ or Rust. Orientation, not a first stop.
- [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) — Rendering to a canvas from inside a worker, so drawing does not compete with the UI for the main thread.

### Modern UI Platform APIs

The last few years have moved things into the platform that every application used
to reimplement badly: animated page transitions, layered popovers with correct
dismissal, modals with real focus trapping, and client-side routing that can
intercept a navigation instead of cancelling it. Each of these replaces a library,
and each is more accessible by default than the version you would write. Check the
support note on each one before you delete the library, not after.

- [Smooth Transitions with the View Transition API](https://developer.chrome.com/docs/web-platform/view-transitions/) — Animating between two DOM states, and between two documents, without owning both at once. Same-document transitions are Baseline; cross-document ones are still limited availability.
- [Introducing the Popover API](https://developer.chrome.com/blog/introducing-popover-api) — Top-layer popovers with light dismissal and focus management from an HTML attribute. Baseline since 2025; pairs with CSS anchor positioning.
- [Building a Dialog Component](https://web.dev/articles/building/a-dialog-component) — `<dialog>` done properly: modal versus non-modal, focus handling, return values, and the styling that browsers do not give you. See [Accessibility](ACCESSIBILITY.md#keyboard-and-focus) for the focus rules behind it.
- [Modern Client-Side Routing: the Navigation API](https://developer.chrome.com/docs/web-platform/navigation-api) — Intercepting navigations, awaiting the transition, and reading the entry list — everything the History API made painful. Baseline newly available as of January 2026.
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) — Creating and controlling animations from JavaScript, with the same engine CSS animations use. Play, pause, seek, and compose without a library.

### Clipboard, Files, and Screen

- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) — Asynchronous copy and paste, including images and custom MIME types. Writing needs a user gesture; reading prompts for permission.
- [The File System Access API](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access) — Opening and saving real files on the user's disk, with a handle you can keep. Limited availability: Chromium only, so keep the `<input type="file">` and download fallbacks.
- [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) — The native drag events and data transfer model, including files dragged in from the desktop. Awkward and keyboard-inaccessible on its own; provide another route to the same action.
- [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) — Taking an element fullscreen and detecting exit, from a user gesture only.
- [Screen Orientation API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Orientation_API) — Reading the current orientation, and locking it — which browsers only allow for fullscreen or installed apps.

### Device and Sensor APIs

Everything here asks the user for something, and the honest default is that they
will say no or never see the prompt. Design the refused path first, ask only in
response to an action that explains why you are asking, and use the Permissions API
to check state instead of triggering a prompt to find out. Support is thinner here
than anywhere else on the platform, and several of these exist only in Chromium.

- [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) — Querying whether a capability is granted, denied, or still to be asked, without firing the prompt. The right first call for every API below.
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) — One-shot position and continuous watching, with accuracy, timeout, and the error cases that matter more than the happy path.
- [Media Capture and Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API) — `getUserMedia` for camera and microphone: constraints, device selection, and handling the stream once you have it.
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) — Handing a URL, text, or files to the operating system's share sheet. Limited availability: solid on mobile, missing on desktop Firefox, so keep a copy-link fallback.
- [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API) — Pattern-based haptic feedback. Limited availability: Android browsers only, and silently ignored everywhere else including iOS.
- [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API) — Charge level and charging state, for deferring expensive work. Limited availability: Chromium only, and deliberately unimplemented elsewhere as a fingerprinting risk.
- [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) — Talking to BLE peripherals from a page, after a user-chosen device pairing. Limited availability: Chromium only, as are its siblings WebUSB and Web Serial.

### Graphics and Media

- [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) — 2D drawing from first rectangle to compositing, transforms, and pixel manipulation. The default choice for charts, games, and image editing.
- [WebGL Fundamentals](https://webglfundamentals.org/) — GPU rendering taught from shaders up rather than by copying a matrix library. Long, structured, and the standard recommendation. [advanced]
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) — The modern successor to WebGL, with compute shaders and a cleaner model. Limited availability: still rolling out across engines, so ship it behind a WebGL fallback.
- [SVG Scripting](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/Scripting) — Treating vector graphics as DOM: attaching events to shapes, animating attributes, and generating markup. What makes SVG the easy answer for interactive diagrams.
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) — The audio graph: sources, gain, filters, and precise scheduling. Needed for anything beyond `<audio>` playing a file.
- [Audio and Video Delivery](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery) — Media elements, formats, and the controls you get for free, through to Media Source Extensions for adaptive streaming.

### Internationalization

`Intl` is the most underused API on this list. Every hand-written currency
formatter, "3 days ago" helper, and pluralisation `if` statement is a bug for some
locale, and the browser already ships a correct implementation of all of them,
including scripts, calendars, and number systems you have never tested against. For
dates and times themselves, `Temporal` finally replaces `Date` — see
[JavaScript](JAVASCRIPT.md#modern-language-features). Localisation is not only
translation: right-to-left layout is a rendering concern, and CSS logical properties
are what make it survive a language switch.

- [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) — The namespace index: number, date, list, and relative-time formatting, plus `Collator` for sorting and `Segmenter` for splitting text correctly.
- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) — Currency, percentage, unit, and compact number formatting per locale, with the grouping and decimal marks each one expects.
- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) — Locale-correct dates and times, with time zones and calendars, and `formatRange` for spans.
- [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) — Which plural category a number takes in a given language, because "one or many" is an English assumption.
- [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat) — "3 days ago" and "in 2 months" in any locale, without a date library.
- [navigator.languages](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages) — The user's ordered language preferences, which is what you negotiate against instead of guessing from their IP address.
- [RTL Styling 101](https://rtlstyling.com/) — Ahmad Shadeed's guide to right-to-left layout: what flips, what must not, and the logical properties that handle both directions in one stylesheet.

### Compatibility and Feature Detection

**Baseline** is the current standard way to answer "can I use this yet". A feature is
*newly available* once it works in the current versions of Chrome, Edge, Firefox, and
Safari, and *widely available* thirty months later, by which point it is safe for
almost any audience. *Limited availability* means at least one major engine is
missing. That vocabulary is now shown on MDN, on caniuse, and in linters, so learning
it once pays off everywhere. Two habits go with it: detect features rather than
sniffing user agents — `if ("share" in navigator)`, not a regex over the UA string —
and treat polyfills as a cost with a removal date, not a permanent dependency.

- [Baseline](https://web.dev/baseline) — What the three availability levels mean, how the dates are computed, and how to use them to decide what you can ship.
- [web-features](https://github.com/web-platform-dx/web-features) — The open dataset behind Baseline, mapping platform features to availability. What MDN, caniuse, and the linters all read from.
- [Can I use](https://caniuse.com/) — Browser support tables for HTML, CSS, and JS features, with usage share and the known bugs per browser.
- [MDN Browser Compat Data](https://github.com/mdn/browser-compat-data) — The per-API, per-version support data that fills MDN's compatibility tables, consumable as JSON in your own tooling.
- [Feature Detection](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Feature_detection) — Testing for the API you need in JavaScript, CSS, and HTML, and why user-agent sniffing keeps failing.
- [Building a Robust Frontend Using Progressive Enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement) — GOV.UK's practical standard for making the core task work without JavaScript, then layering the rest on top. Written for services that cannot afford to exclude anyone.
- [core-js](https://github.com/zloirock/core-js) — The polyfill library bundlers target, with per-feature imports so you ship only what your browser targets actually lack.

## Deep dives

- [RenderingNG](https://developer.chrome.com/docs/chromium/renderingng) — How Chromium's rendering engine is actually built: threads, compositing, and the architecture behind the pipeline everything else here describes. [advanced]
- [DOM Standard](https://dom.spec.whatwg.org/) — The specification itself, and the last word when documentation and browsers disagree about events, nodes, or ranges. [advanced]
- [Common Techniques to Build Offline Applications](https://web.dev/articles/offline-cookbook) — Jake Archibald's offline cookbook: every caching pattern, when each one is right, and what it does when the network is merely slow rather than absent.
- [Interop 2026](https://web.dev/blog/interop-2026) — The features browser vendors have jointly committed to making work identically this year, and the public scoreboard for it.
