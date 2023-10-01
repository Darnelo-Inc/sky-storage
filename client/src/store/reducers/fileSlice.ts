import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IFile, IFileState } from "../../models/file"

const initialState: IFileState = {
  files: [
    {
      _id: 1,
      name: "test-file-1",
      type: "dir",
      creation_date: Date.now(),
      path: "/",
      size: 13218,
    },
    {
      _id: 2,
      name: "test-file-2",
      type: "mp3",
      creation_date: Date.now(),
      path: "/",
      size: 12323228,
    },
    {
      _id: 3,
      name: "test-file-3",
      type: "mp4",
      creation_date: Date.now(),
      path: "/",
      size: 9199923228,
    },
    {
      _id: 4,
      name: "test-file-4",
      type: "txt",
      creation_date: Date.now(),
      path: "/",
      size: 1238,
    },
  ],
  currentDir: null,
}

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<IFile[]>) => {
      // state.files = action.payload
    },
    setCurrentDir: (state, action) => {},
  },
})

export const { setFiles } = fileSlice.actions
