import { and, count, eq } from 'drizzle-orm';
import { database } from '@/data/database';
import {
    InsertChronicle,
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
 * Get a chronicle by its ID.
 * @param id ID of the chronicle to fetch.
 * @returns The chronicle or `undefined` if not found.
 */
export async function getChronicleById(id: SelectChronicle['id']) {
    return database.query.chroniclesTable.findFirst({
        where: and(eq(chroniclesTable.id, id)),
        with: {
            cosmogony: true,
        },
    });
}

/**
 * Get a chronicle by its short code.
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
 * Update changes on an existing chronicle in a cosmogony.
 * @param chronicle Chronicle to update.
 * @returns The updated chronicle.
 */
export async function updateChronicle(
    chronicle: Pick<SelectChronicle, 'id' | 'title' | 'markdown'>
) {
    await database
        .update(chroniclesTable)
        .set(chronicle)
        .where(eq(chroniclesTable.id, chronicle.id));

    return (await getChronicleById(chronicle.id))!; // Force non-null as we know this exists because we've just updated it.
}

/**
 * Create a new chronicle.
 * @param chronicle Chronicle to create.
 * @returns The created chronicle, if succeeded.
 */
export async function createChronicle(chronicle: InsertChronicle) {
    const [{ insertedId }] = await database
        .insert(chroniclesTable)
        .values(chronicle)
        .returning({ insertedId: chroniclesTable.id });

    return (await getChronicleById(insertedId))!; // Force non-null as we know this exists because we've just updated it.
}
