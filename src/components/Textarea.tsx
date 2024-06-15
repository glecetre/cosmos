import { ComponentPropsWithRef, Ref, forwardRef } from 'react';
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

    return (
        <InputLabel label={label} errors={errors}>
            <textarea
                ref={ref}
                {...textareaProps}
                className="bg-dotted w-full bg-white/50 p-2 outline-none"
            ></textarea>
        </InputLabel>
    );
}

export const Textarea = forwardRef(TextareaWithRef);
