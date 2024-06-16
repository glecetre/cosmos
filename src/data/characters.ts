import { and, count, eq } from 'drizzle-orm';
import { database } from '@/data/database';
import {
    InsertCharacter,
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
            shortCode: charactersTable.shortCode,
        })
        .from(charactersTable)
        .where(eq(charactersTable.cosmogonyId, cosmogonyId));
}

/**
 * Get a character by its ID.
 * @param id ID of the character to fetch.
 * @returns The character or `undefined` if not found.
 */
export async function getCharacterById(id: SelectCharacter['id']) {
    return database.query.charactersTable.findFirst({
        where: and(eq(charactersTable.id, id)),
        with: {
            cosmogony: true,
        },
    });
}

/**
 * Get a character by its short code.
 * @param shortCode Short code of the character to fetch.
 * @returns The character or `undefined` if not found.
 */
export async function getCharacterByCode(
    shortCode: SelectCharacter['shortCode']
) {
    return database.query.charactersTable.findFirst({
        where: and(eq(charactersTable.shortCode, shortCode)),
        with: {
            cosmogony: true,
        },
    });
}

/**
 * Update changes on an existing character in a cosmogony.
 * @param character Character to update.
 * @returns The updated character.
 */
export async function updateCharacter(
    character: Pick<SelectCharacter, 'id' | 'name' | 'markdown'>
) {
    await database
        .update(charactersTable)
        .set(character)
        .where(eq(charactersTable.id, character.id));

    return (await getCharacterById(character.id))!; // Force non-null as we know this exists because we've just updated it.
}

/**
 * Create a new character.
 * @param character Character to create.
 * @returns The created character, if succeeded.
 */
export async function createCharacter(character: InsertCharacter) {
    const [{ insertedId }] = await database
        .insert(charactersTable)
        .values(character)
        .returning({ insertedId: charactersTable.id });

    return (await getCharacterById(insertedId))!; // Force non-null as we know this exists because we've just updated it.
}
