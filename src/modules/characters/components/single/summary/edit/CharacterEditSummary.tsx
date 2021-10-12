import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {getLevel, getNextLevelExperienceRequirement} from "../../../../helpers/CharacterStatHelpers";
import {TextField, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {StyledSummary} from "../CharacterSummaryStyles";

const StyledNameField = styled(TextField)`
  width: 800px;
  text-align: center;
  margin: auto;
`

const StyledExperience = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  margin: auto;

`

const StyledExperienceField = styled(TextField)`
  width: 100px;
  text-align: center;
  margin: auto;
`

const CharacterEditSummary: FC = () => {
  const dispatch = useAppDispatch();
  const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);
  if(!currentEditCharacter){
    return <></>
  }

  const experience = currentEditCharacter.attributes?.find(c => c.id === "experience")?.currentValue ?? -1;
  const level = getLevel(experience);
  const nextLevelExperienceRequirement = getNextLevelExperienceRequirement(experience);

  return <StyledSummary>
    <StyledNameField
      value={currentEditCharacter.name}
      variant="standard"
      inputProps={{style: {
          textAlign: "center",
          fontSize: "2rem",
      }}}/>
    <StyledExperience>
      <Typography variant={"h3"} align={"center"}>
        {`Level ${level} (`}
      </Typography>
      <StyledExperienceField
        value={experience}
        variant="standard"
        inputProps={{style: {
            textAlign: "center",
            fontSize: "1.2rem",
        }}}/>
      <Typography variant={"h3"} align={"center"}>
        {`/${nextLevelExperienceRequirement} XP), Peasant 1`}
      </Typography>
    </StyledExperience>
  </StyledSummary>
}

export default CharacterEditSummary;