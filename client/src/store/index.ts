import { authApi } from "../api/authApi"
import { fileSlice } from "./reducers/fileSlice"
import { userSlice } from "./reducers/userSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [fileSlice.name]: fileSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
