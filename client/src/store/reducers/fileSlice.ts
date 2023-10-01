import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IFile, IFileState } from "../../models/file"

const initialState: IFileState = {
  files: [],
  currentDir: null,
}

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<IFile[]>) => {
      state.files = action.payload
    },
    setCurrentDir: (state, action) => {},
    addFile: (state, action: PayloadAction<IFile>) => {
      state.files.push(action.payload)
    },
  },
})

export const { setFiles, addFile } = fileSlice.actions
