import React, {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {
    getEditCharacterFormError,
    setCurrentEditCharacter,
    setCurrentEditCharacterFormError
} from "../../../../../../redux/slices/charactersSlice";
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
import {isWhitespaceOnly, limitString} from "../../../../helpers/TextHelpers";
import styled from "@emotion/styled";
import {themeSpacing} from "../../../../../core/styles/GlobalStyles";
import {CharacterSpellRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

const StyledForm = styled.div`
  margin-top: ${themeSpacing(2)};
  display: grid;
  grid-template-columns: 15rem 1fr;
  grid-column-gap: ${themeSpacing(2)};
  grid-template-rows: auto 1fr;
  grid-row-gap: ${themeSpacing(2)};
`

interface CharacterSpellCreateOrEditDialogProps {
    open: boolean;
    onClose: () => void;
    existingSpell?: CharacterSpellRequest;
}

const CharacterSpellCreateOrEditDialog: FC<CharacterSpellCreateOrEditDialogProps> = ({open, onClose, existingSpell}) => {
    const dispatch = useAppDispatch();

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);
    const currentEditCharacterSpells = currentEditCharacter?.spells ?? [];

    const onChangeId = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setId(limitString(event.target.value, 16).toLowerCase().replaceAll(/[^a-z0-9]/g, ''));
    }
    const onChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(limitString(event.target.value, 32));
    }
    const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDescription(event.target.value.substr(0, 1024));
    }

    // Error state in redux
    const errorId = `${CharacterSpellCreateOrEditDialog.name}`
    const error = getEditCharacterFormError(errorId)();
    const setError = useCallback((newError: string | null) => {
        dispatch(setCurrentEditCharacterFormError({id: errorId, error: newError}))
    }, [dispatch, errorId])

    const reset = useCallback(() => {
        setError(null)
        if(!existingSpell){
            setId("");
            setName("");
            setDescription("");
        } else {
            setId(existingSpell.id);
            setName(existingSpell?.name ?? "");
            setDescription(existingSpell?.description ?? "");
        }
    }, [existingSpell, setError])

    useEffect(() => {
        reset();
    }, [open, currentEditCharacter, existingSpell, setError, reset])

    const onCloseAndDiscard = () => {
        reset();
        onClose();
    }

    /** Create a new spell. */
    const onSave = () => {
        if(id === "" || name === ""){
            setError("ID and name fields are required.");
            return;
        }
        if(isWhitespaceOnly(name)){
            setError("Name cannot be just whitespace.");
            return;
        }

        if(currentEditCharacter === null) {
            return;
        }
        if(!existingSpell){
            const existingSpell = currentEditCharacterSpells.find(s => s.id === id);
            if(!!existingSpell){
                setError("A spell already exists with this ID.");
                return;
            }

            // Create
            dispatch(setCurrentEditCharacter({
                ...currentEditCharacter,
                spells: [
                    ...currentEditCharacterSpells,
                    {
                        id: id,
                        name: name,
                        description: description
                    }
                ]
            }));
            onCloseAndDiscard();
        } else {
            // Update
            dispatch(setCurrentEditCharacter({
                ...currentEditCharacter,
                spells: currentEditCharacterSpells.map(s => {
                    if(s.id === id){
                        return {
                            id: id,
                            name: name,
                            description: description
                        }
                    } else {
                        return s;
                    }
                })
            }));
            onCloseAndDiscard();
        }
    }

    return <Dialog open={open} disableEscapeKeyDown fullWidth maxWidth={"md"}>
        <DialogContent>
            {!existingSpell
                ? <>
                    <Typography variant={"h2"}>Create Spell</Typography>
                    <Typography variant={"body1"}>Add a new spell to this character sheet.</Typography>
                </>
                : <>
                    <Typography variant={"h2"}>Edit Spell</Typography>
                    <Typography variant={"body1"}>Edit existing spell for this character sheet.</Typography>
                </>
            }

            <StyledForm>
                <FormControl>
                    <TextField onChange={onChangeId}
                        variant={"filled"}
                        label={"ID"}
                        value={id}
                        required/>
                </FormControl>
                <FormControl>
                    <TextField onChange={onChangeName}
                        variant={"filled"}
                        label={"Name"}
                        value={name}
                        required/>
                </FormControl>
                <FormControl sx={{gridColumn: "span 2"}}>
                    <TextField onChange={onChangeDescription}
                        variant={"filled"}
                        label={"Description"}
                        value={description}
                        multiline
                        rows={12}/>
                </FormControl>
            </StyledForm>
            {!!error && <Typography variant={"body2"} color={"error"}>{error}</Typography>}
        </DialogContent>
        <DialogActions>
            <Button color={"secondary"} onClick={onCloseAndDiscard}>Cancel</Button>
            <Button onClick={onSave}>{!existingSpell ? "Create" : "Save"}</Button>
        </DialogActions>
    </Dialog>
}

export default CharacterSpellCreateOrEditDialog;
