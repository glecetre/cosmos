import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { getCharactersCount } from '@/data/characters';
import { getChroniclesCount } from '@/data/chronicles';
import { getCosmogonyByCode } from '@/data/cosmogonies';

export default async function CosmogonyPage(props: {
    params: { cosmogonyCode: string };
}) {
    const cosmogony = await getCosmogonyByCode(props.params.cosmogonyCode);
    const chroniclesCount = await getChroniclesCount(cosmogony.id);
    const charactersCount = await getCharactersCount(cosmogony.id);

    return (
        <Page title={cosmogony.name} subtitle="Cosmogony">
            <List>
                <ListItem
                    title="Chronicles"
                    subtitle={`${chroniclesCount} entries`}
                    href={`/cosmogonies/${cosmogony.shortCode}/chronicles`}
                />
                <ListItem
                    title="Characters"
                    subtitle={`${charactersCount} entries`}
                    href={`/cosmogonies/${cosmogony.shortCode}/characters`}
                />
            </List>
        </Page>
    );
}
