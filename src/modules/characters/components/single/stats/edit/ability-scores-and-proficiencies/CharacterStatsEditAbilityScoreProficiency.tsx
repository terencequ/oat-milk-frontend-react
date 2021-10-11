import {RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {
    CharacterAbilityScoreProficiencyRequest, CharacterAbilityScoreRequest,
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {getModifier, getModifierAsString, getProficiencyBonus} from "../../../../../helpers/CharacterStatHelpers";
import {StyledProficiencyOrSavingThrow} from "../../CharacterStatsStyles";
import CharacterStatsEditProps from "../models/CharacterStatsEditProps";


interface CharacterStatsEditAbilityScoreProficiencyProps extends CharacterStatsEditProps {
    abilityScoreProficiency: CharacterAbilityScoreProficiencyRequest;
    abilityScoreValue: number;
    abilityScoreName: string;
    levelValue: number;
}

const CharacterStatsEditAbilityScoreProficiency: FC<CharacterStatsEditAbilityScoreProficiencyProps> =
    ({abilityScoreProficiency, abilityScoreValue, abilityScoreName, levelValue}) => {
    const modifier = getModifier(abilityScoreValue) + (abilityScoreProficiency.proficient ? getProficiencyBonus(levelValue) : 0);
    return <StyledProficiencyOrSavingThrow>
        {abilityScoreProficiency.proficient ? <RadioButtonCheckedOutlined/> : <RadioButtonUncheckedOutlined/>}
        <Typography variant={"body1"}>{abilityScoreProficiency.name} <em>({abilityScoreName.substr(0, 3).toLowerCase()})</em></Typography>
        <Typography variant={"subtitle2"}>{getModifierAsString(modifier)}</Typography>
    </StyledProficiencyOrSavingThrow>
}

export default CharacterStatsEditAbilityScoreProficiency;