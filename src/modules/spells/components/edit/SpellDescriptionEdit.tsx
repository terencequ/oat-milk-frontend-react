import {ChangeEvent, FC} from "react";
import styled from "@emotion/styled";
import {FormControl, TextField, Typography} from "@mui/material";

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
`

interface SpellDescriptionEditProps {
    description: string;
    setDescription: (description: string) => void;
}

const SpellDescriptionEdit: FC<SpellDescriptionEditProps> = ({description, setDescription}) => {
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const string = e.target.value.substr(0, 1024);
        setDescription(string);
    }

    return <StyledDescription>
        <Typography gutterBottom variant={"subtitle1"}>Description</Typography>
        <FormControl>
            <TextField variant={"filled"} label={"Value"} value={description} onChange={onChangeDescription} multiline rows={12}/>
        </FormControl>
    </StyledDescription>
}

export default SpellDescriptionEdit;
