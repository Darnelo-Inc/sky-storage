import { FC, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./ui/Button"
import Form from "./ui/Form"
import { useSignInMutation } from "../api/authApi"
import { IAuth, AuthOnChange } from "../models/auth"

const SignIn: FC = () => {
  const [data, setData] = useState<IAuth>({ email: "", password: "" })

  const onChange: AuthOnChange = (e, type) => {
    setData((prevData) => ({ ...prevData, [type]: e.target.value }))
  }

  const [signIn] = useSignInMutation()

  const nav = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await signIn(data)
    console.log(res)
    if (res.hasOwnProperty("data")) {
      nav("/")
    }
    setData({ email: "", password: "" })
  }

  return (
    <div className="auth">
      <Form onSubmit={handleSubmit}>
        <Form.FormTitle>Sign In</Form.FormTitle>
        <Form.FormGroup>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Input
            value={data.email}
            onChange={onChange}
            type="email"
            id="email"
            name="email"
            placeholder="Type your email"
          />
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Input
            value={data.password}
            onChange={onChange}
            type="password"
            id="password"
            name="password"
            placeholder="Type your password"
          />
        </Form.FormGroup>
        <Button className="btn btn--auth" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default SignIn
