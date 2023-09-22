import { FormEvent, ReactNode } from "react"
import { AuthOnChange } from "../../models/auth"

const Form = ({
  children,
  onSubmit,
}: {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) => (
  <form onSubmit={(e) => onSubmit(e)} className="form">
    {children}
  </form>
)

Form.FormTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="form__title">{children}</h2>
}

Form.FormGroup = ({ children }: { children: ReactNode }) => (
  <div className="form__group">{children}</div>
)

Form.Input = ({
  type,
  id,
  name,
  value,
  placeholder,
  onChange,
}: {
  type: string
  id?: string
  name?: string
  value: string
  placeholder?: string
  onChange: AuthOnChange
}) => (
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

Form.Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: ReactNode
}) => (
  <label htmlFor={htmlFor} className="form__label">
    {children}
  </label>
)

export default Form
