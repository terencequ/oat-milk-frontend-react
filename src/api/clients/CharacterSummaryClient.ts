import {CharacterSummaryApi} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

export const createCharacterSummaryClient = (): CharacterSummaryApi => {
    return new CharacterSummaryApi(undefined, process.env.REACT_APP_API_URL);
}