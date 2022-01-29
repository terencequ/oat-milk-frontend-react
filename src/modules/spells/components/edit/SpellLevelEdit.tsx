import {ChangeEvent, FC} from "react";
import styled from "@emotion/styled";
import {FormControl, TextField, Typography} from "@mui/material";

const StyledLevel = styled.div`
  display: flex;
  flex-direction: column;
  
`

interface SpellLevelEditProps {
    level: number;
    setLevel: (level: number) => void;
}

const SpellLevelEdit: FC<SpellLevelEditProps> = ({level, setLevel}) => {
    const onChangeLevel = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const string = e.target.value.replaceAll(/[^0-9]/g, '').substr(0, 2);
        const int = parseInt(string === "" ? "0" : string);
        setLevel(int);
    }

    return <StyledLevel>
        <Typography gutterBottom variant={"subtitle1"}>Level</Typography>
        <FormControl>
            <TextField variant={"filled"} label={"Value"} value={level} onChange={onChangeLevel}/>
        </FormControl>
    </StyledLevel>
}

export default SpellLevelEdit;
