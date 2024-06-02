import { notFound } from 'next/navigation';
import { Page } from '@/components/Page';
import { getCharacterBySlug } from '@/data/characters';
import { getCosmogonyBySlug } from '@/data/cosmogonies';

export default async function CharacterPage(props: {
    params: { cosmogonySlug: string; characterSlug: string };
}) {
    const cosmogony = await getCosmogonyBySlug(props.params.cosmogonySlug);
    const character = await getCharacterBySlug(
        cosmogony.id,
        props.params.characterSlug
    );

    if (!character) {
        return notFound();
    }

    const breadcrumbs = [
        {title: cosmogony.name, href: `/${cosmogony.slug}`},
        {title: "Characters", href: `/${cosmogony.slug}/characters`},
        {title: character.name, href: `/${cosmogony.slug}/characters/${character.slug}`}
    ];

    return (
        <Page
            title={character.name}
            subtitle={`Character in ${cosmogony.name}`}
            breadcrumbs={breadcrumbs}
        >
            <section
                className="prose text-justify text-xl"
                dangerouslySetInnerHTML={{ __html: character.markdownContent }}
            ></section>
        </Page>
    );
}
