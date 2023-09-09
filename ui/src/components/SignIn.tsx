import { FC, FormEvent, useState } from "react"
import Form from "./ui/Form"
import Button from "./ui/Button"
import { IAuth, AuthOnChange } from "../models/auth"
import { useSignInMutation } from "../api/authApi"

const SignIn: FC = () => {
  const [data, setData] = useState<IAuth>({ email: "", password: "" })

  const onChange: AuthOnChange = (e, type) => {
    setData((prevData) => ({ ...prevData, [type]: e.target.value }))
  }

  const [signIn] = useSignInMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(data)
    const result = await signIn(data)
    console.log(result)
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
