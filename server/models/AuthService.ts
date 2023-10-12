import { ObjectId } from "mongoose"

export interface IUserData {
  email: string
  password: string
}

export interface I_id {
  _id: ObjectId
}

export interface IFindUserByEmail {
  email: string
}
