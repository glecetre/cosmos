import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Page } from '@/components/Page';
import { getChronicleBySlug } from '@/data/chronicles';
import { getCosmogonyBySlug } from '@/data/cosmogonies';

export default async function CharacterPage(props: {
    params: { cosmogonySlug: string; chronicleSlug: string };
}) {
    const cosmogony = await getCosmogonyBySlug(props.params.cosmogonySlug);
    const chronicle = await getChronicleBySlug(
        cosmogony.id,
        props.params.chronicleSlug
    );

    if (!chronicle) {
        return notFound();
    }

    const breadcrumbs = [
        {title: cosmogony.name, href: `/${cosmogony.slug}`},
        {title: "Chronicles", href: `/${cosmogony.slug}/chronicles`},
        {title: chronicle.title, href: `/${cosmogony.slug}/chronicles/${chronicle.slug}`}
    ];

    return (
        <Page
            title={chronicle.title}
            subtitle={`Chronicle in ${cosmogony.name}`}
            breadcrumbs={breadcrumbs}
        >
            <section className="prose text-justify text-xl">
                <Markdown remarkPlugins={[remarkGfm]}>
                    {chronicle.markdownContent}
                </Markdown>
            </section>
        </Page>
    );
}
