import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { charactersApi } from '@/data/characters';

export default async function CharacterPage(props: {
    params: { characterCode: string; cosmogonyCode: string };
}) {
    const character = await charactersApi.getByCode(props.params.characterCode);

    if (
        !character ||
        character.cosmogony.shortCode !== props.params.cosmogonyCode
    ) {
        return notFound();
    }

    return (
        <Page
            title={character.name}
            subtitle={`Character in ${character.cosmogony.name}`}
            breadcrumbs={[
                {
                    text: character.cosmogony.name,
                    href: `/cosmogonies/${character.cosmogony.shortCode}`,
                },
                {
                    text: 'Characters',
                    href: `/cosmogonies/${character.cosmogony.shortCode}/characters`,
                },
                {
                    text: character.name,
                    href: `/cosmogonies/${character.cosmogony.shortCode}/characters/${character.shortCode}`,
                },
            ]}
            actions={[
                <Button
                    key="edit"
                    use="link"
                    variant="pageAction"
                    href={`/cosmogonies/${character.cosmogony.shortCode}/characters/${character.shortCode}/edit`}
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
