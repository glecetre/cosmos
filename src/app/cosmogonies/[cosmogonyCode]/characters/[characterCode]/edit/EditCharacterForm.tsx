'use client';

import { useFormState } from 'react-dom';
import { submitEditCharacter } from '@/app/cosmogonies/[cosmogonyCode]/characters/[characterCode]/edit/submitEditCharacterAction';
import { ContentWriter } from '@/components/ContentWriter';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { SelectCharacter } from '@/data/schema';

export const EDIT_CHARACTER_FORM_ID = 'edit-character-form';

export type EditCharacterFormProps = {
    character: SelectCharacter;
};

export function EditCharacterForm(props: EditCharacterFormProps) {
    const [submissionState, formAction] = useFormState(submitEditCharacter, {});

    return (
        <Form id={EDIT_CHARACTER_FORM_ID} action={formAction}>
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
            <ContentWriter
                name="markdown"
                defaultValue={
                    submissionState.fields?.markdown || props.character.markdown
                }
                label="Content"
                errors={submissionState.errors?.fieldErrors?.markdown}
            />
        </Form>
    );
}
