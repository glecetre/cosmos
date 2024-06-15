/**
 * Slugify a text.
 *
 * Removes diacritics and non-alphanumeric characters, and replaces spaces with
 * hyphens.
 * @param text Text to slugify.
 * @returns The slugified text.
 */
export function slugify(text: string) {
    return text
        .normalize('NFD')
        .replace(/[^a-z0-9-\s]/gi, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();
}
