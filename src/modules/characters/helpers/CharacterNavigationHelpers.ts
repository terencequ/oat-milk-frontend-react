import {CharacterAttributeResponse, CharacterRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

/**
 * Get character attributes as a dictionary with the attribute id as the key.
 * @param character
 */
export function getCharacterAttributesAsDictionary(character: CharacterRequest){
    const attributesDictionary: { [id: string]: CharacterAttributeResponse }
        = character.attributes?.reduce((a, x) => ({...a, [x.id]: x}), {}) ?? {}; // Convert to dictionary for performance
    return attributesDictionary;
}

/**
 * Get attribute from attribute dictionary. Return default object if doesn't exist.
 * @param id
 * @param dictionary
 */
export function getAttributeById(id: string, dictionary: {[id: string]: CharacterAttributeResponse}): CharacterAttributeResponse {
    return dictionary[id]
        ?? {id: id, name: "N/A", currentValue: 0, defaultValue: 0};
}
