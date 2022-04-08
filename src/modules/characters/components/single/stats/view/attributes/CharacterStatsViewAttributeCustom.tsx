import React, {FC} from "react";
import {StyledAttribute, StyledAttributeLogo} from "../../CharacterStatsStyles";
import {Tooltip, Typography} from "@mui/material";

interface CharacterStatsViewAttributeCustomProps {
  iconSrc: string | undefined;
  title: string,
  value: string,
  toolTip?: string,
  columnWidth?: number,
  includeDefaultValue?: boolean,
}

const CharacterStatsViewAttributeCustom: FC<CharacterStatsViewAttributeCustomProps> = (props) => {
  return <StyledAttribute columnSpan={props.columnWidth}>
    <StyledAttributeLogo src={props.iconSrc}/>
    <Typography variant={"subtitle1"}>{props.title}</Typography>
    {
      !props.toolTip
        ? <Typography variant={"body1"}>{props.value}</Typography>
        : <Tooltip title={props.toolTip}><Typography style={{textDecoration: "underline", cursor: "pointer",}} variant={"body1"}>{props.value}</Typography></Tooltip>
    }

  </StyledAttribute>
}
export default CharacterStatsViewAttributeCustom;
