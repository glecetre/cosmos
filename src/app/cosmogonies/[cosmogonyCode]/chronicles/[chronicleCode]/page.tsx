import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { auth } from '@/auth';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { chroniclesApi } from '@/data/chronicles';

export default async function CharacterPage(props: {
    params: { chronicleCode: string; cosmogonyCode: string };
}) {
    const session = await auth();
    const chronicle = await chroniclesApi.getByCode(props.params.chronicleCode);

    if (
        !chronicle ||
        chronicle.cosmogony.shortCode !== props.params.cosmogonyCode
    ) {
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
                    href: `/cosmogonies/${chronicle.cosmogony.shortCode}/chronicles/${chronicle.shortCode}`,
                },
            ]}
            actions={[
                session && (
                    <Button
                        key="edit"
                        use="link"
                        variant="pageAction"
                        href={`/cosmogonies/${chronicle.cosmogony.shortCode}/chronicles/${chronicle.shortCode}/edit`}
                    >
                        Edit
                    </Button>
                ),
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
