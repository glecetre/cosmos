import { Button } from '@/components/Button';

export type ListItemProps = {
    title: string;
    subtitle?: string;
    href?: string;
    actionText?: string;
};

export function ListItem(props: ListItemProps) {
    return (
        <li className="flex items-center justify-between gap-4 border-b border-black/20 p-4 pb-10 pt-12 transition first:pt-10 last:border-b-0">
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
        </li>
    );
}
