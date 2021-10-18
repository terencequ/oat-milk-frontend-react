import {FC} from "react";
import CharacterDescriptionsEdit from "./edit/CharacterDescriptionsEdit";
import CharacterDescriptionsView from "./view/CharacterDescriptionsView";

/**
 * Displays the following information for a character:
 * - Descriptions
 */
const CharacterDescriptions: FC<{editMode: boolean}> = ({editMode}) => {
    return <>
        {editMode
          ? <CharacterDescriptionsEdit/>
          : <CharacterDescriptionsView/>
        }
    </>
}
export default CharacterDescriptions;