import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IFile, IFileState } from "../../models/file"

const initialState: IFileState = {
  files: [
    {
      _id: 1,
      name: "test-file-1",
      type: "dir",
      creation_date: new Date(),
      path: "/",
      size: 13218,
    },
    {
      _id: 2,
      name: "test-file-2",
      type: "mp3",
      creation_date: new Date(),
      path: "/",
      size: 1328,
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
