import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getChronicleByCode } from '@/data/chronicles';

export default async function CharacterPage(props: {
    params: { chronicleCode: string };
}) {
    const chronicle = await getChronicleByCode(props.params.chronicleCode);

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
                    href: `/cosmogonies/${chronicle.cosmogony.shortCode}`,
                },
                {
                    text: 'Chronicles',
                    href: `/cosmogonies/${chronicle.cosmogony.shortCode}/chronicles`,
                },
                {
                    text: chronicle.title,
                    href: `/chronicles/${chronicle.shortCode}`,
                },
            ]}
            actions={[
                <Button
                    key="edit"
                    use="link"
                    variant="pageAction"
                    href={`/chronicles/${chronicle.shortCode}/edit`}
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
