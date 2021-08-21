import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ThemeState {
    darkMode: boolean;
    drawerOpen: boolean;
    appBarTitle: string;
}

const initialState: ThemeState = {
    darkMode: true,
    drawerOpen: true,
    appBarTitle: "Home"
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
        setAppBarTitle: (state, action: PayloadAction<string>) => {
            state.appBarTitle = action.payload;
        }

    }
})

export const { setDarkMode, setDrawerOpen, setAppBarTitle } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;