import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IFile } from "../../models/file"

interface IFileState {
  files: IFile[]
  currentDir: number | null
  dirStack: number[]
}

const initialState: IFileState = {
  files: [],
  currentDir: null,
  dirStack: [],
}

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<IFile[]>) => {
      state.files = action.payload
    },
    setCurrentDir: (state, action: PayloadAction<number | null>) => {
      state.currentDir = action.payload
    },
    addFile: (state, action: PayloadAction<IFile>) => {
      state.files.push(action.payload)
    },
    pushDirStack: (state, action: PayloadAction<number>) => {
      state.dirStack.push(action.payload)
    },
    popDirStack: (state) => {
      state.dirStack.pop()
    },
    deleteFile: (state, action: PayloadAction<number>) => {
      state.files = state.files.filter((file) => file._id !== action.payload)
    },
  },
})

export const { setFiles, addFile, deleteFile } = fileSlice.actions
