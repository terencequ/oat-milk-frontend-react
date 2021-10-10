import {Edit} from "@material-ui/icons";
import {FC} from "react";
import styled from "@emotion/styled";
import {Button, Theme} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import {createCharacter} from "../../../../redux/thunks/characterThunks";
import {useAppDispatch} from "../../../../redux/hooks";
import {FloatingAction} from "../../../core/styles/GlobalStyles";

const ButtonContainer = styled(Button)`
  font-size: 1rem;
  z-index: 1;
`

const CharacterListAddButton: FC = () => {
    const dispatch = useAppDispatch();
    const createBlankCharacter = async () => {
        dispatch(createCharacter({
            name: "new character",
            attributes: null,
            abilityScores: null,
            abilityScoreProficiencies: null,
            descriptions: null
        }));
    }
    return <FloatingAction>
        <ButtonContainer onClick={createBlankCharacter} variant={"contained"} color={"secondary"} startIcon={<Add fontSize={"inherit"}/>}>
            Create
        </ButtonContainer>
    </FloatingAction>
}

export default CharacterListAddButton;