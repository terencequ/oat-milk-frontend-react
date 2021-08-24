import {FC} from "react";
import {
    CharacterAbilityScoreProficiencyResponse,
    CharacterAbilityScoreResponse,
    CharacterResponse
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {Typography} from "@material-ui/core";

interface CharacterViewStatsProps {
    character: CharacterResponse;
}

/**
 * Displays the following information for a character:
 * - Ability Scores
 * - Ability Score Proficiencies
 * - Attributes
 */
const CharacterStats: FC<CharacterViewStatsProps> = ({character}) => {
    return <>
        {character.abilityScores.map((value, index) => {
            return <CharacterViewAbilityScore abilityScore={value}/>
        })}
    </>
}

const CharacterViewAbilityScore: FC<{abilityScore: CharacterAbilityScoreResponse}> = ({abilityScore}) => {
    return <>
        <Typography>{abilityScore.name}: {abilityScore.value}</Typography>
        {abilityScore.proficiencies.map((value, index) => {
            return <CharacterViewAbilityScoreProficiency abilityScoreProficiency={value}/>
        })}
    </>
}

const CharacterViewAbilityScoreProficiency: FC<{abilityScoreProficiency: CharacterAbilityScoreProficiencyResponse}> = ({abilityScoreProficiency}) => {
    return <>
        <Typography>- {abilityScoreProficiency.name}: {abilityScoreProficiency.proficient ? "Proficient" : "Not Proficient"}</Typography>
    </>
}

export default CharacterStats;