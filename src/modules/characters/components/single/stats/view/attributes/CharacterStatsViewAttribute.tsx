import React, {FC} from "react";
import {StyledAttribute, StyledAttributeLogo} from "../../CharacterStatsStyles";
import {Typography} from "@mui/material";
import {CharacterAttributeResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

interface CharacterStatsViewAttributeProps {
  iconSrc: string | undefined;
  attribute: CharacterAttributeResponse,
  columnWidth?: number,
  includeDefaultValue?: boolean,
  suffix?: string,
}

const CharacterStatsViewAttribute: FC<CharacterStatsViewAttributeProps> = (props) => {

  return <StyledAttribute>
    <StyledAttributeLogo src={props.iconSrc}/>
    <Typography variant={"subtitle1"}>{props.attribute.name}</Typography>
    {
      props.includeDefaultValue
        ? <Typography variant={"body1"}>{props.attribute.currentValue}/{props.attribute.defaultValue}{props.suffix}</Typography>
        : <Typography variant={"body1"}>{props.attribute.currentValue}{props.suffix}</Typography>
    }
  </StyledAttribute>
}
export default CharacterStatsViewAttribute;
