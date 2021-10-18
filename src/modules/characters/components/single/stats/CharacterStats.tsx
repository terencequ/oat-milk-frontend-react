import React, {FC} from "react";
import CharacterStatsEdit from "./edit/CharacterStatsEdit";
import CharacterStatsView from "./view/CharacterStatsView";

const CharacterStats: FC<{ editMode: boolean, }> = ({editMode}) => {
    return <>
        {editMode
            ? <CharacterStatsEdit/>
            : <CharacterStatsView/>
        }
    </>
}

export default CharacterStats;