import { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export type PageProps = {
    title: string;
    subtitle?: string;
    breadcrumbs?: Array<{title: string, href?: string}>;
    children: ReactNode | ReactNode[];
};

export function Page(props: PageProps) {
    return (
        <div className="mx-auto max-w-[90ch] border-e border-s border-black/20">
            {props.breadcrumbs && <div className='border-b border-black/20 py-2 px-20'><Breadcrumbs crumbs={props.breadcrumbs} /></div>}
            <div className='p-20'>
                <h2 className="text-balance text-center text-4xl font-bold">
                    {props.title}
                </h2>
                {props.subtitle && (
                    <h3 className="text-balance text-center text-lg text-black/50">
                        {props.subtitle}
                    </h3>
                )}
                <main className="mt-20 prose-h1:mt-12 prose-h1:text-2xl prose-h2:text-xl">
                    {props.children}
                </main>
            </div>
        </div>
    );
}
