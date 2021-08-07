import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./reducers/authSlice";
import darkModeReducer from "./reducers/darkModeSlice";
import throttle from "lodash.throttle";
import {loadState, saveState} from "./localStorage";


export const store = configureStore({
    reducer: {
        auth: authReducer,
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