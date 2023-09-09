import { FC } from "react"
import logo from "../assets/images/logo.svg"
import Nav from "./Nav"
import { Link } from "react-router-dom"

const Header: FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link to="/" className="header__logo">
            <img className="logo" src={logo} alt="sky-storage-logo" />
            <h1 className="header__title">
              <span className="header__sky">Sky</span> Storage
            </h1>
          </Link>
          <Nav />
        </div>
      </div>
    </header>
  )
}

export default Header
