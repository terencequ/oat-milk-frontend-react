import {ChangeEvent, FC} from "react";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import {SpellCastingTimeRequest, SpellCastingTimeType} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import _ from "lodash";
import styled from "@emotion/styled";
import {themeSpacing} from "../../../core/styles/GlobalStyles";

const StyledCastingTime = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledCastingTimeForm = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-column-gap: ${themeSpacing(1)};
`

interface SpellCastingTimeEditProps {
  castingTime: SpellCastingTimeRequest;
  setCastingTime: (castingTime: SpellCastingTimeRequest) => void;
}

export const SpellCastingTimeEdit: FC<SpellCastingTimeEditProps> = ({castingTime, setCastingTime}) => {
  const onChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const string = e.target.value.replaceAll(/[^0-9]/g, '').substr(0, 2);
    const int = parseInt(string === "" ? "0" : string);
    let newCastingTime: SpellCastingTimeRequest = {
      value: int,
      type: castingTime.type,
      description: castingTime.description,
      isRitual: castingTime.isRitual,
    };
    setCastingTime(newCastingTime);
  }
  const onChangeCastingTime = (e: SelectChangeEvent) => {
    let newCastingTime: SpellCastingTimeRequest = {
      value: castingTime.value,
      type: e.target.value as SpellCastingTimeType,
      description: castingTime.description,
      isRitual: castingTime.isRitual,
    };
    setCastingTime(newCastingTime);
  }

  return <StyledCastingTime>
    <Typography gutterBottom variant={"subtitle1"}>Casting Time</Typography>
    <StyledCastingTimeForm>
      <FormControl>
        <TextField variant={"filled"} label={"Value"} value={castingTime.value} onChange={onChangeValue}/>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel id={"spellCastingTimeLabel"}>Type</InputLabel>
        <Select
          labelId={"spellCastingTimeLabel"}
          id={"spellCastingTime"}
          value={castingTime.type}
          onChange={onChangeCastingTime}
        >
          {
            Object.keys(SpellCastingTimeType).map(t => <MenuItem value={t}>{_.startCase(t)}</MenuItem>)
          }
        </Select>
      </FormControl>
    </StyledCastingTimeForm>
  </StyledCastingTime>
}

export default SpellCastingTimeEdit;
