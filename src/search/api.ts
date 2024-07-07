'use server';

import { Meilisearch } from 'meilisearch';
import { Character } from '@/data/characters';
import { Chronicle } from '@/data/chronicles';
import { Cosmogony } from '@/data/cosmogonies';
import {
    SEARCH_HIGHLIGHT_TAG_END,
    SEARCH_HIGHLIGHT_TAG_START,
    SearchDocument,
} from '@/search/common';

const HOST = process.env.MEILI_HTTP_ADDR;
const API_KEY = process.env.MEILI_MASTER_KEY;

if (!HOST || !API_KEY) {
    console.log({ HOST, API_KEY });
    throw new Error('Missing Meilisearch host or API key.');
}

const meilisearch = new Meilisearch({
    host: HOST,
    apiKey: API_KEY,
});

const SEARCH_INDEX = 'cosmos';

/**
 * Add or update a character in the search index.
 *
 * If the given character has a new ID, a new character is created in the index.
 * If the ID exists in the index, the fields present in the given character are
 * updated in the existing character.
 * @param character Character to add or update.
 * @param cosmogony The Cosmogony the character is in.
 */
export async function addOrUpdateCharacterToIndex(
    character: Character,
    cosmogony: Cosmogony
) {
    const document = characterToDocument(character, cosmogony);
    await meilisearch.index(SEARCH_INDEX).updateDocuments([document]);
}

/**
 * Add or update a chronicle in the search index.
 *
 * If the given chronicle has a new ID, a new chronicle is created in the index.
 * If the ID exists in the index, the fields present in the given chronicle are
 * updated in the existing chronicle.
 * @param chronicle chronicle to add or update.
 * @param cosmogony The Cosmogony the chronicle is in.
 */
export async function addOrUpdateChronicleToIndex(
    chronicle: Chronicle,
    cosmogony: Cosmogony
) {
    const document = chronicleToDocument(chronicle, cosmogony);
    await meilisearch.index(SEARCH_INDEX).updateDocuments([document]);
}

/**
 * Run a search query.
 * @param query Query to search for.
 * @param abortSignal Optional signal to abort the search request.
 * @returns The search results.
 */
export async function search(query: string, abortSignal?: AbortSignal) {
    const response = await meilisearch
        .index(SEARCH_INDEX)
        .search<SearchDocument>(
            query,
            {
                attributesToCrop: ['markdown'],
                attributesToHighlight: ['markdown'],
                highlightPreTag: SEARCH_HIGHLIGHT_TAG_START,
                highlightPostTag: SEARCH_HIGHLIGHT_TAG_END,
            },
            { signal: abortSignal }
        );

    return response;
}

/**
 * Create a {@link SearchDocument} from a {@link Character}
 * @param character Character to transform.
 * @param cosmogony The cosmogony the character is in.
 * @returns The character as a SearchDocument.
 */
function characterToDocument(character: Character, cosmogony: Cosmogony) {
    return {
        id: character.id,
        type: 'character',
        cosmogonyId: character.cosmogonyId,
        cosmogonyShortCode: cosmogony.shortCode,
        cosmogonyName: cosmogony.name,
        shortCode: character.shortCode,
        name: character.name,
        markdown: character.markdown,
    } satisfies SearchDocument;
}

/**
 * Create a {@link SearchDocument} from a {@link Chronicle}
 * @param chronicle Chronicle to transform.
 * @param cosmogony The cosmogony the chronicle is in.
 * @returns The chronicle as a SearchDocument.
 */
function chronicleToDocument(chronicle: Chronicle, cosmogony: Cosmogony) {
    return {
        id: chronicle.id,
        type: 'chronicle',
        cosmogonyId: chronicle.cosmogonyId,
        cosmogonyShortCode: cosmogony.shortCode,
        cosmogonyName: cosmogony.name,
        shortCode: chronicle.shortCode,
        name: chronicle.title,
        markdown: chronicle.markdown,
    } satisfies SearchDocument;
}
