'use client';

import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { SearchDialog } from '@/components/Search/SearchDialog';
import { useSearchDialogRef } from '@/components/Search/useSearchDialogRef';

export function SearchButton() {
    const dialogRef = useSearchDialogRef();

    return (
        <>
            <Button title="Open Search" variant="icon" onClick={openDialog}>
                <Icon name="magnifying-glass" />
            </Button>
            <SearchDialog
                ref={dialogRef}
                resultAction={(result) => (
                    <Button
                        use="link"
                        href={`/cosmogonies/${result.cosmogonyShortCode}/${result.type}s/${result.shortCode}`}
                        onClick={closeDialog}
                        variant="button"
                    >
                        View&nbsp;→
                    </Button>
                )}
            />
        </>
    );

    function openDialog() {
        dialogRef.current?.showModal();
    }

    function closeDialog() {
        dialogRef.current?.close();
    }
}
