import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';

import { repoMarkdownLoader } from './lib/repo-markdown-loader.mjs';

export const collections = {
	// Not `docsLoader()`: that reads `src/content/docs/`, which would mean keeping
	// a second copy of every file in the repository. This loader reads the real
	// `README.md`, `ROADMAP.md` and `docs/*.md` where they already live.
	docs: defineCollection({ loader: repoMarkdownLoader(), schema: docsSchema() }),
};
