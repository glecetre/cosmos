import Link from 'next/link';

export type ListItemProps = {
    title: string;
    subtitle?: string;
    href?: string;
    actionText?: string;
};

export function ListItem(props: ListItemProps) {
    return (
        <li className="flex items-center justify-between border-b border-black/20 p-4 pb-10 pt-12 transition first:pt-10 last:border-b-0 has-[a:hover]:bg-white/50">
            <div>
                <p className="text-2xl">{props.title}</p>
                {props.subtitle && (
                    <p className="text-black/20">{props.subtitle}</p>
                )}
            </div>

            {props.href && (
                <Link
                    href={props.href}
                    className="border border-black/20 bg-white/50 px-4 py-2 leading-none ml-4"
                >
                    {props.actionText ?? 'View'}&nbsp;→
                </Link>
            )}
        </li>
    );
}
