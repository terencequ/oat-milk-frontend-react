import {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {StyledCharacterSpells, StyledCharacterSpellsContainer} from "../CharacterSpellsStyles";
import CharacterSpellEdit from "./CharacterSpellEdit";
import {Button} from "@mui/material";
import {setCurrentEditCharacter} from "../../../../../../redux/slices/charactersSlice";
import CharacterSpellCreateOrEditDialog from "../dialogs/CharacterSpellCreateOrEditDialog";

const CharacterSpellsEdit: FC = () => {
  const dispatch = useAppDispatch();

  const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);
  const currentEditCharacterSpells = currentEditCharacter?.spells ?? [];

  const [open, setOpen] = useState(false);

  return <StyledCharacterSpells>
    <StyledCharacterSpellsContainer totalItemCount={currentEditCharacterSpells.length}>
      {currentEditCharacterSpells.map((spell, index) => <CharacterSpellEdit key={index} spell={spell}/>)}
      <Button variant={"contained"} onClick={() => setOpen(true)}>Create New Spell</Button>
    </StyledCharacterSpellsContainer>
    <CharacterSpellCreateOrEditDialog open={open} onClose={() => setOpen(false)}/>
  </StyledCharacterSpells>
}

export default CharacterSpellsEdit;
