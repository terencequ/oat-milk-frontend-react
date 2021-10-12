import {FC} from "react";
import CharacterEditSummary from "./edit/CharacterEditSummary";
import CharacterViewSummary from "./view/CharacterViewSummary";

const CharacterSummary: FC<{editMode: boolean}> = ({editMode}) => {
  return <>
    {editMode
      ? <CharacterEditSummary/>
      : <CharacterViewSummary/>
    }
  </>
}

export default CharacterSummary;