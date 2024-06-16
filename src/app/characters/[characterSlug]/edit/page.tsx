import { notFound } from 'next/navigation';
import {
    EDIT_CHARACTER_FORM_ID,
    EditCharacterForm,
} from '@/app/characters/[characterSlug]/edit/EditCharacterForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getCharacterBySlug } from '@/data/characters';

export type CharacterEditPageProps = {
    params: {
        characterSlug: string;
    };
};

export default async function CharacterEditPage(props: CharacterEditPageProps) {
    const character = await getCharacterBySlug(props.params.characterSlug);

    if (!character) {
        return notFound();
    }

    return (
        <Page
            title={`Editing character`}
            breadcrumbs={[
                {
                    text: character.cosmogony.name,
                    href: `/${character.cosmogony.slug}`,
                },
                {
                    text: 'Characters',
                    href: `/${character.cosmogony.slug}/characters`,
                },
                {
                    text: character.name,
                    href: `/characters/${character.slug}`,
                },
            ]}
            actions={[
                <Button
                    key="save"
                    variant="pageAction"
                    primary
                    form={EDIT_CHARACTER_FORM_ID}
                >
                    Save
                </Button>,
                <Button
                    key="cancel"
                    use="link"
                    href={`/characters/${character.slug}`}
                    variant="pageAction"
                >
                    Cancel
                </Button>,
            ]}
        >
            <EditCharacterForm character={character} />
        </Page>
    );
}
