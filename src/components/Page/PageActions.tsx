import { ReactNode } from 'react';

export type PageActionsProps = {
    actions: ReactNode[];
};

export function PageActions(props: PageActionsProps) {
    return (
        <div className="flex">
            {props.actions.map((action, index) => (
                <div
                    key={index}
                    className="border-l border-black/20 last:border-r"
                >
                    {action}
                </div>
            ))}
        </div>
    );
}
