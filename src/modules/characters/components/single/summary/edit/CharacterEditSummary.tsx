import React, {ChangeEvent, FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {getLevel, getNextLevelExperienceRequirement} from "../../../../helpers/CharacterStatHelpers";
import {TextField, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {StyledSummary} from "../CharacterSummaryStyles";
import {setCurrentEditCharacter} from "../../../../../../redux/slices/charactersSlice";

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

  const currentExperience = currentEditCharacter?.attributes?.find(c => c.id === "experience")?.currentValue ?? -1;
  const currentLevel = getLevel(currentExperience);
  const currentNextLevelExperienceRequirement = getNextLevelExperienceRequirement(currentExperience);

  const [name, setName] = useState(currentEditCharacter?.name);
  const [experience, setExperience] = useState(currentExperience.toString());
  const [experienceError, setExperienceError] = useState<string | null>(null);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    if(!!currentEditCharacter){
      dispatch(setCurrentEditCharacter({...currentEditCharacter, name: newName?.substr(0, 30) ?? ""}));
    }
  }

  const onChangeExperience = (event: ChangeEvent<HTMLInputElement>) => {
    const newExperience = event.target.value;
    setExperience(newExperience);

    const newExperienceNumber = Number(newExperience);
    let success = false;
    if(isNaN(newExperienceNumber) || newExperienceNumber < 0){
      setExperienceError(isNaN(newExperienceNumber)
        ? `Experience must be a number!`
        : `Experience must be between 0 and 355000!`);
      success = false;
    } else {
      setExperienceError(null);
      success = true;
    }

    if(success && !!currentEditCharacter){
      dispatch(setCurrentEditCharacter({...currentEditCharacter, attributes: [
          ...currentEditCharacter.attributes?.map(a => {
            if(a.id === "experience"){
              return {
                ...a, currentValue:  newExperienceNumber > 355000 ? 355000 : newExperienceNumber
              };
            } else {
              return a;
            }
          }) ?? []
        ]}))
    }
  }

  return <StyledSummary>
    <StyledNameField
      value={name}
      onChange={onChangeName}
      variant="standard"
      inputProps={{style: {
          textAlign: "center",
          fontSize: "2rem",
      }}}/>
    <StyledExperience>
      <Typography variant={"h3"} align={"center"}>
        {`Level ${currentLevel} (`}
      </Typography>
      <StyledExperienceField
        value={experience}
        onChange={onChangeExperience}
        variant="standard"
        inputProps={{style: {
            textAlign: "center",
            fontSize: "1.2rem",
        }}}/>
      <Typography variant={"h3"} align={"center"}>
        {`/${currentNextLevelExperienceRequirement === -1 ? "MAX" : currentNextLevelExperienceRequirement} XP), Peasant 1`}
      </Typography>
    </StyledExperience>
  </StyledSummary>
}

export default CharacterEditSummary;