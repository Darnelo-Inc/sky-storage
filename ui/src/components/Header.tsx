import { FC } from "react"
import logo from "../assets/images/logo.svg"
import Nav from "./Nav"

const Header: FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <a href="/" className="header__logo">
            <img className="logo" src={logo} alt="sky-storage-logo" />
            <h1 className="header__title">
              <span className="header__sky">Sky</span> Storage
            </h1>
          </a>
          <Nav />
        </div>
      </div>
    </header>
  )
}

export default Header
