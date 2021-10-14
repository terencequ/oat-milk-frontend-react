import React, {ChangeEvent, FocusEvent, FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {getLevel, getNextLevelExperienceRequirement, levels} from "../../../../helpers/CharacterStatHelpers";
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
  width: 120px;
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

  /**
   * Validate and persist name to redux.
   */
  const onSaveName = (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if(!!currentEditCharacter){
      dispatch(setCurrentEditCharacter({...currentEditCharacter, name: name?.substr(0, 30) ?? ""}));
    }
  }

  /**
   * Validate and persist experience to redux.
   */
  const onSaveExperience = (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newExperienceNumber = Number(experience);

    if(isNaN(newExperienceNumber) || newExperienceNumber < 0){
      setExperienceError(isNaN(newExperienceNumber)
          ? `Experience must be a number!`
          : `Experience must be between 0 and 355000!`);
      return;
    }

    setExperienceError(null);
    const maxExp = Math.max(...levels.map(l => l.experienceRequirement));
    if(!!currentEditCharacter){
      dispatch(setCurrentEditCharacter({...currentEditCharacter, attributes: [
          ...currentEditCharacter.attributes?.map(a => {
            if(a.id === "experience"){
              return {
                ...a, currentValue:  newExperienceNumber > maxExp ? maxExp : newExperienceNumber
              };
            } else {
              return a;
            }
          }) ?? []
        ]}))
    }
  }

  /**
   * Callback for changing name field.
   * @param event
   */
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value.substr(0, 20);
    setName(newName);
  }

  /**
   * Callback for changing experience field.
   * @param event
   */
  const onChangeExperience = (event: ChangeEvent<HTMLInputElement>) => {
    const newExperience = event.target.value.substr(0, 7);;
    setExperience(newExperience);
  }

  return <StyledSummary>
    <StyledNameField
        label={"Name"}
        value={name}
        onChange={onChangeName}
        onBlur={onSaveName}
        variant="outlined"
        inputProps={{style: {
            textAlign: "center",
            fontSize: "2rem",
            padding: 5
        }}}/>
    <StyledExperience>
      <Typography variant={"h3"} align={"center"}>
        {`Level ${currentLevel} (`}
      </Typography>
      <StyledExperienceField
          label={"Experience"}
          value={experience}
          onChange={onChangeExperience}
          onBlur={onSaveExperience}
          variant="outlined"
          inputProps={{style: {
              textAlign: "center",
              fontSize: "1.2rem",
              padding: 5
          }}}/>
      <Typography variant={"h3"} align={"center"}>
        {`/${currentNextLevelExperienceRequirement === -1 ? "MAX" : currentNextLevelExperienceRequirement} XP), Peasant 1`}
      </Typography>
    </StyledExperience>
  </StyledSummary>
}

export default CharacterEditSummary;