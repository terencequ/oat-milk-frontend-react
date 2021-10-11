import {CharacterRequest, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC, useState} from "react";
import { StyledStats } from "../CharacterStatsStyles";
import CharacterStatsEditAbilityScoresAndProficiencies from "./ability-scores-and-proficiencies/CharacterStatsEditAbilityScoresAndProficiencies";
import CharacterStatsEditAttributes from "./CharacterStatsEditAttributes";

const CharacterStatsEdit: FC<{originalCharacter: CharacterResponse}> = ({originalCharacter}) => {
    const [character, setCharacter] = useState<CharacterRequest>({
        name: originalCharacter.name,
        abilityScores: originalCharacter.abilityScores,
        abilityScoreProficiencies: originalCharacter.abilityScores.flatMap(as => as.proficiencies.map(p => ({
            abilityScoreId: as.id,
            ...p
        }))),
        attributes: originalCharacter.attributes,
        descriptions: originalCharacter.descriptions
    });

    return <>
        <StyledStats>
            <CharacterStatsEditAbilityScoresAndProficiencies originalCharacter={originalCharacter} character={character} setCharacter={setCharacter}/>
            <CharacterStatsEditAttributes originalCharacter={originalCharacter} character={character} setCharacter={setCharacter}/>
        </StyledStats>
    </>
}

export default CharacterStatsEdit;