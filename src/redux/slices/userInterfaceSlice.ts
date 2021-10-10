import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

interface ThemeState {
    darkMode: boolean;
    drawerOpen: boolean;
    drawerMinimised: boolean;
    appBarTitle: string;
    currentBackground: string;
    isLoading: boolean;
}

const initialState: ThemeState = {
    darkMode: true,
    drawerOpen: true,
    drawerMinimised: false,
    appBarTitle: "Home",
    currentBackground: "inherit",
    isLoading: false
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
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
})

export const { setDarkMode, setDrawerOpen, setDrawerMinimised, setAppBarTitle, setBackground, setLoading } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;