import {Typography} from "@mui/material";
import React, {FC} from "react";
import {useAppSelector} from "../../../../../../redux/hooks";
import {StyledSummary} from "../CharacterSummaryStyles";

const CharacterSummaryView: FC = (props) => {
    const currentCharacter = useAppSelector(state => state.characters.currentCharacter);
    if(!currentCharacter){
        return <></>
    }

    const levelString = `Level ${currentCharacter.level.number}
        (${currentCharacter.level.experience}/${currentCharacter.level.nextLevelExperienceRequirement === -1 ? "MAX" : currentCharacter.level.nextLevelExperienceRequirement} XP), 
        Peasant 1`;
    return <StyledSummary>
        <Typography variant={"h2"} align={"center"} gutterBottom>{currentCharacter.name}</Typography>
        <Typography variant={"h3"} align={"center"}>{levelString}</Typography>
    </StyledSummary>
}

export default CharacterSummaryView;
