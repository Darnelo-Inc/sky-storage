import { FC } from "react"
import { Link } from "react-router-dom"
import Button from "./ui/Button"
import { useAppSelector } from "../hooks/redux"
import { useLogout } from "../hooks/useLogout"
import { selectIsAuth } from "../store/selectors/userSelector"

const Nav: FC = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const logout = useLogout()

  return (
    <nav>
      {isAuth ? (
        <Button type="button" className="btn btn--nav" onClick={() => logout()}>
          <Link className="link-reset" to="/signIn">
            Log Out
          </Link>
        </Button>
      ) : (
        <>
          <Button type="button" className="btn btn--nav">
            <Link className="link-reset" to="/signUp">
              Sign Up
            </Link>
          </Button>
          <Button type="button" className="btn btn--nav">
            <Link className="link-reset" to="/signIn">
              Sign In
            </Link>
          </Button>
        </>
      )}
    </nav>
  )
}

export default Nav
