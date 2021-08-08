import {configureStore} from '@reduxjs/toolkit'
import charactersReducer from "./slices/charactersSlice";
import darkModeReducer from "./slices/darkModeSlice";
import usersReducer from "./slices/usersSlice";
import throttle from "lodash.throttle";
import {loadState, saveState} from "./localStorage";


export const store = configureStore({
    reducer: {
        characters: charactersReducer,
        users: usersReducer,
        darkMode: darkModeReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // this is not related to the .env.prod, just the npm run build version
    preloadedState: loadState()
})


// State IO
store.subscribe(throttle(() => {
    saveState(store.getState())
},1000))


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch