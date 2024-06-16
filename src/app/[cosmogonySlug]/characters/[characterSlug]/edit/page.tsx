import { notFound } from 'next/navigation';
import {
    EDIT_CHARACTER_FORM_ID,
    EditCharacterForm,
} from '@/app/[cosmogonySlug]/characters/[characterSlug]/edit/EditCharacterForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getCharacterBySlug } from '@/data/characters';
import { getCosmogonyBySlug } from '@/data/cosmogonies';

export type CharacterEditPageProps = {
    params: {
        cosmogonySlug: string;
        characterSlug: string;
    };
};

export default async function CharacterEditPage(props: CharacterEditPageProps) {
    const cosmogony = await getCosmogonyBySlug(props.params.cosmogonySlug);
    const character = await getCharacterBySlug(props.params.characterSlug);

    if (!character) {
        return notFound();
    }

    return (
        <Page
            title={`Editing character`}
            breadcrumbs={[
                { text: cosmogony.name, href: `/${cosmogony.slug}` },
                { text: 'Characters', href: `/${cosmogony.slug}/characters` },
                {
                    text: character.name,
                    href: `/${cosmogony.slug}/characters/${character.slug}`,
                },
            ]}
            actions={[
                <Button
                    key="save"
                    href={`/${cosmogony.slug}/characters/${character.slug}`}
                    variant="pageAction"
                    primary
                    form={EDIT_CHARACTER_FORM_ID}
                >
                    Save
                </Button>,
                <Button
                    key="cancel"
                    use="link"
                    href={`/${cosmogony.slug}/characters/${character.slug}`}
                    variant="pageAction"
                >
                    Cancel
                </Button>,
            ]}
        >
            <EditCharacterForm cosmogony={cosmogony} character={character} />
        </Page>
    );
}
