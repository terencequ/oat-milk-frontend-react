import {
  CharacterSpellRequest,
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";
import {anyErrors, getError} from "./helpers/selectorHelper";

export interface CharacterSpellState {
  currentCharacterSpells: CharacterSpellRequest[] | null;
  currentEditCharacterSpells: CharacterSpellRequest[] | null;
  currentEditCharacterSpellsFormErrors: { [id: string] : string | null }
}

const initialState: CharacterSpellState = {
  currentCharacterSpells: [],
  currentEditCharacterSpells: [],
  currentEditCharacterSpellsFormErrors: {},
}

export const characterSpellSlice = createSlice({
  name: 'characterSpell',
  initialState,
  reducers: {
    setCurrentCharacter: (state: CharacterSpellState, action: PayloadAction<CharacterSpellRequest[]>) => {
      state.currentCharacterSpells = action.payload;
    },
    setCurrentEditCharacter: (state: CharacterSpellState, action: PayloadAction<CharacterSpellRequest[] | null>) => {
      state.currentEditCharacterSpells = action.payload;
    },
    setCurrentEditCharacterFormError: (state: CharacterSpellState, action: PayloadAction<{id: string, error: string | null}>) => {
      state.currentEditCharacterSpellsFormErrors[action.payload.id] = action.payload.error;
    }
  }
})

export const getEditCharacterSpellFormError = (id: string) => {
  return (): string | null => {
    const errors = useAppSelector(state => state.characters.currentEditCharacterFormErrors);
    return getError(id, errors);
  }
}

export const anyCurrentEditCharacterSpellFormErrors = () => {
  return () => {
    const errors = useAppSelector(state => state.characters.currentEditCharacterFormErrors);
    return anyErrors(errors);
  }
}