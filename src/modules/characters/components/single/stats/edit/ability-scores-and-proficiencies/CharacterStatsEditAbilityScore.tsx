import {Typography} from "@mui/material";
import {CharacterAbilityScoreRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {FC} from "react";
import {getModifier, getModifierAsString} from "../../../../../helpers/CharacterStatHelpers";
import {StyledAbilityScore} from "../../CharacterStatsStyles";
import CharacterStatsEditProps from "../models/CharacterStatsEditProps";

interface CharacterEditAbilityScoreProps extends CharacterStatsEditProps {
    abilityScore: CharacterAbilityScoreRequest;
}

/**
 * Edit component for a single ability score.
 */
const CharacterEditAbilityScore: FC<CharacterEditAbilityScoreProps> = ({abilityScore}) => {
    return <StyledAbilityScore>
        <Typography variant={"subtitle1"}>{abilityScore.name}</Typography>
        <Typography variant={"h2"}>{getModifierAsString(getModifier(abilityScore.value ?? 0))}</Typography>
        <Typography variant={"subtitle2"}>{abilityScore.value}</Typography>
    </StyledAbilityScore>
}

export default CharacterEditAbilityScore;