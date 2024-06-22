'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { chroniclesApi } from '@/data/chronicles';

export async function submitEditChronicle(
    _prevState: SubmitEditChronicleState,
    formData: FormData
): Promise<SubmitEditChronicleState> {
    const input = Object.fromEntries(
        Array.from(formData).map(([fieldName, fieldValue]) => [
            fieldName,
            fieldValue.toString(),
        ])
    );
    const parseResult = editChronicleFormSchema.safeParse(input);

    if (!parseResult.success) {
        return {
            fields: input,
            errors: parseResult.error.flatten(),
        };
    }

    const updatedChronicle = await chroniclesApi.update(parseResult.data);

    redirect(
        `/cosmogonies/${updatedChronicle.cosmogony.shortCode}/chronicles/${updatedChronicle.shortCode}`
    );
}

type SubmitEditChronicleState = {
    fields?: Record<string, string>;
    errors?: z.inferFlattenedErrors<typeof editChronicleFormSchema>;
};

const editChronicleFormSchema = z.object({
    id: z.coerce.number(),
    title: z.string().trim().min(1, { message: 'Title cannot be empty' }),
    markdown: z.string().default(''),
});
