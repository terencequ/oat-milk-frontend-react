import {Action, createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import User from "../models/user";
import {ErrorResponse, UserApi, UserApiFp} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {ActionStatus} from "../../../redux/models/actionStatus";
import {createUserClient} from "../../../api/clients/UserClient";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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

export const { loginStarted, loginSuccess, loginFailure } = usersSlice.actions;
export default usersSlice.reducer;

// Thunks
export const login = (email: string, password: string) => async (dispatch: ThunkDispatch<UsersState, void, Action>) => {
    dispatch(loginStarted())
    try {
        const response = await createUserClient().userLoginPost({email, password});
        const token = response.data.authToken;
        dispatch(token ? loginSuccess(token) : loginFailure("Login failed. No valid token was received."));
    } catch (err) {
        const errorResponse = err.error as ErrorResponse;
        if(errorResponse.message){
            dispatch(loginFailure(errorResponse.message));
        } else {
            dispatch(loginFailure("An unexpected error has occurred."))
        }
    }
}