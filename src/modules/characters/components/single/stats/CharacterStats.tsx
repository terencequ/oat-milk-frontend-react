import styled from "@emotion/styled";
import {Button, Card, IconButton, Typography} from "@material-ui/core";
import {Edit} from "@material-ui/icons";
import Add from "@material-ui/icons/Add";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import { FloatingAction } from "modules/core/styles/GlobalStyles";
import {FC, useState} from "react";
import CharacterStatsEdit from "./edit/CharacterStatsEdit";
import CharacterStatsView from "./view/CharacterStatsView";

const StyledButton = styled(Button)`

`

const CharacterStats: FC<{character: CharacterResponse}> = ({character}) => {
    const [editMode, setEditMode] = useState(true);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    return <>
        <FloatingAction>
            <StyledButton
                onClick={toggleEditMode}
                variant={"contained"}
                color={"secondary"}
                startIcon={<Edit fontSize={"inherit"}/>}
            >
                {editMode ? "View Stats" : "Edit Stats"}
            </StyledButton>
        </FloatingAction>
        {editMode
            ? <CharacterStatsEdit character={character}/>
            : <CharacterStatsView character={character}/>
        }
    </>
}

export default CharacterStats;