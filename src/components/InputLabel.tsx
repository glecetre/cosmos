import { ReactNode } from 'react';

export type InputLabelProps = {
    label: string;
    errors?: string | string[];
    children: ReactNode;
};

export function InputLabel(props: InputLabelProps) {
    return (
        <label className="flex flex-col items-stretch border border-black/20 transition focus-within:border-black hover:border-black/40 focus-within:hover:border-black">
            <p className="flex justify-between border-b border-black/15 bg-black/[0.02] p-2 py-1 text-sm">
                <span>{props.label}</span>
                {props.errors && (
                    <span className="text-red-700/60">
                        ✧&nbsp;{formattedErrors()}
                    </span>
                )}
            </p>
            {props.children}
        </label>
    );

    function formattedErrors(): string | undefined {
        if (!props.errors) {
            return;
        }

        if (Array.isArray(props.errors)) {
            return props.errors.join(', ');
        }

        return props.errors;
    }
}
