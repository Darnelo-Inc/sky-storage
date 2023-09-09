import { Route, Routes } from "react-router-dom"
import Nav from "./components/Header"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Home from "./pages/Home"

const App = () => {
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
