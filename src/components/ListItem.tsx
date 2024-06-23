import { ReactNode } from 'react';
import { Button } from '@/components/Button';

export type ListItemProps = {
    title: string;
    subtitle?: string;
    href?: string;
    action?: ReactNode;
    actionText?: string;
    children?: ReactNode;
};

export function ListItem(props: ListItemProps) {
    return (
        <li className="border-b border-black/20 p-4 pb-10 pt-12 first:pt-10 last:border-b-0">
            <div className="flex items-center justify-between gap-4 transition">
                <div>
                    <p className="text-2xl">{props.title}</p>
                    {props.subtitle && (
                        <p className="text-black/20">{props.subtitle}</p>
                    )}
                </div>

                {props.href && (
                    <Button use="link" href={props.href} variant="button">
                        {props.actionText ?? 'View'}&nbsp;→
                    </Button>
                )}

                {props.action ?? null}
            </div>
            {props.children && <div className="mt-6">{props.children}</div>}
        </li>
    );
}
