import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CharacterRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {useAppSelector} from "../hooks";
import {anyErrors, getError} from "./helpers/selectorHelper";

export interface CharacterState {
    currentCharacter: CharacterResponse | null;
    currentEditCharacter: CharacterRequest | null;
    currentEditCharacterFormErrors: { [id: string] : string | null }
}

const initialState: CharacterState = {
    currentCharacter: null,
    currentEditCharacter: null,
    currentEditCharacterFormErrors: {}
}

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setCurrentCharacter: (state: CharacterState, action: PayloadAction<CharacterResponse | null>) => {
            state.currentCharacter = action.payload;
        },
        setCurrentEditCharacter: (state: CharacterState, action: PayloadAction<CharacterRequest | null>) => {
            state.currentEditCharacter = action.payload;
        },
        setCurrentEditCharacterFormError: (state: CharacterState, action: PayloadAction<{id: string, error: string | null}>) => {
            state.currentEditCharacterFormErrors[action.payload.id] = action.payload.error;
        }
    }
})

export const getEditCharacterFormError = (id: string) => {
    return (): string | null => {
        const errors = useAppSelector(state => state.characters.currentEditCharacterFormErrors);
        return getError(id, errors);
    }
}

export const anyCurrentEditCharacterFormErrors = () => {
    return () => {
        const errors = useAppSelector(state => state.characters.currentEditCharacterFormErrors);
        return anyErrors(errors);
    }
}

export default characterSlice.reducer;
export const { setCurrentCharacter, setCurrentEditCharacter, setCurrentEditCharacterFormError } = characterSlice.actions;