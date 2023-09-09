import { ReactNode } from "react"

const Button = ({
  type,
  children,
  className,
}: {
  type: "button" | "submit" | "reset"
  children: ReactNode
  className: string
}) => (
  <button type={type} className={className}>
    {children}
  </button>
)

export default Button
