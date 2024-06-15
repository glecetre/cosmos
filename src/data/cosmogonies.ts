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
 * Get a single cosmogony by its slug.
 * @param slug Slug of the cosmogony to fetch.
 * @returns The cosmogony.
 */
export async function getCosmogonyBySlug(slug: SelectCosmogony['slug']) {
    const result = await database
        .select()
        .from(cosmogoniesTable)
        .where(eq(cosmogoniesTable.slug, slug))
        .limit(1);

    return result[0];
}
