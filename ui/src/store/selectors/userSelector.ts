import { RootState } from ".."

export const selectIsAuth = (state: RootState) => state.user.isAuth
