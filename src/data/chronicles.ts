import { meilisearch } from '@/data/meilisearch';
import { SelectCosmogony } from '@/data/schema';

export type Chronicle = {
    id: number;
    title: string;
    slug: string;
    markdownContent: string;
};

/**
 * Get the number of chronicles in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to fetch the count from.
 * @returns The number of chronicles in the cosmogony.
 */
export async function getChroniclesCount(cosmogonyId: SelectCosmogony['id']) {
    const stats = await getIndex(cosmogonyId).getStats();
    return stats.numberOfDocuments;
}

/**
 * Get the list of chronicles in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to fetch the chronicles from.
 * @returns The list of chronicles in the cosmogony.
 */
export async function getChroniclesList(cosmogonyId: SelectCosmogony['id']) {
    const response = await getIndex(cosmogonyId).getDocuments<Chronicle>({
        fields: ['id', 'title', 'slug'],
    });

    return response.results as Array<Pick<Chronicle, 'id' | 'title' | 'slug'>>;
}

/**
 * Get a chronicle by its slug.
 * @param cosmogonyId ID of the cosmogony to look into.
 * @param slug Slug of the chronicle to fetch.
 * @returns The chronicle or `undefined` if not found.
 */
export async function getChronicleBySlug(
    cosmogonyId: SelectCosmogony['id'],
    slug: string
) {
    const response = await getIndex(cosmogonyId).getDocuments<Chronicle>({
        limit: 1,
        filter: `slug = ${slug}`,
    });

    if (response.results.length === 0) {
        return undefined;
    }

    return response.results[0];
}

function getIndex(cosmogonyId: SelectCosmogony['id']) {
    return meilisearch.index(getIndexName(cosmogonyId));
}

function getIndexName(cosmogonyId: SelectCosmogony['id']) {
    return `chronicles_${cosmogonyId}`;
}
