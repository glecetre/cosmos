import { eq } from 'drizzle-orm';
import { database } from '@/data/database';
import { cosmogoniesTable, SelectCosmogony } from '@/data/schema';

/**
 * Get all the cosmogonies.
 * @returns All cosmogonies.
 */
async function getAll() {
    return database.select().from(cosmogoniesTable);
}

/**
 * Get a single cosmogony by its short code.
 * @param shortCode Short code of the cosmogony to fetch.
 * @returns The cosmogony.
 */
async function getByCode(shortCode: SelectCosmogony['shortCode']) {
    const result = await database
        .select()
        .from(cosmogoniesTable)
        .where(eq(cosmogoniesTable.shortCode, shortCode))
        .limit(1);

    return result[0];
}

export type Cosmogony = SelectCosmogony;

export const cosmogoniesApi = {
    getAll,
    getByCode,
};
