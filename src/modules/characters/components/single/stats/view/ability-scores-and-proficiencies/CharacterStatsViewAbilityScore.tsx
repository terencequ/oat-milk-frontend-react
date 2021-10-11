import {Typography} from "@mui/material";
import {CharacterAbilityScoreResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {getModifier, getModifierAsString} from "../../../../../helpers/CharacterStatHelpers";
import {StyledAbilityScore} from "../../CharacterStatsStyles";

/**
 * Displays a single ability score.
 */
const CharacterStatsViewAbilityScore: FC<{abilityScore: CharacterAbilityScoreResponse}> = ({abilityScore}) => {
    return <StyledAbilityScore>
            <Typography variant={"subtitle1"}>{abilityScore.name}</Typography>
            <Typography variant={"h2"}>{getModifierAsString(getModifier(abilityScore.value))}</Typography>
            <Typography variant={"subtitle2"}>{abilityScore.value}</Typography>
        </StyledAbilityScore>
}

export default CharacterStatsViewAbilityScore;