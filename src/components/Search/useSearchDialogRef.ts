import { useRef } from 'react';

/**
 * Create a new ref for a {@link SearchDialog} component.
 * @returns A new ref for a SearchDialog component.
 */
export function useSearchDialogRef() {
    return useRef<HTMLDialogElement>(null);
}
