import { and, count, eq } from 'drizzle-orm';
import { database } from '@/data/database';
import {
    SelectChronicle,
    SelectCosmogony,
    chroniclesTable,
} from '@/data/schema';

/**
 * Get the number of chronicles in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to fetch the count from.
 * @returns The number of chronicles in the cosmogony.
 */
export async function getChroniclesCount(cosmogonyId: SelectCosmogony['id']) {
    const result = await database
        .select({
            value: count(),
        })
        .from(chroniclesTable)
        .where(eq(chroniclesTable.cosmogonyId, cosmogonyId));

    return result[0]?.value;
}

/**
 * Get the list of chronicles in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to fetch the chronicles from.
 * @returns The list of chronicles in the cosmogony.
 */
export async function getChroniclesList(cosmogonyId: SelectCosmogony['id']) {
    return database
        .select({
            id: chroniclesTable.id,
            title: chroniclesTable.title,
            shortCode: chroniclesTable.shortCode,
        })
        .from(chroniclesTable)
        .where(eq(chroniclesTable.cosmogonyId, cosmogonyId));
}

/**
 * Get a chronicle by its short code.
 * @param cosmogonyId ID of the cosmogony to look into.
 * @param shortCode Short code of the chronicle to fetch.
 * @returns The chronicle or `undefined` if not found.
 */
export async function getChronicleByCode(
    shortCode: SelectChronicle['shortCode']
) {
    return database.query.chroniclesTable.findFirst({
        where: and(eq(chroniclesTable.shortCode, shortCode)),
        with: {
            cosmogony: true,
        },
    });
}

/**
 * Save changes on an existing chronicle in a cosmogony.
 * @param chronicle Chronicle to save.
 * @returns The updated chronicle.
 */
export async function saveChronicle(
    chronicle: Pick<SelectChronicle, 'id' | 'title' | 'markdown'>
) {
    await database
        .update(chroniclesTable)
        .set(chronicle)
        .where(eq(chroniclesTable.id, chronicle.id));

    return (await database.query.chroniclesTable.findFirst({
        where: eq(chroniclesTable.id, chronicle.id),
        with: {
            cosmogony: true,
        },
    }))!; // Force non-null as we know this exists because we've just updated it.
}
