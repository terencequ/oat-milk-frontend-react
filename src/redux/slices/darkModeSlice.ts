import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DarkModeState {
    darkMode: boolean;
}

const initialState: DarkModeState = {
    darkMode: true
}

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        clearDarkMode: (state) => {
            state.darkMode = initialState.darkMode;
        },
    }
})

export const { setDarkMode, clearDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;