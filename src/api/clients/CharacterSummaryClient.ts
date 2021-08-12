import {
    CharacterSummaryApi, ErrorResponse,
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {processError} from "./helpers/ErrorHelper";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk/dist/api";

export const createCharacterSummaryClient = (): CharacterSummaryApi => {
    return new CharacterSummaryApi(undefined, process.env.REACT_APP_API_URL);
}

export async function getCharacterSummaries (): Promise<[CharacterSummaryResponse[] | null, ErrorResponse | null]> {
    try {
        const res = await createCharacterSummaryClient().characterSummaryGet();
        return [res.data.items ?? [], null];
    } catch (err) {
        return [null, processError(err)];
    }
}