import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getCharacterBySlug } from '@/data/characters';

export default async function CharacterPage(props: {
    params: { cosmogonySlug: string; characterSlug: string };
}) {
    const character = await getCharacterBySlug(props.params.characterSlug);

    if (!character) {
        return notFound();
    }

    return (
        <Page
            title={character.name}
            subtitle={`Character in ${character.cosmogony.name}`}
            breadcrumbs={[
                {
                    text: character.cosmogony.name,
                    href: `/${character.cosmogony.slug}`,
                },
                {
                    text: 'Characters',
                    href: `/${character.cosmogony.slug}/characters`,
                },
                {
                    text: character.name,
                    href: `/characters/${character.slug}`,
                },
            ]}
            actions={[
                <Button
                    key="edit"
                    use="link"
                    variant="pageAction"
                    href={`/characters/${character.slug}/edit`}
                >
                    Edit
                </Button>,
            ]}
        >
            <section className="prose text-justify text-xl">
                <Markdown remarkPlugins={[remarkGfm]}>
                    {character.markdown}
                </Markdown>
            </section>
        </Page>
    );
}
