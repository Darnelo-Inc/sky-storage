import { FC, FormEvent, useState } from "react"
import Form from "./ui/Form"
import Button from "./ui/Button"
import { AuthOnChange, IAuth } from "../models/auth"
import { useSignUpMutation } from "../api/authApi"

const SignUp: FC = () => {
  const [data, setData] = useState<IAuth>({ email: "", password: "" })

  const onChange: AuthOnChange = (e, type) => {
    setData((prevData) => ({ ...prevData, [type]: e.target.value }))
  }

  const [signUp] = useSignUpMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await signUp(data)
    console.log(res)
    setData({ email: "", password: "" })
  }

  return (
    <div className="auth">
      <Form onSubmit={handleSubmit}>
        <Form.FormTitle>Sign Up</Form.FormTitle>
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

export default SignUp
