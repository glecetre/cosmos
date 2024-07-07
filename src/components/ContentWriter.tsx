'use client';

import { KeyboardEvent, useRef, useState } from 'react';
import { Button } from '@/components/Button';
import { SearchDialog } from '@/components/Search/SearchDialog';
import { useSearchDialogRef } from '@/components/Search/useSearchDialogRef';
import { Textarea, TextareaProps } from '@/components/Textarea';
import { SearchResultHit } from '@/search';

type ContentWriterProps = Omit<TextareaProps, 'defaultValue' | 'value'> & {
    defaultValue: string;
};

export function ContentWriter(props: ContentWriterProps) {
    const { defaultValue, ...textareaProps } = props;

    const searchDialogRef = useSearchDialogRef();
    const lastSelection = useRef({
        start: 0,
        end: 0,
        text: '',
    });
    const [value, setValue] = useState(props.defaultValue);

    return (
        <div className="relative">
            <Textarea
                name="markdown"
                rows={19}
                {...textareaProps}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={detectKeyCombo}
            />
            <SearchDialog
                ref={searchDialogRef}
                resultAction={(result) => (
                    <Button
                        type="button"
                        variant="button"
                        onClick={() => insertLink(result)}
                    >
                        Insert link
                    </Button>
                )}
            />
        </div>
    );

    function detectKeyCombo(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.metaKey && event.key === 'i') {
            event.preventDefault();
            updateSelection(event.currentTarget);
            searchDialogRef.current?.showModal();
        }
    }

    function updateSelection(textarea: HTMLTextAreaElement) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value.substring(start, end);

        lastSelection.current = { start, end, text };
    }

    function insertLink(result: SearchResultHit) {
        setValue((previousValue) => {
            const url = `/cosmogonies/${result.cosmogonyShortCode}/${result.type}s/${result.shortCode}`;
            const linkText = lastSelection.current.text || result.name;
            const beforeSelection = previousValue.substring(
                0,
                lastSelection.current.start
            );
            const afterSelection = previousValue.substring(
                lastSelection.current.end
            );

            return `${beforeSelection}[${linkText}](${url})${afterSelection}`;
        });

        searchDialogRef.current?.close();
    }
}
