import { setUser } from "../store/reducers/userSlice"
import { lsUserTokenKey } from "../utils/lsKeys"
import { IUserResponse } from "./../models/user"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface AuthRequest {
  email: string
  password: string
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/auth/" }),
  endpoints: (build) => ({
    auth: build.query<any, any>({
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
        url: "signUp",
        method: "POST",
        body,
      }),
    }),
    signIn: build.mutation<IUserResponse, AuthRequest>({
      query: (body) => ({
        url: "signIn",
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
