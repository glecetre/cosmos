import { notFound } from 'next/navigation';
import {
    EDIT_CHARACTER_FORM_ID,
    EditCharacterForm,
} from '@/app/cosmogonies/[cosmogonyCode]/characters/[characterCode]/edit/EditCharacterForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { charactersApi } from '@/data/characters';

export default async function CharacterEditPage(props: {
    params: { characterCode: string; cosmogonyCode: string };
}) {
    const character = await charactersApi.getByCode(props.params.characterCode);

    if (
        !character ||
        character.cosmogony.shortCode !== props.params.cosmogonyCode
    ) {
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
                    href: `/cosmogonies/${character.cosmogony.shortCode}/characters/${character.shortCode}`,
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
                    href={`/cosmogonies/${character.cosmogony.shortCode}/characters/${character.shortCode}`}
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
