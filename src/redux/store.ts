import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./reducers/authSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: process.env.NODE_ENV !== 'production' // this is not related to the .env.prod, just the npm run build version
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch