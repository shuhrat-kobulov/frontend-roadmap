import { createMermaidRenderer } from 'mermaid-isomorphic';

/**
 * Renders ```mermaid fences to SVG at build time.
 *
 * GitHub renders these blocks itself, so the diagram source has to stay in
 * `ROADMAP.md` as a fence. On the site the alternative would be shipping the
 * ~500 kB Mermaid runtime to every reader and drawing the diagram in the browser,
 * which fails both the "no client-side JS" and "readable without JavaScript"
 * requirements. So the SVG is produced during the build and inlined.
 *
 * Each diagram is rendered twice, once per colour scheme, and CSS shows the one
 * matching the active theme. Mermaid bakes its colours into the SVG, so a single
 * rendering is unreadable in one of the two themes.
 */

const MERMAID_FENCE = /^```mermaid[^\n]*\n([\s\S]*?)\n```$/gm;

const VARIANTS = [
	{
		name: 'light',
		theme: 'default',
		// Match Starlight's page background so the diagram does not sit on a
		// slightly-off rectangle.
		themeVariables: { background: '#ffffff', edgeLabelBackground: '#ffffff' },
	},
	{
		name: 'dark',
		theme: 'dark',
		// Mermaid's dark theme puts light grey edge labels on a mid-grey plate,
		// which lands at 4.43:1 — just under WCAG AA. Dropping the plate to the
		// page background takes it to about 12:1.
		themeVariables: { background: '#17181c', edgeLabelBackground: '#17181c' },
	},
];

let renderer;

/**
 * @param {string} markdown Raw Markdown, straight from the repository.
 * @param {string} id Page id, used to keep SVG element ids unique across the site.
 * @returns {Promise<string>} The same Markdown with Mermaid fences replaced by SVG.
 */
export async function inlineMermaidDiagrams(markdown, id) {
	const fences = [...markdown.matchAll(MERMAID_FENCE)];
	if (fences.length === 0) return markdown;

	// Starting the browser is expensive, so it only happens for pages that
	// actually contain a diagram.
	renderer ??= createMermaidRenderer();

	const diagrams = fences.map((fence) => fence[1]);
	const rendered = await Promise.all(
		VARIANTS.map(async (variant) => {
			const results = await renderer(diagrams, {
				prefix: `mermaid-${id.replace(/\W+/g, '-')}-${variant.name}`,
				mermaidConfig: {
					theme: variant.theme,
					themeVariables: variant.themeVariables,
					flowchart: { useMaxWidth: true },
				},
			});
			return results.map((result, index) => {
				if (result.status === 'rejected') {
					throw new Error(
						`Mermaid diagram ${index + 1} in "${id}" failed to render (${variant.name} theme): ${result.reason}`
					);
				}
				return result.value.svg;
			});
		})
	);

	let output = '';
	let cursor = 0;
	fences.forEach((fence, index) => {
		const variants = VARIANTS.map(
			(variant, variantIndex) =>
				`<div class="mermaid-diagram" data-variant="${variant.name}">${rendered[variantIndex][index]}</div>`
		).join('');
		output += markdown.slice(cursor, fence.index);
		output += `<figure class="mermaid">${variants}</figure>`;
		cursor = fence.index + fence[0].length;
	});

	return output + markdown.slice(cursor);
}
