import { ComponentPropsWithRef, Ref, forwardRef } from 'react';
import { InputLabel, InputLabelProps } from './InputLabel';

export type InputProps = Omit<ComponentPropsWithRef<'input'>, 'className'> & {
    label: InputLabelProps['label'];
    errors?: InputLabelProps['errors'];
};

function InputWithRef(props: InputProps, ref: Ref<HTMLInputElement>) {
    const { label, errors, ...inputProps } = props;

    return (
        <InputLabel label={label} errors={errors}>
            <input
                ref={ref}
                className="bg-dotted flex-grow bg-white/50 p-2 outline-none"
                {...inputProps}
            />
        </InputLabel>
    );
}

export const Input = forwardRef(InputWithRef);
