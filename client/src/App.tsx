import { Route, Routes } from "react-router-dom"
import Nav from "./components/Header"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Home from "./pages/Home"
import { useEffect } from "react"
import { useLazyAuthQuery } from "./api/authApi"
import { useAppSelector } from "./hooks/redux"
import { selectIsAuth } from "./store/selectors/userSelector"

const App = () => {
  const [auth] = useLazyAuthQuery()
  const isAuth = useAppSelector(selectIsAuth)

  useEffect(() => {
    auth("")
  }, [])

  return (
    <>
      <Nav></Nav>
      {isAuth ? (
        <Routes>
          <Route index path="/" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route index path="/signIn" element={<SignIn />} />
        </Routes>
      )}
    </>
  )
}

export default App
