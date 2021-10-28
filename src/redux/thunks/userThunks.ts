import {
    UserApi,
    UserLoginRequest, UserRequest
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {processError} from "./helpers/errorHelper";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {failRequest, startRequest, succeedRequest} from "../slices/requestsSlice";
import {logout, setAuthToken, setUser} from "../slices/usersSlice";

const createUserClient = (): UserApi => {
    return new UserApi(undefined, process.env.REACT_APP_API_URL);
}

export function getUserProfile(request: UserLoginRequest): ThunkAction<void, RootState, unknown, AnyAction> {
    return async dispatch => {
        try {
            dispatch(startRequest(getUserProfile.name))
            const res = await createUserClient().userProfileGet(request);
            dispatch(succeedRequest(getUserProfile.name))
            dispatch(setUser(res.data));
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([getUserProfile.name, errorRes.message ?? "An unexpected error has occurred!"]))
            dispatch(logout());
        }
    }
}

export function login(request: UserLoginRequest): ThunkAction<void, RootState, unknown, AnyAction> {
    return async dispatch => {
        try {
            dispatch(startRequest(login.name))
            const res = await createUserClient().userLoginPost(request);
            dispatch(succeedRequest(login.name))
            dispatch(setAuthToken(res.data?.authToken ?? ""));
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([login.name, errorRes.message ?? "An unexpected error has occurred!"]))
        }
    }
}

export function register(request: UserRequest): ThunkAction<void, RootState, unknown, AnyAction> {
    return async dispatch => {
        try {
            dispatch(startRequest(register.name))
            const res = await createUserClient().userRegisterPost(request);
            dispatch(succeedRequest(register.name))
            dispatch(setAuthToken(res.data?.authToken ?? ""));
        } catch (err) {
            const errorRes = processError(err);
            dispatch(failRequest([register.name, errorRes.message ?? "An unexpected error has occurred!"]))
        }
    }
}