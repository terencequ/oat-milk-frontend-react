import {RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {
    CharacterAbilityScoreProficiencyResponse,
    CharacterAbilityScoreResponse
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {getModifier, getModifierAsString, getProficiencyBonus} from "../../../../../helpers/CharacterStatHelpers";
import {StyledProficiencyOrSavingThrow} from "../../CharacterStatsStyles";

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

export default CharacterViewAbilityScoreProficiency;