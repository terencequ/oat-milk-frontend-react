import {
    CharacterApi,
    CharacterRequest,
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {mapCharacterResponseToRequest} from "../../api/helpers/characterMapping";
import {processError} from "./helpers/errorHelper";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {failRequest, startRequest, succeedRequest} from "../slices/requestsSlice";
import {getCharacterSummaries} from "./characterSummaryThunks";
import {setCurrentCharacter, setCurrentEditCharacter} from "../slices/charactersSlice";

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
            dispatch(startRequest(deleteCharacter.name));
            await createCharacterClient().characterFullIdDelete(id);
            dispatch(succeedRequest(deleteCharacter.name));
            await dispatch(getCharacterSummaries());
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([deleteCharacter.name, errorRes.message ?? "An unexpected error has occurred!"]))
        }
    }
}

export function updateCharacter(id: string, request: CharacterRequest): ThunkAction<void, RootState, unknown, AnyAction> {
    return async dispatch => {
        try {
            dispatch(startRequest(updateCharacter.name));
            await createCharacterClient().characterFullIdPut(id, request);
            dispatch(succeedRequest(updateCharacter.name));
            await dispatch(getCharacterSummaries());
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([updateCharacter.name, errorRes.message ?? "An unexpected error has occurred!"]))
        }
    }
}

export function getCharacterByIdentifierAsCurrent(identifier: string): ThunkAction<void, RootState, unknown, AnyAction> {
    return async dispatch => {
        try {
            dispatch(startRequest(getCharacterByIdentifierAsCurrent.name));
            const res = await createCharacterClient().characterFullIdentifierGet(identifier);
            dispatch(succeedRequest(getCharacterByIdentifierAsCurrent.name));
            dispatch(setCurrentCharacter(res.data));
            dispatch(setCurrentEditCharacter(mapCharacterResponseToRequest(res.data)));
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([getCharacterByIdentifierAsCurrent.name, errorRes.message ?? "An unexpected error has occurred!"]));
        }
    }
}