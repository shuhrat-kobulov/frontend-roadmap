import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { inlineMermaidDiagrams } from './mermaid.mjs';
import { editUrl, pages, repoRootFrom } from './repo.mjs';

/**
 * Content loader that reads the repository's own Markdown files.
 *
 * The files stay where they are — `README.md`, `ROADMAP.md`, `docs/*.md` — and are
 * read straight off disk. There is no copy of them under `site/`, so deleting
 * `site/` leaves the repository complete.
 *
 * Starlight needs a `title` in every entry's frontmatter, and these files have
 * none: they are plain GitHub-readable Markdown starting with an `#` heading.
 * The loader derives the title from that heading and the description from the
 * paragraph under it, then hands the rest to Astro's normal Markdown pipeline.
 *
 * @returns {import('astro/loaders').Loader}
 */
export function repoMarkdownLoader() {
	return {
		name: 'repo-markdown-loader',
		load: async ({ store, config, parseData, renderMarkdown, logger, watcher }) => {
			const repoRoot = repoRootFrom(config.root);

			/** Reads one Markdown file and puts the finished page in the store. */
			async function syncPage(page) {
				const fileUrl = new URL(page.file, repoRoot);
				let raw;
				try {
					raw = await readFile(fileUrl, 'utf8');
				} catch (error) {
					throw new Error(
						`repo-markdown-loader could not read "${page.file}". Every page in ` +
							`src/lib/repo.mjs must point at a Markdown file that exists in the ` +
							`repository root.\n${error instanceof Error ? error.message : error}`
					);
				}

				const body = stripGitHubHeader(raw);
				const { title, description, content } = extract(body, page);
				const data = await parseData({
					id: page.id,
					data: { title, description, editUrl: editUrl(page.file), head: page.head ?? [] },
					filePath: fileURLToPath(fileUrl),
				});

				const rendered = await renderMarkdown(await inlineMermaidDiagrams(content, page.id), {
					fileURL: fileUrl,
				});

				store.set({
					id: page.id,
					data,
					body: content,
					filePath: page.file,
					digest: createHash('sha256').update(raw).digest('hex').slice(0, 16),
					rendered,
				});
			}

			store.clear();
			for (const page of pages) await syncPage(page);
			logger.info(`Loaded ${pages.length} pages from the repository Markdown.`);

			if (!watcher) return;

			// `astro dev` only watches `site/`, and Astro's own file watching stops at
			// the project root, so the sources have to be registered by hand and their
			// changes turned back into store updates.
			const pageByPath = new Map(
				pages.map((page) => [fileURLToPath(new URL(page.file, repoRoot)), page])
			);
			for (const path of pageByPath.keys()) watcher.add(path);

			const onChange = async (changedPath) => {
				const page = pageByPath.get(changedPath);
				if (!page) return;
				try {
					await syncPage(page);
					logger.info(`Reloaded ${page.file}`);
				} catch (error) {
					logger.error(`Failed to reload ${page.file}: ${error.message}`);
				}
			};
			watcher.on('change', onChange);
			watcher.on('add', onChange);
		},
	};
}

/**
 * Removes the centred `<div>` GitHub header — hero image, shields.io badges — from
 * the top of a README. It is repository chrome: on the site the same information
 * is the page title, and four render-blocking badge images on the home page are a
 * measurable performance cost for no reader benefit.
 *
 * The language switcher inside the block is kept, since it is real navigation.
 */
function stripGitHubHeader(markdown) {
	if (!markdown.startsWith('<div align="center">')) return markdown;
	const end = markdown.indexOf('</div>');
	if (end === -1) return markdown;

	const kept = markdown
		.slice(0, end)
		.split('\n')
		.filter((line) => isLanguageSwitcher(line.trim()));

	return [...kept, markdown.slice(end + '</div>'.length).trimStart()].join('\n\n');
}

/** e.g. `[English](README.md) · [O'zbekcha](README.uz.md)` */
function isLanguageSwitcher(line) {
	return /^\[[^\]]+\]\([^)]+\)(?:\s*·\s*\[[^\]]+\]\([^)]+\))+$/.test(line);
}

/**
 * Pulls the title out of the leading `# ` heading and the description out of the
 * paragraph under it, so the Markdown files need no frontmatter added to them.
 *
 * The heading is removed from the body because Starlight renders the title itself.
 */
function extract(markdown, page) {
	const lines = markdown.split('\n');
	const headingIndex = lines.findIndex((line) => /^#\s+\S/.test(line));

	let title = page.title;
	let content = markdown;

	if (headingIndex !== -1) {
		title ??= lines[headingIndex].replace(/^#\s+/, '').trim();
		content = lines.slice(headingIndex + 1).join('\n').trimStart();
	}

	if (!title) {
		throw new Error(
			`No title for "${page.file}": it has no \`# \` heading and no \`title\` in src/lib/repo.mjs.`
		);
	}

	return {
		title,
		description: page.description ?? describe(content),
		content,
	};
}

/**
 * First real paragraph, flattened to plain text for the `<meta name="description">`
 * tag. Skips a leading language switcher line, which is navigation rather than prose.
 */
function describe(markdown) {
	const paragraphs = markdown.split(/\n\s*\n/);
	const first = paragraphs.find((block) => {
		const text = block.trim();
		return text && !isLanguageSwitcher(text) && !text.startsWith('#') && !text.startsWith('>');
	});
	if (!first) return undefined;

	const text = first
		.replace(/\s+/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> their text
		.replace(/[*_`]/g, '')
		.trim();

	if (text.length <= 160) return text;
	const cut = text.slice(0, 160);
	const lastStop = cut.lastIndexOf('. ');
	return lastStop > 80 ? cut.slice(0, lastStop + 1) : `${cut.trimEnd()}…`;
}
