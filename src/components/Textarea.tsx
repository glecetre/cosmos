'use client';

import {
    ComponentPropsWithRef,
    Ref,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';
import { InputLabel, InputLabelProps } from './InputLabel';

export type TextareaProps = Omit<
    ComponentPropsWithRef<'textarea'>,
    'className'
> & {
    label: InputLabelProps['label'];
    errors?: InputLabelProps['errors'];
};

function TextareaWithRef(props: TextareaProps, ref: Ref<HTMLTextAreaElement>) {
    const { label, errors, ...textareaProps } = props;
    const textareaElement = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(
        ref,
        () => textareaElement.current as HTMLTextAreaElement
    );

    useEffect(() => {
        resizeTextarea();
    }, []);

    return (
        <InputLabel label={label} errors={errors}>
            <textarea
                ref={textareaElement}
                {...textareaProps}
                onChange={resizeTextarea}
                className="bg-dotted w-full bg-white/50 p-2 outline-none"
            ></textarea>
        </InputLabel>
    );

    function resizeTextarea() {
        if (!textareaElement.current) {
            return;
        }

        textareaElement.current.style.height =
            textareaElement.current.scrollHeight + 'px';
    }
}

export const Textarea = forwardRef(TextareaWithRef);
