import { useDispatch } from "react-redux"
import { fileSlice } from "./../store/reducers/fileSlice"
import { userSlice } from "./../store/reducers/userSlice"
import { bindActionCreators } from "@reduxjs/toolkit"

const actions = { ...userSlice.actions, ...fileSlice.actions }

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
