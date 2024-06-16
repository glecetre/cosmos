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
    const chronicle = await getChronicleBySlug(props.params.chronicleSlug);

    if (!chronicle) {
        return notFound();
    }

    return (
        <Page
            title={chronicle.title}
            subtitle={`Chronicle in ${cosmogony.name}`}
            breadcrumbs={[
                { text: cosmogony.name, href: `/${cosmogony.slug}` },
                { text: 'Chronicles', href: `/${cosmogony.slug}/chronicles` },
                {
                    text: chronicle.title,
                    href: `/${cosmogony.slug}/chronicles/${chronicle.slug}`,
                },
            ]}
        >
            <section className="prose text-justify text-xl">
                <Markdown remarkPlugins={[remarkGfm]}>
                    {chronicle.markdown}
                </Markdown>
            </section>
        </Page>
    );
}
