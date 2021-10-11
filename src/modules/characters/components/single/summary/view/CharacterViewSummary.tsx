import {Typography} from "@mui/material";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {FC} from "react";

const CharacterViewSummary: FC<{character: CharacterResponse}> = ({character}) => {
    const levelString = `Level ${character?.level.level} 
        (${character?.level.experience}/${character?.level.nextLevelExperienceRequirement} XP), 
        Peasant 1`;
    return <>
        <Typography variant={"h2"} align={"center"} gutterBottom>{character.name}</Typography>
        <Typography variant={"h3"} align={"center"}>{levelString}</Typography>
    </>
}

export default CharacterViewSummary;