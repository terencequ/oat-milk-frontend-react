import {Action, createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import User from "../../modules/users/models/user";
import {ErrorResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {ActionStatus} from "../models/actionStatus";
import {createUserClient} from "../../api/clients/UserClient";

interface UsersState {
    authToken: string | null;
    user: User | null;
    loginStatus: ActionStatus,
    loginError: string | null;
}

const initialState: UsersState = {
    authToken: null,
    user: null,
    loginStatus: ActionStatus.NotStarted,
    loginError: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // logout
        logoutStarted: (state) => {
            state.authToken = null;
            state.user = null;
            state.loginStatus = ActionStatus.NotStarted;
            state.loginError = null;
        },

        // login
        loginStarted: (state) => {
            state.loginStatus = ActionStatus.InProgress;
            state.loginError = null;
        },
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.loginStatus = ActionStatus.Success;
            state.authToken = action.payload;
            state.loginError = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loginStatus = ActionStatus.Failure;
            state.loginError = action.payload;
            state.authToken = null;
            state.loginError = null;
        }
    }
})

export default usersSlice.reducer;

// Thunks
export const logout = () => (dispatch: ThunkDispatch<UsersState, void, Action>) => {
    const { logoutStarted } = usersSlice.actions;
    dispatch(logoutStarted());
}

export const login = (email: string, password: string) => async (dispatch: ThunkDispatch<UsersState, void, Action>) => {
    const { loginStarted, loginSuccess, loginFailure } = usersSlice.actions;
    dispatch(loginStarted())
    try {
        const response = await createUserClient().userLoginPost({email, password});
        const token = response.data.authToken;
        dispatch(token ? loginSuccess(token) : loginFailure("Login failed. No valid token was received.")); // Possibly dispatch a toaster event
    } catch (err) {
        if(err.status && err.status === 401){
            dispatch(logout);
        }
        const errorResponse = err.error as ErrorResponse;
        if(errorResponse?.message){
            dispatch(loginFailure(errorResponse.message)); // Possibly dispatch a toaster event
        } else {
            dispatch(loginFailure("An unexpected error has occurred.")) // Possibly dispatch a toaster event
        }
    }
}