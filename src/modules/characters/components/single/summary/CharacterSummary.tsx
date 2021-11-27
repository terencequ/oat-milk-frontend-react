import {FC} from "react";
import CharacterSummaryEdit from "./edit/CharacterSummaryEdit";
import CharacterSummaryView from "./view/CharacterSummaryView";

const CharacterSummary: FC<{editMode: boolean}> = ({editMode}) => {
  return <>
    {editMode
      ? <CharacterSummaryEdit/>
      : <CharacterSummaryView/>
    }
  </>
}

export default CharacterSummary;