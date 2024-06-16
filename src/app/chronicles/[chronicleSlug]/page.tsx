import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getChronicleBySlug } from '@/data/chronicles';

export default async function CharacterPage(props: {
    params: { chronicleSlug: string };
}) {
    const chronicle = await getChronicleBySlug(props.params.chronicleSlug);

    if (!chronicle) {
        return notFound();
    }

    return (
        <Page
            title={chronicle.title}
            subtitle={`Chronicle in ${chronicle.cosmogony.name}`}
            breadcrumbs={[
                {
                    text: chronicle.cosmogony.name,
                    href: `/${chronicle.cosmogony.slug}`,
                },
                {
                    text: 'Chronicles',
                    href: `/${chronicle.cosmogony.slug}/chronicles`,
                },
                {
                    text: chronicle.title,
                    href: `/chronicles/${chronicle.slug}`,
                },
            ]}
            actions={[
                <Button
                    key="edit"
                    use="link"
                    variant="pageAction"
                    href={`/chronicles/${chronicle.slug}/edit`}
                >
                    Edit
                </Button>,
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
