import { Metadata } from 'next';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { cosmogoniesApi } from '@/data/cosmogonies';

export const metadata: Metadata = {
    title: 'Cosmogonies',
};

export default async function Home() {
    const cosmogonies = await cosmogoniesApi.getAll();

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
