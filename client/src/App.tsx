import { Route, Routes } from "react-router-dom"
import Nav from "./components/Header"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Home from "./pages/Home"
import { useEffect } from "react"
import { useLazyAuthQuery } from "./api/authApi"

const App = () => {
  const [auth] = useLazyAuthQuery()

  useEffect(() => {
    auth("")
  }, [])

  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
