import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

interface CharactersState {
    characterSummaries: CharacterSummaryResponse[];
    currentCharacter: CharacterResponse | null;
}

const initialState: CharactersState = {
    characterSummaries: [],
    currentCharacter: null
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        // get character summaries
        setCharacterSummaries: (state, action: PayloadAction<CharacterSummaryResponse[]>) => {
            state.characterSummaries = action.payload;
        },
        setCurrentCharacter: (state, action: PayloadAction<CharacterResponse | null>) => {
            state.currentCharacter = action.payload;
        }
    }
})

export default charactersSlice.reducer;
export const { setCharacterSummaries, setCurrentCharacter } = charactersSlice.actions;