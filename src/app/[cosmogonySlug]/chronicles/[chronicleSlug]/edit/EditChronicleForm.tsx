'use client';

import { useFormState } from 'react-dom';
import { submitSaveChronicle } from '@/app/[cosmogonySlug]/chronicles/[chronicleSlug]/edit/submitSaveChronicleAction';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { SelectChronicle, SelectCosmogony } from '@/data/schema';

export const EDIT_CHRONICLE_FORM_ID = 'edit-chronicle-form';

export type EditChronicleFormProps = {
    cosmogony: SelectCosmogony;
    chronicle: SelectChronicle;
};

export function EditChronicleForm(props: EditChronicleFormProps) {
    const [submissionState, formAction] = useFormState(submitSaveChronicle, {});

    return (
        <Form id={EDIT_CHRONICLE_FORM_ID} action={formAction}>
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
            <input type="hidden" name="id" value={props.chronicle.id} />
            <Input
                name="title"
                defaultValue={
                    submissionState.fields?.title || props.chronicle.title
                }
                label="Title"
                errors={submissionState.errors?.fieldErrors?.title}
                autoComplete="off"
            />
            <Textarea
                name="markdown"
                defaultValue={
                    submissionState.fields?.markdown || props.chronicle.markdown
                }
                label="Content"
                errors={submissionState.errors?.fieldErrors?.markdown}
                rows={19}
            />
        </Form>
    );
}
