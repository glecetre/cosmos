'use client';

import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { SearchResults, search } from '@/search';

/**
 * Execute search queries on all indexes at once.
 *
 * The hook returns an array with three elements. The first element is the
 * current search query (starting with an empty string. The second element is a
 * function to update the search query. The third element is the results array
 * of the last query.
 *
 * The query is run on each change, with a debounce time of 300 ms. Previous
 * searches are aborted, if any.
 *
 * @returns An array with search information and actions (see function doc).
 */
export function useSearch() {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<SearchResults | undefined>(
        undefined
    );
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        async function executeSearch() {
            if (debouncedQuery.trim() === '') {
                setResults(undefined);
                return;
            }

            // FIXME Should abort the previous request with an AbortSignal but
            // can't send this kind of object to a server action.
            // Waiting on an improvement from React / NextJS for this.
            const results = await search(debouncedQuery);
            setResults(results);
        }

        executeSearch();
    }, [debouncedQuery]);

    return [query, clientSetQuery, results] as const;

    /**
     * Set the query to search for.
     * @param query Search query.
     */
    function clientSetQuery(query: string) {
        setQuery(query);
    }
}
