import { Fragment } from 'react';
import { Button } from '@/components/Button';

export type BreadcrumbsProps = {
    crumbs: Array<{ text: string; href?: string }>;
};

export function Breadcrumbs(props: BreadcrumbsProps) {
    return (
        <ol className="flex gap-4 text-black/60">
            {props.crumbs?.map((crumb, index) => (
                <Fragment key={index}>
                    <li>
                        {crumb.href ? (
                            <Button use="link" href={crumb.href}>
                                {crumb.text}
                            </Button>
                        ) : (
                            crumb.text
                        )}
                    </li>
                    {index !== props.crumbs.length - 1 && <span>/</span>}
                </Fragment>
            ))}
        </ol>
    );
}
