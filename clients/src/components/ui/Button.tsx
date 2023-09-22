import { ReactNode } from "react"

const Button = ({
  type,
  children,
  className,
  onClick,
}: {
  type: "button" | "submit" | "reset"
  children: ReactNode
  className: string
  onClick?: () => void
}) => (
  <button type={type} className={className} onClick={onClick}>
    {children}
  </button>
)

export default Button
