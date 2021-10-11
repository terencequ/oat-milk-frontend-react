import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getFailRequest, getInitialRequest, getInProgressRequest, getSuccessRequest, Request} from "../actions/request";
import {useAppSelector} from "../hooks";

const initialState: {[id: string]: Request} = {};

export const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        initialRequest: (state: {[id: string]: Request}, action: PayloadAction<string>) => {
            const requestId = action.payload;
            state[requestId] = getInitialRequest();
        },
        startRequest: (state: {[id: string]: Request}, action: PayloadAction<string>) => {
            const requestId = action.payload;
            state[requestId] = getInProgressRequest();
        },
        succeedRequest: (state: {[id: string]: Request}, action: PayloadAction<string>) => {
            const requestId = action.payload;
            state[requestId] = getSuccessRequest();
        },
        failRequest: (state: {[id: string]: Request}, action: PayloadAction<[string, string]>) => {
            const [requestId, error] = action.payload;
            state[requestId] = getFailRequest(error);
        },
    },
});

export const requestSelector = (requestId: string) => {
    return () => {
        const result = useAppSelector(state => state.requests[requestId]);
        return result ?? getInitialRequest();
    }
}
export const {initialRequest, startRequest, succeedRequest, failRequest} = requestsSlice.actions;
export default requestsSlice.reducer;