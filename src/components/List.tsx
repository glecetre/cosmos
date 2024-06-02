import { ReactNode } from 'react';

export type ListProps = {
    children: ReactNode | ReactNode[];
};

export function List(props: ListProps) {
    return <ul>{props.children}</ul>;
}
