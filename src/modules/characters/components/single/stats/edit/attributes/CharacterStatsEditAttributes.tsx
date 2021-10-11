import {CharacterRequest, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {FC} from "react";

const CharacterStatsEditAttributes: FC<{
    originalCharacter: CharacterResponse,
    character: CharacterRequest,
    setCharacter: React.Dispatch<React.SetStateAction<CharacterRequest>>}> = (props) => {
    return <>
        <div></div>
    </>
}

export default CharacterStatsEditAttributes;