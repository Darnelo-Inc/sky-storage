export interface IFileState {
  files: IFile[]
  currentDir: string | null
}

export interface IFile {
  _id: number
  name: string
  type: string
}

export interface FileProps {
  file: IFile
}
