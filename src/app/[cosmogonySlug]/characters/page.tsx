import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { getCharactersList } from '@/data/characters';
import { getCosmogonyBySlug } from '@/data/cosmogonies';

export default async function CharactersPage(props: {
    params: { cosmogonySlug: string };
}) {
    const cosmogony = await getCosmogonyBySlug(props.params.cosmogonySlug);
    const characters = await getCharactersList(cosmogony.id);

    return (
        <Page
            title="Characters"
            subtitle={`in ${cosmogony.name}`}
            breadcrumbs={[
                { text: cosmogony.name, href: `/${cosmogony.slug}` },
                { text: 'Characters', href: `/${cosmogony.slug}/characters` },
            ]}
        >
            <List>
                {characters.map((character) => (
                    <ListItem
                        key={character.id}
                        title={character.name}
                        href={`characters/${character.slug}`}
                    />
                ))}
            </List>
        </Page>
    );
}
