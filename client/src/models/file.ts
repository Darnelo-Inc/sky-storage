export interface IFile {
  _id: number
  name: string
  type: string
  size: number
  path: string
  creation_date: number
  user_id: string
  children: Array<File>
}