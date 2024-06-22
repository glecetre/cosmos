import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { charactersApi } from '@/data/characters';
import { chroniclesApi } from '@/data/chronicles';
import { cosmogoniesApi } from '@/data/cosmogonies';

export default async function CosmogonyPage(props: {
    params: { cosmogonyCode: string };
}) {
    const cosmogony = await cosmogoniesApi.getByCode(
        props.params.cosmogonyCode
    );
    const chroniclesCount = await chroniclesApi.getCount(cosmogony.id);
    const charactersCount = await charactersApi.getCount(cosmogony.id);

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
