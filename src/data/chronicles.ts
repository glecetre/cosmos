import { and, count, eq } from 'drizzle-orm';
import { database } from '@/data/database';
import {
    InsertChronicle,
    SelectChronicle,
    SelectCosmogony,
    chroniclesTable,
} from '@/data/schema';
import { addOrUpdateChronicleToIndex } from '@/search';

/**
 * Get the number of chronicles in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to fetch the count from.
 * @returns The number of chronicles in the cosmogony.
 */
async function getCount(cosmogonyId: SelectCosmogony['id']) {
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
async function getAll(cosmogonyId: SelectCosmogony['id']) {
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
async function getById(id: SelectChronicle['id']) {
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
async function getByCode(shortCode: SelectChronicle['shortCode']) {
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
async function update(
    chronicle: Pick<SelectChronicle, 'id' | 'title' | 'markdown'>
) {
    await database
        .update(chroniclesTable)
        .set(chronicle)
        .where(eq(chroniclesTable.id, chronicle.id));

    // Force non-null as we know this exists because we've just updated it.
    const updatedChronicle = (await getById(chronicle.id))!;
    addOrUpdateChronicleToIndex(updatedChronicle, updatedChronicle.cosmogony);

    return updatedChronicle;
}

/**
 * Create a new chronicle.
 * @param chronicle Chronicle to create.
 * @returns The created chronicle, if succeeded.
 */
async function create(chronicle: InsertChronicle) {
    const [{ insertedId }] = await database
        .insert(chroniclesTable)
        .values(chronicle)
        .returning({ insertedId: chroniclesTable.id });

    // Force non-null as we know this exists because we've just updated it.
    const createdChronicle = (await getById(insertedId))!;
    addOrUpdateChronicleToIndex(createdChronicle, createdChronicle.cosmogony);

    return createdChronicle;
}

export type Chronicle = SelectChronicle;

export const chroniclesApi = {
    getCount,
    getAll,
    getByCode,
    getById,
    update,
    create,
};
