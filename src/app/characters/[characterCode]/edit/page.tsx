import { notFound } from 'next/navigation';
import {
    EDIT_CHARACTER_FORM_ID,
    EditCharacterForm,
} from '@/app/characters/[characterCode]/edit/EditCharacterForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getCharacterByCode } from '@/data/characters';

export type CharacterEditPageProps = {
    params: {
        characterCode: string;
    };
};

export default async function CharacterEditPage(props: CharacterEditPageProps) {
    const character = await getCharacterByCode(props.params.characterCode);

    if (!character) {
        return notFound();
    }

    return (
        <Page
            title={`Editing character`}
            breadcrumbs={[
                {
                    text: character.cosmogony.name,
                    href: `/cosmogonies/${character.cosmogony.shortCode}`,
                },
                {
                    text: 'Characters',
                    href: `/cosmogonies/${character.cosmogony.shortCode}/characters`,
                },
                {
                    text: character.name,
                    href: `/characters/${character.shortCode}`,
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
                    href={`/characters/${character.shortCode}`}
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
