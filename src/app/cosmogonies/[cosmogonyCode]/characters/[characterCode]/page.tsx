import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { Button } from '@/components/Button';
import { Markdown } from '@/components/Markdown';
import { Page } from '@/components/Page';
import { charactersApi } from '@/data/characters';
import { pageHtmlTitle } from '@/utils';

type CharacterPageProps = {
    params: { characterCode: string; cosmogonyCode: string };
};

export async function generateMetadata(
    props: CharacterPageProps
): Promise<Metadata> {
    const character = await charactersApi.getByCode(props.params.characterCode);

    if (!character) {
        return {};
    }

    return {
        title: pageHtmlTitle(
            `${character.name} in ${character.cosmogony.name}`
        ),
    };
}

export default async function CharacterPage(props: CharacterPageProps) {
    const session = await auth();
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
                session && (
                    <Button
                        key="edit"
                        use="link"
                        variant="pageAction"
                        href={`/cosmogonies/${character.cosmogony.shortCode}/characters/${character.shortCode}/edit`}
                    >
                        Edit
                    </Button>
                ),
            ]}
        >
            <Markdown>{character.markdown}</Markdown>
        </Page>
    );
}
