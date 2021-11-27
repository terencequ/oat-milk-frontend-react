import React, {FC} from "react";
import CharacterSpellsEdit from "./edit/CharacterSpellsEdit";
import CharacterSpellsView from "./view/CharacterSpellsView";

const CharacterSpells: FC<{ editMode: boolean, }> = ({editMode}) => {
  return <>
    {editMode
      ? <CharacterSpellsEdit/>
      : <CharacterSpellsView/>
    }
  </>
}

export default CharacterSpells;