import axios, {AxiosError} from "axios";
import {ErrorResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

export function processError (err : Error | AxiosError) : ErrorResponse {
    if(axios.isAxiosError(err)) {
        const error = err as AxiosError;
        const errData = error.response?.data;
        if (errData?.type || errData?.message || errData?.stackTrace) {
            return error.response?.data as ErrorResponse;
        } else {
            return { type: error.response?.statusText ?? null, message: error.message, stackTrace: null }
        }
    }

    const error = err as Error;
    return { type: error.name, message: error.message, stackTrace: null };
}