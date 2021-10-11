import {FC} from "react";
import {
    CharacterResponse
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {Typography} from "@mui/material";
import {StyledAbilityScores, StyledAbilityScoresAndProficiencies,
    StyledProficiencies, StyledProficienciesContainer } from "../../CharacterStatsStyles";
import CharacterStatsViewAbilityScore from "./CharacterStatsViewAbilityScore";
import CharacterStatsViewAbilityScoreProficiency from "./CharacterStatsViewAbilityScoreProficiency";
import CharacterViewSavingThrowProficiency from "./CharacterStatsViewSavingThrowProficiency";

interface CharacterViewStatsProps {
    character: CharacterResponse;
}

/**
 * Displays the following information for a character:
 * - Ability Scores
 * - Ability Score Proficiencies
 */
const CharacterStatsViewAbilityScoresAndProficiencies: FC<CharacterViewStatsProps> = ({character}) => {
    const abilityScores = character.abilityScores;
    const abilityScoresAndProficiencies = abilityScores
        .flatMap(as => as.proficiencies.map(p => {return {abilityScore: as, proficiency: p}}))
        .sort((a, b) => a.proficiency.name.localeCompare(b.proficiency.name));
    return <StyledAbilityScoresAndProficiencies>
        <StyledAbilityScores>
            {abilityScores.map((value, index) => {
                return <CharacterStatsViewAbilityScore abilityScore={value}/>
            })}
        </StyledAbilityScores>
        <StyledProficiencies>
            <StyledProficienciesContainer>
                <Typography variant={"subtitle1"} gutterBottom align={"center"}>Saving Throws</Typography>
                {abilityScores.map((value, index) => {
                    return <CharacterViewSavingThrowProficiency
                        abilityScore={value}
                        levelValue={character.level.level}/>
                })}
            </StyledProficienciesContainer>
            <StyledProficienciesContainer>
                <Typography variant={"subtitle1"} gutterBottom align={"center"}>Proficiencies</Typography>
                {abilityScoresAndProficiencies
                    .map((value, index) => {
                        return <CharacterStatsViewAbilityScoreProficiency
                            abilityScoreProficiency={value.proficiency}
                            abilityScore={value.abilityScore}
                            levelValue={character.level.level}/>
                    })}
            </StyledProficienciesContainer>
        </StyledProficiencies>
    </StyledAbilityScoresAndProficiencies>
}

export default CharacterStatsViewAbilityScoresAndProficiencies;