import {CharacterApi, CharacterResponse, ErrorResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {processError} from "./helpers/ErrorHelper";

export const createCharacterClient = (): CharacterApi => {
    return new CharacterApi(undefined, process.env.REACT_APP_API_URL);
}

export async function getCharacterByIdentifier(identifier: string): Promise<[CharacterResponse | null, ErrorResponse | null]> {
    try {
        const res = await createCharacterClient().characterFullIdentifierGet(identifier);
        return [res.data ?? null, null];
    } catch (err) {
        return [null, processError(err)];
    }
}