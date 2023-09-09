import { FC } from "react"
import Button from "./ui/Button"
import { Link } from "react-router-dom"

const Nav: FC = () => {
  return (
    <nav>
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
    </nav>
  )
}

export default Nav
