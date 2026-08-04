import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

import { pages } from './repo.mjs';

/** Page id -> BCP 47 language tag, for the pages that are not in English. */
const langById = new Map(
	pages.filter((page) => page.lang).map((page) => [page.id, page.lang as string])
);

/**
 * Sets `<html lang>` on the translated pages.
 *
 * The site is not using Starlight's `locales` config: that would generate a full
 * mirror of every English page under `/uz/`, filled with English content, because
 * only two files are translated. So the two Uzbek pages are ordinary pages, and
 * this is what stops a screen reader from reading them with English pronunciation.
 */
export const onRequest = defineRouteMiddleware((context) => {
	const { starlightRoute } = context.locals;
	const lang = langById.get(starlightRoute.id);
	if (!lang) return;

	starlightRoute.lang = lang;
	starlightRoute.entryMeta.lang = lang;
});
