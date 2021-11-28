import {CharacterRequest, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

export const mapCharacterResponseToRequest = (response: CharacterResponse): CharacterRequest => {
    return {
        name: response.name,
        abilityScores: response.abilityScores,
        abilityScoreProficiencies: response.abilityScores.flatMap(as => as.proficiencies.map(p => ({
            abilityScoreId: as.id,
            ...p
        }))),
        attributes: response.attributes,
        descriptions: response.descriptions,
        spells: response.spells,
    };
}
