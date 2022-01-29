import {ChangeEvent, FC} from "react";
import styled from "@emotion/styled";
import {FormControl, TextField, Typography} from "@mui/material";
import {SpellRangeRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

const StyledRangeOrArea = styled.div`
  display: flex;
  flex-direction: column;
`

interface SpellRangeOrAreaEditProps {
    rangeOrArea: SpellRangeRequest;
    setRangeOrArea: (rangeOrArea: SpellRangeRequest) => void;
}

const SpellRangeOrAreaEdit: FC<SpellRangeOrAreaEditProps> = ({rangeOrArea, setRangeOrArea}) => {
    const onChangeRange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    }

    return <StyledRangeOrArea>
        <Typography gutterBottom variant={"subtitle1"}>Range or Area</Typography>
        <FormControl>
            <TextField variant={"filled"} label={"Value"} value={rangeOrArea} onChange={onChangeRange}/>
        </FormControl>
    </StyledRangeOrArea>
}

export default SpellRangeOrAreaEdit;
