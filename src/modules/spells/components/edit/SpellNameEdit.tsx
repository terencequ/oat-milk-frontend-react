import {ChangeEvent, FC} from "react";
import styled from "@emotion/styled";
import {FormControl, TextField, Typography} from "@mui/material";

const StyledName = styled.div`
  display: flex;
  flex-direction: column;
`

interface SpellNameEditProps {
    name: string;
    setName: (name: string) => void;
}

const SpellNameEdit: FC<SpellNameEditProps> = ({name, setName}) => {
    const onChangeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const string = e.target.value.substr(0, 64);
        setName(string);
    }

    return <StyledName>
        <Typography gutterBottom variant={"subtitle1"}>Name</Typography>
        <FormControl>
            <TextField variant={"filled"} label={"Value"} value={name} onChange={onChangeName}/>
        </FormControl>
    </StyledName>
}

export default SpellNameEdit;
