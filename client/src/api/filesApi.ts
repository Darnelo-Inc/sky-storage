import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { addFile, deleteFile, setFiles } from "../store/reducers/fileSlice"
import { lsUserTokenKey } from "../utils/lsKeys"
import { FILE_URL } from "../utils/urls"
import { IFile } from "../models/file"

interface IFileResponse extends IFile {}

interface ICreateRequest {
  name: string
  parent_id: number | null
}

interface IUploadRequest {
  file: File
  parent_id: number | null
}

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({ baseUrl: FILE_URL }),
  endpoints: (build) => ({
    getFiles: build.query<IFileResponse[], number | null>({
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

    createDir: build.mutation<IFileResponse, ICreateRequest>({
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

    uploadFile: build.mutation<IFileResponse, IUploadRequest>({
      query: ({ file, parent_id }) => {
        const formData = new FormData()
        formData.append("file", file)
        if (parent_id) {
          formData.append("parent_id", parent_id.toString())
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

    downloadFile: build.query<string, { id: number }>({
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
