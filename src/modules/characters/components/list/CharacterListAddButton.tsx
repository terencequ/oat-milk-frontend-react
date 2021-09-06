import {FC} from "react";
import styled from "@emotion/styled";
import {Button} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import {createCharacter} from "../../../../redux/thunks/characterThunks";
import {useAppDispatch} from "../../../../redux/hooks";

const ButtonContainer = styled(Button)`
  font-size: 1rem;
  width: 100%;
  height: 5vh;
  margin: 2vw auto auto;
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
    return <ButtonContainer onClick={createBlankCharacter} variant={"contained"} startIcon={<Add fontSize={"inherit"}/>}>
        Add a new character
    </ButtonContainer>
}

export default CharacterListAddButton;