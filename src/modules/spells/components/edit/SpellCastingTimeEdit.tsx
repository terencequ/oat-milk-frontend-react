import {ChangeEvent, FC} from "react";
import {
  FormControl, InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import {
  SpellCastingTimeRequest,
  SpellCastingTimeType
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import _ from "lodash";
import styled from "@emotion/styled";
import {themeSpacing} from "../../../core/styles/GlobalStyles";

const StyledCastingTime = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledCastingTimeForm = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px;
  grid-column-gap: ${themeSpacing(1)};
`

interface SpellCastingTimeEditProps {
  castingTime: SpellCastingTimeRequest;
  setCastingTime: (castingTime: SpellCastingTimeRequest) => void;
}

const SpellCastingTimeEdit: FC<SpellCastingTimeEditProps> = ({castingTime, setCastingTime}) => {
  /**
   * Create a new casting time object.
   */
  const createNewCastingTime: () => SpellCastingTimeRequest = () => ({
    value: castingTime.value,
    type: castingTime.type,
    description: castingTime.description,
    isRitual: castingTime.isRitual,
  });

  /**
   * Change the value of the casting time
   * @param e
   */
  const onChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const string = e.target.value.replaceAll(/[^0-9]/g, '').substr(0, 2);
    const int = parseInt(string === "" ? "1" : string);
    let newCastingTime = createNewCastingTime();
    newCastingTime.value = int;
    setCastingTime(newCastingTime);
  }

  /**
   * Change the type of the casting time
   * @param e
   */
  const onChangeType = (e: SelectChangeEvent) => {
    let newCastingTime = createNewCastingTime();
    newCastingTime.type = e.target.value as SpellCastingTimeType;
    setCastingTime(newCastingTime);
  }

  /**
   * Toggle if ritual for the casting time
   * @param e
   */
  const onChangeIsRitual = (e: SelectChangeEvent) => {
    let newCastingTime = createNewCastingTime();
    newCastingTime.isRitual = e.target.value === "Ritual";
    setCastingTime(newCastingTime);
  }

  return <StyledCastingTime>
    <Typography gutterBottom variant={"subtitle1"}>Casting Time</Typography>
    <StyledCastingTimeForm>
      <FormControl>
        <TextField variant={"filled"} label={"Value"} value={castingTime.value ?? ""} onChange={onChangeValue}/>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel id={"spellCastingTimeTypeLabel"}>Unit</InputLabel>
        <Select
          labelId={"spellCastingTimeTypeLabel"}
          id={"spellCastingTimeType"}
          value={castingTime.type ?? ''}
          onChange={onChangeType}
        >
          {
            Object.keys(SpellCastingTimeType).map((type, index) => <MenuItem value={type} key={index}>{_.startCase(type)}</MenuItem>)
          }
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel id={"spellCastingIsRitualLabel"}>Type</InputLabel>
        <Select
            labelId={"spellCastingIsRitualLabel"}
            id={"spellCastingIsRitual"}
            value={(castingTime.isRitual ?? false) ? 'Ritual' : 'Normal'}
            onChange={onChangeIsRitual}
        >
          <MenuItem value={'Normal'}>Normal</MenuItem>
          <MenuItem value={'Ritual'}>Ritual</MenuItem>
        </Select>
      </FormControl>
    </StyledCastingTimeForm>
  </StyledCastingTime>
}

export default SpellCastingTimeEdit;
