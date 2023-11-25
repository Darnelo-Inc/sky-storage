import { ReactNode } from "react"

type ButtonProps = {
  type: "button" | "submit" | "reset"
  children: ReactNode
  className: string
  onClick?: (e?: any) => void
}

const Button = (props: ButtonProps) => {
  const { type, children, className, onClick } = props

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
