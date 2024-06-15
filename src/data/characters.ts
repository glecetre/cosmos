import { meilisearch } from '@/data/meilisearch';
import { SelectCosmogony } from '@/data/schema';
import { slugify } from '@/utils';

export type Character = {
    id: number;
    name: string;
    slug: string;
    markdownContent: string;
};

export type CharacterUpdate = Pick<
    Character,
    'id' | 'name' | 'markdownContent'
>;

/**
 * Get the number of characters in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to fetch the count from.
 * @returns The number of characters in the cosmogony.
 */
export async function getCharactersCount(cosmogonyId: SelectCosmogony['id']) {
    const stats = await getIndex(cosmogonyId).getStats();
    return stats.numberOfDocuments;
}

/**
 * Get the list of characters in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to fetch the characters from.
 * @returns The list of characters in the cosmogony.
 */
export async function getCharactersList(cosmogonyId: SelectCosmogony['id']) {
    const response = await getIndex(cosmogonyId).getDocuments<Character>({
        fields: ['id', 'name', 'slug'],
    });

    return response.results as Array<Pick<Character, 'id' | 'name' | 'slug'>>;
}

/**
 * Get a character by its slug.
 * @param cosmogonyId ID of the cosmogony to look into.
 * @param slug Slug of the character to fetch.
 * @returns The character or `undefined` if not found.
 */
export async function getCharacterBySlug(
    cosmogonyId: SelectCosmogony['id'],
    slug: string
) {
    const response = await getIndex(cosmogonyId).getDocuments<Character>({
        limit: 1,
        filter: `slug = ${slug}`,
    });

    if (response.results.length === 0) {
        return undefined;
    }

    return response.results[0];
}

/**
 * Fetch a character by its ID in the given cosmogony.
 * @param cosmogonyId ID of the cosmogony to look into.
 * @param id ID of the character to fetch.
 * @returns The character or `undefined` if not found.
 */
export async function getCharacterById(
    cosmogonyId: SelectCosmogony['id'],
    id: Character['id']
) {
    return getIndex(cosmogonyId).getDocument<Character>(id);
}

/**
 * Save changes on an existing character in a cosmogony.
 * @param cosmogonyId ID of the cosmogony to save the character in.
 * @param character Character to save.
 * @returns The updated character.
 */
export async function saveCharacter(
    cosmogonyId: SelectCosmogony['id'],
    character: CharacterUpdate
): Promise<Character> {
    const characterToSave = {
        ...character,
        slug: slugify(character.name),
    };

    await getIndex(cosmogonyId).updateDocuments([characterToSave]);
    return getCharacterById(cosmogonyId, characterToSave.id);
}

function getIndex(cosmogonyId: SelectCosmogony['id']) {
    return meilisearch.index(getIndexName(cosmogonyId));
}

function getIndexName(cosmogonyId: SelectCosmogony['id']) {
    return `characters_${cosmogonyId}`;
}
