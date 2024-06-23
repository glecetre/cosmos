import { Button } from '@/components/Button';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Cosmogony } from '@/data/cosmogonies';
import { SearchDocument, SearchResultHit, SearchResults } from '@/search';

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
                        subtitle={RESULT_TYPE_DISPLAY_NAME[result.type]}
                        action={
                            <Button
                                variant="button"
                                value={getResultUrl(result)}
                            >
                                View&nbsp;→
                            </Button>
                        }
                    ></ListItem>
                ))}
            </List>
        </form>
    );

    function getResultUrl(result: SearchResultHit) {
        const cosmogonyShortCode = props.cosmogonies.find(
            (cosmogony) => cosmogony.id === result.cosmogonyId
        )?.shortCode;

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
}
