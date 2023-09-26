import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { lsUserTokenKey } from "../utils/lsKeys"
import { RequestType } from "../models/files"
import { IFile } from "../models/file"
import { setFiles } from "../store/reducers/fileSlice"

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/files" }),
  endpoints: (build) => ({
    getFiles: build.query<IFile[], RequestType>({
      query: (dir_id) => ({
        url: `${dir_id ? `?parent=${dir_id}` : ""}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(lsUserTokenKey)}`,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          dispatch(setFiles(res.data))
        } catch (e) {
          console.log(e)
        }
      },
    }),
  }),
})

export const { useLazyGetFilesQuery } = filesApi
