import { Meilisearch } from 'meilisearch';

const HOST = process.env.MEILI_HTTP_ADDR;
const API_KEY = process.env.MEILI_MASTER_KEY;

if (!HOST || !API_KEY) {
    throw new Error('Missing Meilisearch host or API key.');
}

export const meilisearch = new Meilisearch({
    host: HOST,
    apiKey: API_KEY,
});
