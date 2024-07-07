import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import {
    SearchResultsList,
    SearchResultsListProps,
} from '@/components/Search/SearchResultsList';
import { useSearch } from '@/search';

export const SearchDialog = forwardRef(SearchDialogWithRef);
export type SearchDialogProps = {
    resultAction: SearchResultsListProps['resultAction'];
};

function SearchDialogWithRef(
    props: SearchDialogProps,
    ref: Ref<HTMLDialogElement>
) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [searchQuery, setSearchQuery, searchResults] = useSearch();

    useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

    return (
        <dialog
            ref={dialogRef}
            className="not-prose mb-[88px] mt-[88px] max-h-[calc(100%_-_2_*_88px)] w-full max-w-[90ch] border border-black/20 bg-sand p-10 pt-0 text-base shadow-sm backdrop:bg-black/50 backdrop:backdrop-blur-sm"
            onClose={resetQuery}
        >
            <div className="sticky top-0 bg-sand pt-10">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-xl font-bold">
                        Search across all cosmogonies
                    </h1>
                    <Button
                        type="button"
                        title="Close Search"
                        variant="icon"
                        onClick={resetAndClose}
                        tabIndex={-1}
                    >
                        <Icon name="cross" />
                    </Button>
                </div>
                <Input
                    label="Query"
                    type="search"
                    autoFocus
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
            </div>
            <div>
                <SearchResultsList
                    results={searchResults}
                    resultAction={props.resultAction}
                />
            </div>
        </dialog>
    );

    function resetQuery() {
        setSearchQuery('');
    }

    function resetAndClose() {
        resetQuery();
        dialogRef.current?.close();
    }
}
