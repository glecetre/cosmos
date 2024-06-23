'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { SearchResultsList } from '@/components/Search/SearchResultsList';
import { Cosmogony } from '@/data/cosmogonies';
import { useSearch } from '@/search';

type SearchButtonProps = {
    cosmogonies: Cosmogony[];
};

export function SearchButton(props: SearchButtonProps) {
    const dialogElement = useRef<HTMLDialogElement>(null);
    const [searchQuery, setSearchQuery, searchResults] = useSearch();
    const router = useRouter();

    return (
        <>
            <Button title="Open Search" variant="icon" onClick={showModal}>
                <Icon name="magnifying-glass" />
            </Button>
            <dialog
                ref={dialogElement}
                className="mb-[88px] mt-[88px] max-h-[calc(100%_-_2_*_88px)] w-full max-w-[90ch] border border-black/20 bg-sand p-10 pt-0 shadow-sm backdrop:bg-black/50 backdrop:backdrop-blur-sm"
                onClose={navigateToResult}
            >
                <div className="sticky top-0 bg-sand pt-10">
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
                </div>
                <div>
                    <SearchResultsList
                        results={searchResults}
                        cosmogonies={props.cosmogonies}
                    />
                </div>
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

    function navigateToResult() {
        const resultUrl = dialogElement.current?.returnValue;
        setSearchQuery('');

        if (resultUrl) {
            router.push(resultUrl);
        }
    }
}
