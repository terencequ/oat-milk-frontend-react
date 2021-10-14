import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CharacterRequest, CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {getInitialRequest} from "../actions/request";
import {useAppSelector} from "../hooks";

export interface CharactersState {
    characterSummaries: CharacterSummaryResponse[];
    currentCharacter: CharacterResponse | null;
    currentEditCharacter: CharacterRequest | null;
    currentEditCharacterFormErrors: { [id: string] : string | null }
}

const initialState: CharactersState = {
    characterSummaries: [],
    currentCharacter: null,
    currentEditCharacter: null,
    currentEditCharacterFormErrors: {}
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
        setCurrentEditCharacterFormError: (state: CharactersState, action: PayloadAction<{id: string, error: string | null}>) => {
            state.currentEditCharacterFormErrors[action.payload.id] = action.payload.error;
        }
    }
})

export const getEditCharacterFormError = (id: string) => {
    return (): string | null => {
        const result = useAppSelector(state => state.characters.currentEditCharacterFormErrors);
        return !!Object.keys(result).find(v => v === id) ? result[id] : null;
    }
}

export const anyCurrentEditCharacterFormErrors = () => {
    return () => {
        const result = useAppSelector(state => state.characters.currentEditCharacterFormErrors);
        for(const id in result){
            if(!!result[id]){
                return true;
            }
        }
        return false;
    }
}

export default charactersSlice.reducer;
export const { setCharacterSummaries, setCurrentCharacter, setCurrentEditCharacter, setCurrentEditCharacterFormError } = charactersSlice.actions;