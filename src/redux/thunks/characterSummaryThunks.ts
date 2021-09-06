import {
    CharacterSummaryApi,
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {processError} from "./helpers/errorHelper";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {failRequest, startRequest, succeedRequest} from "../slices/requestsSlice";
import {setCharacterSummaries} from "../slices/charactersSlice";

export const createCharacterSummaryClient = (): CharacterSummaryApi => {
    return new CharacterSummaryApi(undefined, process.env.REACT_APP_API_URL);
}

export function getCharacterSummaries(): ThunkAction<void, RootState, unknown, AnyAction> {
    return async dispatch => {
        try {
            dispatch(startRequest(getCharacterSummaries.name))
            const res = await createCharacterSummaryClient().characterSummaryGet();
            dispatch(succeedRequest(getCharacterSummaries.name))
            dispatch(setCharacterSummaries(res.data?.items ?? []));
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([getCharacterSummaries.name, errorRes.message ?? "An unexpected error has occurred!"]))
        }
    }
}