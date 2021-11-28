import {RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined} from "@mui/icons-material";
import {CardActionArea, Typography} from "@mui/material";
import {CharacterAbilityScoreResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {FC, useState} from "react";
import {getModifier, getModifierAsString, getProficiencyBonus} from "../../../../../helpers/CharacterStatHelpers";
import {StyledProficiencyOrSavingThrow} from "../../CharacterStatsStyles";
import DiceDialog from "../../../../../../shared/components/dialogs/DiceDialog";

interface CharacterViewSavingThrowProficiencyProps {
    abilityScore: CharacterAbilityScoreResponse;
    levelValue: number;
}

/**
 * Displays a single ability score saving throw.
 */
const CharacterViewSavingThrowProficiency: FC<CharacterViewSavingThrowProficiencyProps> = ({abilityScore, levelValue}) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const modifier = getModifier(abilityScore.value) + (abilityScore.proficient ? getProficiencyBonus(levelValue) : 0);

    return <>
        <DiceDialog title={`${abilityScore.name} saving throw check`}
                    open={snackbarOpen}
                    setOpen={setSnackbarOpen}
                    modifier={modifier}
                    dice={20}/>
        <CardActionArea onClick={() => setSnackbarOpen(true)}>
            <StyledProficiencyOrSavingThrow>
                {abilityScore.proficient ? <RadioButtonCheckedOutlined/> : <RadioButtonUncheckedOutlined/>}
                <Typography variant={"body1"}>{abilityScore.name}</Typography>
                <Typography variant={"subtitle2"}>{getModifierAsString(modifier)}</Typography>
            </StyledProficiencyOrSavingThrow>
        </CardActionArea>
    </>
}

export default CharacterViewSavingThrowProficiency;
