import {FC} from "react";
import {useAppSelector} from "../../../../../../redux/hooks";
import CharacterSpellView from "./CharacterSpellView";
import {StyledCharacterSpells, StyledCharacterSpellsContainer} from "../CharacterSpellsStyles";
import {Typography} from "@mui/material";

const CharacterSpellsView: FC = () => {
  const currentCharacterSpells = useAppSelector(state => state.characters.currentCharacter)?.spells ?? [];

  return <StyledCharacterSpells>
    {currentCharacterSpells.length === 0
        ? <Typography textAlign={"center"}>This character has no spells!</Typography>
        : <StyledCharacterSpellsContainer totalItemCount={currentCharacterSpells.length}>
          {currentCharacterSpells.map((spell, index) => <CharacterSpellView key={index} spell={spell}/>)}
        </StyledCharacterSpellsContainer>
    }

  </StyledCharacterSpells>
}

export default CharacterSpellsView;
