import { IUserInfo } from "../api/authApi"

export interface IUser {
  currentUser: IUserInfo
  isAuth: boolean
}
