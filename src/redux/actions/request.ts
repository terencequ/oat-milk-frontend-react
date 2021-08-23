import {RequestStatus} from "./requestStatus";

export interface Request {
    status: RequestStatus;
    error: string | null;
}

export function getInitialRequest(): Request{
    return {
        status: RequestStatus.NotStarted,
        error: null
    }
}

export function getInProgressRequest(): Request{
    return {
        status: RequestStatus.InProgress,
        error: null
    }
}

export function getSuccessRequest(){
    return {
        status: RequestStatus.Success,
        error: null
    }
}

export function getFailRequest(error: string){
    return {
        status: RequestStatus.Failure,
        error: error
    }
}