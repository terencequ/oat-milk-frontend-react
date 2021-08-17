import {FC} from "react";
import styled from "@emotion/styled";
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {createCharacter} from "../../../api/clients/CharacterClient";
import {getCharacterSummaries} from "../../../api/clients/CharacterSummaryClient";
import {setCharacterSummaries} from "../../../redux/slices/charactersSlice";
import {useAppDispatch} from "../../../redux/hooks";

const ButtonContainer = styled(Button)`
  margin: 2vw auto;
  font-size: 1rem;
`

const CharacterListAddButton: FC = () => {
    const dispatch = useAppDispatch();
    const createBlankCharacter = async () => {
        const [, err] = await createCharacter({
            name: "new character",
            attributes: null,
            abilityScores: null,
            abilityScoreProficiencies: null,
            descriptions: null
        })
        if(err){
            console.error(err);
            return;
        }

        const [res2, err2] = await getCharacterSummaries();
        if(err2){
            console.error(err);
            return;
        }
        dispatch(setCharacterSummaries(res2 ?? []));
    }
    return <>
        <ButtonContainer onClick={createBlankCharacter} color={"inherit"} startIcon={<Add fontSize={"inherit"}/>}>
            Add a new character
        </ButtonContainer>
    </>
}

export default CharacterListAddButton;