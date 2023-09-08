import { FC } from "react"
import { ButtonProps } from "../../models/btn"

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className="btn" {...rest}>
      {children}
    </button>
  )
}

export default Button
