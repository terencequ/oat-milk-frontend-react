import {Card, CardActionArea, Snackbar, Typography} from "@mui/material";
import {CharacterAbilityScoreResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {FC, useState} from "react";
import {getModifier, getModifierAsString} from "../../../../../helpers/CharacterStatHelpers";
import {StyledAbilityScore} from "../../CharacterStatsStyles";
import styled from "@emotion/styled";
import DiceDialog from "../../../../../../shared/components/DiceDialog";

const StyledCardActionArea = styled(CardActionArea)`
  height: 100%;
`

/**
 * Displays a single ability score.
 */
const CharacterStatsViewAbilityScore: FC<{abilityScore: CharacterAbilityScoreResponse}> = ({abilityScore}) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    return <Card>
        <DiceDialog title={`${abilityScore.name} check`}
                    open={snackbarOpen}
                    setOpen={setSnackbarOpen}
                    modifier={getModifier(abilityScore.value ?? 10)}
                    dice={20}/>
        <StyledCardActionArea onClick={() => setSnackbarOpen(true)}>
            <StyledAbilityScore>
                <Typography variant={"subtitle1"}>{abilityScore.name}</Typography>
                <Typography variant={"h2"}>{getModifierAsString(getModifier(abilityScore.value))}</Typography>
                <Typography variant={"subtitle2"}>{abilityScore.value}</Typography>
            </StyledAbilityScore>
        </StyledCardActionArea>
    </Card>
}

export default CharacterStatsViewAbilityScore;