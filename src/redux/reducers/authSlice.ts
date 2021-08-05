import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    authToken: string | null;
}

const initialState: AuthState = {
    authToken: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<string>) => {
            state.authToken = action.payload;
        },
        clearAuth: (state) => {
            state.authToken = null;
        },
    }
})

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;