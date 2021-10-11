import {RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined} from "@mui/icons-material";
import {FC} from "react";
import {
    CharacterAbilityScoreProficiencyResponse,
    CharacterAbilityScoreResponse,
    CharacterResponse
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {Typography} from "@mui/material";
import {getModifier, getModifierAsString, getProficiencyBonus} from "../../../../../helpers/CharacterStatHelpers";
import {StyledAbilityScore, StyledAbilityScores, StyledAbilityScoresAndProficiencies,
    StyledProficiencyOrSavingThrow, StyledProficiencies, StyledProficienciesContainer } from "../../CharacterStatsStyles";

// region Ability Scores + Proficiencies
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
                return <CharacterViewAbilityScore abilityScore={value}/>
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
                        return <CharacterViewAbilityScoreProficiency
                            abilityScoreProficiency={value.proficiency}
                            abilityScore={value.abilityScore}
                            levelValue={character.level.level}/>
                    })}
            </StyledProficienciesContainer>
        </StyledProficiencies>
    </StyledAbilityScoresAndProficiencies>
}
// endregion

//region Ability Score

/**
 * Displays a single ability score.
 */
const CharacterViewAbilityScore: FC<{abilityScore: CharacterAbilityScoreResponse}> = ({abilityScore}) => {
    return <StyledAbilityScore>
        <Typography variant={"subtitle1"}>{abilityScore.name}</Typography>
        <Typography variant={"h2"}>{getModifierAsString(getModifier(abilityScore.value))}</Typography>
        <Typography variant={"subtitle2"}>{abilityScore.value}</Typography>
    </StyledAbilityScore>
}
//endregion

//region Saving Throws & Proficiencies


interface CharacterViewSavingThrowProficiencyProps {
    abilityScore: CharacterAbilityScoreResponse;
    levelValue: number;
}

/**
 * Displays a single ability score saving throw.
 */
const CharacterViewSavingThrowProficiency: FC<CharacterViewSavingThrowProficiencyProps> = ({abilityScore, levelValue}) => {
    const modifier = getModifier(abilityScore.value) + (abilityScore.proficient ? getProficiencyBonus(levelValue) : 0);
    return <StyledProficiencyOrSavingThrow>
        {abilityScore.proficient ? <RadioButtonCheckedOutlined/> : <RadioButtonUncheckedOutlined/>}
        <Typography variant={"body1"}>{abilityScore.name}</Typography>
        <Typography variant={"subtitle2"}>{getModifierAsString(modifier)}</Typography>
    </StyledProficiencyOrSavingThrow>
}

interface CharacterViewAbilityScoreProficiencyProps {
    abilityScoreProficiency: CharacterAbilityScoreProficiencyResponse;
    abilityScore: CharacterAbilityScoreResponse;
    levelValue: number;
}

/**
 * Displays a single ability score proficiency.
 */
const CharacterViewAbilityScoreProficiency: FC<CharacterViewAbilityScoreProficiencyProps> = ({abilityScoreProficiency, abilityScore, levelValue}) => {
    const modifier = getModifier(abilityScore.value) + (abilityScoreProficiency.proficient ? getProficiencyBonus(levelValue) : 0);
    return <StyledProficiencyOrSavingThrow>
        {abilityScoreProficiency.proficient ? <RadioButtonCheckedOutlined/> : <RadioButtonUncheckedOutlined/>}
        <Typography variant={"body1"}>{abilityScoreProficiency.name} <em>({abilityScore.name.substr(0, 3).toLowerCase()})</em></Typography>
        <Typography variant={"subtitle2"}>{getModifierAsString(modifier)}</Typography>
    </StyledProficiencyOrSavingThrow>
}
//endregion

export default CharacterStatsViewAbilityScoresAndProficiencies;