export interface IFile {
  _id: number
  name: string
  type: string
  size: number
  path: string
  creation_date: number
}

export interface ICreateFile {
  name: string
  parent_id: number | null
}
