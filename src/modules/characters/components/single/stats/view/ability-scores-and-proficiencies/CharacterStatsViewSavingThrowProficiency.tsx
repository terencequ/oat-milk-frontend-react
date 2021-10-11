import {RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {CharacterAbilityScoreResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {getModifier, getModifierAsString, getProficiencyBonus} from "../../../../../helpers/CharacterStatHelpers";
import {StyledProficiencyOrSavingThrow} from "../../CharacterStatsStyles";

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

export default CharacterViewSavingThrowProficiency;