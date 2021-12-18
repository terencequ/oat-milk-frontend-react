import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

export interface CharacterSummaryState {
  characterSummaries: CharacterSummaryResponse[];
}

const initialState: CharacterSummaryState = {
  characterSummaries: [],
}

export const characterSummarySlice = createSlice({
  name: "characterSummary",
  initialState,
  reducers: {
    setCharacterSummaries: (state: CharacterSummaryState, action: PayloadAction<CharacterSummaryResponse[]>) => {
      state.characterSummaries = action.payload;
    },
  }
})

export default characterSummarySlice.reducer;
export const { setCharacterSummaries } = characterSummarySlice.actions;