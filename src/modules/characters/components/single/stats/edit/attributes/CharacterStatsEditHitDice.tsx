import React, {FC} from "react";
import {StyledAttribute, StyledAttributeLogo} from "../../CharacterStatsStyles";
import {IconButton, Tooltip, Typography} from "@mui/material";
import hitDiceIcon from "../../../../../../../assets/images/icons/hitdice.png";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {getHitDiceAsString} from "../../../../../helpers/CharacterStatHelpers";
import {Edit} from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledHitDiceContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CharacterStatsEditHitDice: FC = (props) => {
    const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);

    return <StyledAttribute columnSpan={2}>
        <StyledAttributeLogo src={hitDiceIcon}/>
        <Typography variant={"subtitle1"}>Hit dice</Typography>
        <StyledHitDiceContents>
            <Tooltip title={getHitDiceAsString(currentEditCharacter?.attributes ?? [], true)}>
                <Typography style={{textDecoration: "underline", cursor: "pointer",}} variant={"body1"}>{getHitDiceAsString(currentEditCharacter?.attributes ?? [], false)}</Typography>
            </Tooltip>
            <IconButton onClick={() => {}}>
                <Edit/>
            </IconButton>
        </StyledHitDiceContents>
    </StyledAttribute>
}

export default CharacterStatsEditHitDice;
