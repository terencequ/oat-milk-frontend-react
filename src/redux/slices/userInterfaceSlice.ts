import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserInterfaceState {
    darkMode: boolean;
    drawerOpen: boolean;
    drawerMinimised: boolean;
    appBarTitle: string;
    currentBackground: string;
    isLoading: boolean;
}

const initialState: UserInterfaceState = {
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
        setDarkMode: (state: UserInterfaceState, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        setDrawerOpen: (state: UserInterfaceState, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        },
        setDrawerMinimised: (state: UserInterfaceState, action: PayloadAction<boolean>) => {
            state.drawerMinimised = action.payload;
        },
        setAppBarTitle: (state: UserInterfaceState, action: PayloadAction<string>) => {
            state.appBarTitle = action.payload;
        },
        setBackground: (state: UserInterfaceState, action: PayloadAction<string>) => {
            state.currentBackground = action.payload;
        },
        setLoading: (state: UserInterfaceState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
})

export const { setDarkMode, setDrawerOpen, setDrawerMinimised, setAppBarTitle, setBackground, setLoading } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;
