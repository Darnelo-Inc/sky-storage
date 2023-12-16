import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { ICreateFile, IFile } from "../models/file"
import { addFile, deleteFile, setFiles } from "../store/reducers/fileSlice"
import { lsUserTokenKey } from "../utils/lsKeys"
import { FILE_URL } from "../utils/urls"

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({ baseUrl: FILE_URL }),
  endpoints: (build) => ({
    // TODO: add types
    getFiles: build.query<IFile[], any>({
      query: (dir_id) => ({
        url: `/${dir_id ? `?parent_id=${dir_id}` : ""}`,
        method: "GET",
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
        body: parent_id ? { name, parent_id } : { name },
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

    // TODO: add types
    uploadFile: build.mutation<any, any>({
      query: ({ file, parent_id }) => {
        const formData = new FormData()
        formData.append("file", file)
        if (parent_id) {
          formData.append("parent_id", parent_id)
        }
        formData.append("file_name", file.name)
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

    // TODO: add types
    downloadFile: build.query<any, any>({
      query: ({ id }) => ({
        url: "/download",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(lsUserTokenKey)}`,
        },
        params: { id },
        responseHandler: async (response) => {
          const blob = await response.blob()
          return window.URL.createObjectURL(blob)
        },
        cache: "no-cache",
      }),
    }),

    // TODO: add types
    deleteFile: build.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: "",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(lsUserTokenKey)}`,
        },
        params: { id },
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          // TODO: rm in future
          console.log(res)
          dispatch(deleteFile(res.data))
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
  useLazyDownloadFileQuery,
} = filesApi
