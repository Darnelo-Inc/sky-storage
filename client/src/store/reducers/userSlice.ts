import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../models/user"
import { lsUserTokenKey } from "../../utils/lsKeys"
import { IUserInfo, IUserResponse } from "../../api/authApi"

const initialState: IUser = {
  currentUser: {} as IUserInfo,
  isAuth: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserResponse>) => {
      state.isAuth = true
      state.currentUser = action.payload.user
      localStorage.setItem(lsUserTokenKey, action.payload.token)
    },
    removeUser: (state) => {
      state.isAuth = false
      state.currentUser = {} as IUserInfo
      localStorage.removeItem(lsUserTokenKey)
    },
  },
})

export const { setUser } = userSlice.actions
