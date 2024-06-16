'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { saveChronicle } from '@/data/chronicles';

export async function submitSaveChronicle(
    _prevState: SubmitSaveChronicleState,
    formData: FormData
): Promise<SubmitSaveChronicleState> {
    const input = Object.fromEntries(
        Array.from(formData).map(([fieldName, fieldValue]) => [
            fieldName,
            fieldValue.toString(),
        ])
    );
    const parseResult = saveChronicleFormSchema.safeParse(input);

    if (!parseResult.success) {
        return {
            fields: input,
            errors: parseResult.error.flatten(),
        };
    }

    const updatedChronicle = await saveChronicle(parseResult.data);

    redirect(`/chronicles/${updatedChronicle.shortCode}`);
}

type SubmitSaveChronicleState = {
    fields?: Record<string, string>;
    errors?: z.inferFlattenedErrors<typeof saveChronicleFormSchema>;
};

const saveChronicleFormSchema = z.object({
    id: z.coerce.number(),
    title: z.string().trim().min(1, { message: 'Title cannot be empty' }),
    markdown: z.string().default(''),
});
