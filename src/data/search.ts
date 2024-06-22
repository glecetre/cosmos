import { Meilisearch } from 'meilisearch';

const HOST = process.env.MEILI_HTTP_ADDR;
const API_KEY = process.env.MEILI_MASTER_KEY;

if (!HOST || !API_KEY) {
    throw new Error('Missing Meilisearch host or API key.');
}

const meilisearch = new Meilisearch({
    host: HOST,
    apiKey: API_KEY,
});

export type SearchIndex = 'chronicles' | 'characters';
export type SearchDocument = { id: string | number } & Record<string, unknown>;

/**
 * Add or update a document in a search index.
 *
 * If the given document has a new ID, a new document is created in the index.
 * If the ID exists in the index, the fields present in the given document are
 * updated in the existing document.
 * @param index Name of the index to update.
 * @param document Document to add or update.
 */
async function addOrUpdateDocument(
    index: SearchIndex,
    document: SearchDocument
) {
    await meilisearch.index(index).updateDocuments([document]);
}

export const searchApi = {
    addOrUpdateDocument,
};
