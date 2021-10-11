import {CharacterRequest, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {updateCharacter} from "../../../../../../redux/thunks/characterThunks";
import { StyledStats } from "../CharacterStatsStyles";
import CharacterStatsEditAbilityScoresAndProficiencies from "./ability-scores-and-proficiencies/CharacterStatsEditAbilityScoresAndProficiencies";
import CharacterStatsEditAttributes from "./attributes/CharacterStatsEditAttributes";
import CharacterStatsEditProps from "./models/CharacterStatsEditProps";

const CharacterStatsEdit: FC<CharacterStatsEditProps> = ({originalCharacter, character, setCharacter}) => {
    const dispatch = useDispatch();
    return <>
        <StyledStats>
            <CharacterStatsEditAbilityScoresAndProficiencies
                originalCharacter={originalCharacter}
                character={character}
                setCharacter={setCharacter}/>
            <CharacterStatsEditAttributes
                originalCharacter={originalCharacter}
                character={character}
                setCharacter={setCharacter}/>
        </StyledStats>
    </>
}

export default CharacterStatsEdit;