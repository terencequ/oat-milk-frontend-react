import React, {FC} from "react";
import {StyledAttribute, StyledAttributeLogo} from "../../CharacterStatsStyles";
import {Tooltip, Typography} from "@mui/material";
import hitDiceIcon from "../../../../../../../assets/images/icons/hitdice.png";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {getHitDiceAsString} from "../../../../../helpers/CharacterStatHelpers";

const CharacterStatsViewHitDice: FC = (props) => {
    const currentEditCharacter = useAppSelector(state => state.characters.currentCharacter);

    return <StyledAttribute columnSpan={2}>
        <StyledAttributeLogo src={hitDiceIcon}/>
        <Typography variant={"subtitle1"}>Hit dice</Typography>
        <Tooltip title={getHitDiceAsString(currentEditCharacter?.attributes ?? [], true)}>
            <Typography style={{textDecoration: "underline", cursor: "pointer",}} variant={"body1"}>{getHitDiceAsString(currentEditCharacter?.attributes ?? [], false)}</Typography>
        </Tooltip>
    </StyledAttribute>
}

export default CharacterStatsViewHitDice;
