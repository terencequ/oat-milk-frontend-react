import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Typography
} from "@mui/material";
import styled from "@emotion/styled";
import {themeSpacing} from "../../../../core/styles/GlobalStyles";
import {isWhitespaceOnly, limitString} from "../../../helpers/TextHelpers";
import {useAppDispatch} from "../../../../../redux/hooks";
import {createCharacter} from "../../../../../redux/thunks/characterThunks";

const StyledForm = styled.div`
  margin-top: ${themeSpacing(2)};
  display: grid;
  width: 20rem;
`

interface CharacterCreateDialogProps {
    open: boolean;
    onClose: () => void;
}

const CharacterCreateDialog: FC<CharacterCreateDialogProps> = ({open, onClose}) => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string | null>(null)
    const [name, setName] = useState("");

    const onReset = () => {
        setError(null);
        setName("");
    }

    useEffect(() => {
        onReset();
    }, [])

    const onChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(limitString(event.target.value, 32));
    }

    const onCreate = () => {
        if(isWhitespaceOnly(name)){
            setError("Name cannot be empty or whitespace!");
            return;
        }
        dispatch(createCharacter({
            name: name,
        }));
        onReset();
        onClose();
    }

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>
            <Typography variant={"h3"}>Create new character</Typography>
        </DialogTitle>
        <DialogContent>
            <StyledForm>
                <FormControl>
                    <TextField onChange={onChangeName}
                               variant={"filled"}
                               label={"Name"}
                               value={name}
                               required/>
                </FormControl>
            </StyledForm>
            <Typography variant={"body2"} color={"error"}>{error}</Typography>
        </DialogContent>
        <DialogActions>
            <Button color={"secondary"} onClick={onClose}>Cancel</Button>
            <Button color={"primary"} onClick={onCreate}>Create</Button>
        </DialogActions>
    </Dialog>
}

export default CharacterCreateDialog;
