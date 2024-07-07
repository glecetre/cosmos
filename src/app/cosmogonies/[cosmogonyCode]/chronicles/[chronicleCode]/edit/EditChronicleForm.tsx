'use client';

import { useFormState } from 'react-dom';
import { submitEditChronicle } from '@/app/cosmogonies/[cosmogonyCode]/chronicles/[chronicleCode]/edit/submitEditChronicleAction';
import { ContentWriter } from '@/components/ContentWriter';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { SelectChronicle } from '@/data/schema';

export const EDIT_CHRONICLE_FORM_ID = 'edit-chronicle-form';

export type EditChronicleFormProps = {
    chronicle: SelectChronicle;
};

export function EditChronicleForm(props: EditChronicleFormProps) {
    const [submissionState, formAction] = useFormState(submitEditChronicle, {});

    return (
        <Form id={EDIT_CHRONICLE_FORM_ID} action={formAction}>
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
            <ContentWriter
                name="markdown"
                defaultValue={
                    submissionState.fields?.markdown || props.chronicle.markdown
                }
                label="Content"
                errors={submissionState.errors?.fieldErrors?.markdown}
            />
        </Form>
    );
}
