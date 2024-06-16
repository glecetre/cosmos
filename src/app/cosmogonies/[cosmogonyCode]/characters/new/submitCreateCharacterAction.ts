'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createCharacter } from '@/data/characters';

export async function submitCreateCharacter(
    _prevState: SubmitCreateCharacterState,
    formData: FormData
): Promise<SubmitCreateCharacterState> {
    const input = Object.fromEntries(
        Array.from(formData).map(([fieldName, fieldValue]) => [
            fieldName,
            fieldValue.toString(),
        ])
    );
    const parseResult = createCharacterFormSchema.safeParse(input);

    if (!parseResult.success) {
        return {
            fields: input,
            errors: parseResult.error.flatten(),
        };
    }

    const createdCharacter = await createCharacter(parseResult.data);

    redirect(
        `/cosmogonies/${createdCharacter.cosmogony.shortCode}/characters/${createdCharacter.shortCode}`
    );
}

type SubmitCreateCharacterState = {
    fields?: Record<string, string>;
    errors?: z.inferFlattenedErrors<typeof createCharacterFormSchema>;
};

const createCharacterFormSchema = z.object({
    cosmogonyId: z.coerce.number(),
    name: z.string().trim().min(1, { message: 'Name cannot be empty' }),
    markdown: z.string().default(''),
});
