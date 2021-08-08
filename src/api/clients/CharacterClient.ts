import {CharacterApi} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

export const createCharacterClient = (): CharacterApi => {
    return new CharacterApi(undefined, process.env.REACT_APP_API_URL);
}