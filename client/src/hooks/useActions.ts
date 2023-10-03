import { useDispatch } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { fileSlice } from "../store/reducers/fileSlice"
import { userSlice } from "../store/reducers/userSlice"

const actions = { ...userSlice.actions, ...fileSlice.actions }

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
