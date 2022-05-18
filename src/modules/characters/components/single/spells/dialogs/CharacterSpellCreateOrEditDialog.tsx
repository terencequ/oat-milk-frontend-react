import React, {FC, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {
    getEditCharacterFormError,
    setCurrentEditCharacter,
    setCurrentEditCharacterFormError
} from "../../../../../../redux/slices/characterSlice";
import {Button, Dialog, DialogActions, DialogContent, Typography} from "@mui/material";
import {isWhitespaceOnly} from "../../../../helpers/TextHelpers";
import styled from "@emotion/styled";
import {themeSpacing} from "../../../../../core/styles/GlobalStyles";
import {
    CharacterSpellRequest,
    SpellCastingTimeRequest, SpellComponentsRequest, SpellDurationRequest, SpellRangeRequest,
    SpellSchool
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {generateId} from "../../../../helpers/IdGeneratorHelpers";
import SpellCastingTimeEdit from "../../../../../spells/components/edit/SpellCastingTimeEdit";
import SpellLevelEdit from "../../../../../spells/components/edit/SpellLevelEdit";
import SpellNameEdit from "../../../../../spells/components/edit/SpellNameEdit";
import SpellDescriptionEdit from "../../../../../spells/components/edit/SpellDescriptionEdit";
import SpellRangeEdit from "../../../../../spells/components/edit/SpellRangeEdit";
import SpellSchoolEdit from "../../../../../spells/components/edit/SpellSchoolEdit";
import SpellComponentsEdit from "../../../../../spells/components/edit/SpellComponentsEdit";
import SpellDurationEdit from "../../../../../spells/components/edit/SpellDurationEdit";

const StyledForm = styled.div`
  width: auto;
  margin-top: ${themeSpacing(2)};
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-row-gap: ${themeSpacing(2)};
  .idAndName {
    display: grid;
    grid-template-columns: 100%;
    grid-column-gap: ${themeSpacing(2)};
  }
  .properties {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 1fr;
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
    const [castingTime, setCastingTime] = useState<SpellCastingTimeRequest>({});
    const [range, setRange] = useState<SpellRangeRequest>({});
    const [duration, setDuration] = useState<SpellDurationRequest>({});
    const [components, setComponents] = useState<SpellComponentsRequest>({});
    const [school, setSchool] = useState<SpellSchool>(SpellSchool.Abjuration);

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
            setCastingTime({});
            setRange({});
            setDuration({});
            setComponents({});
            setSchool(SpellSchool.Abjuration);
        } else {
            setId(existingSpell.id);
            setName(existingSpell?.name ?? "");
            setDescription(existingSpell?.description ?? "");
            setLevel(existingSpell?.level ?? 1);
            setCastingTime(existingSpell?.castingTime ?? {});
            setRange(existingSpell?.range ?? {});
            setDuration(existingSpell?.duration ?? {});
            setComponents(existingSpell?.components ?? {});
            setSchool(existingSpell?.school ?? SpellSchool.Abjuration);
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
        let newId = existingSpell ? id : generateId(currentEditCharacterSpells.map(s => s.id));
        if(name === ""){
            setError("Name field is required.");
            return;
        }
        if(isWhitespaceOnly(name)){
            setError("Name cannot be just whitespace.");
            return;
        }
        if(currentEditCharacter === null) {
            return;
        }
        let shouldCreateNewId = existingSpell?.shouldCreateNewId ?? false;
        if(!shouldCreateNewId){
            shouldCreateNewId = !existingSpell;
        }
        const newSpell: CharacterSpellRequest = {
            id: newId,
            name: name,
            description: description,
            level: level,
            castingTime: castingTime,
            range: range,
            duration: duration,
            components: components,
            school: school,
            shouldCreateNewId: shouldCreateNewId
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

    return <Dialog open={open} disableEscapeKeyDown fullWidth maxWidth={"lg"}>
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
                    <SpellNameEdit name={name} setName={setName}/>
                </div>
                <div className={"properties"}>
                    <SpellLevelEdit level={level} setLevel={setLevel}/>
                    <SpellCastingTimeEdit castingTime={castingTime} setCastingTime={setCastingTime}/>
                    <SpellRangeEdit range={range} setRange={setRange}/>
                    <SpellDurationEdit duration={duration} setDuration={setDuration}/>
                    <SpellComponentsEdit components={components} setComponents={setComponents}/>
                    <SpellSchoolEdit school={school} setSchool={setSchool}/>
                </div>
                <div className={"description"}>
                    <SpellDescriptionEdit description={description} setDescription={setDescription}/>
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
