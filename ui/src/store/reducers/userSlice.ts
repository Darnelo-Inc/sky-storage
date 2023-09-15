import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser, IUserInfo } from "../../models/user"

const initialState: IUser = {
  currentUser: {} as IUserInfo,
  isAuth: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserInfo>) => {
      state.isAuth = true
      state.currentUser = action.payload
    },
  },
})

export const { setUser } = userSlice.actions
