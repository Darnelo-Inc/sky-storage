export interface IFileState {
  files: IFile[]
  currentDir: number | null
  dirStack: number[]
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

export interface ICreateFile {
  name: string
  parent_id: number | null
}
