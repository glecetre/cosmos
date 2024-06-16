import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getCharacterBySlug } from '@/data/characters';
import { getCosmogonyBySlug } from '@/data/cosmogonies';

export default async function CharacterPage(props: {
    params: { cosmogonySlug: string; characterSlug: string };
}) {
    const cosmogony = await getCosmogonyBySlug(props.params.cosmogonySlug);
    const character = await getCharacterBySlug(props.params.characterSlug);

    if (!character) {
        return notFound();
    }

    return (
        <Page
            title={character.name}
            subtitle={`Character in ${cosmogony.name}`}
            breadcrumbs={[
                { text: cosmogony.name, href: `/${cosmogony.slug}` },
                { text: 'Characters', href: `/${cosmogony.slug}/characters` },
                {
                    text: character.name,
                    href: `/${cosmogony.slug}/characters/${character.slug}`,
                },
            ]}
            actions={[
                <Button
                    key="edit"
                    use="link"
                    variant="pageAction"
                    href={`/${cosmogony.slug}/characters/${character.slug}/edit`}
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
