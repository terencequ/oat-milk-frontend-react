import {FC, useCallback, useEffect, useState} from "react";
import {CharacterSpellRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {StyledCharacterSpell, StyledCharacterSpellContents, StyledCharacterSpellName} from "../CharacterSpellsStyles";
import {Button, ButtonGroup, CardActionArea, Collapse, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {
    getEditCharacterFormError,
    setCurrentEditCharacter,
    setCurrentEditCharacterFormError
} from "../../../../../../redux/slices/charactersSlice";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import {themeSpacing} from "../../../../../core/styles/GlobalStyles";
import CharacterEditAbilityScore
    from "../../stats/edit/ability-scores-and-proficiencies/CharacterStatsEditAbilityScore";
import CharacterSpellCreateOrEditDialog from "../dialogs/CharacterSpellCreateOrEditDialog";
import DeleteDialog from "../../../../../shared/components/dialogs/DeleteDialog";

const StyledDisplay = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`

const StyledActionArea = styled(CardActionArea)`
  display: grid;
  grid-template-columns: 1fr auto;
`

const StyledSummaryActions = styled(ButtonGroup)`
  align-self: center;
  margin: 0 ${themeSpacing(2)};
`

const CharacterSpellEdit: FC<{spell: CharacterSpellRequest}> = (props) => {
    const dispatch = useAppDispatch();
    const [expand, setExpand] = useState(false); // For expandable info
    const [editDialogOpen, setEditDialogOpen] = useState(false); // For edit dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // For edit dialog
    const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);

    /** Toggle expansion on the more info section. */
    const toggleExpand = () => {
        setExpand(!expand);
    }

    /** Edit character in Character page. */
    const editThis = () => {
        setEditDialogOpen(true);
    }

    /** Delete character. */
    const deleteThis = async () => {
        if(currentEditCharacter !== null){
            dispatch(setCurrentEditCharacter({
                ...currentEditCharacter,
                spells: currentEditCharacter.spells?.filter(s => {
                    return s.id !== props.spell.id;
                })
            }))
        }
    }

    return <StyledCharacterSpell>
        {/** Summary Information */}
        <StyledDisplay>
            <StyledActionArea onClick={toggleExpand}>
                <StyledCharacterSpellName>
                    <Typography variant={"subtitle1"}>{props.spell.name}</Typography>
                </StyledCharacterSpellName>
            </StyledActionArea>
            <StyledSummaryActions disableElevation={true} variant="text" color="inherit" aria-label="text primary button group">
                <Button onClick={editThis}><Edit/></Button>
                <Button onClick={() => setDeleteDialogOpen(true)} color={"error"}><Delete/></Button>
            </StyledSummaryActions>
        </StyledDisplay>

        {/** More Information */}
        <Collapse in={expand}>
            <StyledCharacterSpellContents>
                <Typography variant={"h2"} gutterBottom>{props.spell.name}</Typography>
                <Typography variant={"h3"} gutterBottom>Description</Typography>
                <Typography sx={{wordWrap: "break-word", whiteSpace: "pre-line"}}>{props.spell.description}</Typography>
            </StyledCharacterSpellContents>
        </Collapse>
        <CharacterSpellCreateOrEditDialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            existingSpell={props.spell}/>
        <DeleteDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onDelete={deleteThis}
            subjectType={"Spell"}
            subjectName={props.spell.name ?? ""}/>
    </StyledCharacterSpell>
}

export default CharacterSpellEdit;
