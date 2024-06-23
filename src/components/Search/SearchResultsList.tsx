import { ReactNode } from 'react';
import { Button } from '@/components/Button';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Cosmogony } from '@/data/cosmogonies';
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

type SearchResultsListProps = {
    results?: SearchResults;
    cosmogonies: Cosmogony[];
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
        <form method="dialog">
            <List>
                {props.results.hits.map((result) => (
                    <ListItem
                        key={result.shortCode}
                        title={result.name}
                        subtitle={getResultSubtitle(result)}
                        action={
                            <Button
                                variant="button"
                                value={getResultUrl(result)}
                            >
                                View&nbsp;→
                            </Button>
                        }
                    >
                        <p>{getResultPreview(result)}</p>
                    </ListItem>
                ))}
            </List>
        </form>
    );

    function getResultSubtitle(result: SearchResultHit) {
        let subtitle = RESULT_TYPE_DISPLAY_NAME[result.type];

        const cosmogony = getResultCosmogony(result);
        if (cosmogony) {
            subtitle += ` in ${cosmogony.name}`;
        }

        return subtitle;
    }

    function getResultUrl(result: SearchResultHit) {
        const cosmogonyShortCode = getResultCosmogony(result)?.shortCode;

        if (!cosmogonyShortCode) {
            return;
        }

        switch (result.type) {
            case 'character':
                return `/cosmogonies/${cosmogonyShortCode}/characters/${result.shortCode}`;
            case 'chronicle':
                return `/cosmogonies/${cosmogonyShortCode}/chronicles/${result.shortCode}`;
        }
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

    function getResultCosmogony(result: SearchResultHit) {
        return props.cosmogonies.find(
            (cosmogony) => cosmogony.id === result.cosmogonyId
        );
    }
}
