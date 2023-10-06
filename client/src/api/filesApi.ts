import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { ICreateFile, IFile } from "../models/file"
import { RequestType } from "../models/files"
import { addFile, setFiles } from "../store/reducers/fileSlice"
import { lsUserTokenKey } from "../utils/lsKeys"
import { FILE_URL } from "../utils/urls"

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({ baseUrl: FILE_URL }),
  endpoints: (build) => ({
    getFiles: build.query<IFile[], RequestType>({
      query: (dir_id) => ({
        url: `${dir_id ? `?parent_id=${dir_id}` : ""}`,
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

    uploadFile: build.mutation<any, any>({
      query: ({ file, parent_id }) => {
        const formData = new FormData()
        formData.append("file", file)
        if (parent_id) {
          formData.append("parent_id", parent_id)
        }
        return {
          url: "/upload",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(lsUserTokenKey)}`,
          },
        }
      },

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

export const {
  useLazyGetFilesQuery,
  useCreateDirMutation,
  useUploadFileMutation,
} = filesApi
