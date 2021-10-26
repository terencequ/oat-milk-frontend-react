import {RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined} from "@mui/icons-material";
import {CardActionArea, Typography} from "@mui/material";
import {
    CharacterAbilityScoreProficiencyResponse,
    CharacterAbilityScoreResponse
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {FC, useState} from "react";
import {getModifier, getModifierAsString, getProficiencyBonus} from "../../../../../helpers/CharacterStatHelpers";
import {StyledProficiencyOrSavingThrow} from "../../CharacterStatsStyles";
import DiceDialog from "../../../../../../shared/components/DiceDialog";

interface CharacterViewAbilityScoreProficiencyProps {
    abilityScoreProficiency: CharacterAbilityScoreProficiencyResponse;
    abilityScore: CharacterAbilityScoreResponse;
    levelValue: number;
}

/**
 * Displays a single ability score proficiency.
 */
const CharacterViewAbilityScoreProficiency: FC<CharacterViewAbilityScoreProficiencyProps> = ({abilityScoreProficiency, abilityScore, levelValue}) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const modifier = getModifier(abilityScore.value) + (abilityScoreProficiency.proficient ? getProficiencyBonus(levelValue) : 0);
    return <>
        <DiceDialog title={`${abilityScoreProficiency.name} check`}
                    open={snackbarOpen}
                    setOpen={setSnackbarOpen}
                    modifier={modifier}
                    dice={20}/>
        <CardActionArea onClick={() => setSnackbarOpen(true)}>
            <StyledProficiencyOrSavingThrow>
                {abilityScoreProficiency.proficient ? <RadioButtonCheckedOutlined/> : <RadioButtonUncheckedOutlined/>}
                <Typography variant={"body1"}>{abilityScoreProficiency.name} <em>({abilityScore.name.substr(0, 3).toLowerCase()})</em></Typography>
                <Typography variant={"subtitle2"}>{getModifierAsString(modifier)}</Typography>
            </StyledProficiencyOrSavingThrow>
        </CardActionArea>
    </>

}

export default CharacterViewAbilityScoreProficiency;