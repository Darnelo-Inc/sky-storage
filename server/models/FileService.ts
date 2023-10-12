import { UploadedFile } from "express-fileupload"
import { ObjectId } from "mongoose"
import { IFile } from "./File"
import { IUser } from "./User"

export interface IFileInfo {
  user_id: ObjectId
  file_path?: string
}

export interface IGetFiles {
  user_id: ObjectId
  parent_id: ObjectId
}

export interface IUploadFile {
  file: UploadedFile | undefined
  user_id: ObjectId
  parent_id: ObjectId
}

export interface ICreateObjDir {
  name: string
  user_id: ObjectId
  parent_id: ObjectId
}

export interface IFindFileByIdAndUserId {
  _id: ObjectId
  user_id: ObjectId
}

export interface IUpdateParentInfo {
  file: IFile
  parent_id: ObjectId
}

export interface ICreateObjFile {
  file: UploadedFile
  type: string
  filePath: string
  parentDir_id: ObjectId | null
  user: IUser
}

export interface IDownloadFile {
  _id: ObjectId
  user_id: ObjectId
}
