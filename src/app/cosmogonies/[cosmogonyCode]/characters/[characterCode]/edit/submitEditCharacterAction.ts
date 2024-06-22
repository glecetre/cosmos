'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { charactersApi } from '@/data/characters';

export async function submitEditCharacter(
    _prevState: SubmitEditCharacterState,
    formData: FormData
): Promise<SubmitEditCharacterState> {
    const input = Object.fromEntries(
        Array.from(formData).map(([fieldName, fieldValue]) => [
            fieldName,
            fieldValue.toString(),
        ])
    );
    const parseResult = editCharacterFormSchema.safeParse(input);

    if (!parseResult.success) {
        return {
            fields: input,
            errors: parseResult.error.flatten(),
        };
    }

    const updatedCharacter = await charactersApi.update(parseResult.data);

    redirect(
        `/cosmogonies/${updatedCharacter.cosmogony.shortCode}/characters/${updatedCharacter.shortCode}`
    );
}

type SubmitEditCharacterState = {
    fields?: Record<string, string>;
    errors?: z.inferFlattenedErrors<typeof editCharacterFormSchema>;
};

const editCharacterFormSchema = z.object({
    id: z.coerce.number(),
    name: z.string().trim().min(1, { message: 'Name cannot be empty' }),
    markdown: z.string().default(''),
});
