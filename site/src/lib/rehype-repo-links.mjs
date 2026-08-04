import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { visit } from 'unist-util-visit';

import { base, blobUrl, pathByFile, repoRootFrom } from './repo.mjs';

/**
 * Rewrites the repository's own relative links so they work on the site.
 *
 * The Markdown files link to each other the way GitHub needs them to —
 * `docs/CSS.md` from the README, `../ROADMAP.md` from inside `docs/`. Those paths
 * are correct on GitHub and meaningless on a site with clean URLs, so each one is
 * resolved against the file it appears in and mapped to the page that publishes it.
 *
 * Links to files the site does not publish (`LICENSE`,
 * `.markdownlint-cli2.jsonc`) point at GitHub instead of breaking.
 *
 * This runs on the parsed HTML tree, so `docs/CSS.md` inside a fenced code block
 * is left exactly as the author wrote it.
 *
 * @param {{ root: URL }} options Astro's project root, used to locate the repo root.
 */
export function rehypeRepoLinks({ root }) {
	const repoRoot = fileURLToPath(repoRootFrom(root));

	return (tree, file) => {
		// `file.path` is the Markdown file being rendered, passed through by the
		// loader as `renderMarkdown(content, { fileURL })`.
		const sourceDir = file.path ? path.dirname(path.resolve(file.path)) : repoRoot;

		visit(tree, 'element', (node) => {
			if (node.tagName !== 'a') return;
			const href = node.properties?.href;
			if (typeof href !== 'string' || !href) return;

			const rewritten = rewrite(href, sourceDir, repoRoot);
			if (rewritten) node.properties.href = rewritten;
		});
	};
}

function rewrite(href, sourceDir, repoRoot) {
	// Absolute URLs, protocol-relative URLs, mail links and bare anchors are
	// already correct.
	if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//') || href.startsWith('#')) {
		return undefined;
	}
	// Root-relative links are the site's own, and already carry `base`.
	if (href.startsWith('/')) return undefined;

	const hashAt = href.indexOf('#');
	const target = hashAt === -1 ? href : href.slice(0, hashAt);
	const hash = hashAt === -1 ? '' : href.slice(hashAt);
	if (!target) return undefined;

	const file = path.relative(repoRoot, path.resolve(sourceDir, decodeURI(target)));

	// Outside the repository: leave it alone rather than guess.
	if (file.startsWith('..') || path.isAbsolute(file)) return undefined;

	const published = pathByFile.get(file.split(path.sep).join('/'));
	if (published) return `${base}${published}${hash}`;

	return `${blobUrl(file.split(path.sep).join('/'))}${hash}`;
}
