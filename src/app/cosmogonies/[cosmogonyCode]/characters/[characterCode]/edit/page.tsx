import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    EDIT_CHARACTER_FORM_ID,
    EditCharacterForm,
} from '@/app/cosmogonies/[cosmogonyCode]/characters/[characterCode]/edit/EditCharacterForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { charactersApi } from '@/data/characters';
import { pageHtmlTitle } from '@/utils';

type CharacterEditPageProps = {
    params: { characterCode: string; cosmogonyCode: string };
};

export async function generateMetadata(
    props: CharacterEditPageProps
): Promise<Metadata> {
    const character = await charactersApi.getByCode(props.params.characterCode);

    if (!character) {
        return {};
    }

    return {
        title: pageHtmlTitle(
            `Edit ${character.name} in ${character.cosmogony.name}`
        ),
    };
}

export default async function CharacterEditPage(props: CharacterEditPageProps) {
    const character = await charactersApi.getByCode(props.params.characterCode);

    if (
        !character ||
        character.cosmogony.shortCode !== props.params.cosmogonyCode
    ) {
        return notFound();
    }

    return (
        <Page
            title={`Edit character`}
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
