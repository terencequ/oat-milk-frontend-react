import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CharacterRequest, CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

export interface CharactersState {
    characterSummaries: CharacterSummaryResponse[];
    currentCharacter: CharacterResponse | null;
    currentEditCharacter: CharacterRequest | null;
}

const initialState: CharactersState = {
    characterSummaries: [],
    currentCharacter: null,
    currentEditCharacter: null,
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        // get character summaries
        setCharacterSummaries: (state: CharactersState, action: PayloadAction<CharacterSummaryResponse[]>) => {
            state.characterSummaries = action.payload;
        },
        setCurrentCharacter: (state: CharactersState, action: PayloadAction<CharacterResponse | null>) => {
            state.currentCharacter = action.payload;
        },
        setCurrentEditCharacter: (state: CharactersState, action: PayloadAction<CharacterRequest | null>) => {
            state.currentEditCharacter = action.payload;
        },
    }
})

export default charactersSlice.reducer;
export const { setCharacterSummaries, setCurrentCharacter, setCurrentEditCharacter } = charactersSlice.actions;