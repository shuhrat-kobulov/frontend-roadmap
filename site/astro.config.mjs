// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

import { rehypeRepoLinks } from './src/lib/rehype-repo-links.mjs';
import { base, repoUrl, sidebar, site } from './src/lib/repo.mjs';

const root = new URL('./', import.meta.url);

// https://astro.build/config
export default defineConfig({
	// Project page: `site` is the github.io origin, `base` the repository name.
	// Both are needed for asset URLs and the sitemap to come out right.
	site,
	base,
	trailingSlash: 'always',
	markdown: {
		rehypePlugins: [[rehypeRepoLinks, { root }]],
	},
	integrations: [
		starlight({
			title: 'Frontend Roadmap',
			description:
				'A curated, opinionated path to a free self-taught education in frontend.',
			sidebar,
			customCss: ['./src/styles/custom.css'],
			routeMiddleware: './src/lib/route-lang.ts',
			social: [{ icon: 'github', label: 'GitHub', href: repoUrl }],
			// Each page carries its own `editUrl`, set by the loader. Starlight's
			// own `editLink.baseUrl` assumes files live under `src/content/docs/`,
			// which is exactly the layout this site avoids.
			credits: false,
			pagination: false,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
		}),
	],
});
