'use client';

import {
    ChangeEvent,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    function resizeTextarea(event?: ChangeEvent<HTMLTextAreaElement>) {
        if (!textareaElement.current) {
            return;
        }

        textareaElement.current.style.height =
            textareaElement.current.scrollHeight + 'px';

        // Also trigger the possible `onChange` prop we may be given
        if (event) {
            props.onChange?.(event);
        }
    }
}

export const Textarea = forwardRef(TextareaWithRef);
