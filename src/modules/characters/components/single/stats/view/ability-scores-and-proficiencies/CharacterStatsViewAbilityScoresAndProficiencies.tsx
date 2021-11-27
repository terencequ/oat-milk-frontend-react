import {FC} from "react";
import {Typography} from "@mui/material";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {StyledAbilityScores, StyledAbilityScoresAndProficiencies,
    StyledProficiencies, StyledProficienciesContainer } from "../../CharacterStatsStyles";
import CharacterStatsViewAbilityScore from "./CharacterStatsViewAbilityScore";
import CharacterStatsViewAbilityScoreProficiency from "./CharacterStatsViewAbilityScoreProficiency";
import CharacterViewSavingThrowProficiency from "./CharacterStatsViewSavingThrowProficiency";

/**
 * Displays the following information for a character:
 * - Ability Scores
 * - Ability Score Proficiencies
 */
const CharacterStatsViewAbilityScoresAndProficiencies: FC = (props) => {
    const currentCharacter = useAppSelector(state => state.characters.currentCharacter);
    if(!currentCharacter){
        return <></>
    }

    const abilityScores = currentCharacter.abilityScores;
    const abilityScoresAndProficiencies = abilityScores
        .flatMap(as => as.proficiencies.map(p => {return {abilityScore: as, proficiency: p}}))
        .sort((a, b) => a.proficiency.name.localeCompare(b.proficiency.name));
    return <StyledAbilityScoresAndProficiencies>
        <StyledAbilityScores>
            {abilityScores.map((value, index) => {
                return <CharacterStatsViewAbilityScore
                    key={index}
                    abilityScore={value}/>
            })}
        </StyledAbilityScores>
        <StyledProficiencies>
            <StyledProficienciesContainer>
                <Typography variant={"subtitle1"} gutterBottom align={"center"}>Saving Throws</Typography>
                {abilityScores.map((value, index) => {
                    return <CharacterViewSavingThrowProficiency
                        key={index}
                        abilityScore={value}
                        levelValue={currentCharacter.level.number}/>
                })}
            </StyledProficienciesContainer>
            <StyledProficienciesContainer>
                <Typography variant={"subtitle1"} gutterBottom align={"center"}>Proficiencies</Typography>
                {abilityScoresAndProficiencies
                    .map((value, index) => {
                        return <CharacterStatsViewAbilityScoreProficiency
                            key={index}
                            abilityScoreProficiency={value.proficiency}
                            abilityScore={value.abilityScore}
                            levelValue={currentCharacter.level.number}/>
                    })}
            </StyledProficienciesContainer>
        </StyledProficiencies>
    </StyledAbilityScoresAndProficiencies>
}

export default CharacterStatsViewAbilityScoresAndProficiencies;
