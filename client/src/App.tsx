import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { useEffect, useLayoutEffect } from "react"
import { useLazyAuthQuery } from "./api/authApi"
import { useAppSelector } from "./hooks/redux"
import { selectIsAuth } from "./store/selectors/userSelector"
import Storage from "./pages/Storage"

const App = () => {
  const [auth, { isLoading }] = useLazyAuthQuery()
  const isAuth = useAppSelector(selectIsAuth)

  useLayoutEffect(() => {
    auth("")
  }, [])

  if (isLoading) return <Header isLoading></Header>

  return (
    <>
      <Header></Header>
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<Storage />} />
            <Route index element={<Storage />} />
          </>
        ) : (
          <>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route index element={<SignIn />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
