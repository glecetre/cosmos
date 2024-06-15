import { cva, type VariantProps } from 'cva';
import NextLink from 'next/link';
import { ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react';

const buttonClassname = cva({
    base: 'transition ',
    variants: {
        variant: {
            inline: 'hover:underline',
            button: 'border border-black/20',
            pageAction: 'flex items-center',
        },
        primary: {
            true: 'text-grandis-800',
            false: 'text-black/60',
        },
    },
    compoundVariants: [
        {
            variant: ['button', 'pageAction'],
            class: 'px-4 py-2',
        },
        {
            variant: ['button', 'pageAction'],
            primary: true,
            class: 'bg-grandis-300 hover:bg-grandis-900 hover:text-grandis-400',
        },
        {
            variant: ['button', 'pageAction'],
            primary: false,
            class: 'hover:bg-black/80 hover:text-white/80',
        },
        {
            variant: 'button',
            primary: false,
            class: 'bg-white/50',
        },
        {
            variant: 'pageAction',
            primary: false,
            class: 'transparent',
        },
        {
            variant: 'inline',
            primary: true,
            class: 'hover:text-grandis-900',
        },
        {
            variant: 'inline',
            primary: false,
            class: 'hover:text-black/80',
        },
    ],
    defaultVariants: {
        variant: 'inline',
        primary: false,
    },
});

type ButtonProps = VariantProps<typeof buttonClassname> &
    (
        | (ButtonHTMLAttributes<HTMLButtonElement> & {
              use?: 'button';
          })
        | (ComponentPropsWithoutRef<typeof NextLink> & {
              use: 'link';
          })
    );

export function Button(props: ButtonProps) {
    if (props.use === 'link') {
        const { use, variant, primary, ...restProps } = props;

        return (
            <NextLink
                {...restProps}
                className={buttonClassname({ variant, primary })}
            />
        );
    }

    const { use, variant, primary, ...restProps } = props;

    return (
        <button
            {...restProps}
            className={buttonClassname({ variant, primary })}
        />
    );
}
