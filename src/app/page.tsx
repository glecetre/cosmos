import { Metadata } from 'next';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { getAllCosmogonies } from '@/data/cosmogonies';

export const metadata: Metadata = {
    title: 'Cosmogonies',
};

export default async function Home() {
    const cosmogonies = await getAllCosmogonies();

    return (
        <Page title="Cosmogonies">
            <List>
                {cosmogonies.map((cosmogony) => (
                    <ListItem
                        key={cosmogony.id}
                        title={cosmogony.name}
                        href={`/cosmogonies/${cosmogony.shortCode}`}
                    />
                ))}
            </List>
        </Page>
    );
}
