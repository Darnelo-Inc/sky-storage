import { FormEvent, ReactNode } from "react"
import { AuthOnChange } from "../../models/auth"

type FormProps = {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const Form = (props: FormProps) => {
  const { children, onSubmit } = props

  return (
    <form onSubmit={(e) => onSubmit(e)} className="form">
      {children}
    </form>
  )
}

type FormFormTitleProps = { children: ReactNode }

Form.FormTitle = (props: FormFormTitleProps) => {
  const { children } = props

  return <h2 className="form__title">{children}</h2>
}

type FormFormGroupProps = { children: ReactNode }

Form.FormGroup = (props: FormFormGroupProps) => {
  const { children } = props

  return <div className="form__group">{children}</div>
}
type FormInputProps = {
  type: string
  id?: string
  name?: string
  value: string
  placeholder?: string
  onChange: AuthOnChange
}

Form.Input = (props: FormInputProps) => {
  const { type, id, name, value, placeholder, onChange } = props

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(e, type)}
      placeholder={placeholder}
      className="form__input"
    />
  )
}

type FormLabelProps = {
  htmlFor: string
  children: ReactNode
}

Form.Label = (props: FormLabelProps) => {
  const { htmlFor, children } = props

  return (
    <label htmlFor={htmlFor} className="form__label">
      {children}
    </label>
  )
}

export default Form
