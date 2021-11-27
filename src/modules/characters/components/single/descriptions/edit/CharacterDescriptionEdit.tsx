import {ChangeEvent, FC, FocusEvent, useState} from "react";
import {CharacterDescriptionRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {TextField, Typography} from "@mui/material";
import { StyledDescription } from "../CharacterDescriptionsStyles";
import {setCurrentEditCharacter} from "../../../../../../redux/slices/charactersSlice";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {limitString} from "../../../../helpers/TextHelpers";

interface CharacterDescriptionEditProps {
  description: CharacterDescriptionRequest | null;
  maxLength: number;
  columnWidth?: number;
  rows?: number;
}

const CharacterDescriptionEdit: FC<CharacterDescriptionEditProps> = ({description, maxLength, columnWidth, rows}) => {

  const dispatch = useAppDispatch();
  const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);

  const initialValue = description?.value?.toString() ?? "";
  const [value, setValue] = useState<string>(initialValue);

  const newRows = rows ?? 3; // Rows by default should be 3

  /**
   * Changing Description.
   * @param event Change text input event.
   */
  const onChangeValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.preventDefault();
    const value = limitString(event.target.value, maxLength);
    if(value.length > maxLength){
      return;
    }
    setValue(value);
  }

  /**
   * Check errors and persist Description value to redux.
   * @param event
   */
  const onSaveValue = (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if(description === null){
      return;
    }

    if(!!currentEditCharacter){
      dispatch(setCurrentEditCharacter({
        ...currentEditCharacter,
        descriptions: currentEditCharacter.descriptions?.map(d => {
          return d.id === description.id ? {
            ...d,
            value: value,
          } : d;
        }) ?? [],
      }));
    }
  }


  return <StyledDescription sx={{gridColumn: `span ${columnWidth}`}}>
    <Typography variant={"subtitle1"}>{description?.name ?? ""}</Typography>
    <TextField fullWidth
               multiline
               rows={newRows}
               value={value}
               onChange={onChangeValue}
               onBlur={onSaveValue}/>
  </StyledDescription>
}

export default CharacterDescriptionEdit;
