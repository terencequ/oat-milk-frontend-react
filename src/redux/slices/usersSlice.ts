import {Action, createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import User from "../../modules/users/models/user";
import {ErrorResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {ActionStatus} from "../models/actionStatus";
import {createUserClient} from "../../api/clients/UserClient";
// TODO: There's a lot of code duplication in this file.

interface UsersState {
    authToken: string | null;
    user: User | null;
    loginStatus: ActionStatus;
    loginError: string | null;
    registerStatus: ActionStatus;
    registerError: string | null;
}

const initialState: UsersState = {
    authToken: null,
    user: null,
    loginStatus: ActionStatus.NotStarted,
    loginError: null,
    registerStatus: ActionStatus.NotStarted,
    registerError: null
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
        loginClearProgress: (state) => {
            state.loginStatus = ActionStatus.NotStarted;
            state.loginError = null;
        },
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
        },

        // register
        registerStarted: (state) => {
            state.registerStatus = ActionStatus.InProgress;
            state.registerError = null;
        },
        registerSuccess: (state, action: PayloadAction<string>) => {
            state.registerStatus = ActionStatus.Success;
            state.authToken = action.payload;
            state.registerError = null;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.registerStatus = ActionStatus.Failure;
            state.registerError = action.payload;
            state.authToken = null;
            state.registerError = null;
        }
    }
})

export default usersSlice.reducer;

// Thunks
export const usersClearProgress = () => (dispatch: ThunkDispatch<UsersState, void, Action>) => {
    const { loginClearProgress } = usersSlice.actions;
    dispatch(loginClearProgress());
}

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

export const register = (displayName: string, email: string, password: string) => async (dispatch: ThunkDispatch<UsersState, void, Action>) => {
    const { registerStarted, registerSuccess, registerFailure } = usersSlice.actions;
    dispatch(registerStarted())
    try {
        const response = await createUserClient().userLoginPost({email, password});
        const token = response.data.authToken;
        dispatch(token ? registerSuccess(token) : registerFailure("Login failed. No valid token was received.")); // Possibly dispatch a toaster event
    } catch (err) {
        if(err.status && err.status === 401){
            dispatch(logout);
        }
        const errorResponse = err.error as ErrorResponse;
        if(errorResponse?.message){
            dispatch(registerFailure(errorResponse.message)); // Possibly dispatch a toaster event
        } else {
            dispatch(registerFailure("An unexpected error has occurred.")) // Possibly dispatch a toaster event
        }
    }
}