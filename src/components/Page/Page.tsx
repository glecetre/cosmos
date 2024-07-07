import { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageActions } from './PageActions';

export type PageProps = {
    title: string;
    subtitle?: string;
    breadcrumbs?: Array<{ text: string; href: string }>;
    actions?: ReactNode[];
    children: ReactNode | ReactNode[];
};

export function Page(props: PageProps) {
    return (
        <>
            {(props.breadcrumbs || props.actions) && (
                <div className="flex items-center justify-between border-b border-black/20 px-20">
                    {props.breadcrumbs && (
                        <div className="py-2">
                            <Breadcrumbs crumbs={props.breadcrumbs} />
                        </div>
                    )}
                    {props.actions && <PageActions actions={props.actions} />}
                </div>
            )}
            <div className="p-20">
                <h2 className="text-balance text-center text-4xl font-bold">
                    {props.title}
                </h2>
                {props.subtitle && (
                    <h3 className="text-balance text-center text-lg text-black/50">
                        {props.subtitle}
                    </h3>
                )}
                <main className="mt-20 text-xl">{props.children}</main>
            </div>
        </>
    );
}
