'use client';

import { useFormState } from 'react-dom';
import { submitCreateChronicle } from '@/app/cosmogonies/[cosmogonyCode]/chronicles/new/submitCreateChronicleAction';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { SelectCosmogony } from '@/data/schema';

export const CREATE_CHRONICLE_FORM_ID = 'create-chronicle-form';

export type CreateChronicleFormProps = {
    cosmogonyId: SelectCosmogony['id'];
};

export function CreateChronicleForm(props: CreateChronicleFormProps) {
    const [submissionState, formAction] = useFormState(
        submitCreateChronicle,
        {}
    );

    return (
        <Form id={CREATE_CHRONICLE_FORM_ID} action={formAction}>
            <input type="hidden" name="cosmogonyId" value={props.cosmogonyId} />
            <Input
                name="title"
                defaultValue={submissionState.fields?.title}
                label="Title"
                errors={submissionState.errors?.fieldErrors?.title}
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
