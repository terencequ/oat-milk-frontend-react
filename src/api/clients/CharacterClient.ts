import {
    CharacterApi,
    CharacterRequest,
    CharacterResponse,
    ErrorResponse
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {processError} from "./helpers/ErrorHelper";

export const createCharacterClient = (): CharacterApi => {
    return new CharacterApi(undefined, process.env.REACT_APP_API_URL);
}

export async function createCharacter(request: CharacterRequest): Promise<[CharacterResponse | null, ErrorResponse | null]> {
    try {
        const res = await createCharacterClient().characterFullPost(request);
        return [res.data ?? null, null];
    } catch (err) {
        return [null, processError(err)];
    }
}

export async function deleteCharacter(id: string): Promise<[null, ErrorResponse | null]> {
    try {
        await createCharacterClient().characterFullIdDelete(id);
        return [null, null];
    } catch (err) {
        return [null, processError(err)];
    }
}

export async function getCharacterByIdentifier(identifier: string): Promise<[CharacterResponse | null, ErrorResponse | null]> {
    try {
        const res = await createCharacterClient().characterFullIdentifierGet(identifier);
        return [res.data ?? null, null];
    } catch (err) {
        return [null, processError(err)];
    }
}