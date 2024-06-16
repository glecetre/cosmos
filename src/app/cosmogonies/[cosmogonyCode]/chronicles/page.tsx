import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { getChroniclesList } from '@/data/chronicles';
import { getCosmogonyByCode } from '@/data/cosmogonies';

export default async function CharactersPage(props: {
    params: { cosmogonyCode: string };
}) {
    const cosmogony = await getCosmogonyByCode(props.params.cosmogonyCode);
    const chronicles = await getChroniclesList(cosmogony.id);

    return (
        <Page
            title="Chronicles"
            subtitle={`in ${cosmogony.name}`}
            breadcrumbs={[
                {
                    text: cosmogony.name,
                    href: `/cosmogonies/${cosmogony.shortCode}`,
                },
                {
                    text: 'Chronicles',
                    href: `/cosmogonies/${cosmogony.shortCode}/chronicles`,
                },
            ]}
        >
            <List>
                {chronicles.map((chronicles) => (
                    <ListItem
                        key={chronicles.id}
                        title={chronicles.title}
                        href={`/cosmogonies/${cosmogony.shortCode}/chronicles/${chronicles.shortCode}`}
                    />
                ))}
            </List>
        </Page>
    );
}
