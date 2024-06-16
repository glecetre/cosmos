import { eq } from 'drizzle-orm';
import { database } from '@/data/database';
import { cosmogoniesTable, SelectCosmogony } from '@/data/schema';

export type Cosmogony = SelectCosmogony;

/**
 * Get all the cosmogonies.
 * @returns All cosmogonies.
 */
export async function getAllCosmogonies() {
    return database.select().from(cosmogoniesTable);
}

/**
 * Get a single cosmogony by its short code.
 * @param shortCode Short code of the cosmogony to fetch.
 * @returns The cosmogony.
 */
export async function getCosmogonyByCode(
    shortCode: SelectCosmogony['shortCode']
) {
    const result = await database
        .select()
        .from(cosmogoniesTable)
        .where(eq(cosmogoniesTable.shortCode, shortCode))
        .limit(1);

    return result[0];
}
