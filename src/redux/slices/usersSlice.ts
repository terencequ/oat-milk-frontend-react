import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {useAppSelector} from "../hooks";
import {TypedUseSelectorHook} from "react-redux";
import {RootState} from "../store";

export interface UsersState {
    authToken: string | null;
    user: UserResponse | null;
}

const initialState: UsersState = {
    authToken: null,
    user: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // logout
        logout: (state) => {
            state.authToken = null;
            state.user = null;
        },
        setAuthToken(state, action: PayloadAction<string>) {
            state.authToken = action.payload;
        },
        setUser(state, action: PayloadAction<UserResponse>) {
            state.user = action.payload;
        },
    }
})

export default usersSlice.reducer;
export const { logout, setAuthToken, setUser } = usersSlice.actions;

export const isLoggedInSelector = (state: UsersState) => {
    return !(state.authToken === null || state.authToken === "");
}