import { UploadedFile } from "express-fileupload"
import { ObjectId } from "mongoose"
import { IFile } from "./File"

export interface IGetFiles {
  user_id: ObjectId
  parent_id: ObjectId
}

export interface IUploadFile {
  file: UploadedFile | undefined
  user_id: ObjectId
  parent_id: ObjectId
  file_name: string
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

export interface IDownloadFile {
  _id: ObjectId
  user_id: ObjectId
}

export interface IDeleteFile {
  file: IFile
  user_id: ObjectId
}