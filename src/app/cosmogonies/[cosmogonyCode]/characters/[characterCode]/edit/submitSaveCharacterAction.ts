'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { saveCharacter } from '@/data/characters';

export async function submitSaveCharacter(
    _prevState: SubmitSavecharacterState,
    formData: FormData
): Promise<SubmitSavecharacterState> {
    const input = Object.fromEntries(
        Array.from(formData).map(([fieldName, fieldValue]) => [
            fieldName,
            fieldValue.toString(),
        ])
    );
    const parseResult = saveCharacterFormSchema.safeParse(input);

    if (!parseResult.success) {
        return {
            fields: input,
            errors: parseResult.error.flatten(),
        };
    }

    const updatedCharacter = await saveCharacter(parseResult.data);

    redirect(
        `/cosmogonies/${updatedCharacter.cosmogony.shortCode}/characters/${updatedCharacter.shortCode}`
    );
}

type SubmitSavecharacterState = {
    fields?: Record<string, string>;
    errors?: z.inferFlattenedErrors<typeof saveCharacterFormSchema>;
};

const saveCharacterFormSchema = z.object({
    id: z.coerce.number(),
    name: z.string().trim().min(1, { message: 'Name cannot be empty' }),
    markdown: z.string().default(''),
});
