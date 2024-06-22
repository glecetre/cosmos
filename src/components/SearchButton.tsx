'use client';

import { ChangeEvent, useRef } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { SearchDocument, useSearch } from '@/search';

export function SearchButton() {
    const dialogElement = useRef<HTMLDialogElement>(null);
    const [searchQuery, setSearchQuery, searchResults] = useSearch();

    return (
        <>
            <Button title="Open Search" variant="icon" onClick={showModal}>
                <Icon name="magnifying-glass" />
            </Button>
            <dialog
                ref={dialogElement}
                className="bg-sand mt-[88px] w-full max-w-[90ch] border border-black/20 p-10 shadow-sm backdrop:bg-black/50 backdrop:backdrop-blur-sm"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-xl font-bold">
                        Search all cosmogonies
                    </h1>
                    <Button
                        title="Close Search"
                        variant="icon"
                        onClick={closeModal}
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
                {!searchResults && (
                    <p className="mt-6 text-black/60">
                        Start typing to see results.
                    </p>
                )}
                {searchResults?.hits.length === 0 && (
                    <p className="mt-6 text-black/60">No result.</p>
                )}
                {searchResults && searchResults.hits.length > 0 && (
                    <List>
                        {searchResults.hits.map((result) => (
                            <ListItem
                                key={result.shortCode}
                                title={result.name}
                                subtitle={RESULT_TYPE_DISPLAY_NAME[result.type]}
                            ></ListItem>
                        ))}
                    </List>
                )}
            </dialog>
        </>
    );

    function showModal() {
        dialogElement.current?.showModal();
    }

    function closeModal() {
        dialogElement.current?.close();

        setSearchQuery('');
    }
}

const RESULT_TYPE_DISPLAY_NAME: Record<SearchDocument['type'], string> = {
    character: 'Character',
    chronicle: 'Chronicle',
};
