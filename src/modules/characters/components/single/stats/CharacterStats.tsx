import {Edit, Visibility} from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import { StyledFloatingAction } from "modules/core/styles/GlobalStyles";
import {FC, useEffect, useState} from "react";
import {createCharacter} from "../../../../../redux/thunks/characterThunks";
import FloatingActionList, {FloatingActionModel} from "../../../../shared/components/FloatingActionList";
import CharacterStatsEdit from "./edit/CharacterStatsEdit";
import CharacterStatsView from "./view/CharacterStatsView";

const CharacterStats: FC<{character: CharacterResponse}> = ({character}) => {
    const [editMode, setEditMode] = useState(false);

    const actions: FloatingActionModel[] = [
        {
            action: () => setEditMode(false),
            icon: <Edit/>,
            text: "View Stats"
        },
        {
            action: () => setEditMode(true),
            icon: <Edit/>,
            text: "Edit Stats"
        }
    ]

    return <>
        <FloatingActionList actions={actions} active={editMode ? 1 : 0}/>
        {editMode
            ? <CharacterStatsEdit character={character}/>
            : <CharacterStatsView character={character}/>
        }
    </>
}

export default CharacterStats;