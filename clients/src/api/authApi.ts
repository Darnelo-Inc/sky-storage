import { setUser } from "../store/reducers/userSlice"
import { lsUserTokenKey } from "../utils/lsKeys"
import { IUserResponse } from "./../models/user"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface AuthRequest {
  email: string
  password: string
}

interface AuthResponse {
  data: any
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/auth/" }),
  endpoints: (builder) => ({
    signUp: builder.mutation<any, AuthRequest>({
      query: (body) => ({
        url: "signUp",
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation<IUserResponse, AuthRequest>({
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

export const { useSignUpMutation, useSignInMutation } = authApi
