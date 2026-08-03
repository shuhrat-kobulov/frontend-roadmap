# AI Tools

Coding assistants and the habits that make them useful, the ways they fail, and the frontend side of building AI features.
Part of the [Frontend Roadmap](../README.md).
See also [Design](DESIGN.md#ai-assisted-design) for generated screens and illustrations,
[Security](SECURITY.md) for what to look for in code you did not write,
[Testing](TESTING.md) for the suite that catches what review misses, and
[Git](GIT.md#pull-requests-and-code-review) for the review workflow this all lands in.

**Reviewed: 2026-08.** This is the fastest-rotting file in the roadmap — products
here get renamed, absorbed, or repriced in a matter of months, and a link that
resolved when this was written can point at a different company by the time you
read it. It is checked on a schedule rather than only when something breaks, and a
pull request that updates the review date along with the entries is more useful
than one that fixes a single link. Prices are deliberately not quoted; only the
shape of the tier is, because that changes more slowly than the number.

**Tags follow [the style guide](STYLE.md#cost): an untagged entry is free**,
`[freemium]` means a genuinely usable free tier exists, and `[paid]` means payment
is required. One case does not fit neatly: several assistants here are free,
open-source programs that call a model you supply an API key for. The software
costs nothing and the tokens are metered, so those entries are untagged with the
arrangement stated in the description.

**The tools are not the skill.** Every assistant below will produce plausible code
on the first try; the part that takes practice is deciding what to ask for, how
much context to hand over, and which of the answers to keep. That judgment is what
the Learn section is about, and it is worth more than picking the right product.

**This file assumes you are learning frontend, not machine learning.** The section
on building AI features covers streaming a response into a UI and handling it when
the model is slow, wrong, or down — the frontend half. Training, fine-tuning, and
model evaluation are out of scope on purpose.

## Learn

### Using them well

The difference between an assistant that saves you an afternoon and one that costs
you two is almost entirely in how it is used. Five habits carry most of it:

**Give it the context it cannot see.** A model reads what you show it and guesses at
the rest. Point it at the files that matter, paste the actual error, name the
version of the framework you are on. Most "the AI got it wrong" stories are really
"the AI was asked to guess."

**Scope the task small.** "Add a loading state to this component" succeeds far more
often than "build the dashboard." Small tasks fail visibly and cheaply; large vague
ones produce something that looks finished, compiles, and is wrong in the middle.

**Review it as if a stranger wrote it.** Because one did. The failure mode is
approving a diff that reads fluently, and fluency is exactly what these models are
best at. Read the generated code with the same suspicion you would bring to a pull
request from someone you have never met — check what it deleted as carefully as
what it added.

**Never merge code you could not explain.** If you cannot say why a line is there,
you cannot debug it at 2am, review a change to it, or notice that it introduced a
security hole. Ask the assistant to explain it, or write that part yourself. This is
the single most expensive corner to cut, and the cost arrives later.

**Write it yourself when it is faster to write than to specify.** Short, exact, or
deeply context-dependent code is quicker to type than to describe. So is anything
you are trying to learn — the reps are the point, and outsourcing them is how you
end up with a framework you cannot use without help.

- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices) — Anthropic's own guidance on scoping a task, planning before editing, and keeping an agent's context useful rather than merely full.
- [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Context treated as a limited budget to spend deliberately, not a box to fill with everything available.
- [AGENTS.md](https://agents.md/) — Open convention for the instruction file an agent reads before touching your repo, honoured by a growing number of tools.
- [Store Instructions and Memories](https://code.claude.com/docs/en/memory) — The `CLAUDE.md` side of the same idea: project conventions, build commands, and review rules loaded at the start of every session.
- [Cursor Rules](https://cursor.com/docs/rules) — Per-project and per-directory instruction files, with the scoping options that stop one rule from applying everywhere.
- [Prompt Engineering for Copilot](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) — GitHub on scoping a request, supplying examples, and splitting a large task into ones a model can finish.
- [How I Use LLMs to Help Me Write Code](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) — Simon Willison's 2025 account of his working method in detail, including setting context deliberately and testing everything.
- [Exploring Generative AI](https://martinfowler.com/articles/exploring-gen-ai.html) — Birgitta Böckeler's running series of honest experiments on martinfowler.com, written up as findings rather than takes.

### Prompting and context engineering

Prompting is a real skill with a small amount of transferable technique and a large
amount of taste. The material below is the technique; the taste comes from doing it.
Skip anything titled "prompt hacks" — the specific tricks stop working with each
model release, while being explicit, giving examples, and stating the format you
want have survived every one so far.

- [Prompt Engineering Overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) — Anthropic's techniques in rough order of how much they help, from being explicit through examples to structured output.
- [Prompt Engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) — OpenAI's equivalent guide, worth reading alongside the above for where the two agree.
- [Prompt Engineering Guide](https://www.promptingguide.ai/) — Open-source reference for the named techniques — few-shot, chain-of-thought, ReAct — each with the paper it came from.
- [Anthropic Courses](https://github.com/anthropics/courses) — Free notebook-based courses, including a prompt engineering tutorial you work through rather than read.

## Reference

A model reads and writes **tokens**, roughly three-quarters of a word each, and can
hold only so many of them at once — the **context window**. Nearly everything that
feels mysterious about these tools falls out of those two facts. A long session gets
worse because the window fills with things that no longer matter. A large file
blows the budget. Cost and latency both scale with tokens, which is why the same
feature can be cheap on one model and not on another, and why the numbers below
matter as much when you are using an assistant as when you are building with one.

- [Context Windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) — What the window is, how a conversation consumes it, and what happens as it fills.
- [Token Counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) — Measuring a request before sending it, which is where any real cost or latency estimate starts.
- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — Per-token prices by model, plus what caching and batching do to them.
- [SWE-bench](https://www.swebench.com/) — The benchmark most coding-agent claims cite: real GitHub issues, scored on whether the patch passes the repository's own tests.

## Tools

### Coding assistants

Three shapes, and the shape matters more than the brand. **In-editor completion**
suggests the rest of the line or function as you type. **Chat** answers questions
about code you show it. **Agents** are given a goal and then read files, run
commands, and edit across a codebase until they think they are done — which is the
most useful and the one that needs the most supervision, since it acts before you
see the result.

Where a tool runs decides how it fits your work: a terminal agent composes with the
shell and CI, an IDE-native one sees your editor state, and a cloud one keeps
working after you close the laptop. Several now run in all three.

- [Claude Code](https://code.claude.com/docs/en/overview) — Anthropic's agentic tool, in the terminal, VS Code, JetBrains, a desktop app, and the browser; strongest on multi-file work in a codebase it can explore first. [paid]
- [GitHub Copilot](https://docs.github.com/en/copilot) — Completion, chat, and agent mode across VS Code, JetBrains, the CLI, and github.com, with the broadest free tier of the commercial options. [freemium]
- [Cursor](https://cursor.com/docs) — A VS Code fork built around the agent rather than bolting one on, with codebase-wide context and a free Hobby tier. [freemium]
- [Codex](https://learn.chatgpt.com/docs) — OpenAI's coding agent across a CLI, an IDE extension, and a cloud environment that runs tasks in its own sandbox. [paid]
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) — Google's open-source terminal agent, usable at no cost with a personal Google account before any paid tier applies. [freemium]
- [Antigravity](https://antigravity.google/) — Google's agent-first IDE and CLI, free for individual developers. [freemium]
- [Zed](https://zed.dev/) — A fast native editor with agents built in, free as an editor and usable with your own API keys instead of a subscription. [freemium]
- [Cline](https://docs.cline.bot/) — Open-source VS Code agent that plans before it edits and asks before it acts; you supply an API key and pay per token.
- [Aider](https://aider.chat/) — Open-source terminal agent that works directly in git, committing each change so anything it does is one `git revert` away; bring your own key.

### In the editor and the pipeline

Beyond writing code, the durable wins are the chores: a first-pass review before a
human reads the diff, a commit message drawn from the staged changes, tests for code
that has none, and the mechanical half of a large refactor. All four share a shape —
the machine proposes at volume, you dispose. Automated review in particular is best
understood as a linter with judgment, not a reviewer: it is good at spotting the
null check you forgot and blind to the fact that the feature solves the wrong
problem.

Documentation is the sleeper. Generated docstrings and READMEs are usually
serviceable and always need a pass, but the bigger gain is asking an assistant to
explain an unfamiliar area of a codebase before you change it.

- [VS Code Agents](https://code.visualstudio.com/docs/agents/overview) — How chat, edits, and agent mode work inside VS Code, which is where most people meet all of this first.
- [Copilot Code Review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) — Requesting an automated first-pass review on a pull request, and configuring what it comments on. [freemium]
- [CodeRabbit](https://www.coderabbit.ai/) — Line-by-line pull request review bot, free forever on public repositories. [freemium]
- [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) — Running an agent in CI to triage issues, review pull requests, or apply a fix when someone comments on one. [paid]
- [Write Tests with Copilot](https://docs.github.com/en/copilot/tutorials/write-tests) — Generating a suite for code that has none, and why the generated cases still need reading.
- [aicommits](https://github.com/Nutlope/aicommits) — Writes a commit message from the staged diff, which is the smallest useful version of all of this.
- [Context7](https://context7.com/) — Serves current library documentation to an assistant, the standard fix for a model confidently writing an API that changed after its training cutoff. [freemium]

### UI generation and design-to-code

Two different promises. **Prompt-to-UI** invents a screen from a description;
**design-to-code** converts a design file you already have. The first is genuinely
fast for exploring a layout and getting to something clickable. The second is the
older problem and still the harder one.

Judge the output on what a screenshot does not show. Generated markup is routinely
`div`-only, unlabelled, unreachable by keyboard, and styled with contrast that fails
at a glance — see [Accessibility](ACCESSIBILITY.md). Treat every result as a first
draft whose review burden lands on you, and note that a draft you did not write is
harder to review than one you did. `v0`, Lovable, and Recraft live in
[Design](DESIGN.md#ai-assisted-design) with the rest of the design tooling.

- [Figma Make](https://www.figma.com/make/) — Prompt-to-app inside Figma, working from your own file's frames and variables rather than from nothing. [freemium]
- [Builder.io Design to Code](https://www.builder.io/m/design-to-code) — Converts a Figma frame into component code in your framework, mapped onto your existing components where it can. [freemium]
- [Anima](https://www.animaapp.com/) — Figma-to-React and HTML export aimed at preserving the design's spacing, type, and responsive behaviour. [freemium]
- [Onlook](https://www.onlook.com/) — Open-source visual editor that edits a real React codebase, so a design change lands as a code change you can review. [freemium]

### Building AI features into a frontend

The frontend job here is smaller than it looks and mostly familiar: call an API that
answers slowly, render it as it arrives, and stay usable when it fails. Streaming is
the default because a first token in 300ms reads as fast while a complete answer in
eight seconds reads as broken, even though the second one finished sooner.

Three things to design for that ordinary APIs do not have. **Latency is variable and
long**, so a spinner is not enough — stream, show partial output, and let the user
stop a response mid-flight. **Cost is per token**, which makes an unthrottled retry
loop or a chatty system prompt a billing incident rather than a performance bug.
**The output is not guaranteed**, so a model can return malformed JSON, refuse, or
time out on a request that worked a minute ago; every one of those needs a real UI
state, not a thrown promise.

- [AI SDK](https://ai-sdk.dev/) — Vercel's TypeScript toolkit for calling models from a JavaScript app behind one interface, and the default choice in React.
- [AI SDK Chatbot](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot) — `useChat` end to end: streaming messages, loading and error states, stopping a response, and regenerating it.
- [Generative User Interfaces](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) — Streaming React components instead of text, so a model's tool call renders as real UI rather than a code block.
- [assistant-ui](https://www.assistant-ui.com/) — React primitives for chat interfaces, with streaming, attachments, and generative UI handled for you.
- [Streaming Messages](https://platform.claude.com/docs/en/build-with-claude/streaming) — The server-sent event stream a model API actually emits, which is what every wrapper above is wrapping.
- [Using Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) — The browser API underneath token streaming, reconnection behaviour and message format included.
- [People + AI Guidebook](https://pair.withgoogle.com/guidebook/) — Google PAIR on the UX problems specific to this: setting expectations, designing for wrong answers, and collecting feedback.

### MCP and tool integration

The Model Context Protocol is an open standard for connecting an assistant to
things outside its chat window — a filesystem, a browser, an issue tracker, a Figma
file. Before it, every tool integration was bespoke to one product; with it, a server
written once works in any client that speaks the protocol.

The frontend reason to care is specific: it closes the loop. An agent with a browser
server can open the page it just changed, read the console, and see that its own fix
did not work — without you pasting the error back in. One with a Figma server can
read the actual frame instead of guessing from a screenshot.

- [Model Context Protocol](https://modelcontextprotocol.io/) — The standard itself: concepts, quickstarts, and the client and server SDKs.
- [MCP Specification](https://modelcontextprotocol.io/specification/) — The protocol in detail — transports, tools, resources, prompts — versioned by date.
- [MCP Servers](https://github.com/modelcontextprotocol/servers) — Reference server implementations plus a directory of community ones, which is the fastest way to see what the protocol is for.
- [Figma MCP Server](https://developers.figma.com/docs/figma-mcp-server/) — Serves frames, variables, and component data from a Figma file straight into an assistant. [freemium]
- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) — Gives an agent a real browser: navigate, inspect the DOM, read the console, and record a performance trace.

## Deep dives

### Limitations and failure modes

These tools fail in ways that are specific, repeatable, and mostly invisible if you
are not looking for them. Five worth knowing by name:

**Hallucinated APIs.** A model will invent a method, an option, or an npm package
with total confidence. The invented package is the dangerous case — attackers
register names that models reliably hallucinate, so an install command copied
without checking is a supply-chain attack with your own hands on the keyboard.

**Confident wrongness.** There is no signal in the output distinguishing an answer
the model is sure of from one it made up. Fluency is constant; accuracy is not.

**Stale training data.** Models are trained up to a cutoff and then keep recommending
what was current then — a deprecated React pattern, a router API that changed, a
library that has since been abandoned. Frontend rotates faster than most fields, so
this bites here more than elsewhere. Check the current documentation, or wire the
docs in directly.

**Silent security holes.** Generated code will happily interpolate user input into
`innerHTML`, skip escaping, log a secret, or leave out an authorisation check nobody
asked for. Nothing fails; the tests pass. Read [Security](SECURITY.md) and review for
this deliberately, because no other step will catch it.

**Over-reliance.** The measured effect is not that people write worse code
immediately — it is that they check less, understand less, and become more confident
while doing it. If you are learning something, generating it is the one time the
shortcut costs more than it saves.

- [Do Users Write More Insecure Code with AI Assistants?](https://arxiv.org/abs/2211.03622) — 2022 Stanford study in which participants with an assistant wrote less secure code and were more likely to believe it was secure.
- [We Have a Package for You!](https://arxiv.org/abs/2406.10279) — Measures how often models invent package names that do not exist, and the "slopsquatting" attack that follows from it.
- [Hallucinations in Code Are the Least Dangerous Form of LLM Mistakes](https://simonwillison.net/2025/Mar/2/hallucinations-in-code/) — 2025 argument that an invented API is the easy case because it fails loudly, and an account of what the quiet failures look like instead.
- [Measuring the Impact of Early-2025 AI on Experienced Developers](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — 2025 randomised trial by METR in which developers took 19% longer with AI tools and believed they had been 20% faster.
- [The Impact of Generative AI on Critical Thinking](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/) — 2025 Microsoft Research survey finding that higher confidence in a tool tracks with less critical evaluation of what it produces.
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) — The standard risk list for anything you build on a model, prompt injection and insecure output handling at the top.

### Licensing, privacy, and disclosure

Three questions that have practical answers, and one rule that does not need a
lawyer.

**Who owns the output?** Vendors assign you whatever rights they have, but US
copyright protection requires human authorship — so purely machine-generated code
may not be protectable by anyone, and a suggestion that reproduces a training
example verbatim carries that example's licence with it. Turn on duplication
detection if your tool has it.

**What happens to what you send?** Consumer and business tiers of the same product
often differ on retention and on training, and that difference is usually the whole
of a company's AI policy. Read the terms for the tier you are actually on.

**Do you have to say you used it?** Increasingly your employer's call rather than
yours, and a co-author trailer on the commit is the cheap, honest default. Some
open-source projects require disclosure and a few refuse AI-assisted contributions
outright — check `CONTRIBUTING.md` before opening a pull request.

The rule: **do not paste anything into a third-party service that you would not
email to a stranger.** Credentials, customer data, unreleased code, anything under
NDA. Once it leaves your machine you are relying entirely on a terms page.

- [Copyright and Artificial Intelligence](https://www.copyright.gov/ai/) — The US Copyright Office's reports on training data and on whether AI-generated output is copyrightable at all.
- [Finding Code That Matches Public Code](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/find-matching-code) — Copilot's duplication filter and the reference view that tells you a suggestion matches a public repository, with its licence.
- [Copilot Trust Center](https://copilot.github.trust.page/) — GitHub's statements on what happens to your prompts and code, and which plans carry an IP indemnity.
- [Your Data](https://developers.openai.com/api/docs/guides/your-data) — OpenAI on retention and training for API traffic, which is the question most company policies actually turn on.
- [Anthropic Commercial Terms](https://www.anthropic.com/legal/commercial-terms) — Ownership of outputs and the data-use commitments attached to paid API and Claude Code usage.
- [EU AI Act](https://artificialintelligenceact.eu/) — Browsable text of the EU regulation, relevant if you ship an AI feature to European users rather than merely code with one.
