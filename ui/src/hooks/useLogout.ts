import { useActions } from "./useActions"

export const useLogout = () => {
  const { removeUser } = useActions()

  return removeUser
}
