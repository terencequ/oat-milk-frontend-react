import {RootState} from "./store";
import {ActionStatus} from "./models/actionStatus";

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error("Failed to write redux state to local storage.", err)
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    state.users.loginStatus = ActionStatus.NotStarted;
    return state;
  } catch (err) {
    return undefined;
  }
};