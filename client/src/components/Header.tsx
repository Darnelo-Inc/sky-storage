import { FC } from "react"
import { Link } from "react-router-dom"
import Nav from "./Nav"
import logo from "../assets/images/logo.svg"
import { useAppSelector } from "../hooks/redux"
import { HeaderProps } from "../models/header"
import { selectIsAuth } from "../store/selectors/userSelector"

const Header: FC<HeaderProps> = ({ isLoading }) => {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link to={isAuth ? "/" : "/signIn"} className="header__logo">
            <img className="logo" src={logo} alt="sky-storage-logo" />
            <h1 className="header__title">
              <span className="header__sky">Sky</span> Storage
            </h1>
          </Link>
          {!isLoading && <Nav />}
        </div>
      </div>
    </header>
  )
}

export default Header
