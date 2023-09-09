import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface AuthResponse {
  message: string
}

interface AuthRequest {
  email: string
  password: string
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/auth/" }),
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, AuthRequest>({
      query: (body) => ({
        url: "signUp",
        method: "POST",
        body,
      }),
      // transformResponse: (response: { data: AuthResponse }, meta, arg) =>
      //   response.data,
      // transformErrorResponse: (
      //   response: { status: string | number },
      //   meta,
      //   arg
      // ) => response.status,
    }),
    signIn: builder.mutation<AuthResponse, AuthRequest>({
      query: (body) => ({
        url: "signIn",
        method: "POST",
        body,
      }),
      // transformResponse: (response: { data: AuthResponse }, meta, arg) =>
      //   response.data,
      // transformErrorResponse: (
      //   response: { status: string | number },
      //   meta,
      //   arg
      // ) => response.status,
    }),
  }),
})

export const { useSignUpMutation, useSignInMutation } = authApi
