import {
    CharacterApi,
    CharacterRequest,
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {processError} from "./helpers/errorHelper";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {failRequest, startRequest, succeedRequest} from "../slices/requestsSlice";
import {getCharacterSummaries} from "./characterSummaryThunks";
import {setCurrentCharacter} from "../slices/charactersSlice";

export const createCharacterClient = (): CharacterApi => {
    return new CharacterApi(undefined, process.env.REACT_APP_API_URL);
}

export function createCharacter(request: CharacterRequest): ThunkAction<void, RootState, unknown, AnyAction> {
    return async dispatch => {
        try {
            dispatch(startRequest(createCharacter.name))
            await createCharacterClient().characterFullPost(request);
            dispatch(succeedRequest(createCharacter.name))
            await dispatch(getCharacterSummaries());
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([createCharacter.name, errorRes.message ?? "An unexpected error has occurred!"]))
        }
    }
}

export function deleteCharacter(id: string): ThunkAction<void, RootState, unknown, AnyAction> {
    return async dispatch => {
        try {
            dispatch(startRequest(deleteCharacter.name))
            await createCharacterClient().characterFullIdDelete(id);
            dispatch(succeedRequest(deleteCharacter.name))
            await dispatch(getCharacterSummaries());
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([deleteCharacter.name, errorRes.message ?? "An unexpected error has occurred!"]))
        }
    }
}

export function getCharacterByIdentifier(identifier: string): ThunkAction<void, RootState, unknown, AnyAction> {
    return async dispatch => {
        try {
            dispatch(startRequest(getCharacterByIdentifier.name))
            const res = await createCharacterClient().characterFullIdentifierGet(identifier);
            dispatch(succeedRequest(getCharacterByIdentifier.name))
            dispatch(setCurrentCharacter(res.data))
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([getCharacterByIdentifier.name, errorRes.message ?? "An unexpected error has occurred!"]))
        }
    }
}