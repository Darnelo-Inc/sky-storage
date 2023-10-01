export interface IFileState {
  files: IFile[]
  currentDir: string | null
}

export interface IFile {
  _id: number
  name: string
  type: string
  size: number
  path: string
  creation_date: number
}

export interface FileProps {
  file: IFile
}
