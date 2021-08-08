import {Action, createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import {ErrorResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {createCharacterSummaryClient} from "../../api/clients/CharacterSummaryClient";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk/dist/api";
import {ActionStatus} from "../models/actionStatus";
import {logout} from "./usersSlice";

interface CharactersState {
    characterSummaries: CharacterSummaryResponse[];
    getCharacterSummariesStatus: ActionStatus;
    getCharacterSummariesError: string | null;
}

const initialState: CharactersState = {
    characterSummaries: [],
    getCharacterSummariesStatus: ActionStatus.NotStarted,
    getCharacterSummariesError: null
}

export const charactersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // get character summaries
        getCharacterSummariesStarted: (state) => {
            //state.characterSummaries = [];
            state.getCharacterSummariesStatus = ActionStatus.InProgress;
            state.getCharacterSummariesError = null;
        },
        getCharacterSummariesSuccess: (state, action: PayloadAction<CharacterSummaryResponse[]>) => {
            state.characterSummaries = action.payload;
            state.getCharacterSummariesStatus = ActionStatus.Success;
            state.getCharacterSummariesError = null;
        },
        getCharacterSummariesFailure: (state, action: PayloadAction<string>) => {
            //state.characterSummaries = [];
            state.getCharacterSummariesStatus = ActionStatus.Failure;
            state.getCharacterSummariesError = action.payload;
        }
    }
})

export default charactersSlice.reducer;

// Thunks
/**
 * Get character summaries (mainly used by home page and character list page).
 */
export const getCharacterSummaries = () => async (dispatch: ThunkDispatch<CharactersState, void, Action>) => {
    const { getCharacterSummariesStarted, getCharacterSummariesSuccess, getCharacterSummariesFailure } = charactersSlice.actions;
    dispatch(getCharacterSummariesStarted())
    try {
        const response = await createCharacterSummaryClient().characterSummaryGet();
        const summaries = response.data.items;
        dispatch(getCharacterSummariesSuccess(summaries ?? []));
    } catch (err) {
        const errorResponse = err.error as ErrorResponse;
        if(errorResponse?.message){
            dispatch(getCharacterSummariesFailure(errorResponse.message));
        } else {
            dispatch(getCharacterSummariesFailure("An unexpected error has occurred."))
        }
    }
}