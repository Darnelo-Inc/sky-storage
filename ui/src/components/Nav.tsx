import { FC } from "react"
import Button from "./ui/Button"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAppSelector } from "../hooks/redux"
import { selectIsAuth } from "../store/selectors/userSelector"

const Nav: FC = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const logout = useLogout()

  return (
    <nav>
      {isAuth ? (
        <Button type="button" className="btn btn--nav" onClick={() => logout()}>
          Log Out
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
