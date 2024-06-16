import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { getCharactersList } from '@/data/characters';
import { getCosmogonyByCode } from '@/data/cosmogonies';

export default async function CharactersPage(props: {
    params: { cosmogonyCode: string };
}) {
    const cosmogony = await getCosmogonyByCode(props.params.cosmogonyCode);
    const characters = await getCharactersList(cosmogony.id);

    return (
        <Page
            title="Characters"
            subtitle={`in ${cosmogony.name}`}
            breadcrumbs={[
                {
                    text: cosmogony.name,
                    href: `/cosmogonies/${cosmogony.shortCode}`,
                },
                {
                    text: 'Characters',
                    href: `/cosmogonies/${cosmogony.shortCode}/characters`,
                },
            ]}
        >
            <List>
                {characters.map((character) => (
                    <ListItem
                        key={character.id}
                        title={character.name}
                        href={`/characters/${character.shortCode}`}
                    />
                ))}
            </List>
        </Page>
    );
}
