export interface IUser {
  currentUser: IUserInfo
  isAuth: boolean
}

export interface IUserResponse {
  token: string
  user: IUserInfo
}

export interface IUserInfo {
  id: string
  email: string
  disk_space: number
  used_space: number
}
