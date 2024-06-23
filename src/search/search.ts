'use server';

import { Meilisearch } from 'meilisearch';
import { Character } from '@/data/characters';
import { Chronicle } from '@/data/chronicles';

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
export type SearchDocument = {
    id: number;
    type: 'character' | 'chronicle';
    cosmogonyId: number;
    shortCode: string;
    name: string;
    markdown: string;
};
export type SearchResults = Awaited<ReturnType<typeof search>>;
export type SearchResultHit = SearchResults['hits'][number];

/**
 * Add or update a character in the search index.
 *
 * If the given character has a new ID, a new character is created in the index.
 * If the ID exists in the index, the fields present in the given character are
 * updated in the existing character.
 * @param character Character to add or update.
 */
export async function addOrUpdateCharacterToIndex(character: Character) {
    const document = CharacterToDocument(character);
    await meilisearch.index(SEARCH_INDEX).updateDocuments([document]);
}

/**
 * Add or update a chronicle in the search index.
 *
 * If the given chronicle has a new ID, a new chronicle is created in the index.
 * If the ID exists in the index, the fields present in the given chronicle are
 * updated in the existing chronicle.
 * @param chronicle chronicle to add or update.
 */
export async function addOrUpdateChronicleToIndex(chronicle: Chronicle) {
    const document = chronicleToDocument(chronicle);
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
                showRankingScore: true,
            },
            { signal: abortSignal }
        );

    return response;
}

/**
 * Create a {@link SearchDocument} from a {@link Character}
 * @param character Character to transform.
 * @returns The character as a SearchDocument.
 */
function CharacterToDocument(character: Character) {
    return {
        id: character.id,
        type: 'character',
        cosmogonyId: character.cosmogonyId,
        shortCode: character.shortCode,
        name: character.name,
        markdown: character.markdown,
    } satisfies SearchDocument;
}

/**
 * Create a {@link SearchDocument} from a {@link Chronicle}
 * @param chronicle Chronicle to transform.
 * @returns The chronicle as a SearchDocument.
 */
function chronicleToDocument(chronicle: Chronicle) {
    return {
        id: chronicle.id,
        type: 'chronicle',
        cosmogonyId: chronicle.cosmogonyId,
        shortCode: chronicle.shortCode,
        name: chronicle.title,
        markdown: chronicle.markdown,
    } satisfies SearchDocument;
}
