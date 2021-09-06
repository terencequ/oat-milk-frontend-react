import React, {FC} from "react";
import {LinearProgress, Typography} from "@material-ui/core";
import {CharacterLevelResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {getProgressPercentage} from "../../helpers/CharacterStatHelpers";

interface CharacterViewLevelProps {
    level: CharacterLevelResponse;
}

/**
 * Displays the following information for a character:
 * - Level
 * - Health
 * - Classes
 * - Race
 */
const CharacterStatsViewLevel: FC<CharacterViewLevelProps> = ({level}) => {
    return <>
        <Typography align={"center"} variant={"subtitle1"}>
            Level {level.level}
        </Typography>
        <LinearProgress variant={"determinate"} value={getProgressPercentage(level)}/>
        <Typography align={"center"} variant={"body1"}>
            {level.experience}/{level.nextLevelExperienceRequirement} exp
        </Typography>
    </>
}
export default CharacterStatsViewLevel;