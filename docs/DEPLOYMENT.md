# Deployment

Getting what you built onto a public URL and keeping it there — hosting, domains, pipelines, and the configuration that decides whether any of it works.
Part of the [Frontend Roadmap](../README.md).
See also [Git](GIT.md#github) for the repository half of a pipeline,
[Security](SECURITY.md#secrets-and-configuration) for what must never reach the bundle,
[Performance](PERFORMANCE.md) for why cache headers are worth the trouble, and
[Tooling](TOOLING.md#publishing-a-package) for shipping a library instead of a site.

A project that runs only on your laptop is not finished, and nobody can look at it.
That matters more than it sounds: a portfolio is a list of URLs, an interview is
easier when the interviewer can click something, and a bug you only see in
production is a bug you cannot fix until you have a production. Deployment is the
least glamorous topic in this roadmap and the one that turns exercises into work
you can show.

**The good news is that the default path is genuinely easy now.** For a static site
the whole job is: connect a repository, name a build command, name an output
folder. The host builds on every push, serves the result from a CDN, and issues an
HTTPS certificate without being asked. Free tiers cover a personal site comfortably.
Do this on the first project rather than the fifth — the habit is worth more than
the deploy.

**Two questions pick your host.** First, does anything need to run on a server when
a request arrives? If your build produces plain files, every static host below
works and the choice is about price and convenience. If you need server-side
rendering, API routes, or secrets used at request time, you need a platform that
runs code. Second, and less obvious: what do the terms say? The Vercel Hobby plan
is personal, non-commercial use only, and GitHub Pages likewise rules out running a
business on it. Both are fine for learning and neither is fine for a client.

**Free tiers are real, but the thing that bites is rarely price.** It is a monthly
build-minute cap, a free instance that sleeps after fifteen idle minutes, a licence
clause, or an egress bill on a cloud provider that has no lasting free tier. The
entries below say which, and deliberately quote no prices — those change, the shape
of the constraint does not. Buying a domain is the one cost you cannot avoid, and
it is small; Cloudflare Registrar sells at cost, Porkbun and Namecheap are the
usual cheap alternatives.

**Most deployment problems are configuration problems.** An environment variable
that exists locally and not in CI, an asset path that assumes the site is at the
root, a single-page app that 404s on refresh because the host never learned to fall
back to `index.html`, a stale HTML file cached for a year by mistake. Almost
nothing in that list is about hosting, which is why the reference sections here are
longer than the list of hosts.

## Learn

### Deploy your first site

Pick one of these and do it today, with whatever you have already built — a single
`index.html` counts. Each one ends with a public URL on HTTPS, and none takes an
afternoon. The point is to get the loop closed once; comparing platforms is a
problem for later.

- [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart) — Publishes a folder of HTML straight from a repository, with no build step and no account you do not already have.
- [Netlify Drop Quickstart](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/) — Drag a build folder onto a web page and get a live URL back, which is the shortest path that exists.
- [Getting Started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Import a repository, accept the detected framework settings, and get a production URL plus a fresh preview URL for every branch.
- [Get Started with Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/) — The same connect-a-repository flow on Cloudflare's network, with a direct-upload path for a folder you built locally.

### Framework deploy guides

Once there is a build step, the framework's own deployment page is more reliable
than a blog post, because it is maintained alongside the thing it documents. Read
it before you fight your host: the base-path setting and the choice of adapter are
where nearly all "works locally, blank page in production" bugs come from.

- [Deploying a Static Site](https://vite.dev/guide/static-deploy) — Vite's per-host instructions for the `dist` folder, including the `base` setting that a GitHub Pages project site needs.
- [Deploy your Astro Site](https://docs.astro.build/en/guides/deploy/) — Astro's deployment index, host by host, with the adapter each one needs once the site stops being purely static.
- [Deploying Next.js](https://nextjs.org/docs/app/getting-started/deploying) — The four options for a Next.js build: a managed platform, a Node server you run, a Docker image, or a fully static export.

## Reference

### Edge and serverless

Serverless means the platform starts your function when a request arrives and bills
you for the invocation; edge means it runs in the data centre nearest the user
rather than in one region you chose. They are usually sold together and they are
not the same promise.

**The edge helps when the work is self-contained** — a redirect, a rewrite, an
auth check, geolocation, a personalised header. It stops helping the moment the
function has to talk to a database in one region, because you have moved the
compute away from the data and added a round trip to every query. A function
running "near the user" and 6,000 miles from its database is slower than one
sitting next to it.

**Cold starts** are the other half. A conventional serverless platform boots a
container the first time a function is hit and after it has been idle, which adds a
visible delay to that request; V8-isolate platforms such as Cloudflare Workers
avoid it, at the cost of a runtime that is not Node.

- [What is Serverless Computing?](https://www.cloudflare.com/learning/serverless/what-is-serverless/) — The model in plain terms: functions the platform starts on demand, scales without you, and bills per invocation.
- [What is Edge Computing?](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/) — Running code close to the user instead of in a single region, and the latency argument for doing it.
- [How Workers Works](https://developers.cloudflare.com/workers/reference/how-workers-works/) — V8 isolates instead of containers, which is why a Worker starts instantly and cannot use most of the Node API.
- [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/) — Cloudflare's own account of when running at the edge is slower than running near your database, and how it moves the code back.

### Domains, DNS, and TLS

A domain is rented from a registrar, and DNS is the lookup table that connects it
to your host. Three record types cover nearly everything a frontend developer
does: **A** points a name at an IP address, **CNAME** points a name at another
name, and **TXT** holds text that some service reads to verify you own the domain.

The classic trap is the apex: `example.com` cannot legally be a CNAME the way
`www.example.com` can, so hosts either give you IP addresses for the apex or offer
a provider-specific flattening record. Follow whatever your host's custom-domain
page says. The second trap is patience — resolvers cache, so a change takes minutes
to hours to be visible everywhere, and re-editing the record in the meantime only
makes it worse.

HTTPS is not optional and is no longer a chore: every managed host issues and
renews certificates for you, and on a VPS, Caddy or Certbot does the same.

- [What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/) — How a hostname becomes an IP address, resolver by resolver, and where the delay after a change comes from.
- [DNS Records](https://www.cloudflare.com/learning/dns/dns-records/) — The record types you will actually edit — A, AAAA, CNAME, TXT, MX — each with what it points at and what it is for.
- [About Custom Domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages) — A worked example of pointing a domain at a host: apex versus `www`, the records for each, and the certificate that follows.
- [Why HTTPS Matters](https://web.dev/articles/why-https-matters) — What plaintext HTTP exposes to anyone on the path, and the browser features that refuse to run outside a secure context.
- [Let's Encrypt](https://letsencrypt.org/) — The nonprofit certificate authority that made TLS free and automatic, and the issuer behind most one-click HTTPS buttons.

### CI/CD

Continuous integration runs your checks on every push; continuous delivery keeps
the result deployable at all times. For a frontend the pipeline is short and always
the same shape: install with a lockfile, lint, test, build, deploy the output. Get
that far and you have removed the entire category of bug that begins "it worked on
my machine".

GitHub Actions is the default because it is already attached to the repository —
see [Git](GIT.md#github) for the concepts. Three details pay for themselves
immediately: **cache your dependencies**, or every run reinstalls from the network;
**use a matrix** only where you genuinely support several Node versions, because it
multiplies your minutes; and **give the workflow the narrowest permissions it
needs**, since a deploy token in a public repository's workflow is a real target.

GitLab CI and CircleCI are the mature alternatives if your code is not on GitHub;
the vocabulary transfers almost directly.

- [GitHub Actions Quickstart](https://docs.github.com/en/actions/get-started/quickstart) — Your first workflow file, committed to `.github/workflows`, running on a push.
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) — Every key a workflow file accepts: triggers, jobs, steps, permissions, and the expression syntax between them.
- [Dependency Caching](https://docs.github.com/en/actions/concepts/workflows-and-actions/dependency-caching) — Reusing an install between runs, which is usually the difference between a two-minute pipeline and a ten-minute one.
- [Running Job Variations](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations) — Matrix builds: one job definition run in parallel across several Node versions or operating systems.
- [Using Custom Workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) — The build-then-deploy pipeline for a framework site, which is the shape most frontend deploy workflows take.
- [Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/) — A disposable deployment per pull request, so a reviewer clicks a link instead of checking out the branch.
- [GitLab CI/CD](https://docs.gitlab.com/ci/) — The same ideas expressed in `.gitlab-ci.yml`, for repositories that do not live on GitHub.

### Environment and configuration

Configuration splits at the build. **Build-time** values are read when the bundle is
produced and baked into it as literals — change one and you must rebuild.
**Runtime** values are read by a server when a request arrives, so the same
artifact behaves differently per environment. A purely static site has no runtime,
which is why every value it uses is build-time whether you wanted that or not.

**Anything a bundler inlines is public.** `VITE_`, `NEXT_PUBLIC_`, and their
equivalents are labels announcing that fact, not protections — the value ships in
the JavaScript and the user can read it. [Security](SECURITY.md#secrets-and-configuration)
covers the consequences and the backend-for-frontend pattern that avoids them. The
rule here is simply that a secret goes in your CI provider's secret store and is
used by a server, never by a bundle.

- [The Twelve-Factor App: Config](https://12factor.net/config) — The argument for keeping configuration in the environment rather than the code, with the test for whether you have actually done it.
- [Managing Environments for Deployment](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) — Separate staging and production configuration in Actions, with protection rules and per-environment secrets.
- [Using Secrets in GitHub Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets) — Where a deploy token belongs, how it reaches a step, and why it is masked in the logs.
- [Environment Variables on Vercel](https://vercel.com/docs/environment-variables) — Per-environment values on a managed host, and which of them are available at build time, at request time, and in the browser.
- [dotenv](https://github.com/motdotla/dotenv) — Loads a local `.env` file into `process.env` for development, and the `.gitignore` line that keeps it out of the repository.

### Caching and delivery

Caching a deployed frontend correctly is two rules, and they are opposites.
**Hashed assets get cached forever** — `app.4f2c1b.js` changes its name whenever its
contents change, so `Cache-Control: public, max-age=31536000, immutable` is safe and
correct. **HTML is never cached like that**, because its URL is stable and it is
the file that points at the new hashes; give it a short lifetime or
`no-cache` so the browser revalidates.

Get those backwards and you ship a site that either never updates for returning
visitors or re-downloads its entire bundle on every page view. Every deploy target
has a place to set these headers — a `_headers` file, a config block, a CDN rule —
and the default is rarely what you want. If you have to reuse a filename, you are
in invalidation territory, which is the slow path and the reason content hashing
exists. [Performance](PERFORMANCE.md) covers what the bytes cost once they arrive.

- [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) — How browsers and CDNs decide whether to reuse a response, with every `Cache-Control` directive that steers the decision.
- [Caching Best Practices & Max-Age Gotchas](https://jakearchibald.com/2016/caching-best-practices/) — The two-pattern rule this whole subject reduces to, and the failure mode of each pattern applied to the wrong file.
- [What is a CDN?](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) — Why a copy of your assets in a hundred locations beats one origin server, and which requests it cannot help.
- [Invalidating Files](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html) — Purging a CDN when a filename had to be reused, on the CDN whose invalidation model the others copied.
- [Caching in webpack](https://webpack.js.org/guides/caching/) — Content hashes in output filenames, which is the build-side half of a one-year cache lifetime.

### Release practices

Deploying and releasing are separate events, and keeping them separate is what
makes shipping boring. A **preview deployment** per pull request means every change
is reviewed as a working site. A **feature flag** lets unfinished code merge and
deploy without being visible, which kills the long-lived branch. A **staged
rollout** exposes a new version to a fraction of traffic first. And **rollback**
should be a button that re-points at the previous build, not a revert commit and a
ten-minute rebuild — check that your host has one before you need it.

For libraries rather than sites the release is a version number:
[Semantic Versioning](GIT.md#github) for what a bump promises, and
[Changesets](TOOLING.md#monorepos) for accumulating those decisions in pull
requests and turning them into a changelog. Managed flag services exist too —
PostHog, Unleash, and LaunchDarkly among them — but an environment variable and an
`if` is a legitimate first version.

- [Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html) — The definition worth holding to: software that is always in a releasable state, so releasing becomes a business decision rather than an engineering event.
- [Canary Release](https://martinfowler.com/bliki/CanaryRelease.html) — Rolling a version out to a slice of traffic first, so a bad deploy is found by a few users instead of all of them.
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) — Shipping unfinished work behind a flag, the four kinds of toggle, and the cost of never deleting them.
- [Instant Rollback](https://vercel.com/docs/instant-rollback) — Reverting to a previous deployment as an operation rather than a rebuild, and the property to look for in any host.

### Containers and the wider picture

A container is your app plus the exact filesystem it needs, packaged so it runs the
same on any machine. A frontend rarely needs one on a managed host — the platform
already knows how to build a Node project — but it becomes the unit of deployment
the moment you move to a VPS, a cloud runner, or an orchestrator, and it is how
most backends you work with are shipped. Learn enough to read a Dockerfile and
write a two-stage one: build the site in a Node image, copy the output into a tiny
web-server image, ship that. Everything past this point — Kubernetes, Terraform,
service meshes — is a different job that borders yours.

- [Docker Get Started](https://docs.docker.com/get-started/) — Images, containers, and the Dockerfile, written for someone who has never needed one before.
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/) — Building in one image and copying only the output into another, which is how a frontend container stays small.
- [Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/) — An interactive tour of what your build artifact runs on at larger companies. Orientation, not a skill you need yet.

## Tools

### Static hosting

If your build produces files, this is the whole market, and all five of the
managed options do the same core thing well. Choose on the constraint that will
reach you first, noted in each line below.

- [GitHub Pages](https://pages.github.com/) — Static hosting straight from a repository, free for public repos; static files only, and the terms exclude running a business on it.
- [Cloudflare Pages](https://pages.cloudflare.com/) — Static hosting on Cloudflare's network with unmetered bandwidth on the free plan; the cap you meet first is monthly build runs. [freemium]
- [Netlify](https://www.netlify.com/) — Git-connected hosting with previews, redirects, and forms built in; the free plan is a monthly credit allowance rather than an open-ended one. [freemium]
- [Vercel](https://vercel.com/) — Git-connected hosting built around Next.js, with a preview URL per branch; the free Hobby plan is personal, non-commercial use only. [freemium]
- [Surge](https://surge.sh/) — One command publishes a folder, with a custom domain and basic SSL included free; a CLI with no dashboard and no build step.
- [Amazon S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) — Serving a bucket as a site, fronted by CloudFront for HTTPS and caching; endlessly configurable, billed per request and gigabyte once the introductory tier lapses. [paid]

### Hosting apps with a server

Everything here runs your code when a request arrives, which is what
server-rendered pages, API routes, and request-time secrets require. Vercel,
Netlify, and Cloudflare do it as functions bolted onto the static hosting above;
Render, Railway, and Fly run an actual long-lived process. See
[Frameworks](FRAMEWORKS.md#rendering-strategies) for which rendering strategy needs
which.

- [Vercel Functions](https://vercel.com/docs/functions) — The server half of Vercel: SSR, API routes, and streaming, in either a Node runtime or a lighter edge one. [freemium]
- [Netlify Functions](https://docs.netlify.com/build/functions/overview/) — Serverless handlers deployed from a folder in the repository, which is how a Netlify site gets SSR and an API. [freemium]
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) — Code that runs in every Cloudflare location, with a free daily request allowance; edge rendering works, long-running Node code does not. [freemium]
- [Fly.io](https://fly.io/docs/) — Runs your container as real VMs in the regions you pick, with persistent processes and volumes; pay-as-you-go, with no free allowance for new accounts. [paid]
- [Render Web Services](https://render.com/docs/web-services) — A managed Node process built from a repository; free instances sleep after fifteen idle minutes and take about a minute to answer the next request. [freemium]
- [Railway](https://railway.com/) — Deploys a service and its database from a repository with very little configuration; the free plan is a small monthly usage credit rather than a free machine. [freemium]
- [Caddy](https://caddyserver.com/docs/) — The web server for the VPS route, which obtains and renews a TLS certificate for your domain without being configured to.

### Monitoring and observability

Once a site is public you stop being the one who finds the bugs. Three things are
worth having on day one, and all three have free tiers: **error tracking**, so a
broken build reports itself; an **uptime check**, so you hear about downtime before
a user does; and **analytics**, so you know whether anyone is there at all.

Real-user performance monitoring is the fourth, and it lives in
[Performance](PERFORMANCE.md#measuring) with the web-vitals library. On source
maps: generate them for production, but upload them to your error tracker rather
than deploying them next to the bundle, so stack traces are readable to you and
your source is not readable to everyone.

- [Sentry](https://sentry.io/welcome/) — Error tracking for the browser: stack traces, the release that introduced them, and the user actions that led up to the crash. [freemium]
- [Uploading Source Maps](https://docs.sentry.io/platforms/javascript/sourcemaps/) — Getting readable production stack traces without publishing your source, and the build-step integrations that automate it.
- [GlitchTip](https://glitchtip.com/) — Open-source error tracking that speaks the Sentry protocol, so the same SDK reports to a server you run. [freemium]
- [UptimeRobot](https://uptimerobot.com/) — Requests your URL on a schedule and alerts you when it stops answering, on a free plan that covers a personal site. [freemium]
- [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) — Page views and Core Web Vitals with no cookies and no cross-site tracking, free for any site.
- [Umami](https://umami.is/) — Privacy-respecting analytics you can self-host in an evening, with a hosted free tier if you would rather not. [freemium]

### Checking a deployment

- [SSL Server Test](https://www.ssllabs.com/ssltest/) — Grades the TLS configuration of a public hostname and names every weak setting behind the grade.
- [What's My DNS](https://www.whatsmydns.net/) — Resolves a record from dozens of countries at once, which is how you tell propagation from a typo.
- [act](https://github.com/nektos/act) — Runs GitHub Actions workflows locally in Docker, so fixing a pipeline does not cost twenty push-and-wait cycles.

## Deep dives

- [Release Engineering](https://sre.google/sre-book/release-engineering/) — The chapter from Google's SRE book on treating builds, branching, and rollout as an engineering discipline with its own owners. [advanced]
- [Eliminating Cold Starts with Cloudflare Workers](https://blog.cloudflare.com/eliminating-cold-starts-with-cloudflare-workers/) — What a cold start actually costs on a conventional serverless platform, and the isolate model that removes it. [advanced]
- [DevOps Roadmap](https://roadmap.sh/devops) — The map of everything past this file — Linux, networking, containers, orchestration, observability — in the order people usually learn it.
