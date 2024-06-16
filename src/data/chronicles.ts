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
            slug: chroniclesTable.slug,
        })
        .from(chroniclesTable)
        .where(eq(chroniclesTable.cosmogonyId, cosmogonyId));
}

/**
 * Get a chronicle by its slug.
 * @param cosmogonyId ID of the cosmogony to look into.
 * @param slug Slug of the chronicle to fetch.
 * @returns The chronicle or `undefined` if not found.
 */
export async function getChronicleBySlug(slug: string) {
    return database.query.chroniclesTable.findFirst({
        where: and(eq(chroniclesTable.slug, slug)),
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
    const chronicleToSave = {
        ...chronicle,
        slug: encodeURIComponent(chronicle.title).toLocaleLowerCase(),
    };

    const updatedChronicles = await database
        .update(chroniclesTable)
        .set(chronicleToSave)
        .where(eq(chroniclesTable.id, chronicle.id))
        .returning();

    return updatedChronicles[0];
}
