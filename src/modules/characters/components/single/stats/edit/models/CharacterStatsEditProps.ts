import {CharacterRequest, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React from "react";

export default interface CharacterStatsEditProps {
    originalCharacter: CharacterResponse;
    character: CharacterRequest;
    setCharacter: React.Dispatch<React.SetStateAction<CharacterRequest>>;
}