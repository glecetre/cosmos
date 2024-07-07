import { search } from '@/search/api';

export const SEARCH_HIGHLIGHT_TAG_START = '<span class="search-highlight">';
export const SEARCH_HIGHLIGHT_TAG_END = '</span>';

export type SearchDocument = {
    id: number;
    type: 'character' | 'chronicle';
    cosmogonyId: number;
    cosmogonyShortCode: string;
    cosmogonyName: string;
    shortCode: string;
    name: string;
    markdown: string;
};
export type SearchResults = Awaited<ReturnType<typeof search>>;
export type SearchResultHit = SearchResults['hits'][number];
