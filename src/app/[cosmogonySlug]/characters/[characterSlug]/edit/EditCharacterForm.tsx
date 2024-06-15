'use client';

import { useFormState } from 'react-dom';
import { submitSaveCharacter } from '@/app/[cosmogonySlug]/characters/[characterSlug]/edit/submitSaveCharacterAction';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { type Character } from '@/data/characters';
import { type Cosmogony } from '@/data/cosmogonies';

export const EDIT_CHARACTER_FORM_ID = 'edit-character-form';

export type EditCharacterFormProps = {
    cosmogony: Cosmogony;
    character: Character;
};

export function EditCharacterForm(props: EditCharacterFormProps) {
    const [submissionState, formAction] = useFormState(submitSaveCharacter, {});

    return (
        <Form id={EDIT_CHARACTER_FORM_ID} action={formAction}>
            <input
                type="hidden"
                name="cosmogonyId"
                value={props.cosmogony.id}
            />
            <input
                type="hidden"
                name="cosmogonySlug"
                value={props.cosmogony.slug}
            />
            <input type="hidden" name="id" value={props.character.id} />
            <Input
                name="name"
                defaultValue={
                    submissionState.fields?.name || props.character.name
                }
                label="Name"
                errors={submissionState.errors?.fieldErrors?.name}
                autoComplete="off"
            />
            <Textarea
                name="markdownContent"
                defaultValue={
                    submissionState.fields?.markdownContent ||
                    props.character.markdownContent
                }
                label="Content"
                errors={submissionState.errors?.fieldErrors?.markdownContent}
                rows={19}
            />
        </Form>
    );
}
