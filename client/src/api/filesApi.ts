import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { lsUserTokenKey } from "../utils/lsKeys"
import { RequestType } from "../models/files"
import { ICreateFile, IFile } from "../models/file"
import { addFile, setFiles } from "../store/reducers/fileSlice"
import { FILE_URL } from "../utils/urls"

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({ baseUrl: FILE_URL }),
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

    createDir: build.mutation<IFile, ICreateFile>({
      query: ({ name, parent_id }) => ({
        url: "",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(lsUserTokenKey)}`,
        },
        body: parent_id
          ? { name, parent_id, type: "dir" }
          : { name, type: "dir" },
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          dispatch(addFile(res.data))
        } catch (e) {
          console.log(e)
        }
      },
    }),
  }),
})

export const { useLazyGetFilesQuery, useCreateDirMutation } = filesApi
