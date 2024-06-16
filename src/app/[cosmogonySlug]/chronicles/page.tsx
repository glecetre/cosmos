import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { getChroniclesList } from '@/data/chronicles';
import { getCosmogonyBySlug } from '@/data/cosmogonies';

export default async function CharactersPage(props: {
    params: { cosmogonySlug: string };
}) {
    const cosmogony = await getCosmogonyBySlug(props.params.cosmogonySlug);
    const chronicles = await getChroniclesList(cosmogony.id);

    return (
        <Page
            title="Chronicles"
            subtitle={`in ${cosmogony.name}`}
            breadcrumbs={[
                { text: cosmogony.name, href: `/${cosmogony.slug}` },
                { text: 'Chronicles', href: `/${cosmogony.slug}/chronicles` },
            ]}
        >
            <List>
                {chronicles.map((chronicles) => (
                    <ListItem
                        key={chronicles.id}
                        title={chronicles.title}
                        href={`/chronicles/${chronicles.slug}`}
                    />
                ))}
            </List>
        </Page>
    );
}
