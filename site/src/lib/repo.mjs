/**
 * The single description of what the site publishes.
 *
 * Every page here points at a Markdown file that already exists in the repository
 * root or in `docs/`. Nothing in `site/` holds a copy of that content — the loader
 * reads the real file, the sidebar is generated from this list, and the link
 * rewriter uses it to turn `docs/CSS.md` style links into site URLs.
 *
 * Adding a `docs/*.md` file to the site means adding one line to a group below.
 */

/** Where the Markdown lives, for links to files the site does not publish. */
export const repo = {
	owner: 'shuhrat-kobulov',
	name: 'frontend-roadmap',
	branch: 'main',
};

export const repoUrl = `https://github.com/${repo.owner}/${repo.name}`;

/** Blob URL for a repo file the site does not publish, e.g. `LICENSE`. */
export const blobUrl = (file) => `${repoUrl}/blob/${repo.branch}/${file}`;

/** Edit link for a published page. */
export const editUrl = (file) => `${repoUrl}/edit/${repo.branch}/${file}`;

/**
 * The repository root, relative to the Astro project root (`site/`).
 * Everything the site reads lives above it; nothing is copied down into it.
 */
export const repoRootFrom = (astroRoot) => new URL('../', astroRoot);

/** Project page served from `https://<owner>.github.io/<repo>/`. */
export const site = `https://${repo.owner}.github.io`;
export const base = `/${repo.name}`;

/**
 * Pages that sit above the grouped sidebar.
 *
 * `index` is the site home page, so `README.md` is what people land on.
 */
const topLevel = [
	{
		file: 'README.md',
		id: 'index',
		label: 'Overview',
		title: 'Frontend Roadmap',
		description:
			'A curated, opinionated path to a free self-taught education in frontend — 149 hand-picked resources, no paywalls and no signup walls.',
		// Without this the home page would be titled "Frontend Roadmap | Frontend
		// Roadmap", since the page title and the site title are the same.
		head: [
			{
				tag: 'title',
				content: 'Frontend Roadmap — a curated path to learning frontend',
			},
		],
	},
	{
		file: 'ROADMAP.md',
		id: 'roadmap',
		label: 'The roadmap',
		description:
			'An ordered path from zero to employable frontend developer, in five stages with prerequisites, projects, and checklists.',
	},
];

/**
 * Sidebar groups, mirroring the Contents table in README.md.
 */
const groups = [
	{
		label: 'Foundations',
		pages: [
			{ file: 'docs/HTML.md', id: 'html' },
			{ file: 'docs/CSS.md', id: 'css' },
			{ file: 'docs/JAVASCRIPT.md', id: 'javascript' },
		],
	},
	{
		label: 'Language & types',
		pages: [{ file: 'docs/TYPESCRIPT.md', id: 'typescript' }],
	},
	{
		label: 'Frameworks',
		pages: [
			{ file: 'docs/REACTJS.md', id: 'react' },
			{
				file: 'docs/FRAMEWORKS.md',
				id: 'frameworks',
				label: 'Other frameworks & meta-frameworks',
			},
		],
	},
	{
		label: 'Craft',
		pages: [
			{ file: 'docs/ACCESSIBILITY.md', id: 'accessibility' },
			{ file: 'docs/PERFORMANCE.md', id: 'performance' },
			{ file: 'docs/SECURITY.md', id: 'security' },
			{ file: 'docs/TESTING.md', id: 'testing' },
			{ file: 'docs/BROWSER-APIS.md', id: 'browser-apis' },
		],
	},
	{
		label: 'Tooling',
		pages: [
			{ file: 'docs/GIT.md', id: 'git' },
			{ file: 'docs/TOOLING.md', id: 'tooling', label: 'Build tooling' },
			{ file: 'docs/DEPLOYMENT.md', id: 'deployment' },
		],
	},
	{
		label: 'Design & UI',
		pages: [
			{ file: 'docs/DESIGN.md', id: 'design' },
			{ file: 'docs/UI-FRAMEWORKS.md', id: 'ui-frameworks' },
		],
	},
	{
		label: 'Beyond code',
		pages: [
			{ file: 'docs/LEARNING.md', id: 'learning' },
			{ file: 'docs/AI-TOOLS.md', id: 'ai-tools' },
			{ file: 'docs/PRACTICE.md', id: 'practice' },
		],
	},
	{
		label: 'Contributing',
		pages: [
			{ file: 'CONTRIBUTING.md', id: 'contributing', label: 'How to contribute' },
			{ file: 'docs/STYLE.md', id: 'style-guide' },
			{ file: 'docs/TRANSLATIONS.md', id: 'translations' },
			{ file: 'CODE_OF_CONDUCT.md', id: 'code-of-conduct', label: 'Code of Conduct' },
		],
	},
	{
		label: "O'zbekcha",
		pages: [
			{
				file: 'README.uz.md',
				id: 'uz',
				label: 'Boshlash',
				title: 'Frontend Roadmap',
				description:
					"Frontendni bepul va mustaqil o'rganish uchun saralangan, aniq tanlovga asoslangan yo'l.",
				lang: 'uz',
				head: [
					{
						tag: 'title',
						content: "Frontend Roadmap — frontendni o'rganish uchun saralangan yo'l",
					},
				],
			},
			{ file: 'ROADMAP.uz.md', id: 'uz/roadmap', label: "Yo'l xaritasi", lang: 'uz' },
		],
	},
];

/** Flat list of every published page, in sidebar order. */
export const pages = [...topLevel, ...groups.flatMap((group) => group.pages)];

/** Repo-relative Markdown path -> path the page is served from, without `base`. */
export const pathByFile = new Map(
	pages.map((page) => [page.file, page.id === 'index' ? '/' : `/${page.id}/`]),
);

/** Every Markdown file the site reads, for the loader and the dev watcher. */
export const sourceFiles = pages.map((page) => page.file);

/** Starlight `sidebar` config, generated so it can never drift from `pages`. */
export const sidebar = [
	...topLevel.map(toSidebarLink),
	...groups.map((group) => ({
		label: group.label,
		items: group.pages.map(toSidebarLink),
	})),
];

function toSidebarLink(page) {
	// `slug` entries resolve against the content collection, so a typo here is a
	// build error rather than a link that 404s. Starlight normalises `index` to
	// the collection root. Omitting `label` makes it fall back to the page title.
	const entry = { slug: page.id === 'index' ? '' : page.id };
	if (page.label) entry.label = page.label;
	if (page.lang) entry.attrs = { lang: page.lang };
	return entry;
}
