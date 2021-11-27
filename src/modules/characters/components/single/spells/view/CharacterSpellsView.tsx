import {FC} from "react";
import {useAppSelector} from "../../../../../../redux/hooks";
import CharacterSpellView from "./CharacterSpellView";

const CharacterSpellsView: FC = () => {
  const currentCharacterSpells = useAppSelector(state => state.characters.currentCharacter)?.spells ?? [];
  console.log(currentCharacterSpells);

  return <>
    {currentCharacterSpells.forEach((spell, index) => <CharacterSpellView key={index} spell={spell}/>)}
  </>
}

export default CharacterSpellsView;