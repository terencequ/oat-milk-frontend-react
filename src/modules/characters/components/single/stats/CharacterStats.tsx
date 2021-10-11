import {Edit, Restore, Save, Visibility} from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {CharacterRequest, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import { StyledFloatingAction } from "modules/core/styles/GlobalStyles";
import React, {FC, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createCharacter, getCharacterByIdentifier, updateCharacter} from "../../../../../redux/thunks/characterThunks";
import FloatingActionList, {FloatingActionModel} from "../../../../shared/components/FloatingActionList";
import CharacterStatsEdit from "./edit/CharacterStatsEdit";
import CharacterStatsView from "./view/CharacterStatsView";

const CharacterStats: FC<{
    character: CharacterResponse,
    editMode: boolean,
    editCharacter: CharacterRequest,
    setEditCharacter: React.Dispatch<React.SetStateAction<CharacterRequest>>;
}> = ({character, editMode, editCharacter, setEditCharacter}) => {
    return <>
        {editMode
            ? <CharacterStatsEdit originalCharacter={character} character={editCharacter} setCharacter={setEditCharacter}/>
            : <CharacterStatsView character={character}/>
        }
    </>
}

export default CharacterStats;