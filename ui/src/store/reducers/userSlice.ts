import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../models/user"

const initialState: IUser = {
  currentUser: {},
  isAuth: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
})
