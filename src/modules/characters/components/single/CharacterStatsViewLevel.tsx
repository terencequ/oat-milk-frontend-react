import React, {FC} from "react";
import {LinearProgress, Typography} from "@material-ui/core";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {getProgressPercentage} from "../../helpers/CharacterStatHelpers";

interface CharacterViewLevelProps {
    character: CharacterResponse;
}

/**
 * Displays the following information for a character:
 * - Level
 * - Health
 * - Classes
 * - Race
 */
const CharacterStatsViewLevel: FC<CharacterViewLevelProps> = ({character}) => {
    return <>
        <Typography align={"center"} variant={"body1"}>
            Level {character.level.level}
        </Typography>
        <LinearProgress variant={"determinate"} value={getProgressPercentage(character.level)}/>
        <Typography align={"center"} variant={"body1"}>
            {character.level.experience}/{character.level.nextLevelExperienceRequirement} exp
        </Typography>
    </>
}
export default CharacterStatsViewLevel;