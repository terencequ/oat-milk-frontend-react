import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";
import {StyledAttribute, StyledAttributeLogo} from "../../CharacterStatsStyles";
import initiativeIcon from "../../../../../../../assets/images/icons/initiative.png";
import {Typography} from "@mui/material";
import {CharacterAttributeResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

interface CharacterStatsViewAttributeCustomProps {
  iconSrc: string | undefined;
  title: string,
  value: string,
  columnWidth?: number,
  includeDefaultValue?: boolean,
}

const CharacterStatsViewAttributeCustom: FC<CharacterStatsViewAttributeCustomProps> = (props) => {
  return <StyledAttribute columnWidth={props.columnWidth}>
    <StyledAttributeLogo src={props.iconSrc}/>
    <Typography variant={"subtitle1"}>{props.title}</Typography>
    <Typography variant={"body1"}>{props.value}</Typography>
  </StyledAttribute>
}
export default CharacterStatsViewAttributeCustom;