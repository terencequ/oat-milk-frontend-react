import React, {FC} from "react";
import {StyledAttribute, StyledAttributeLogo} from "../../CharacterStatsStyles";
import {Typography} from "@mui/material";

interface CharacterStatsViewAttributeCustomProps {
  iconSrc: string | undefined;
  title: string,
  value: string,
  columnWidth?: number,
  includeDefaultValue?: boolean,
}

const CharacterStatsViewAttributeCustom: FC<CharacterStatsViewAttributeCustomProps> = (props) => {
  return <StyledAttribute columnSpan={props.columnWidth}>
    <StyledAttributeLogo src={props.iconSrc}/>
    <Typography variant={"subtitle1"}>{props.title}</Typography>
    <Typography variant={"body1"}>{props.value}</Typography>
  </StyledAttribute>
}
export default CharacterStatsViewAttributeCustom;
