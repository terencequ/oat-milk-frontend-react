import {RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined} from "@material-ui/icons";
import {FC} from "react";
import {
    CharacterAbilityScoreProficiencyResponse,
    CharacterAbilityScoreResponse,
    CharacterResponse
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {Card, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import {themeSpacing} from "../../../core/styles/GlobalStyles";
import {getModifier, getModifierAsString, getProficiencyBonus} from "../../helpers/CharacterStatHelpers";

// region Ability Scores + Proficiencies
interface CharacterViewStatsProps {
    character: CharacterResponse;
}

const StyledAbilityScoresAndProficiencies = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${themeSpacing(2)};
`

const StyledAbilityScores = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${themeSpacing(1)};
`

const StyledProficiencies = styled(Card)`
  display: grid;
  grid-auto-rows: 2rem;
  padding: ${themeSpacing(2)};
`

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
            {abilityScoresAndProficiencies
                .map((value, index) => {
                return <CharacterViewAbilityScoreProficiency
                    abilityScoreProficiency={value.proficiency}
                    abilityScoreValue={value.abilityScore.value}
                    levelValue={character.level.level}/>
            })}
        </StyledProficiencies>
    </StyledAbilityScoresAndProficiencies>
}
// endregion

//region Ability Score
const StyledAbilityScore = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${themeSpacing(2)}
`

/**
 * Displays a single ability score, and all of the proficiencies for that ability score.
 */
const CharacterViewAbilityScore: FC<{abilityScore: CharacterAbilityScoreResponse}> = ({abilityScore}) => {
    return <StyledAbilityScore>
        <Typography variant={"subtitle1"}>{abilityScore.name}</Typography>
        <Typography variant={"h2"}>{getModifierAsString(getModifier(abilityScore.value))}</Typography>
        <Typography variant={"subtitle2"}>{abilityScore.value}</Typography>
    </StyledAbilityScore>
}
//endregion

//region Proficiency
const StyledCharacterViewAbilityScoreProficiency = styled.div`
  display: grid;
  grid-template-columns: [Is Proficient] 40px [Name] 10rem [Modifier] 2rem;
  width: 100%;
  align-items: center;
`

interface CharacterViewAbilityScoreProficiencyProps {
    abilityScoreProficiency: CharacterAbilityScoreProficiencyResponse;
    abilityScoreValue: number;
    levelValue: number;
}

/**
 * Displays a single ability score proficiency.
 */
const CharacterViewAbilityScoreProficiency: FC<CharacterViewAbilityScoreProficiencyProps> = ({abilityScoreProficiency, abilityScoreValue, levelValue}) => {
    const modifier = getModifier(abilityScoreValue) + (abilityScoreProficiency.proficient ? getProficiencyBonus(levelValue) : 0);
    return <StyledCharacterViewAbilityScoreProficiency>
        {abilityScoreProficiency.proficient ? <RadioButtonCheckedOutlined/> : <RadioButtonUncheckedOutlined/>}
        <Typography variant={"body1"}>{abilityScoreProficiency.name}</Typography>
        <Typography variant={"subtitle2"}>{getModifierAsString(modifier)}</Typography>
    </StyledCharacterViewAbilityScoreProficiency>
}
//endregion

export default CharacterStatsViewAbilityScoresAndProficiencies;