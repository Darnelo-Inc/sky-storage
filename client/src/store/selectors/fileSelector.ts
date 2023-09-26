import { RootState } from ".."

export const selectCurrentDir = (state: RootState) => state.file.currentDir

export const selectFiles = (state: RootState) => state.file.files
