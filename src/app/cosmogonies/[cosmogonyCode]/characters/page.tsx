import { Metadata } from 'next';
import { auth } from '@/auth';
import { Button } from '@/components/Button';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Page } from '@/components/Page';
import { charactersApi } from '@/data/characters';
import { cosmogoniesApi } from '@/data/cosmogonies';
import { pageHtmlTitle } from '@/utils';

type CharactersPageProps = {
    params: { cosmogonyCode: string };
};

export async function generateMetadata(
    props: CharactersPageProps
): Promise<Metadata> {
    const cosmogony = await cosmogoniesApi.getByCode(
        props.params.cosmogonyCode
    );

    return {
        title: pageHtmlTitle(`Characters in ${cosmogony.name}`),
    };
}

export default async function CharactersPage(props: CharactersPageProps) {
    const session = await auth();
    const cosmogony = await cosmogoniesApi.getByCode(
        props.params.cosmogonyCode
    );
    const characters = await charactersApi.getAll(cosmogony.id);

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
            actions={[
                session && (
                    <Button
                        key="goto-create"
                        use="link"
                        href={`/cosmogonies/${cosmogony.shortCode}/characters/new`}
                        variant="pageAction"
                    >
                        Create
                    </Button>
                ),
            ]}
        >
            <List>
                {characters.map((character) => (
                    <ListItem
                        key={character.id}
                        title={character.name}
                        href={`/cosmogonies/${cosmogony.shortCode}/characters/${character.shortCode}`}
                    />
                ))}
            </List>
        </Page>
    );
}
