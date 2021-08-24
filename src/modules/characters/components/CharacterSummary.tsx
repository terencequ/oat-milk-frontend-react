import React, {FC} from "react";
import {LinearProgress, Typography} from "@material-ui/core";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

interface CharacterViewSummaryProps {
    character: CharacterResponse;
}

/**
 * Displays the following information for a character:
 * - Level
 * - Health
 * - Classes
 * - Race
 */
const CharacterSummary: FC<CharacterViewSummaryProps> = ({character}) => {
    const getProgressPercentage = () => {
        const nextLevelExp = character.level.nextLevelExperienceRequirement;
        const currentExp = character.level.experience;
        const previousLevelExp = character.level.previousLevelExperienceRequirement;

        let characterPercentage = (currentExp - previousLevelExp) / (nextLevelExp - previousLevelExp);
        return characterPercentage * 100;
    }

    return <>
        <Typography align={"center"} variant={"h4"}>
            Level {character.level.level}
        </Typography>
        <LinearProgress variant={"determinate"} value={getProgressPercentage()}/>
        <Typography align={"center"} variant={"subtitle1"}>
            {character.level.experience}/{character.level.nextLevelExperienceRequirement} exp
        </Typography>
    </>
}
export default CharacterSummary;