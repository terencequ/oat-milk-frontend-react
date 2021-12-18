import React, {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {
    getEditCharacterFormError,
    setCurrentEditCharacter,
    setCurrentEditCharacterFormError
} from "../../../../../../redux/slices/characterSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
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
  grid-template-rows: auto auto 1fr;
  grid-row-gap: ${themeSpacing(2)};
  .idAndName {
    display: grid;
    grid-template-columns: 15rem 1fr;
    grid-column-gap: ${themeSpacing(2)};
  }
  .properties {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: ${themeSpacing(2)};
    grid-row-gap: ${themeSpacing(2)};
  }
  .description {
    display: grid;
    grid-template-columns: 1fr;
  }
`

interface CharacterSpellCreateOrEditDialogProps {
    open: boolean;
    onClose: () => void;
    existingSpell?: CharacterSpellRequest;
}

const CharacterSpellCreateOrEditDialog: FC<CharacterSpellCreateOrEditDialogProps> = ({open, onClose, existingSpell}) => {
    const dispatch = useAppDispatch();

    const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);
    const currentEditCharacterSpells = currentEditCharacter?.spells ?? [];

    // Form state and methods
    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [level, setLevel] = useState<number>(1);
    const [castingTime, setCastingTime] = useState<string>("");
    const [rangeOrArea, setRangeOrArea] = useState<string>("");
    const [components, setComponents] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [school, setSchool] = useState<string>("");

    const onChangeId = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setId(limitString(event.target.value, 16).toLowerCase().replaceAll(/[^a-z0-9]/g, ''));
    }
    const onChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(limitString(event.target.value, 32));
    }
    const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDescription(event.target.value.substr(0, 1024));
    }
    const onChangeLevel = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const string = event.target.value.replaceAll(/[^0-9]/g, '').substr(0, 2);
        setLevel(parseInt(string === "" ? "0" : string));
    }
    const onChangeCastingTime = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCastingTime(limitString(event.target.value, 32));
    }
    const onChangeRangeOrArea = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRangeOrArea(limitString(event.target.value, 32));
    }
    const onChangeComponents = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setComponents(limitString(event.target.value, 32));
    }
    const onChangeDuration = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDuration(limitString(event.target.value, 32));
    }
    const onChangeSchool = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSchool(limitString(event.target.value, 32));
    }

    // Error state in redux
    const errorId = `${CharacterSpellCreateOrEditDialog.name}`
    const error = getEditCharacterFormError(errorId)();
    const setError = useCallback((newError: string | null) => {
        dispatch(setCurrentEditCharacterFormError({id: errorId, error: newError}))
    }, [dispatch, errorId])

    /** Resets the form fields */
    const reset = useCallback(() => {
        setError(null)
        if(!existingSpell){
            setId("");
            setName("");
            setDescription("");
            setLevel(1);
            setCastingTime("");
            setRangeOrArea("");
            setComponents("");
            setDuration("");
            setSchool("");
        } else {
            setId(existingSpell.id);
            setName(existingSpell?.name ?? "");
            setDescription(existingSpell?.description ?? "");
            setLevel(existingSpell?.level ?? 0);
            setCastingTime(existingSpell?.castingTime ?? "");
            setRangeOrArea(existingSpell?.rangeOrArea ?? "");
            setComponents(existingSpell?.components ?? "");
            setDuration(existingSpell?.duration ?? "");
            setSchool(existingSpell?.school ?? "");
        }
    }, [existingSpell, setError])

    useEffect(() => {
        reset();
    }, [open, currentEditCharacter, existingSpell, setError, reset])

    /** Close and discard everything. */
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
        const newSpell: CharacterSpellRequest = {
            id: id,
            name: name,
            description: description,
            level: level,
            castingTime: castingTime,
            rangeOrArea: rangeOrArea,
            components: components,
            duration: duration,
            school: school,
        }
        if(!existingSpell){
            const existingSpell = currentEditCharacterSpells.find(s => s.id === id);
            if(!!existingSpell){
                setError("A newSpell already exists with this ID.");
                return;
            }
            // Create
            dispatch(setCurrentEditCharacter({
                ...currentEditCharacter,
                spells: [
                    ...currentEditCharacterSpells,
                    newSpell
                ]
            }));
            onCloseAndDiscard();
        } else {
            // Update
            dispatch(setCurrentEditCharacter({
                ...currentEditCharacter,
                spells: currentEditCharacterSpells.map(s => {
                    return s.id === id ? newSpell : s;
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
                <div className={"idAndName"}>
                    <FormControl>
                        <TextField onChange={onChangeId} variant={"filled"} label={"ID"} value={id} required/>
                    </FormControl>
                    <FormControl>
                        <TextField onChange={onChangeName} variant={"filled"} label={"Name"} value={name} required/>
                    </FormControl>
                </div>
                <div className={"properties"}>
                    <FormControl>
                        <TextField onChange={onChangeLevel} variant={"filled"} label={"Level"} value={level}/>
                    </FormControl>
                    <FormControl>
                        <TextField onChange={onChangeCastingTime} variant={"filled"} label={"Casting Time"} value={castingTime}/>
                    </FormControl>
                    <FormControl>
                        <TextField onChange={onChangeRangeOrArea} variant={"filled"} label={"Range / Area"} value={rangeOrArea}/>
                    </FormControl>
                    <FormControl>
                        <TextField onChange={onChangeComponents} variant={"filled"} label={"Components"} value={components}/>
                    </FormControl>
                    <FormControl>
                        <TextField onChange={onChangeDuration} variant={"filled"} label={"Duration"} value={duration}/>
                    </FormControl>
                    <FormControl>
                        <TextField onChange={onChangeSchool} variant={"filled"} label={"School"} value={school}/>
                    </FormControl>
                </div>
                <div className={"description"}>
                    <FormControl>
                        <TextField onChange={onChangeDescription} variant={"filled"} label={"Description"} value={description} multiline rows={12}/>
                    </FormControl>
                </div>

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
