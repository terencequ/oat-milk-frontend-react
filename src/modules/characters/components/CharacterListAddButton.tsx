import {FC} from "react";
import styled from "@emotion/styled";
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {createCharacter} from "../../../redux/thunks/characterThunks";
import {useAppDispatch} from "../../../redux/hooks";

const ButtonContainer = styled(Button)`
  margin: 2vw auto;
  font-size: 1rem;
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
    return <>
        <ButtonContainer onClick={createBlankCharacter} color={"inherit"} startIcon={<Add fontSize={"inherit"}/>}>
            Add a new character
        </ButtonContainer>
    </>
}

export default CharacterListAddButton;