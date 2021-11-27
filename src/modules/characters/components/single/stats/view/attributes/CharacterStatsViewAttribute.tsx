import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";
import {StyledAttribute, StyledAttributeLogo} from "../../CharacterStatsStyles";
import initiativeIcon from "../../../../../../../assets/images/icons/initiative.png";
import {Typography} from "@mui/material";
import {CharacterAttributeResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

interface CharacterStatsViewAttributeProps {
  iconSrc: string | undefined;
  attribute: CharacterAttributeResponse,
  columnWidth?: number,
  includeDefaultValue?: boolean,
}

const CharacterStatsViewAttribute: FC<CharacterStatsViewAttributeProps> = (props) => {

  return <StyledAttribute>
    <StyledAttributeLogo src={props.iconSrc}/>
    <Typography variant={"subtitle1"}>{props.attribute.name}</Typography>
    {
      props.includeDefaultValue
        ? <Typography variant={"body1"}>{props.attribute.currentValue}/{props.attribute.defaultValue}</Typography>
        : <Typography variant={"body1"}>{props.attribute.currentValue}</Typography>
    }
  </StyledAttribute>
}
export default CharacterStatsViewAttribute;