import {Edit, Restore, Save, Visibility} from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {CharacterRequest, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import { StyledFloatingAction } from "modules/core/styles/GlobalStyles";
import {FC, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createCharacter, getCharacterByIdentifier, updateCharacter} from "../../../../../redux/thunks/characterThunks";
import FloatingActionList, {FloatingActionModel} from "../../../../shared/components/FloatingActionList";
import CharacterStatsEdit from "./edit/CharacterStatsEdit";
import CharacterStatsView from "./view/CharacterStatsView";

const CharacterStats: FC<{character: CharacterResponse}> = ({character}) => {
    const initialState : CharacterRequest = {
        name: character.name,
        abilityScores: character.abilityScores,
        abilityScoreProficiencies: character.abilityScores.flatMap(as => as.proficiencies.map(p => ({
            abilityScoreId: as.id,
            ...p
        }))),
        attributes: character.attributes,
        descriptions: character.descriptions
    };

    const [editCharacter, setEditCharacter] = useState<CharacterRequest>(initialState);
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const saveCharacter = async () => {
        console.log("Saving character")
        await dispatch(updateCharacter(character.id, editCharacter));
        await dispatch(getCharacterByIdentifier(character.identifier));
        setEditMode(false);
    }

    const actions: FloatingActionModel[] = [];
    if(editMode){
        actions.push({
            action: () => {setEditCharacter(initialState)},
            icon: <Restore/>,
            color: "primary",
            text: "Reset Character"
        });
        actions.push({
            action: () => saveCharacter(),
            icon: <Save/>,
            color: "primary",
            text: "Save Character"
        })
    }
    actions.push({
        action: () => setEditMode(false),
        icon: <Edit/>,
        text: "View Stats"
    })
    actions.push({
        action: () => setEditMode(true),
        icon: <Edit/>,
        text: "Edit Stats"
    })

    return <>
        <FloatingActionList actions={actions} active={editMode ? 3 : 0}/>
        {editMode
            ? <CharacterStatsEdit originalCharacter={character} character={editCharacter} setCharacter={setEditCharacter}/>
            : <CharacterStatsView character={character}/>
        }
    </>
}

export default CharacterStats;