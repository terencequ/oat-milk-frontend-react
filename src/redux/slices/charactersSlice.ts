import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk/dist/api";

interface CharactersState {
    characterSummaries: CharacterSummaryResponse[];
}

const initialState: CharactersState = {
    characterSummaries: [],
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        // get character summaries
        setCharacterSummaries: (state, action: PayloadAction<CharacterSummaryResponse[]>) => {
            state.characterSummaries = action.payload;
        },
    }
})

export default charactersSlice.reducer;
export const { setCharacterSummaries } = charactersSlice.actions;