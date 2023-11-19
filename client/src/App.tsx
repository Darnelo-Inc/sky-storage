import { useLayoutEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useLazyAuthQuery } from "./api/authApi"
import Header from "./components/Header"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { useAppSelector } from "./hooks/redux"
import Storage from "./pages/Storage"
import { selectIsAuth } from "./store/selectors/userSelector"
import { FILE_URL, AUTH_URL } from "./utils/urls"

const App = () => {
  const [auth, { isLoading }] = useLazyAuthQuery()
  const isAuth = useAppSelector(selectIsAuth)
  console.log(process.env.NODE_ENV)
  console.log(FILE_URL, AUTH_URL)

  useLayoutEffect(() => {
    auth("")
  }, [auth])

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
