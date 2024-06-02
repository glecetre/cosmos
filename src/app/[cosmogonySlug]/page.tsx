import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { getCharactersCount } from '@/data/characters';
import { getChroniclesCount } from '@/data/chronicles';
import { getCosmogonyBySlug } from '@/data/cosmogonies';

export default async function CosmogonyPage(props: {
    params: { cosmogonySlug: string };
}) {
    const cosmogony = await getCosmogonyBySlug(props.params.cosmogonySlug);
    const chroniclesCount = await getChroniclesCount(cosmogony.id);
    const charactersCount = await getCharactersCount(cosmogony.id);

    return (
        <Page title={cosmogony.name} subtitle="Cosmogony">
            <List>
                <ListItem
                    title="Chronicles"
                    subtitle={`${chroniclesCount} entries`}
                    href={`/${cosmogony.slug}/chronicles`}
                />
                <ListItem
                    title="Characters"
                    subtitle={`${charactersCount} entries`}
                    href={`/${cosmogony.slug}/characters`}
                />
            </List>
        </Page>
    );
}
