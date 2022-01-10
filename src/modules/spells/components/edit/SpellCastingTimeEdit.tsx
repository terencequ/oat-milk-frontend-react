import {ChangeEvent, FC} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {SpellCastingTimeRequest, SpellCastingTimeType} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import _ from "lodash";

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

  return <>
      <FormControl>
        <TextField variant={"filled"} label={"Casting Time Value"} value={castingTime.value} onChange={onChangeValue}/>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel id={"spellCastingTimeLabel"}>Casting Time Type</InputLabel>
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
  </>
}

export default SpellCastingTimeEdit;