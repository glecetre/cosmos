import Link from "next/link";

export type BreadcrumbsProps = {
    crumbs: Array<{title: string, href?: string}>;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
    return (
        <ol className='flex gap-4 text-black/50'>
                {props.crumbs?.map((crumb, index) => (
                    <>
                        <li key={index} className="hover:text-black/100 hover:underline">
                            {crumb.href
                                ? <Link href={crumb.href}>{crumb.title}</Link>
                                : crumb.title}
                        </li>
                        {index !== props.crumbs.length - 1 && <span>/</span>}
                    </>
                ))}
            </ol>
    )
}