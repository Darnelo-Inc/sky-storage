import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AuthRequest } from "../models/auth"
import { IUserResponse } from "../models/user"
import { setUser } from "../store/reducers/userSlice"
import { lsUserTokenKey } from "../utils/lsKeys"
import { AUTH_URL } from "../utils/urls"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: AUTH_URL }),
  endpoints: (build) => ({
    auth: build.query<IUserResponse, string>({
      query: () => ({
        url: "",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(lsUserTokenKey)}`,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          dispatch(setUser(res.data))
        } catch (e) {
          localStorage.removeItem(lsUserTokenKey)
        }
      },
    }),
    signUp: build.mutation<any, AuthRequest>({
      query: (body) => ({
        url: "/signUp",
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          dispatch(setUser(res.data))
        } catch (e) {
          console.log(e)
        }
      },
    }),
    signIn: build.mutation<IUserResponse, AuthRequest>({
      query: (body) => ({
        url: "/signIn",
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          dispatch(setUser(res.data))
        } catch (e) {
          console.log(e)
        }
      },
    }),
  }),
})

export const { useSignUpMutation, useSignInMutation, useLazyAuthQuery } =
  authApi
