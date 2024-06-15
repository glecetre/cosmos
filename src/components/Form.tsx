import { ComponentPropsWithRef, ReactNode, Ref, forwardRef } from 'react';

export type FormProps = Omit<ComponentPropsWithRef<'form'>, 'className'> & {
    children?: ReactNode | ReactNode[];
};

function FormWithRef(props: FormProps, ref: Ref<HTMLFormElement>) {
    const { children, ...formProps } = props;

    return (
        <form {...formProps} ref={ref} className="space-y-8">
            {children}
        </form>
    );
}

export const Form = forwardRef(FormWithRef);
