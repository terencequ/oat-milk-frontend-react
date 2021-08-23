import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ThemeState {
    darkMode: boolean;
    drawerOpen: boolean;
    drawerMinimised: boolean;
    appBarTitle: string;
    currentBackground: string;
}

const initialState: ThemeState = {
    darkMode: true,
    drawerOpen: true,
    drawerMinimised: false,
    appBarTitle: "Home",
    currentBackground: `url("images/background-entry.svg")`,
}

export const userInterfaceSlice = createSlice({
    name: 'userInterface',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        setDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        },
        setDrawerMinimised: (state, action: PayloadAction<boolean>) => {
            state.drawerMinimised = action.payload;
        },
        setAppBarTitle: (state, action: PayloadAction<string>) => {
            state.appBarTitle = action.payload;
        },
        setBackground: (state, action: PayloadAction<string>) => {
            state.currentBackground = action.payload;
        },
    }
})

export const { setDarkMode, setDrawerOpen, setDrawerMinimised, setAppBarTitle, setBackground } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;