import {ActionStatus} from "./actionStatus";

export const InitialAction: Action = {
    status: ActionStatus.NotStarted,
    error: null
}

export interface Action {
    status: ActionStatus;
    error: string | null;
}

export function startAction(action: Action){
    action.status = ActionStatus.InProgress;
    action.error = null;
}

export function succeedAction(action: Action){
    action.status = ActionStatus.Success;
    action.error = null;
}

export function failAction(action: Action, error: string){
    action.status = ActionStatus.Failure;
    action.error = error;
}