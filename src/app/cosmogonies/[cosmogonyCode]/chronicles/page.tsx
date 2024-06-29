import { Metadata } from 'next';
import { auth } from '@/auth';
import { Button } from '@/components/Button';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { chroniclesApi } from '@/data/chronicles';
import { cosmogoniesApi } from '@/data/cosmogonies';
import { pageHtmlTitle } from '@/utils';

type ChroniclesPageProps = {
    params: { cosmogonyCode: string };
};

export async function generateMetadata(
    props: ChroniclesPageProps
): Promise<Metadata> {
    const cosmogony = await cosmogoniesApi.getByCode(
        props.params.cosmogonyCode
    );

    if (!cosmogony) {
        return {};
    }

    return {
        title: pageHtmlTitle(`Chronicles in ${cosmogony.name}`),
    };
}

export default async function ChroniclesPage(props: ChroniclesPageProps) {
    const session = await auth();
    const cosmogony = await cosmogoniesApi.getByCode(
        props.params.cosmogonyCode
    );
    const chronicles = await chroniclesApi.getAll(cosmogony.id);

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
            actions={[
                session && (
                    <Button
                        key="goto-create"
                        use="link"
                        href={`/cosmogonies/${cosmogony.shortCode}/chronicles/new`}
                        variant="pageAction"
                    >
                        Create
                    </Button>
                ),
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
