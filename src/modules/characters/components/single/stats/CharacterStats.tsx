import {CharacterRequest, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {FC} from "react";
import {useAppSelector} from "../../../../../redux/hooks";
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