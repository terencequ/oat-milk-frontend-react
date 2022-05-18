import {FC} from "react";
import {SpellSchool} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import styled from "@emotion/styled";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import _ from "lodash";
import {themeSpacing} from "../../../core/styles/GlobalStyles";

const StyledSchool = styled.div`
  display: flex;
  flex-direction: column;
`

const SpellSchoolForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: ${themeSpacing(1)};
`

interface SpellSchoolEditProps {
    school: SpellSchool;
    setSchool: (school: SpellSchool) => void;
}

const SpellSchoolEdit : FC<SpellSchoolEditProps> = ({school, setSchool}) => {
    /**
     * Change the value of the spell's target range.
     * @param e
     */
    const onChangeSchool = (e: SelectChangeEvent) => {
        setSchool(e.target.value as SpellSchool);
    }

    return <StyledSchool>
        <Typography gutterBottom variant={"subtitle1"}>School</Typography>
        <SpellSchoolForm>
            <FormControl variant="filled">
                <InputLabel id={"spellSchoolLabelLabel"}>School</InputLabel>
                <Select
                    labelId={"spellSchoolLabel"}
                    id={"spellSchool"}
                    value={school ?? SpellSchool.Abjuration}
                    onChange={onChangeSchool}
                >
                    {
                        Object.keys(SpellSchool).map((type, index) => <MenuItem value={type} key={index}>{_.startCase(type)}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </SpellSchoolForm>
    </StyledSchool>
}

export default SpellSchoolEdit;
