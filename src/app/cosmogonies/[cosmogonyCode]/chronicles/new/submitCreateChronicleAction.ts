'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createChronicle } from '@/data/chronicles';

export async function submitCreateChronicle(
    _prevState: SubmitCreateChronicleState,
    formData: FormData
): Promise<SubmitCreateChronicleState> {
    const input = Object.fromEntries(
        Array.from(formData).map(([fieldName, fieldValue]) => [
            fieldName,
            fieldValue.toString(),
        ])
    );
    const parseResult = createChronicleFormSchema.safeParse(input);

    if (!parseResult.success) {
        return {
            fields: input,
            errors: parseResult.error.flatten(),
        };
    }

    const createdChronicle = await createChronicle(parseResult.data);

    redirect(
        `/cosmogonies/${createdChronicle.cosmogony.shortCode}/chronicles/${createdChronicle.shortCode}`
    );
}

type SubmitCreateChronicleState = {
    fields?: Record<string, string>;
    errors?: z.inferFlattenedErrors<typeof createChronicleFormSchema>;
};

const createChronicleFormSchema = z.object({
    cosmogonyId: z.coerce.number(),
    title: z.string().trim().min(1, { message: 'Title cannot be empty' }),
    markdown: z.string().default(''),
});
