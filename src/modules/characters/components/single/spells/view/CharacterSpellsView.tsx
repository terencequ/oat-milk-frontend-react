import {FC} from "react";
import {useAppSelector} from "../../../../../../redux/hooks";
import CharacterSpellView from "./CharacterSpellView";
import {StyledCharacterSpells, StyledCharacterSpellsContainer} from "../CharacterSpellsStyles";

const CharacterSpellsView: FC = () => {
  const currentCharacterSpells = useAppSelector(state => state.characters.currentCharacter)?.spells ?? [];
  console.log("spells", currentCharacterSpells);

  return <StyledCharacterSpells>
    <StyledCharacterSpellsContainer totalItemCount={currentCharacterSpells.length}>
      {currentCharacterSpells.map((spell, index) => <CharacterSpellView key={index} spell={spell}/>)}
    </StyledCharacterSpellsContainer>
  </StyledCharacterSpells>
}

export default CharacterSpellsView;
