import {ChangeEvent, FC} from "react";
import {
  Checkbox,
  FormControl, FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import {
  SpellCastingTimeRequest,
  SpellCastingTimeType,
  SpellDurationRequest, SpellDurationType
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import _ from "lodash";
import styled from "@emotion/styled";
import {themeSpacing} from "../../../core/styles/GlobalStyles";

const StyledDuration = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledDurationForm = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-column-gap: ${themeSpacing(1)};
`

interface SpellDurationEditProps {
  duration: SpellDurationRequest;
  setDuration: (duration: SpellDurationRequest) => void;
}

const SpellDurationEdit: FC<SpellDurationEditProps> = ({duration, setDuration}) => {
  /**
   * Create a new casting time object.
   */
  const createNewDuration: () => SpellDurationRequest = () => ({
    value: duration.value,
    type: duration.type,
    description: duration.description,
  });

  /**
   * Change the value of the casting time
   * @param e
   */
  const onChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const string = e.target.value.replaceAll(/[^0-9]/g, '').substr(0, 2);
    const int = parseInt(string === "" ? "1" : string);
    let newDurationRequest = createNewDuration();
    newDurationRequest.value = int;
    setDuration(newDurationRequest);
  }

  /**
   * Change the type of the casting time
   * @param e
   */
  const onChangeType = (e: SelectChangeEvent) => {
    let newDurationRequest = createNewDuration();
    newDurationRequest.type = e.target.value as SpellDurationType;
    setDuration(newDurationRequest);
  }

  return <StyledDuration>
    <Typography gutterBottom variant={"subtitle1"}>Duration</Typography>
    <StyledDurationForm>
      <FormControl>
        <TextField variant={"filled"} label={"Value"} value={duration.value ?? ""} onChange={onChangeValue}/>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel id={"spellDurationTypeLabel"}>Unit</InputLabel>
        <Select
          labelId={"spellDurationTypeLabel"}
          id={"spellDurationType"}
          value={duration.type ?? ''}
          onChange={onChangeType}
        >
          {
            Object.keys(SpellDurationType).map((type, index) => <MenuItem value={type} key={index}>{_.startCase(type)}</MenuItem>)
          }
        </Select>
      </FormControl>
    </StyledDurationForm>
  </StyledDuration>
}

export default SpellDurationEdit;
