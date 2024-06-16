'use client';

import { useFormState } from 'react-dom';
import { submitCreateCharacter } from '@/app/cosmogonies/[cosmogonyCode]/characters/new/submitCreateCharacterAction';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { SelectCosmogony } from '@/data/schema';

export const CREATE_CHARACTER_FORM_ID = 'create-character-form';

export type CreateCharacterFormProps = {
    cosmogonyId: SelectCosmogony['id'];
};

export function CreateCharacterForm(props: CreateCharacterFormProps) {
    const [submissionState, formAction] = useFormState(
        submitCreateCharacter,
        {}
    );

    return (
        <Form id={CREATE_CHARACTER_FORM_ID} action={formAction}>
            <input type="hidden" name="cosmogonyId" value={props.cosmogonyId} />
            <Input
                name="name"
                defaultValue={submissionState.fields?.name}
                label="Name"
                errors={submissionState.errors?.fieldErrors?.name}
                autoComplete="off"
            />
            <Textarea
                name="markdown"
                defaultValue={submissionState.fields?.markdown}
                label="Content"
                errors={submissionState.errors?.fieldErrors?.markdown}
                rows={19}
            />
        </Form>
    );
}
