import { ReactNode } from 'react';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import {
    SEARCH_HIGHLIGHT_TAG_END,
    SEARCH_HIGHLIGHT_TAG_START,
    SearchDocument,
    SearchResultHit,
    SearchResults,
} from '@/search';

const RESULT_TYPE_DISPLAY_NAME: Record<SearchDocument['type'], string> = {
    character: 'Character',
    chronicle: 'Chronicle',
};

export type SearchResultsListProps = {
    results?: SearchResults;
    resultAction: (result: SearchResultHit) => ReactNode;
};

export function SearchResultsList(props: SearchResultsListProps) {
    if (!props.results) {
        return (
            <p className="mt-6 text-black/60">Start typing to see results.</p>
        );
    }

    if (props.results.hits.length === 0) {
        return <p className="mt-6 text-black/60">No result.</p>;
    }

    return (
        <List>
            {props.results.hits.map((result) => (
                <ListItem
                    key={result.shortCode}
                    title={result.name}
                    subtitle={getResultSubtitle(result)}
                    action={props.resultAction(result)}
                >
                    <p>{getResultPreview(result)}</p>
                </ListItem>
            ))}
        </List>
    );

    function getResultSubtitle(result: SearchResultHit) {
        return `${RESULT_TYPE_DISPLAY_NAME[result.type]} in ${result.cosmogonyName}`;
    }

    function getResultPreview(result: SearchResultHit) {
        if (!result._formatted?.markdown) {
            return result.markdown;
        }

        const nodes: ReactNode[] = [];
        const searchHighlightTagsRegex = new RegExp(
            `${SEARCH_HIGHLIGHT_TAG_START}(.*?)${SEARCH_HIGHLIGHT_TAG_END}`,
            'dgi'
        );

        let match: RegExpExecArray | null;
        let lastRegularTextStartIndex = 0;
        while (
            (match = searchHighlightTagsRegex.exec(result._formatted.markdown))
        ) {
            const regularTextBefore = result._formatted.markdown.substring(
                lastRegularTextStartIndex,
                match.index
            );

            const highlightedText = match[1];

            lastRegularTextStartIndex = match.indices![0][1];

            nodes.push(regularTextBefore);
            nodes.push(
                <span
                    key={match.index}
                    className="bg-grandis-400 text-grandis-900"
                >
                    {highlightedText}
                </span>
            );
        }

        nodes.push(
            result._formatted.markdown.substring(lastRegularTextStartIndex)
        );

        return nodes;
    }
}
