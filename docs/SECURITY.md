# Security

The attacks a browser application is actually exposed to, and the platform features that stop them.
Part of the [Frontend Roadmap](../README.md).
See also [JavaScript](JAVASCRIPT.md) for the language these attacks are written in,
[Tooling](TOOLING.md#dependency-health) for the dependency scanners and update bots, and
[Frameworks](FRAMEWORKS.md) for where each framework's automatic escaping stops.

Frontend security is a narrower subject than "security", and the narrowness is what
makes it learnable. You are not defending a database. You are defending one thing:
the browser tab your user is sitting in, and the credentials it carries. Nearly every
item below is a variation on a single failure — something an attacker controls ends up
being treated as something you wrote.

**The model to get right first is the origin.** The *same-origin policy* — the browser
rule that code loaded from one origin cannot read data belonging to another — is the
floor the rest of the platform is built on. Everything here is either
a deliberate relaxation of that rule (CORS, `postMessage`), a mechanism that tightens
it (CSP, cookie attributes, `frame-ancestors`), or an attack that works around it
(XSS, CSRF, clickjacking). Learn the policy first and the rest stops being a list of
unrelated acronyms.

**The second thing to internalise: any script running on your origin is you.** It can
read the DOM, read `localStorage`, and send credentialed requests to your API that are
indistinguishable from the ones your own code sends. There is no sandbox between a
third-party analytics tag and your session, and none between an injected `<script>`
and your user's account. This is why XSS is the first real section in this file and
why token storage is discussed as a consequence of it rather than as a separate topic.

**The third: the browser is not a trust boundary.** Validation in the client is a
usability feature, not a security control — an attacker uses `curl`, not your form.
Every rule that actually matters is enforced on the server. What the frontend controls
is the *blast radius* when something goes wrong.

One practical note on scope. Most defences below are HTTP response headers, which
means they are set in server, framework, or CDN configuration rather than in
application code. That does not make them somebody else's problem: the frontend
developer is usually the only person who knows which ones the app needs, and the only
person who notices the day one of them breaks a feature.

## Learn

Start with the standard risk list for the vocabulary, then MDN for how the browser
actually enforces things. The OWASP Cheat Sheet Series is not a course — it is the
reference you will come back to for years, and it is worth knowing it exists on day
one.

- [OWASP Top 10](https://owasp.org/Top10/) — The 2025 edition of the standard list of application security risks, each with what causes it and how to prevent it. Cross-site scripting lives inside A05, Injection.
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security) — MDN's index of the browser's security model, the attacks it is designed against, and the defences it exposes to you.
- [Web Security Academy](https://portswigger.net/web-security) — PortSwigger's free course on web vulnerabilities, written by the people who build Burp Suite. The clearest explanations of how each attack is actually carried out.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) — Short, concrete prevention guides for around a hundred topics, maintained by practitioners. The reference the rest of this file cites most.

## Reference

### Browser security model

An origin is `scheme://host:port` — `https://example.com` and `http://example.com`
are different origins, and so are `https://example.com` and
`https://api.example.com`. A *site* is a looser grouping based on the registrable
domain, which is why cookies (site-scoped) and the same-origin policy (origin-scoped)
disagree more often than people expect. Getting these two words the right way round
resolves a surprising number of arguments.

- [Same-origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) — The rule underneath everything else: what counts as an origin, what it blocks, and the handful of things it deliberately allows across origins.
- [Same-site and Same-origin](https://web.dev/articles/same-site-same-origin) — The difference between the two terms, with worked examples. Read it before anything that mentions `SameSite`.
- [Mixed Content](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content) — What happens when an HTTPS page loads HTTP subresources, and which categories the browser blocks outright.

### Cross-site scripting

XSS is an attacker getting their JavaScript to run on your origin, and it is the
vulnerability class a frontend developer is most likely to introduce personally. The
three shapes are *stored* (the payload is saved server-side and served to everyone),
*reflected* (the payload rides in on the URL), and *DOM-based* (the payload never
reaches the server; your own client code writes attacker-controlled data into a
dangerous sink).

Modern frameworks escape interpolated text by default, which removes most of the
classic cases — and then hands you a labelled escape hatch for the rest.
`dangerouslySetInnerHTML` in React, `v-html` in Vue, and plain `innerHTML` anywhere
all take a string and parse it as markup. If attacker-controlled data can reach one of
them, you have XSS, framework or no framework. The same applies to `href` and `src`
values built from user input, where a `javascript:` URL is executable.

**Escaping and sanitizing are different jobs.** Escaping turns markup into text and is
what you want when the value should be displayed literally — frameworks do it for you.
Sanitizing parses HTML and removes what is dangerous, and is only needed when the
value must genuinely *be* markup, such as rich-text output. Never write your own
sanitizer; the bypasses are endless and the maintained libraries exist precisely
because of that.

- [Cross-Site Scripting](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS) — How the attack works and the injection sinks it arrives through, on the reference every browser feature here is documented in.
- [Types of Cross-Site Scripting](https://owasp.org/www-community/Types_of_Cross-Site_Scripting) — OWASP's taxonomy: stored, reflected, and DOM-based, and why the server-side/client-side split matters more than the stored/reflected one.
- [Cross-Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) — Output encoding rules by context — HTML body, attribute, URL, JavaScript — because the correct escaping depends on where the value lands.
- [DOM Based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html) — The client-side half: which DOM properties and methods are sinks, and what is safe to put in each one.
- [XSS Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet) — Every tag, event handler, and payload that still fires, tested per browser. Useful for understanding why hand-rolled filters fail.
- [dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html) — React's escape hatch for raw markup, and the API docs' own warning about what passing unsanitized input to it means.
- [Vue Security](https://vuejs.org/guide/best-practices/security.html) — Vue's security guide: what the template compiler escapes automatically, and why `v-html` and dynamic URL bindings are outside that guarantee.
- [DOMPurify](https://github.com/cure53/DOMPurify) — The standard HTML sanitizer, written and maintained by a security research firm and battle-tested against bypasses.
- [HTML Sanitizer API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API) — The platform's own `setHTML()`, which parses and sanitizes in one step. Not yet available in every browser; check support before relying on it.
- [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) — Locks the DOM's injection sinks so they only accept values produced by a policy you define, turning DOM XSS from a code-review problem into an enforced one.
- [Trusted Types](https://web.dev/articles/trusted-types) — How to adopt it on an existing codebase: report-only first, then find and fix the violations, then enforce.

### Content Security Policy

CSP is a response header that tells the browser which sources of script, style, image,
and frame content this page is allowed to load — a second line of defence for when an
injection gets through. It is defence in depth, not a substitute for escaping.

The critical detail is that a policy containing `'unsafe-inline'` in `script-src`
gives up almost all of the XSS protection, because an injected inline `<script>` is
exactly what it re-permits. A useful policy is instead **nonce- or hash-based**: the
server emits a fresh random nonce per response, your own inline scripts carry it, and
anything injected does not. Ship it with `Content-Security-Policy-Report-Only` first,
collect the violations from real traffic, fix them, and only then enforce.

- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) — What a policy is, what each directive controls, and how the browser resolves them. Start here.
- [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy) — The header reference: every directive and source expression, with the syntax for nonces and hashes.
- [Mitigate XSS with a Strict CSP](https://web.dev/articles/strict-csp) — The nonce-based policy Google deploys, why allowlists of domains turn out to be bypassable, and what `strict-dynamic` is for.
- [Content-Security-Policy-Report-Only](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only) — Running a policy in monitoring mode so violations are reported but nothing breaks. How every CSP rollout should begin.

### CORS

**Cross-Origin Resource Sharing does not protect your API.** This is the single most
common misunderstanding in the whole topic, so it is worth stating plainly: CORS is a
mechanism for *relaxing* the same-origin policy, not for enforcing it. It governs
whether the browser lets *page JavaScript from another origin* read your response. It
does nothing about a request from `curl`, a script, or any non-browser client, and it
is not authentication or authorization — those still have to happen on the server, on
every request.

What it does protect is your users: without it, any site they visit could read their
authenticated responses from your API. That is also why `Access-Control-Allow-Origin: *`
cannot be combined with credentials, and why reflecting an arbitrary `Origin` header
back is a real vulnerability rather than a shortcut.

A "CORS error" in the console is almost never fixable in frontend code. The browser
made the request, the server answered without the header the browser required, and the
browser refused to hand you the response. The fix is in the server's configuration —
or, in development, in the dev-server proxy.

- [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) — The full mechanism: simple versus preflighted requests, the `OPTIONS` round trip, and what each `Access-Control-*` header means.
- [CORS Errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors) — Every CORS message the browser prints, with the specific server-side cause of each. The page to open when you see one.
- [How to Win at CORS](https://jakearchibald.com/2021/cors/) — Jake Archibald on what CORS is really for, with an interactive playground that shows which requests trigger a preflight and why.
- [CORS](https://portswigger.net/web-security/cors) — The attacker's view: misconfigurations such as origin reflection and trusted null origin, and what they let someone do.

### Authentication and sessions

Two designs dominate. A **session cookie** holds an opaque identifier that means
nothing outside your server, is attached automatically to requests, and can be revoked
instantly by deleting the server-side record. A **bearer token** such as a JWT carries
its own claims, is attached by your code in an `Authorization` header, and is valid
until it expires because nothing consults a server-side record.

For an application whose frontend and backend belong to the same organisation, **a
session identifier in an `HttpOnly`, `Secure`, `SameSite` cookie is the better default
for a browser client.** `HttpOnly` puts the credential outside JavaScript's reach, so
an XSS bug becomes a serious incident instead of a total account compromise; `Secure`
keeps it off plaintext connections; `SameSite` is most of your CSRF defence. Nothing
stored in `localStorage` or `sessionStorage` has any of those properties — it is
readable by every script on the origin, which is precisely the attacker's position
after an XSS.

**JWT is a token format, not an authentication system.** It is a signed, base64url
JSON payload that anyone holding it can read — signed, not encrypted, so it is not a
place for anything private. It earns its keep where a stateless, self-contained
credential is genuinely useful: service-to-service calls, federated identity, and APIs
where a database lookup per request is not acceptable. Its costs are revocation
(hard, which is why access tokens are short-lived and paired with refresh tokens) and
storage in a browser (see above). For SPAs the IETF's guidance is to keep tokens out
of the browser entirely where possible, with a backend-for-frontend holding them and
the browser holding only a cookie; where an in-browser client is unavoidable, the
authorization code flow with PKCE is the current standard and the implicit flow is
obsolete.

- [Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) — OWASP on session IDs, cookie attributes, timeouts, and rotation after login. The normative reference for the cookie-based design.
- [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie) — Every cookie attribute defined precisely, including `HttpOnly`, `Secure`, `SameSite`, `Domain`, `Path`, and the `__Host-` prefix.
- [SameSite Cookies Explained](https://web.dev/articles/samesite-cookies-explained) — What `Lax`, `Strict`, and `None` actually do to cross-site requests, and which flows each one breaks.
- [OAuth 2.0 for Browser-Based Applications](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps) — The IETF working draft on SPA authentication: the threat model for token theft via XSS, and the backend-for-frontend, token-mediating backend, and in-browser client patterns compared. [advanced]
- [PKCE](https://oauth.net/2/pkce/) — Proof Key for Code Exchange, the extension that makes the authorization code flow safe for clients that cannot keep a secret.
- [JSON Web Token Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html) — OWASP on using JWTs safely: algorithm confusion and the `none` algorithm, missing claim validation, expiry, and revocation.
- [JWT](https://www.jwt.io/) — Decoder and signature verifier for JSON Web Tokens, plus a reference for the registered claims. Debugging tool; paste production tokens at your own risk.
- [Parse JWT](https://jwt.ms/) — Microsoft's minimal token decoder, with claim-by-claim descriptions for identity tokens.

### Cross-site request forgery

CSRF exploits the fact that the browser attaches cookies to requests based on their
destination, not on who initiated them. An attacker's page submits a form or fires a
request at your site, the browser helpfully includes the victim's session cookie, and
your server processes a state-changing action the user never intended. Note the
asymmetry with XSS: the attacker cannot *read* the response, so CSRF is about actions,
not data theft.

`SameSite` cookies are now most of the defence and browsers have moved toward `Lax` as
a default, but "most" is not "all" — cross-site `POST` navigations, subdomain-adjacent
attackers, and any endpoint that has to remain callable cross-site still need explicit
protection. The standard answer is a synchronizer token: a random per-session value
your server issues, your form submits, and your server verifies. `GET` must never
change state, which is a design rule and not merely a REST convention.

- [Cross Site Request Forgery](https://owasp.org/www-community/attacks/csrf) — OWASP's description of the attack, with concrete examples of how a request is forged from a third-party page.
- [Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) — The defences in order of preference: framework built-ins, synchronizer tokens, the double-submit pattern, and `SameSite` as defence in depth.
- [CSRF](https://portswigger.net/web-security/csrf) — How the common defences are bypassed in practice, which is the fastest way to see why the details of token binding matter.

### Other attack surface

A short list of things that bite browser applications and are rarely covered in
tutorials. None of them is exotic; all of them show up in real bug reports.

Two are worth calling out because they are one-line fixes. Any `target="_blank"` link
to an untrusted site should carry `rel="noopener"` — without it the opened page gets a
handle on your window and can navigate it somewhere convincing. And any `postMessage`
listener must check `event.origin` before trusting `event.data`, because by design
anyone can post to your window.

- [Clickjacking](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Clickjacking) — Framing your page invisibly over an attacker's to steal clicks, and the `frame-ancestors` CSP directive that prevents it.
- [Unvalidated Redirects and Forwards Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html) — Why a `?next=` parameter you redirect to without validating becomes a phishing tool wearing your domain.
- [rel=noopener](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener) — What a cross-origin opener can do to the page that opened it, and the modern browser defaults you should still not rely on.
- [Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) — Cross-origin messaging done correctly: always specify `targetOrigin`, always verify `event.origin` on receipt.
- [Prototype Pollution](https://portswigger.net/web-security/prototype-pollution) — Writing to `__proto__` through a careless deep merge or query-string parser, and how a polluted `Object.prototype` becomes XSS.
- [DOM Clobbering Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_Clobbering_Prevention_Cheat_Sheet.html) — How an injected `id` or `name` attribute overwrites a global your script depends on, without any script injection at all.

### Security headers

Four headers, all set server-side, all close to free. `Strict-Transport-Security`
takes plaintext HTTP off the table for future visits. `X-Content-Type-Options: nosniff`
stops the browser second-guessing your `Content-Type`. `Referrer-Policy` keeps URLs —
which often contain identifiers — from leaking to third parties. `Permissions-Policy`
turns off the powerful APIs your app does not use, including inside the iframes it
embeds. Add CSP from the section above and you have the standard set.

- [Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security) — Telling the browser to reach this host over HTTPS only, with the `max-age`, `includeSubDomains`, and preload considerations spelled out.
- [X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Content-Type-Options) — Disabling MIME sniffing, so an uploaded file cannot be reinterpreted as a script.
- [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy) — How much of the current URL is sent in the `Referer` header, per navigation type, with each policy value compared.
- [Permissions-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy) — Allowing or denying camera, microphone, geolocation, and the rest for your document and any frames within it.
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/) — The maintained list of headers worth setting and headers now deprecated, with a recommended baseline configuration.

### Supply chain

Every dependency is code you ship, running with your application's privileges, and the
attacks are no longer theoretical: typosquatted package names, compromised maintainer
accounts, and `postinstall` scripts that run on `npm install` before you have read a
line of the source. Install fewer things, install them deliberately, commit the
lockfile and let CI install from it with `npm ci`, and let a bot open the upgrade PRs.
[Tooling](TOOLING.md#dependency-health) has the working set — npm audit, Socket,
OpenSSF Scorecard, and Renovate — and [Git](GIT.md#github) has Dependabot. What
follows is the security-specific reading around them.

- [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity) — Pinning a hash on a `<script>` or `<link>` you load from a CDN, so a modified file simply does not execute.
- [npm Best Practices Guide](https://github.com/ossf/package-manager-best-practices/blob/main/published/npm.md) — The OpenSSF's guide to dependency management, install scripts, lockfile handling, and the checks worth running in CI.
- [lockfile-lint](https://github.com/lirantal/lockfile-lint) — Checks the lockfile itself for packages resolving to unexpected registries or hosts, which is how a substituted dependency is caught before it installs.

### Secrets and configuration

**There are no secrets in frontend code.** Anything the browser receives, the user can
read — minification is not obfuscation, and the network tab is right there. This is
not a bundler limitation to work around; it is what "runs on the client" means.

Bundlers make the boundary explicit through a prefix convention: in Vite, only
variables named `VITE_*` are exposed to client code, and in Next.js only
`NEXT_PUBLIC_*`. Those prefixes are not a security feature, they are a *labelling*
feature — the prefix means "this value is public", and the value is inlined into the
bundle as a literal at build time. If a third-party API needs a secret key, the call
belongs on a server you control, with the browser talking to your endpoint instead
(the backend-for-frontend pattern above). Publishable keys designed to be public,
such as Stripe's, are the exception — check the vendor's documentation rather than
assuming.

- [Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) — OWASP on where secrets should live, how they get rotated, and the leak paths — repositories, logs, build artefacts — they escape through.
- [Env Variables and Modes](https://vite.dev/guide/env-and-mode) — Vite's rules for which variables reach the client, and its explicit warning that `VITE_`-prefixed values are embedded in the bundle.
- [Environment Variables](https://nextjs.org/docs/app/guides/environment-variables) — The Next.js equivalent, and the difference between a server-only variable and a `NEXT_PUBLIC_` one.
- [Secret Scanning](https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning) — GitHub's detection of committed credentials, including push protection that blocks the commit before it lands.

## Practice

Reading about XSS and landing one are different skills, and the second is what makes
the first stick. Everything here is deliberately vulnerable and legal to attack —
which is the point, because the same techniques against a site you do not own are a
crime rather than an exercise.

- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) — A modern JavaScript shop application with a vulnerability behind nearly every feature, scored as a capture-the-flag. The standard place to start.
- [XSS Game](https://xss-game.appspot.com/) — Six escalating XSS challenges from Google's security team, each solved by finding the sink and crafting the payload.
- [Vulnerable Web Applications Directory](https://owasp.org/www-project-vulnerable-web-applications-directory/) — OWASP's catalogue of intentionally insecure applications, sorted by whether they are online, offline, or virtual machines.

## Tools

Three checks worth running before a launch and then on a schedule. The first two take
a URL and grade what the server is actually sending, which is usually the fastest way
to find out that a header you believed was configured is not. The third looks the
other way, at what your repository is leaking.

- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) — Paste a Content-Security-Policy and get Google's assessment of it, including the bypasses an allowlist-based policy leaves open.
- [HTTP Observatory](https://developer.mozilla.org/en-US/observatory) — Mozilla's scanner: grades a site's security headers, explains every deduction, and links to the fix on MDN.
- [Gitleaks](https://github.com/gitleaks/gitleaks) — Scans a repository and its history for committed API keys, tokens, and passwords, as a pre-commit hook or a CI step.

## Deep dives

- [Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — OWASP's full testing methodology, from information gathering through to each vulnerability class. What a professional assessment actually covers. [advanced]
- [PortSwigger Research](https://portswigger.net/research) — Original research on new attack classes — request smuggling, web cache poisoning, browser-powered scanning — usually a few years ahead of the guidance. [advanced]
- [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist) — An exhaustive pre-launch checklist for a frontend, with a security section covering headers, HTTPS, and content policies.
- [Troy Hunt](https://www.troyhunt.com/) — Long-running blog on breaches, password handling, and HTTPS, by the person who runs Have I Been Pwned. The best writing on why this matters, aimed at developers rather than specialists.
