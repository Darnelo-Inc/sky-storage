import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "../api/authApi"
import { filesApi } from "../api/filesApi"
import { fileSlice } from "./reducers/fileSlice"
import { userSlice } from "./reducers/userSlice"

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [fileSlice.name]: fileSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, filesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
