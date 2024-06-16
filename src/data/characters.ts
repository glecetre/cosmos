import { and, count, eq } from 'drizzle-orm';
import { database } from '@/data/database';
import {
    SelectCharacter,
    SelectCosmogony,
    charactersTable,
} from '@/data/schema';

/**
 * Get the number of characters in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to fetch the count from.
 * @returns The number of characters in the cosmogony.
 */
export async function getCharactersCount(cosmogonyId: SelectCosmogony['id']) {
    const result = await database
        .select({
            value: count(),
        })
        .from(charactersTable)
        .where(eq(charactersTable.cosmogonyId, cosmogonyId));

    return result[0]?.value;
}

/**
 * Get the list of characters in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to fetch the characters from.
 * @returns The list of characters in the cosmogony.
 */
export async function getCharactersList(cosmogonyId: SelectCosmogony['id']) {
    return database
        .select({
            id: charactersTable.id,
            name: charactersTable.name,
            slug: charactersTable.slug,
        })
        .from(charactersTable)
        .where(eq(charactersTable.cosmogonyId, cosmogonyId));
}

/**
 * Get a character by its slug.
 * @param slug Slug of the character to fetch.
 * @returns The character or `undefined` if not found.
 */
export async function getCharacterBySlug(slug: string) {
    return database.query.charactersTable.findFirst({
        where: and(eq(charactersTable.slug, slug)),
        with: {
            cosmogony: true,
        },
    });
}

/**
 * Save changes on an existing character in a cosmogony.
 * @param character Character to save.
 * @returns The updated character.
 */
export async function saveCharacter(
    character: Pick<SelectCharacter, 'id' | 'name' | 'markdown'>
) {
    const characterToSave = {
        ...character,
        slug: encodeURIComponent(character.name).toLocaleLowerCase(),
    };

    const updatedCharacters = await database
        .update(charactersTable)
        .set(characterToSave)
        .where(eq(charactersTable.id, character.id))
        .returning();

    return updatedCharacters[0];
}
