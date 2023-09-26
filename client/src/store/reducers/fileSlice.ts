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
  },
})

export const { setFiles } = fileSlice.actions
